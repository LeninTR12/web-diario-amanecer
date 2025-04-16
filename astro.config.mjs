import { defineConfig } from "astro/config";
import { SITE } from "./src/lib/config";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@astrojs/netlify";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: SITE.url,
  base: SITE.basePath,
  adapter: netlify({
    edgeMiddleware: false,
    useFilesystemSessionCache: false,
  }),
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    responsiveImages: false,
    session: true,
  },
  images: {
    domains:["api2.amanecer.pe"],
  }
});
