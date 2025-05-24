
import type { originArticle, CacheResponse } from "../types";
import { categoriesHandler } from "./categories";
import { scopesHandler } from "./scopes";
import { articleIsCached, caching, isCahed } from "./cache";



let cacheAllArticles : CacheResponse [] = [] ;
let cacheByCategory  : CacheResponse[] = [];
let cacheByScope  : CacheResponse[] = [];
let cacheOneArticles  : CacheResponse[] = [];


export const articlesHandler = {
  allArticles: async () => {
    const cacheArticles = isCahed(cacheAllArticles, "allArticles");

    if (cacheArticles) {
      return cacheArticles.data as originArticle[];
    }

    const newCache = await caching(
      cacheAllArticles,
      "allArticles",
      "allArticles"
    );

    return newCache.data as originArticle[];
  },

  mainHeadline: async () => {
    const allArticles: any = await articlesHandler.allArticles();
    const articles = allArticles.slice(0, 3);

    return articles as originArticle[];
  },

  subHeadlines: async () => {
    const allArticles: any = await articlesHandler.allArticles();
    const articles = allArticles.slice(3, 6);

    return articles as originArticle[];
  },

  articlesByCategory: async (category: string | number) => {
    const isId = typeof category === "number";
    const categoryId = isId
      ? category
      : categoriesHandler.oneCategoryBySlug(category).id;

    const cacheArticles = isCahed(cacheByCategory, categoryId.toString());
    if (cacheArticles) return cacheArticles.data as originArticle[];

    const newCache = await caching(
      cacheByCategory,
      categoryId.toString(),
      "articlesByCategory"
    );

    return newCache.data as originArticle[];
  },

  articlesByScope: async (scope: string | number) => {
    const isId = typeof scope === "number";
    const scopeId = isId ? scope : scopesHandler.oneScopeBySlug(scope).id;

    const cacheArticles = isCahed(cacheByScope, scopeId.toString());
    if (cacheArticles) return cacheArticles.data as originArticle[];

    const newCache = await caching(cacheByScope, scopeId.toString(), "articlesByScope" );
    return newCache.data as originArticle[];
  },

  oneArticleBySlug: async (slug: string) => {
    const cacheArticle = articleIsCached([cacheAllArticles, cacheByCategory, cacheByScope, cacheOneArticles], slug);
    if (cacheArticle) return cacheArticle as originArticle;

    const newCache = await caching(cacheOneArticles, slug, "oneArticle");
    return newCache.data[0] as originArticle;
  },
};


