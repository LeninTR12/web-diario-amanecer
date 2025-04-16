
import { getPostBySlug, getPosts, getPostsByCategory, getPostsByScope } from "./wpApi";
import type { Article } from "../types";
import { categoriesHandler } from "./categories";
import { scopesHandler } from "./scopes";
import { get } from "http";

let cacheResponse ;
let cacheResponseMain = {
  date : new Date().getTime(),  
  data: await getPosts()
};

export const articlesHandler = {
  allArticles: ()=>{
     cacheResponse = {
      date : new Date().getTime(),  
      data: getPosts()
    };

    const dateNow = new Date().getTime();
    const diferenceTime = (dateNow - cacheResponse.date) / (1000*60);
    if (diferenceTime < 30 ){
      console.log("cacheResponseALL");
      return cacheResponse.data;
    }else{
      return getPosts();
    }

  },

  mainHeadline: async () => {
    const dateNow = new Date().getTime();
    cacheResponseMain.date = new Date().getTime();
    const diferenceTime = (dateNow - cacheResponseMain.date) / (1000*60);
    if (diferenceTime < 30 ){
      console.log("cacheResponseMain");
      return cacheResponseMain.data;
    }else{
      const allArticles = await getPosts();
    const articles = allArticles.slice(0, 3);
    cacheResponseMain = {
      date : new Date().getTime(),  
      data: articles
    };

      return articles;
    }
    
    

    
    if (articles.length === 0)
      throw new Error(
        /*TODO: leer sobre los throw */ "No se han encontrado artículos"
      );
      
    return articles as Article[];
  },

  subHeadlines: async () => {
    const articlesAll = await getPosts();
    const subHeadlines = articlesAll.slice(3, 6);

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
