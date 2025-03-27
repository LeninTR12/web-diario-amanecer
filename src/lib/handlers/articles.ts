import { getPosts } from "./wpApi";

const articlesCollection = await getPosts();

export const articlesHandler = {
  allArticles: () => articlesCollection,

  mainHeadline: () => {
    const article = articlesCollection[0];
    if (!article)
      throw new Error( /*TODO: leer sobre los throw */
        "No se ha encontrado artículos"
      );
    return article;
  },

  subHeadlines: () => {
    const subHeadlines = articlesCollection.slice(1,6);

    if (subHeadlines.length === 0) throw new Error("No se ha encontrado artículos");
    
    return subHeadlines;
  },
};
