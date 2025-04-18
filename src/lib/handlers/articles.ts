
import type { Article, CacheResponse } from "../types";
import { categoriesHandler } from "./categories";
import { scopesHandler } from "./scopes";
import { caching, isCahed } from "./cache";



let cacheAllArticles : CacheResponse [] = [] ;
let cacheByCategory  : CacheResponse[] = [];
let cacheByScope  : CacheResponse[] = [];
let cacheOneArticles  : CacheResponse[] = [];


export const articlesHandler = {
  allArticles: async ()=>{

    const cacheArticles = isCahed(cacheAllArticles, "allArticles" );
    if(cacheArticles) return cacheArticles.data as Article[];

    const newcache = await caching(cacheAllArticles, "allArticles", "allArticles");
    cacheAllArticles =  newcache.cacheResponses;

    return newcache.cache.data as Article[]; 

  },

  mainHeadline: async () => {
      const allArticles : any = await articlesHandler.allArticles();
        const articles = allArticles.slice(0, 3);
          
        return articles as Article[];
      },

  subHeadlines: async () => {
    const allArticles : any = await articlesHandler.allArticles();
        const articles = allArticles.slice(3,6);

        return articles as Article[];
      },

  articlesByCategory: async (category: string | number) => {
    const isId = typeof category === "number";
    const categoryId = isId
      ? category
      : categoriesHandler.oneCategoryBySlug(category).id;

    const cacheArticles = isCahed(cacheByCategory, categoryId.toString() );
    if (cacheArticles) return cacheArticles.data as Article[];

    const newcache = await caching(cacheByCategory, categoryId.toString(), "articlesByCategory");
    cacheByCategory = newcache.cacheResponses;

    return newcache.cache.data as Article[];
  },

  articlesByScope: async (scope : string | number) => {
    const isId = typeof scope === "number";
    const scopeId = isId
      ? scope
      : scopesHandler.oneScopeBySlug(scope).id;

      const cacheArticles = isCahed(cacheByScope, scopeId.toString() );
      if (cacheArticles) return cacheArticles.data as Article[];
  
      const newcache = await caching(cacheByScope, scopeId.toString(), "articlesByScope");
      cacheByScope = newcache.cacheResponses;
  
      return newcache.cache.data as Article[];

  },

  oneArticleBySlug: async (slug : string)=>{

    const cacheArticles = isCahed(cacheOneArticles, slug );

      if (cacheArticles) return cacheArticles.data[0] as Article;
  
      const newcache = await caching(cacheByScope, slug, "oneArticle");
      cacheOneArticles = newcache.cacheResponses;

      return newcache.cache.data[0] as Article;

  }
};


