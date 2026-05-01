import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://jiashenggu.github.io",
  output: "static",
  trailingSlash: "never",
  integrations: [sitemap()],
});
