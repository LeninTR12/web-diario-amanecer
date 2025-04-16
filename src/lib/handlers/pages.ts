import { CACHE } from "../config";
import type { cacheResponse, Page } from "../types";
import { getPageBySlug } from "./wpApi";

let cacheResponsesPage: cacheResponse[] = [];

export const pagesHandler = {
  onePageBySlug: async (slug: string) => {
    const cachePage = cacheResponsesPage.filter((cachePage) =>
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
    const indexCache = cacheResponsesPage.findIndex(
      (cachePage) => cachePage.slug === slug
    );

    if (indexCache !== -1) {
      cacheResponsesPage[indexCache] = newCacheData;
    } else {
      cacheResponsesPage.push(newCacheData);
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
  };
}
