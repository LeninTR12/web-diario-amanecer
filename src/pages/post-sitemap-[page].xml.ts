import type { APIRoute } from "astro";
import type { Article } from "@/lib/types";
import { parseArticles } from "@/lib/utils/objects";
import { getPostsCount, getPostsPerPage } from "@/lib/handlers/wpApi";
import { SITE, SITEMAP } from "@/lib/config";


const PER_WP_PAGE = SITEMAP.perWPPage;
const PER_SITEMAP = SITEMAP.perSitemap; 

export const GET:APIRoute = async ({params}) =>{

    const sitemapPage = params.page ? parseInt(params.page) : 0;
    if(!sitemapPage) return new Response(null, {status: 404});

    const TOTAL_POSTS = await getPostsCount(PER_WP_PAGE);
    const TOTAL_SITEMAPS = Math.ceil(TOTAL_POSTS/PER_SITEMAP);


            if(sitemapPage < 1 || sitemapPage > TOTAL_SITEMAPS) return new Response(null, {status: 404});

            const posts : Article[]= [];
            const sitemaps :String[] = [];

            for(let i=0; i<(PER_SITEMAP/PER_WP_PAGE); i++){          
                const wpPage = (sitemapPage-1)*(PER_SITEMAP/PER_WP_PAGE)+i+1;

                const articles = parseArticles(await getPostsPerPage(wpPage, PER_WP_PAGE))
                if (articles == null) break;
                posts.push(...articles);
            }

            posts.forEach((post,) => { 
            sitemaps.push(
                `<url>
                    <loc>${SITE.url}/${post.category.slug}/${post.slug}</loc>
                    <lastmod>${post.modified + SITE.utc}</lastmod>
                    <image:image>
                        <image:loc>${post.media.original}</image:loc>
                    </image:image>
                </url>`
            );
            });
            
            const content = `<?xml version="1.0" encoding="UTF-8"?>
                <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                    ${sitemaps.join("\n")}
                </urlset>`

            return new Response(content, {
            headers: {
                "Content-Type": "application/xml",
                "Cache-Control": "public, max-age=7200",
                },
            });
            
    
}