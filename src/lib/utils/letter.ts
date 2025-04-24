import type { HTMLString } from "astro/runtime/server/escape.js";
import { decode } from "html-entities";

export const capitalizeFirstLetter =(val:string) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export const cleanArticleExcerp = (text: string | HTMLString)=>{   
    const regEx = /\<\/?p\b[^>]*\>/g; 
    const cleanText = decode(String(text)).replace(regEx,"").replace("[…]", "");
    
    return cleanText
}
