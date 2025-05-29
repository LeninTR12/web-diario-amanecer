import type { APIRoute } from "astro";

export const GET:APIRoute = async ({params}) =>{

    const page = params.page;

    const content = `<?xml version="1.0" encoding="UTF-8"?> <sitemap>${page}</sitemap>`;

    return new Response(content,{
        headers:{
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=7200",

        }
    });
}