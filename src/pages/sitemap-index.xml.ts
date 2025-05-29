import { SITE, SITEMAP } from "@/lib/config";
import { getPostsCount } from "@/lib/handlers/wpApi";
import type { APIRoute } from "astro";

const PER_WP_PAGE = SITEMAP.perWPPage;
const PER_SITEMAP = SITEMAP.perSitemap;

export const GET: APIRoute = async () => {
  try {
    const TOTAL_POSTS = await getPostsCount(PER_WP_PAGE);
    if (!TOTAL_POSTS) return new Response(null, { status: 404 });
    const TOTAL_SITEMAPS = Math.ceil(TOTAL_POSTS / PER_SITEMAP);

    const sitemaps: String[] = [];

    sitemaps.push(
      `<sitemap>
            <loc>${SITE.url}/taxonomy-sitemap.xml</loc>
        </sitemap>`
    );

    for (let i = 1; i <= TOTAL_SITEMAPS; i++) {
      sitemaps.push(
        `<sitemap>
                    <loc>${SITE.url}/post-sitemap-${i}.xml</loc>
                </sitemap>`
      );
    }

    const content = `<?xml version="1.0" encoding="UTF-8"?>
                <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                    ${sitemaps.join("\n")}
                </sitemapindex>
                    `;

    return new Response(content, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=7200",
      },
    });
  } catch (e) {
    return new Response(null, { status: 404 });
  }
};
