import { CACHE } from "../config";
import type { CacheResponse, Page } from "../types";
import { getPageBySlug } from "./wpApi";

let cachePages :CacheResponse[] = [];

export const pagesHandler = {
  onePageBySlug: async (slug: string) => {
    const cachePage = cachePages.filter((cachePage) =>
      cachePage.slug.includes(slug)
    );

    if (cachePage.length > 0) {
      const dateNow = new Date().getTime();
      const diferenceTime = (dateNow - cachePage[0].date) / (1000 * 60);

      if (diferenceTime < CACHE.cacheTime) {
        return cachePage[0].data[0] as Page;
      }
    }
    const newCacheData = await getOnePageBySlug(slug);
    const indexCache = cachePages.findIndex(
      (cachePage) => cachePage.slug === slug
    );

    if (indexCache !== -1) {
      cachePages[indexCache] = newCacheData;
    } else {
      cachePages.push(newCacheData);
    }

    return newCacheData.data[0] as Page;
  },
};

async function getOnePageBySlug(slug: string) {
  const data = await getPageBySlug(slug);
  const date = new Date().getTime();

  return {
    slug: slug,
    date: date,
    data: data,
  } as CacheResponse;
}
