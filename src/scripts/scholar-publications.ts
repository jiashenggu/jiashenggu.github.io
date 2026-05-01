type ScholarRecord = Record<string, unknown>;

type ScholarPublication = {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: string;
  citations: number;
  url: string;
};

const stat = document.querySelector("[data-scholar-stats]");
const citationsTarget =
  stat instanceof HTMLElement ? stat.querySelector("[data-scholar-total]") : null;
const publicationsList = document.querySelector("[data-scholar-publications-list]");
const publicationsState = document.querySelector("[data-scholar-publications-state]");
const url =
  publicationsList instanceof HTMLElement
    ? publicationsList.dataset.url || (stat instanceof HTMLElement ? stat.dataset.url : "")
    : "";
const scholarProfileUrl =
  publicationsList instanceof HTMLElement ? publicationsList.dataset.scholarProfile : "";

const isRecord = (value: unknown): value is ScholarRecord =>
  Boolean(value) && typeof value === "object";

const getText = (...values: unknown[]): string => {
  for (const value of values) {
    if (Array.isArray(value)) {
      const text = value
        .map((item) => String(item).trim())
        .filter(Boolean)
        .join(", ");
      if (text) return text;
      continue;
    }
    if (value === undefined || value === null) continue;
    const text = String(value).trim();
    if (text) return text;
  }
  return "";
};

const getNumber = (value: unknown): number => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

const getScholarPublicationUrl = (publicationId: string): string => {
  if (!publicationId || !scholarProfileUrl) return "";
  try {
    const profileUrl = new URL(scholarProfileUrl);
    const scholarId = profileUrl.searchParams.get("user");
    if (!scholarId) return "";
    const citationUrl = new URL("https://scholar.google.com/citations");
    citationUrl.searchParams.set("view_op", "view_citation");
    citationUrl.searchParams.set("hl", "en");
    citationUrl.searchParams.set("user", scholarId);
    citationUrl.searchParams.set("citation_for_view", publicationId);
    return citationUrl.toString();
  } catch {
    return "";
  }
};

const setCitationState = (label: string, state: string): void => {
  if (!(stat instanceof HTMLElement) || !(citationsTarget instanceof HTMLElement)) return;
  citationsTarget.textContent = label;
  stat.dataset.state = state;
};

const setPublicationsState = (label: string): void => {
  if (!(publicationsState instanceof HTMLElement)) return;
  publicationsState.hidden = false;
  publicationsState.textContent = label;
};

const hidePublicationsState = (): void => {
  if (publicationsState instanceof HTMLElement) {
    publicationsState.hidden = true;
  }
};

const normalizePublication = (publication: unknown): ScholarPublication => {
  const record = isRecord(publication) ? publication : {};
  const bib = isRecord(record.bib) ? record.bib : {};
  const id = getText(record.id, record.author_pub_id);

  return {
    id,
    title: getText(record.title, bib.title),
    authors: getText(record.authors, bib.author),
    venue: getText(
      record.venue,
      bib.venue,
      bib.journal,
      bib.conference,
      bib.publisher,
      bib.citation,
    ),
    year: getText(record.year, bib.pub_year, bib.year),
    citations: getNumber(record.citations ?? record.num_citations),
    url: getText(record.url, record.pub_url, record.eprint_url, getScholarPublicationUrl(id)),
  };
};

const getPublications = (data: unknown): ScholarPublication[] => {
  const record = isRecord(data) ? data : {};
  const source = Array.isArray(record.publications_list)
    ? record.publications_list
    : isRecord(record.publications)
      ? Object.values(record.publications)
      : [];

  return source
    .map(normalizePublication)
    .filter((publication) => publication.title)
    .sort((left, right) => {
      const yearDiff = getNumber(right.year) - getNumber(left.year);
      if (yearDiff !== 0) return yearDiff;
      const citationDiff = right.citations - left.citations;
      if (citationDiff !== 0) return citationDiff;
      return left.title.localeCompare(right.title);
    });
};

const appendMeta = (container: Element, label: string): void => {
  if (!label) return;
  const item = document.createElement("span");
  item.textContent = label;
  container.append(item);
};

const renderPublications = (publications: ScholarPublication[]): void => {
  if (!(publicationsList instanceof HTMLOListElement)) return;

  publicationsList.replaceChildren();
  if (publications.length === 0) {
    setPublicationsState("No Google Scholar publications are available yet.");
    return;
  }

  const fragment = document.createDocumentFragment();
  for (const publication of publications) {
    const item = document.createElement("li");
    const article = document.createElement("article");
    article.className = "publication-item";

    const meta = document.createElement("div");
    meta.className = "publication-meta";
    appendMeta(meta, publication.year);
    appendMeta(meta, publication.venue);
    if (publication.citations > 0) {
      appendMeta(
        meta,
        `${publication.citations.toLocaleString()} citation${
          publication.citations === 1 ? "" : "s"
        }`,
      );
    }
    article.append(meta);

    const title = document.createElement("h3");
    title.textContent = publication.title;
    article.append(title);

    if (publication.authors) {
      const authors = document.createElement("p");
      authors.className = "authors";
      authors.textContent = publication.authors;
      article.append(authors);
    }

    if (publication.url) {
      const links = document.createElement("div");
      links.className = "inline-links";
      const link = document.createElement("a");
      link.href = publication.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Publication";
      links.append(link);
      article.append(links);
    }

    item.append(article);
    fragment.append(item);
  }

  publicationsList.append(fragment);
  hidePublicationsState();
};

if (!url) {
  setCitationState("Unavailable", "unavailable");
  setPublicationsState("Google Scholar data source is unavailable.");
} else {
  fetch(url, { cache: "no-store" })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Google Scholar request failed: ${response.status}`);
      }
      return response.json() as Promise<unknown>;
    })
    .then((data) => {
      const record = isRecord(data) ? data : {};
      const citedBy = Number(record.citedby);
      if (Number.isFinite(citedBy)) {
        setCitationState(citedBy.toLocaleString(), "ready");
      } else {
        setCitationState("Unavailable", "unavailable");
      }
      renderPublications(getPublications(data));
    })
    .catch(() => {
      setCitationState("Unavailable", "unavailable");
      setPublicationsState("Unable to load Google Scholar publications.");
    });
}
