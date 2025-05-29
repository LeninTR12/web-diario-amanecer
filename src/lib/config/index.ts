import type { Link } from "../types";

export const TIMES_CONF = {
  maxCacheTime : 30, //time at minutes
  maxDistanceDays: (6*24*60*60*1000) //time at milliseconds
}
export const SITEMAP = {
  perWPPage: 100,
  perSitemap:1000,
}
export const SITE = {
  title: "Amanecer",
  description: " Una propuesta de prensa escrita desde el Alto Mayo para toda la región San Martín",
  author: "Diario Amanecer",
  url: "https://amanecer.pe",
  locale: "es-Es",
  timeZone: "America/Lima",
  utc : "-05:00",
  dir: "ltr",
  charset: "UTF-8",
  basePath: "/",
  postsPerPage: 4,
};

export const COMPANY_DATA = {
  name : "Amanecer",
  contact: {
    address : {
      text: "Jr. Andalucía Cdra 3",
      link: "https://maps.app.goo.gl/szQznp94e2VdX1199"
    },
    whatsapp: "51921402321",
    email: "info@amanecer.pe"
  }
}

export const API_PAGES = {
  printEdition: {
    title: "Edición impresa",
    description: "Edición Impresa del Diario Amanecer",
    slug: "edicion-impresa",
  },
  customAds: {
    title: "Publicidad personalizada",
    description: "Publicidad personalizada del Diario Amanecer",
    slug: "publicidad-pesonalizada",
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
    href: `https://wa.me/${COMPANY_DATA.contact.whatsapp}?text=Hola%20Diario%20Amanecer.`,
    text: "Whatsapp",
    icon: "whatsapp",
  },
];
