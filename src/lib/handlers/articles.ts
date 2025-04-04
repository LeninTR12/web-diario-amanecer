import { getPosts, getPostsByCategory } from "./wpApi";
import type { Article } from "../types";
import { categoriesHandler } from "./categories";

export const articlesHandler = {
  allArticles: getPosts,

  mainHeadline: async () => {
    const articles = await getPosts();
    if (!articles)
      throw new Error(
        /*TODO: leer sobre los throw */ "No se han encontrado artículos"
      );
    const article = articles[0];
    return article as Article;
  },

  subHeadlines: async () => {
    const articlesAll = await getPosts();
    const subHeadlines = articlesAll.slice(1, 6);

    if (subHeadlines.length === 0)
      throw new Error("No se han encontrado artículos");

    return subHeadlines as Article[];
  },
  articlesByCategory: async (category: string | number) => {
    const isId = typeof category === "number";

    const categoryId = isId
      ? category
      : await categoriesHandler.oneCategoryBySlug(category).id;
    const articles: Article[] = await getPostsByCategory(categoryId);

    return articles as Article[];
  },
};
