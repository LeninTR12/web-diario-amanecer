import { NAVIGATION_LINKS, OTHER_LINKS, SCOPE_LINKS, SITE } from "@/lib/config";
import type { APIRoute } from "astro";

export const GET:APIRoute = async ({request}) =>{

    const sitemaps :String[] = [];

    sitemaps.push(`<url>
            <loc>${SITE.url}</loc>
            </url>`)

    NAVIGATION_LINKS.forEach(link => {
        sitemaps.push(`<url>
            <loc>${SITE.url + link.href}</loc>
            </url>`)
    });

    SCOPE_LINKS.forEach(link => {
        sitemaps.push(`<url>
            <loc>${SITE.url + link.href}</loc>
            </url>`)
    });
    
    OTHER_LINKS.forEach(link => {
        sitemaps.push(`<url>
            <loc>${SITE.url + link.href}</loc>
            </url>`)
    });

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
}

