from __future__ import annotations

import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import quote, urlencode
from urllib.request import Request, urlopen

RESULTS_DIR = Path(__file__).resolve().parent / "results"


def text_value(value: Any) -> str:
    if value is None:
        return ""
    if isinstance(value, (list, tuple)):
        return ", ".join(text for item in value if (text := str(item).strip()))
    return str(value).strip()


def first_text(*values: Any) -> str:
    for value in values:
        text = text_value(value)
        if text:
            return text
    return ""


def int_value(value: Any) -> int:
    try:
        return int(value)
    except (TypeError, ValueError):
        return 0


def require_scholar_id() -> str:
    scholar_id = os.environ.get("GOOGLE_SCHOLAR_ID", "").strip()
    if not scholar_id:
        raise RuntimeError("GOOGLE_SCHOLAR_ID is required")
    return scholar_id


def get_serpapi_key() -> str:
    return os.environ.get("SERPAPI_API_KEY", "").strip()


def get_scholarly() -> Any:
    from scholarly import scholarly

    return scholarly


def normalize_publications(publications: list[dict[str, Any]]) -> dict[str, dict[str, Any]]:
    normalized: dict[str, dict[str, Any]] = {}
    for publication in publications:
        publication_id = publication.get("author_pub_id")
        if publication_id:
            normalized[publication_id] = publication
    return normalized


def scholar_publication_url(scholar_id: str, publication_id: str) -> str:
    if not publication_id:
        return ""
    return (
        "https://scholar.google.com/citations"
        f"?view_op=view_citation&hl=en&user={quote(scholar_id)}"
        f"&citation_for_view={quote(publication_id)}"
    )


def fill_publications(publications: list[dict[str, Any]]) -> list[dict[str, Any]]:
    scholarly = get_scholarly()
    filled_publications: list[dict[str, Any]] = []
    for publication in publications:
        if not isinstance(publication, dict):
            continue
        try:
            filled = scholarly.fill(publication)
            filled_publications.append(filled if isinstance(filled, dict) else publication)
        except Exception as error:
            publication_id = first_text(publication.get("author_pub_id"), "unknown")
            print(
                f"Failed to fill Google Scholar publication {publication_id}: {error}",
                file=sys.stderr,
            )
            filled_publications.append(publication)
    return filled_publications


def normalize_publication(publication: dict[str, Any], scholar_id: str) -> dict[str, Any]:
    bib = publication.get("bib")
    if not isinstance(bib, dict):
        bib = {}

    publication_id = first_text(publication.get("author_pub_id"))
    venue = first_text(
        bib.get("venue"),
        bib.get("journal"),
        bib.get("conference"),
        bib.get("publisher"),
        bib.get("citation"),
    )
    year = first_text(bib.get("pub_year"), bib.get("year"))
    publication_url = first_text(
        publication.get("pub_url"),
        publication.get("eprint_url"),
        publication.get("url"),
        scholar_publication_url(scholar_id, publication_id),
    )

    return {
        "id": first_text(publication_id, publication_url),
        "title": first_text(bib.get("title")),
        "authors": first_text(bib.get("author")),
        "venue": venue,
        "year": year,
        "citations": int_value(publication.get("num_citations")),
        "url": publication_url,
    }


def normalize_publication_list(
    publications: list[dict[str, Any]],
    scholar_id: str,
) -> list[dict[str, Any]]:
    normalized = [
        normalize_publication(publication, scholar_id)
        for publication in publications
        if isinstance(publication, dict)
    ]
    normalized = [publication for publication in normalized if publication["title"]]
    return sorted(
        normalized,
        key=lambda publication: (
            -int_value(publication["year"]),
            -int_value(publication["citations"]),
            publication["title"].lower(),
        ),
    )


def normalize_serpapi_publications(
    publications: list[dict[str, Any]],
) -> dict[str, dict[str, Any]]:
    normalized: dict[str, dict[str, Any]] = {}
    for publication in publications:
        publication_id = first_text(publication.get("citation_id"), publication.get("link"))
        if publication_id:
            normalized[publication_id] = publication
    return normalized


def normalize_serpapi_publication(publication: dict[str, Any]) -> dict[str, Any]:
    cited_by = publication.get("cited_by")
    if not isinstance(cited_by, dict):
        cited_by = {}

    return {
        "id": first_text(publication.get("citation_id"), publication.get("link")),
        "title": first_text(publication.get("title")),
        "authors": first_text(publication.get("authors")),
        "venue": first_text(publication.get("publication")),
        "year": first_text(publication.get("year")),
        "citations": int_value(cited_by.get("value")),
        "url": first_text(publication.get("link")),
    }


def normalize_serpapi_publication_list(
    publications: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    normalized = [
        normalize_serpapi_publication(publication)
        for publication in publications
        if isinstance(publication, dict)
    ]
    normalized = [publication for publication in normalized if publication["title"]]
    return sorted(
        normalized,
        key=lambda publication: (
            -int_value(publication["year"]),
            -int_value(publication["citations"]),
            publication["title"].lower(),
        ),
    )


def serpapi_metric(table: Any, metric: str) -> int:
    if not isinstance(table, list):
        return 0
    for row in table:
        if not isinstance(row, dict):
            continue
        value = row.get(metric)
        if isinstance(value, dict):
            return int_value(value.get("all"))
    return 0


def serpapi_cites_per_year(graph: Any) -> dict[str, int]:
    if not isinstance(graph, list):
        return {}
    cites_per_year: dict[str, int] = {}
    for item in graph:
        if not isinstance(item, dict):
            continue
        year = first_text(item.get("year"))
        if year:
            cites_per_year[year] = int_value(item.get("citations"))
    return cites_per_year


def fetch_serpapi_author(scholar_id: str, api_key: str) -> dict[str, Any]:
    query = urlencode(
        {
            "engine": "google_scholar_author",
            "author_id": scholar_id,
            "hl": "en",
            "num": "100",
            "api_key": api_key,
        }
    )
    request = Request(
        f"https://serpapi.com/search.json?{query}",
        headers={"User-Agent": "jiashenggu.github.io Google Scholar crawler"},
    )
    with urlopen(request, timeout=30) as response:
        payload: dict[str, Any] = json.loads(response.read().decode("utf-8"))

    if payload.get("error"):
        raise RuntimeError(f"SerpApi request failed: {payload['error']}")

    metadata = payload.get("search_metadata")
    if isinstance(metadata, dict) and metadata.get("status") not in {None, "Success"}:
        raise RuntimeError(f"SerpApi search status is {metadata['status']}")

    author_profile = payload.get("author")
    if not isinstance(author_profile, dict):
        raise RuntimeError("SerpApi payload is missing author profile")

    publications = payload.get("articles")
    if not isinstance(publications, list):
        publications = []

    cited_by = payload.get("cited_by")
    cited_by_table = cited_by.get("table") if isinstance(cited_by, dict) else []
    cited_by_graph = cited_by.get("graph") if isinstance(cited_by, dict) else []
    interests = author_profile.get("interests")
    if not isinstance(interests, list):
        interests = []
    publications_list = normalize_serpapi_publication_list(publications)

    return {
        "source": "serpapi",
        "scholar_id": scholar_id,
        "name": first_text(author_profile.get("name")),
        "affiliation": first_text(author_profile.get("affiliations")),
        "email_domain": first_text(author_profile.get("email")),
        "homepage": first_text(author_profile.get("website")),
        "interests": [
            first_text(interest.get("title"))
            for interest in interests
            if isinstance(interest, dict) and first_text(interest.get("title"))
        ],
        "citedby": serpapi_metric(cited_by_table, "citations"),
        "hindex": serpapi_metric(cited_by_table, "h_index"),
        "i10index": serpapi_metric(cited_by_table, "i10_index"),
        "cites_per_year": serpapi_cites_per_year(cited_by_graph),
        "updated": datetime.now(timezone.utc).isoformat(),
        "publications": normalize_serpapi_publications(publications),
        "publications_list": publications_list,
        "publication_count": len(publications_list),
    }


def fetch_scholarly_author(scholar_id: str) -> dict[str, Any]:
    scholarly = get_scholarly()
    author: dict[str, Any] = scholarly.search_author_id(scholar_id)
    scholarly.fill(author, sections=["basics", "indices", "counts", "publications"])

    publications = author.get("publications", [])
    if not isinstance(publications, list):
        publications = []
    publications = fill_publications(publications)

    author["source"] = "scholarly"
    author["updated"] = datetime.now(timezone.utc).isoformat()
    author["publications"] = normalize_publications(publications)
    author["publications_list"] = normalize_publication_list(publications, scholar_id)
    author["publication_count"] = len(author["publications_list"])
    return author


def write_json(path: Path, payload: dict[str, Any]) -> None:
    path.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2, sort_keys=True) + "\n",
        encoding="utf-8",
    )


def main() -> int:
    try:
        scholar_id = require_scholar_id()
        serpapi_key = get_serpapi_key()
        author = (
            fetch_serpapi_author(scholar_id, serpapi_key)
            if serpapi_key
            else fetch_scholarly_author(scholar_id)
        )

        RESULTS_DIR.mkdir(parents=True, exist_ok=True)
        write_json(RESULTS_DIR / "gs_data.json", author)
        write_json(
            RESULTS_DIR / "gs_data_shieldsio.json",
            {
                "schemaVersion": 1,
                "label": "citations",
                "message": str(author.get("citedby", 0)),
            },
        )

        print(json.dumps(author, ensure_ascii=False, indent=2, sort_keys=True))
        return 0
    except Exception as error:
        print(f"Failed to update Google Scholar stats: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
