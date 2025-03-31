import type { CollectionEntry } from "astro:content";

export type Icon = {
  size?: string;
  width?: string;
  height?: string;
  color?: string;
  strokeWidth?: string;
};

export type Link = {
  href: string;
  text: string;
  icon?: string;
  target?: "_blank" | "_self";
};

type Author = {
  name: string;
  link: string;
};

export type Meta = {
  title: string;
  metaTitle: string;
  description: string;
  type: "article" | "website";
  ogImage: string;
  ogImageAlt: string;
};

export type ArticleMeta = Meta & {
  publishedTime: string;
  lastModified: string;
  authors: Author[];
};
export interface Category {
  id:          string;
  count:       number;
  description: string;
  link:        string;
  name:        string;
  slug:        string;
  taxonomy:    string;
  parent:      number;
  meta:        any[];
  _links:      Link[];
}
export type Entry = CollectionEntry<"articles" | "views">;
