import { string } from "astro:schema";
import { getSearchPosts } from "./wpApi";
import { encode } from "html-entities";
import type { Article } from "../types";
import { serialize } from "v8";


export const searchHandler = {
  searchArticles: async (query : string) => {
    const encodedQuery = encodeURI(query) ;
    const allArticles = await getSearchPosts(encodedQuery);
    const articles = allArticles.slice(0, 10);
      
    return articles as Article[];
  },
}
