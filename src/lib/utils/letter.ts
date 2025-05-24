import type { HTMLString } from "astro/runtime/server/escape.js";
import { decode } from "html-entities";

export const HTMLToString = (text: string | HTMLString)=>{   
    const regEx = /<\/?[^>]+>/g;
    const cleanText = decode(String(text)).replace(regEx,"").replace("[…]", "");
    
    return cleanText
}
