import type { Link } from "../types";

export const SITE = {
  title: "Amanecer",
  description: "A news website built with Astro",
  author: "Mohammad Rahmani",
  url: "https://astro-news-six.vercel.app",
  github: "https://github.com/Mrahmani71/astro-news",
  locale: "es-Es",
  dir: "ltr",
  charset: "UTF-8",
  basePath: "/",
  postsPerPage: 4,
};

export const NAVIGATION_LINKS: Link[] = [
  {
    href: "/categorias/politica",
    text: "Política",
  },
  {
    href: "/categorias/social",
    text: "Social",
  },
  {
    href: "/categorias/policial",
    text: "Policial",
  },
  {
    href: "/categorias/espectaculo",
    text: "Espectáculo",
  },
  {
    href: "/categorias/ambiental",
    text: "Ambiental",
  },
  {
    href: "/categorias/cultural",
    text: "Cultural",
  },
  {
    href: "/categorias/institucional",
    text: "Institucional",
  },
];

export const OTHER_LINKS: Link[] = [
  {
    href: "/about",
    text: "About us",
  },
  {
    href: "/authors",
    text: "Authors",
  },
  {
    href: "/contact",
    text: "Contact",
  },
  {
    href: "/privacy",
    text: "Privacy",
  },
  {
    href: "/terms",
    text: "Terms",
  },
  {
    href: "/cookie-policy",
    text: "Cookie Policy",
  },
  {
    href: "https://astro-news-six.vercel.app/rss.xml",
    text: "RSS",
  },
  {
    href: "https://astro-news-six.vercel.app/sitemap-index.xml",
    text: "Sitemap",
  },
];

export const SOCIAL_LINKS: Link[] = [
  {
    href: "https://www.facebook.com/amanecersanmartin/",
    text: "Facebook",
    icon: "facebook",
  },
  {
    href: "https://www.instagram.com/diarioamanecersanmartin/",
    text: "Instagram",
    icon: "instagram",
  },
  {
    href: "https://www.youtube.com/@diarioamanecer1732",
    text: "Youtube",
    icon: "youtube",
  },
  {
    href: "https://www.tiktok.com/@diarioamanecersm",
    text: "Tiktok",
    icon: "tiktok",
  },
];
