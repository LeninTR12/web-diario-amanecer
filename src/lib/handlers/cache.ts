import { CACHE } from "../config";
import type { Article, CacheResponse, Page } from "../types";
import { getPageBySlug, getPostBySlug, getPosts, getPostsByCategory, getPostsByScope } from "./wpApi";


const cacheTime = CACHE.cacheTime


export function isCahed(cacheResponses:CacheResponse[], slug : string){

    const cacheResponse = cacheResponses.filter((cacheResponse) =>
        cacheResponse.slug.includes(slug))[0];
    
        if (cacheResponse) {
          const dateNow = new Date().getTime();
          const diferenceTime = (dateNow - cacheResponse.date) / (1000 * 60);
    
          if (diferenceTime < cacheTime) {
            return cacheResponse;
          }
        }
        return false;
} 

export async function caching(cacheResponses:CacheResponse[], slug: string, typeData: "pages" | "allArticles" |"articlesByCategory"|"articlesByScope"|  "oneArticle" ){

    const cache = await getCache(slug, typeData);
    const indexCache = cacheResponses.findIndex(
      (cacheResponse) => cacheResponse.slug.includes(slug)
    );

    if (indexCache !== -1) {
        cacheResponses[indexCache] = cache;
    } else {
        cacheResponses.push(cache);
    }

    return {cacheResponses, cache};


} 


async function getCache(slug: string, type:string) {

    const date = new Date().getTime();
    let data : Article[] | Page[] = [];

    switch (type){
        case "pages":
             data = await getPageBySlug(slug);
             break

        case "allArticles" :
            data = await getPosts();
            break

        case "articlesByCategory":
            data = await getPostsByCategory(Number(slug));
            break

        case "articlesByScope":
            data = await getPostsByScope(Number(slug));
            break

        case   "oneArticle":
            data.push( await getPostBySlug(slug));
            break

    }
  
    return {
      slug: slug,
      date: date,
      data: data,
    } as CacheResponse;
  }
  