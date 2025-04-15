import { defineConfig } from "astro/config";
import { SITE } from "./src/lib/config";
import pagefind from "astro-pagefind";
import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: SITE.url,
  base: SITE.basePath,
  integrations: [sitemap(), pagefind()],
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    responsiveImages: true,
  },
});
