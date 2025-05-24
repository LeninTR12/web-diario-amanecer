import { getSearchPosts } from "./wpApi";
import type { originArticle } from "../types";



export const searchHandler = {
  searchArticles: async (query : string) => {
    const encodedQuery = encodeURI(query) ;
    const allArticles = await getSearchPosts(encodedQuery);
    const articles = allArticles.slice(0, 10);
      
    return articles as originArticle[];
  },
}
