import { decode } from "html-entities";
import type { Article, originArticle } from "../types";
import { HTMLToString } from "./letter";
import { categoriesHandler } from "../handlers/categories";
import { scopesHandler } from "../handlers/scopes";

export function parseArticle(article :originArticle){
    if(!article) return null;
    return  {
        id : Number(article.id),
        date : article.date,
        modified : article.modified,
        slug : article.slug,
        title : HTMLToString(decode(String(article.title.rendered))),
        content : article.content.rendered,
        excerpt : {
            text : HTMLToString(decode(String(article.excerpt.rendered))),
            rendered : article.excerpt.rendered,
        },
        category: categoriesHandler.oneCategory(article.categories[0]),
        ambito: scopesHandler.oneScope(article.ambito[0]),
        media: {
            original: article._embedded["wp:featuredmedia"]?.[0]?.["source_url"] || null,
            thumbnail: article._embedded["wp:featuredmedia"]?.[0]?.media_details.sizes?.thumbnail?.source_url || null,
            medium: article._embedded["wp:featuredmedia"]?.[0]?.media_details.sizes?.medium?.source_url || null,
            full: article._embedded["wp:featuredmedia"]?.[0]?.media_details.sizes?.full?.source_url || null,
            alt: HTMLToString(decode(String(article.title.rendered))),
        }

    } as Article;
}

export function parseArticles(articles:originArticle[]){
    if(!articles) return null;
    return articles.map(article => parseArticle(article)) as Article[];
}