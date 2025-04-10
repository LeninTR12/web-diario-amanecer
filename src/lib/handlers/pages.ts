
import type { Page } from "../types";
import { getPageBySlug } from "./wpApi";

export const pagesHandler ={
    onePageBySlug: async (slug : string)=>{
        const page = await getPageBySlug(slug);

        return page as Page;
    }
}