import type { HTMLString } from "astro/runtime/server/escape.js";

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
};
export type Scope = {
  id:          number;
  count:       number;
  description: string;
  link:        string;
  name:        string;
  slug:        string;
  taxonomy:    string;
  meta:        any[];
  _links:      any;
}
export type Category = Scope & {
  parent?:      number;
}

export type Article = {
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
  title:         {rendered: HTMLString };
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

export type Page = {
  id:             number;
  date:           String;
  date_gmt:       String;
  guid:           any;
  modified:       String;
  modified_gmt:   String;
  slug:           string;
  status:         string;
  type:           string;
  link:           string;
  title:          {rendered:HTMLString};
  content:        {rendered:HTMLString};
  excerpt:        {rendered:HTMLString};
  author:         number;
  featured_media: number;
  parent:         number;
  menu_order:     number;
  comment_status: string;
  ping_status:    string;
  template:       string;
  meta:           any;
  class_list:     string[];
  _links:         any;
  _embedded:      {author: any[],
                  "wp:featuredmedia": any[]
                  };
}

export type cacheResponse = {
  slug: string
  date : number,
  data : Page[] | Article[] | Category | any
}