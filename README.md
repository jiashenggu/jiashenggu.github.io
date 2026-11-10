# Jiasheng Gu Academic Homepage

This repository is an Astro-powered static academic homepage for
[jiashenggu.github.io](https://jiashenggu.github.io).

## Tech Stack

- [Astro](https://astro.build/) for static rendering
- TypeScript data modules for profile, education, and work experience
- GitHub Pages deployment through GitHub Actions
- A Python Google Scholar crawler that publishes citation stats and publications to the `google-scholar-stats` branch

## Project Structure

```text
src/
  components/          Shared homepage, résumé, and work diagrams
  data/                Shared profile, publications, and bilingual experience
  layouts/             Base HTML/SEO layout
  pages/index.astro    English homepage
  pages/zh.astro       Chinese homepage
  pages/resume.astro   English résumé
  pages/zh/resume.astro Chinese résumé
  scripts/             Live Google Scholar citation count
  styles/              Site, diagrams, and screen/print résumé styles
scripts/
  export-resume.mjs    Generate PDFs from the built résumé pages
public/
  images/              Project images and site icons
  fonts/               Self-hosted IBM Plex fonts and their OFL licenses
google_scholar_crawler/
  main.py              Citation and publication updater
.github/workflows/
  deploy.yml           Astro -> GitHub Pages deployment
  google_scholar_crawler.yaml
```

## Local Development

Use Node.js 22.14 or newer. The repository includes `.node-version` for version managers.

```bash
npm install
npm run setup:pdf
npm run dev
```

The development server defaults to <http://localhost:4321>.

## Validation

```bash
npm run check
npm run build
npm audit --audit-level=moderate
```

`npm run build` writes the static site to `dist/` and generates both résumé PDFs
from the built résumé pages. `npm run setup:pdf` installs the browser once;
on Linux, add `-- --with-deps` if its system libraries are missing.
Use `npm run preview` after building to check the PDF download links.

## Content Updates

- Shared profile, introduction and links: `src/data/profile.ts`
- Shared publications: `src/data/publications.ts`
- Shared education and work experience: `src/data/resume.ts` and `src/data/resume-zh.ts`. The homepage and résumé use the same core descriptions verbatim; PDF export prints that résumé. Optional `technicalNotes` add implementation details in the homepage's expandable sections without rewriting the core descriptions. The résumé and PDF omit these supplements.
- Current-work diagrams: `src/components/`; the complete technical descriptions remain in native expandable details.
- Homepage layout: `src/components/Homepage.astro`; résumé layout: `src/components/Resume.astro`
- English routes: `/` and `/resume/`; Chinese routes: `/zh/` and `/zh/resume/`
- Styling: `src/styles/global.css`, `src/styles/home.css`, `src/styles/work-visuals.css`, `src/styles/resume.css`, and `src/styles/fonts.css`

The PDFs are generated assets in `dist/resume/` and `dist/zh/resume/`, not
separate content to edit or commit. Every site build regenerates them; deployment
fails if PDF export fails, so an older PDF cannot silently accompany new HTML.

## Deployment

`.github/workflows/deploy.yml` uses the official Astro GitHub Action and deploys to GitHub Pages.
In the repository settings, GitHub Pages should use **GitHub Actions** as the source.

## Google Scholar Data

The citation stats workflow requires a repository variable:

```text
GOOGLE_SCHOLAR_ID=rWfz_fcAAAAJ
```

It also supports a repository secret for reliable Google Scholar access through SerpApi:

```text
SERPAPI_API_KEY=your_serpapi_private_key
```

The workflow writes `gs_data.json` and `gs_data_shieldsio.json` to the
`google-scholar-stats` branch. The homepage reads `gs_data.json` at runtime for
the full-profile citation count. Research case studies are rendered as static
content and remain available without JavaScript.

Until the workflow succeeds at least once, the raw `gs_data.json` URL returns
404 and the homepage retains a link to the Google Scholar profile. The current
workflow reads `GOOGLE_SCHOLAR_ID` from repository **Variables**.
When `SERPAPI_API_KEY` is present, the crawler uses SerpApi first and falls back
to the local `scholarly` crawler only when the SerpApi key is absent.
