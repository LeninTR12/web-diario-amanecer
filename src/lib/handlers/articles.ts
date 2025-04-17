
import { getPostBySlug, getPosts, getPostsByCategory, getPostsByScope } from "./wpApi";
import type { Article, CacheResponse } from "../types";
import { categoriesHandler } from "./categories";
import { scopesHandler } from "./scopes";
import { CACHE } from "../config";



let cacheAllArticles : CacheResponse = {slug:"", date:0, data:null } ;
let cacheArticlesByCategorie  : CacheResponse[] = [];
let cacheArticlesByScope  : CacheResponse[] = [];
let cacheArticles  : CacheResponse[] = [];


export const articlesHandler = {
  allArticles: async ()=>{

    if(cacheAllArticles.data !== 0 ){
      const dateNow = new Date().getTime();
      const diferenceTime = (dateNow - cacheAllArticles.date) / (1000 * 60);
      if (diferenceTime < CACHE.cacheTime) {
              return cacheAllArticles.data as Article;
            }
    }
    const newCacheData = await getAllArticles();
    cacheAllArticles = newCacheData;

    return newCacheData.data as Article;
  },

  mainHeadline: async () => {
      const allArticles : any = await articlesHandler.allArticles();
        const articles = allArticles.slice(0, 3);
        if (articles.length === 0)
          throw new Error(
            /*TODO: leer sobre los throw */ "No se han encontrado artículos"
          );
          
        return articles as Article[];
      },

  subHeadlines: async () => {
    const allArticles : any = await articlesHandler.allArticles();
        const articles = allArticles.slice(3,6);
        if (articles.length === 0)
          throw new Error(
            /*TODO: leer sobre los throw */ "No se han encontrado artículos"
          );
          
        return articles as Article[];
      },

  articlesByCategory: async (category: string | number) => {
    const isId = typeof category === "number";

    const categoryId = isId
      ? category
      : await categoriesHandler.oneCategoryBySlug(category).id;

    const articles: Article[] = await getPostsByCategory(categoryId);
    return articles as Article[];
  },

  articlesByScope: async (scope : string | number) => {
    const isId = typeof scope === "number";

    const scopeId = isId
      ? scope
      : await scopesHandler.oneScopeSlug(scope).id;
      
    const articles: Article[] = await getPostsByScope(scopeId); 

    return articles as Article[];
  },

  oneArticleBySlug: async (slug : string)=>{
    const article = await getPostBySlug(slug);
    return article as Article;
  }
};


async function getAllArticles() {
  const data = await getPosts();
  const date = new Date().getTime();

  return {
    slug: "all-articles",
    date: date,
    data: data,
  } as CacheResponse ;
}







// import { getPostBySlug, getPosts, getPostsByCategory, getPostsByScope } from "./wpApi";
// import type { Article } from "../types";
// import { categoriesHandler } from "./categories";
// import { scopesHandler } from "./scopes";

// export const articlesHandler = {
//   allArticles: getPosts,

//   mainHeadline: async () => {
//     const allArticles = await getPosts();
//     const articles = allArticles.slice(0, 3);
//     if (articles.length === 0)
//       throw new Error(
//         /*TODO: leer sobre los throw */ "No se han encontrado artículos"
//       );
      
//     return articles as Article[];
//   },

//   subHeadlines: async () => {
//     const articlesAll = await getPosts();
//     const subHeadlines = articlesAll.slice(3, 6);

//     if (subHeadlines.length === 0)
//       throw new Error("No se han encontrado artículos");

//     return subHeadlines as Article[];
//   },

//   articlesByCategory: async (category: string | number) => {
//     const isId = typeof category === "number";

//     const categoryId = isId
//       ? category
//       : await categoriesHandler.oneCategoryBySlug(category).id;

//     const articles: Article[] = await getPostsByCategory(categoryId);
//     return articles as Article[];
//   },

//   articlesByScope: async (scope : string | number) => {
//     const isId = typeof scope === "number";

//     const scopeId = isId
//       ? scope
//       : await scopesHandler.oneScopeSlug(scope).id;
      
//     const articles: Article[] = await getPostsByScope(scopeId); 

//     return articles as Article[];
//   },

//   oneArticleBySlug: async (slug : string)=>{
//     const article = await getPostBySlug(slug);
//     return article as Article;
//   }
// };
