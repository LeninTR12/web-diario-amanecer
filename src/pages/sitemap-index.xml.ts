import { SITE } from "@/lib/config";
import { getPostsCount, getPostsPerPage } from "@/lib/handlers/wpApi";
import type { Article } from "@/lib/types";
import { parseArticles } from "@/lib/utils/objects";
import type { APIRoute } from "astro";

const PER_PAGE = 100;
const PER_SITEMAP = 1000;   


export const GET:APIRoute = async ({request}) =>{
    try{
        const TOTAL_POSTS = await getPostsCount(PER_PAGE);
        if(!TOTAL_POSTS) return new Response(null, {status: 404});
        const TOTAL_SITEMAPS = TOTAL_POSTS/PER_SITEMAP;

        const url =  new URL(request.url);
        let query = url.searchParams.get("page");

        if(query === null || query === undefined){
            const sitemaps :String[] = [];

            sitemaps.push(
                `<sitemap>
                    <loc>${SITE.url}/sitemap-taxonomies.xml</loc>
                </sitemap>`
            );

            for(let i=1; i<=(TOTAL_POSTS/PER_SITEMAP);i++){
                sitemaps.push(
                `<sitemap>
                    <loc>${SITE.url}/sitemap-${i}.xml</loc>
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

        }else if(!isNaN(query as any)){
            const sitemap = parseInt(query);
            if(sitemap < 1 || sitemap > TOTAL_SITEMAPS) return new Response(null, {status: 404});

            const posts : Article[]= [];
            const sitemaps :String[] = [];

            for(let i=0; i<(PER_SITEMAP/PER_PAGE); i++){                
                posts.push(...parseArticles(await getPostsPerPage((sitemap*10)+i, PER_PAGE)));
            }

            posts.forEach((post,) => {
            sitemaps.push(
                `<url>
                    <loc>${SITE.url}/${post.category.slug}/${post.slug}</loc>
                    <image:image>
                        <image:loc>${post.media.original}</image:loc>
                    </image:image>
                </url>`
            );
            });
            
            let content = `<?xml version="1.0" encoding="UTF-8"?>
                <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                    ${sitemaps.join("\n")}
                </urlset>`

            return new Response(content, {
            headers: {
                "Content-Type": "application/xml",
                "Cache-Control": "public, max-age=7200",
                },
            });
            
        }else{
            return new Response(null, {status: 404});
        }

    }catch(e){
        return new Response(null, {status: 404});
    }
}

