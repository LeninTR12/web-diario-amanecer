import type { CacheResponse, Page } from "../types";
import { caching, isCahed } from "./cache";

let cachePages :CacheResponse[] = [];

export const pagesHandler = {
  onePageBySlug: async (slug: string) => {

    const cachePage = isCahed(cachePages, slug);
    if (cachePage) return cachePage.data[0] as Page;

    const newCache = await caching(cachePages, slug, "pages");
    cachePages = newCache.cacheResponses;

    return newCache.cache.data[0] as Page;
  }
};

