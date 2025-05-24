import { decode } from "html-entities";
import type { Article, originArticle } from "../types";
import { HTMLToString } from "./letter";
import { categoriesHandler } from "../handlers/categories";
import { scopesHandler } from "../handlers/scopes";

export const parseArticle = (article :originArticle)=>{
    const parseArticle: Article = {
        id : Number(article.id),
        date : article.date,
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
            original: article._embedded["wp:featuredmedia"]?.[0]["source_url"],
            thumbnail: article._embedded["wp:featuredmedia"]?.[0].media_details.sizes.thumbnail.source_url,
            medium: article._embedded["wp:featuredmedia"]?.[0].media_details.sizes.medium.source_url,
            full: article._embedded["wp:featuredmedia"]?.[0].media_details.sizes.full.source_url,
            alt: HTMLToString(decode(String(article.title.rendered))),
        }

    }

    return parseArticle;
}