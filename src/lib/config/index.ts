import type { Link } from "../types";

export const CACHE = {
  cacheTime : 30 //time at minutes
}

export const SITE = {
  title: "Amanecer",
  description: " Una propuesta de prensa escrita desde el Alto Mayo para toda la región San Martín",
  author: "Diario Amanecer",
  url: "https://amanecer.pe",
  locale: "es-Es",
  dir: "ltr",
  charset: "UTF-8",
  basePath: "/",
  postsPerPage: 4,
};

export const API_PAGES = {
  printEdition: {
    title: "Edición Impresa",
    description: "Edición Impresa del Diario Amanecer",
    slug: "edicion-impresa",
  },
  customAds: {
    title: "Publicidad Personalizada",
    description: "Publicidad Personalizada del Diario Amanecer",
    slug: "pulicidad-pesonalizada",
  },
};

export const NAVIGATION_LINKS: Link[] = [
  {
    href: "/politica",
    text: "Política",
  },
  {
    href: "/social",
    text: "Social",
  },
  {
    href: "/policial",
    text: "Policial",
  },
  {
    href: "/espectaculo",
    text: "Espectáculo",
  },
  {
    href: "/ambiental",
    text: "Ambiental",
  },
  {
    href: "/cultural",
    text: "Cultural",
  },
  {
    href: "/institucional",
    text: "Institucional",
  },
];

export const SCOPE_LINKS: Link[] = [
  {
    href:"/local",
    text: "Local",
  },
  {
    href:"/regional",
    text: "Regional",
  },
  {
    href:"/nacional",
    text: "Nacional",
  },
];

export const OTHER_LINKS: Link[] = [
  {
    href: "/contacto",
    text: "Contacto",
  }
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
    href: "https://www.tiktok.com/@diarioamanecersm",
    text: "Tiktok",
    icon: "tiktok",
  },
  {
    href: "https://www.youtube.com/@diarioamanecer1732",
    text: "Youtube",
    icon: "youtube",
  },
  {
    href: "https://wa.me/51921402321?text=Hola%20Diario%20Amanecer.",
    text: "Whatsapp",
    icon: "whatsapp",
  },
];
