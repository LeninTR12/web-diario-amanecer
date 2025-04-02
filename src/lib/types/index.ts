import type { HTMLString } from "astro/runtime/server/escape.js";
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
  id:          number;
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

export interface Article {
  id:             string;
  date:           string;
  date_gmt:       string;
  guid:           any;
  modified:       string;
  modified_gmt:   string;
  slug:           string;
  status:         string;
  type:           string;
  link:           string;
  title:         {rendered: string };
  content:        {rendered:HTMLString};
  excerpt:        {rendered:HTMLString};
  author:         string;
  featured_media: number;
  comment_status: string;
  ping_status:    string;
  sticky:         boolean;
  template:       string;
  format:         string;
  meta:           Meta;
  categories:     number[];
  tags:           any[];
  ambito:         number[];
  class_list:     string[];
  _links:         any;
  _embedded:      any;
}
export type Entry = CollectionEntry<"articles" | "views">;
