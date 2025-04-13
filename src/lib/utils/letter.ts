import type { HTMLString } from "astro/runtime/server/escape.js";

export const capitalizeFirstLetter =(val:string) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

