import { CACHE } from "../config";
import type { Article, CacheResponse, Page } from "../types";
import { getPageBySlug, getPostBySlug, getPosts, getPostsByCategory, getPostsByScope } from "./wpApi";


const cacheTime = CACHE.cacheTime


export function isCahed(cacheResponses:CacheResponse[], slug : string){

    const cacheResponse = cacheResponses.filter((cacheResponse) =>
        cacheResponse.slug == slug )[0];
    
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
      (cacheResponse) => cacheResponse.slug === slug
    );
    
    if( typeData === "oneArticle"  ){
      if(cache.data[0]){
        savecache();
      }
    }else{
      savecache();
    }   
    return  cache;


    function savecache(){
      if (indexCache !== -1) {
          cacheResponses[indexCache] = cache;
      } else {
          cacheResponses.push(cache);
      }
    }   
} 

export function articleIsCached( arrayCacheResponses:CacheResponse[][] , slug :string){
  for(const cacheResponses of arrayCacheResponses){
    for(const cacheResponse of cacheResponses){

       const dateNow = new Date().getTime();
       const diferenceTime = (dateNow - cacheResponse.date) / (1000*60)

        if(diferenceTime < cacheTime) {
          const foundArticle = cacheResponse.data.find((article)  => article.slug === slug);
          if(foundArticle) return foundArticle as Article;
      }       
    };
  };

  return  false;


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
  