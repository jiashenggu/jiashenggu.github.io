# Jiasheng Gu Academic Homepage

This repository is an Astro-powered static academic homepage for
[jiashenggu.github.io](https://jiashenggu.github.io).

## Tech Stack

- [Astro](https://astro.build/) for static rendering
- TypeScript data modules for profile, education, honors, service, and internships
- GitHub Pages deployment through GitHub Actions
- A Python Google Scholar crawler that publishes citation stats and publications to the `google-scholar-stats` branch

## Project Structure

```text
src/
  components/          Reusable Astro components
  data/                Profile and resume data
  layouts/             Base HTML/SEO layout
  pages/index.astro    Homepage
  pages/cv.astro       Web CV page
  styles/global.css    Site-wide CSS
public/
  images/              Favicons and profile image
google_scholar_crawler/
  main.py              Citation and publication updater
.github/workflows/
  deploy.yml           Astro -> GitHub Pages deployment
  google_scholar_crawler.yaml
```

## Local Development

Use Node.js 22 or newer. The repository includes `.node-version` for version managers.

```bash
npm install
npm run dev
```

The development server defaults to <http://localhost:4321>.

## Validation

```bash
npm run check
npm run build
npm audit --audit-level=moderate
```

`npm run build` writes the static site to `dist/`.

## Content Updates

- Profile and links: `src/data/profile.ts`
- Web CV content: `src/data/cv.ts`
- Publications: Google Scholar is the source of truth. Update the Scholar profile, then run the Google Scholar workflow.
- Education, honors, service, internships: `src/data/resume.ts`
- Page layout/content: `src/pages/index.astro` and `src/pages/cv.astro`
- Styling: `src/styles/global.css`

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
`google-scholar-stats` branch. The homepage reads `gs_data.json` at runtime and
renders the citation count and publication list from that file.

Until the workflow succeeds at least once, the raw `gs_data.json` URL returns
404 and the homepage shows the Google Scholar data as unavailable. The current
workflow reads `GOOGLE_SCHOLAR_ID` from repository **Variables**.
When `SERPAPI_API_KEY` is present, the crawler uses SerpApi first and falls back
to the local `scholarly` crawler only when the SerpApi key is absent.
