import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { preview } from "astro";

const root = fileURLToPath(new URL("../", import.meta.url));
const artifacts = path.join(root, ".local-artifacts/resume-pdf");
await mkdir(artifacts, { recursive: true });

// Keep browser caches and temporary profiles in the ignored task directory.
// A short TMPDIR also avoids Chromium's Unix socket path-length limit.
process.chdir(artifacts);
process.env.TMPDIR = ".";
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(artifacts, "browsers");
const { chromium } = await import("playwright");

const server = await preview({ root, server: { host: "127.0.0.1", port: 0 } });
// Astro's static preview reports the configured port, not the bound ephemeral port.
const { port } = server.server.address();
let browser;
try {
  browser = await chromium.launch();
  const page = await browser.newPage();
  await page.emulateMedia({ media: "print" });

  for (const route of ["/resume/", "/zh/resume/"]) {
    const response = await page.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: "networkidle" });
    if (!response?.ok()) throw new Error(`Could not render résumé: ${route}`);
    await page.evaluate(() => document.fonts.ready);
    const pdfHref = await page.locator("[data-resume-pdf]").getAttribute("href");
    if (!pdfHref) throw new Error(`Missing PDF download destination: ${route}`);
    const destination = path.join(root, "dist", pdfHref.slice(1));
    await mkdir(path.dirname(destination), { recursive: true });
    await page.pdf({
      path: destination,
      format: "A4",
      preferCSSPageSize: true,
      printBackground: true,
      tagged: true,
      outline: true,
    });
    console.log(`Generated ${path.relative(root, destination)}`);
  }
} finally {
  await browser?.close();
  await server.stop();
}
