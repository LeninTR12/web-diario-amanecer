import { getPosts } from "./wpApi";
import type { Article } from "../types";

export const articlesHandler = {
  allArticles:  getPosts,

  mainHeadline: async  () => {
    const articles = await getPosts();
    if (!articles)
      throw new Error( /*TODO: leer sobre los throw */
        "No se han encontrado artículos"
      );
    const article = articles[0];
    return article;
  },

  subHeadlines: async () => {
    const articlesAll = await getPosts();
    const subHeadlines = articlesAll.slice(1,6);

    if (subHeadlines.length === 0) throw new Error("No se han encontrado artículos");
    
    return subHeadlines;
  },
};
