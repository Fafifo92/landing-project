export interface CardTheme {
  textColor: string;
  backgroundClass: string;
  accentColor: string;
  borderColor: string;
  subtleColor: string;
  decorativeLineColor: string;
  numberColor: string;
  backgroundColor: string;
  backgroundImage?: string;
  gradient?: string;
  titleColor: string;
  titleFontSize: string;
  titleFontWeight: string;
  titleFontFamily?: string;
  descriptionColor: string;
  descriptionFontSize: string;
  descriptionFontFamily?: string;
  sectionTitleColor: string;
  sectionTitleFontSize: string;
  sectionTitleFontWeight: string;
  sectionTitleFontFamily?: string;
  keyPointColor: string;
  keyPointFontSize: string;
  keyPointFontFamily?: string;
  numberBackgroundColor: string;
  numberTextColor: string;
  numberFontWeight: string;
  numberFontFamily?: string;
  decorativeLineWidth: string;
  decorativeLineHeight: string;
  fontFamily?: string;
  linkColor: string;
}

export interface SlideTheme {
  background: string;
  type: "solid" | "gradient";
  titleFont: string;
  titleWeight: number | "normal" | "bold";
  titleTransform: "uppercase" | "none" | "capitalize" | "lowercase";
  textFont: string;
  titleColor: string;
  textColor: string;
  overlayColor: string;
}

export const SITE_TITLE = "RISE";
export const SITE_DESCRIPTION = "RISE — Take your business to the next level.";

export const PROD_URL = "https://www.fafifo92.com";

export const isProdEnv = () => {
  if (import.meta.env?.PROD || import.meta.env?.MODE === "production") {
    return true;
  }

  if (typeof window !== "undefined") {
    return window.location.origin === PROD_URL;
  }

  return false;
};

export const isProd = isProdEnv();

export const ASSETS_IMAGES_PREFIX = "/src/assets/images";

export const MERMAID_LIVE_BASE_URL = "https://mermaid.live";

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  showWhenLoggedOut?: boolean;
  showWhenLoggedIn?: boolean;
  title?: string;
  description?: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "blogs",
    label: "Casos de éxito",
    href: "/blogs",
    title: "Casos de éxito",
    description:
      "Casos de éxito de nuestros clientes que han decidido trabajar con nosotros.",
  },
  {
    id: "cards",
    label: "Retos",
    href: "/cards",
    title: "Retos superados",
    description: "Restos a los cuales nos hemos enfrentado y superado.",
  },
  {
    id: "slides",
    label: "Branding",
    href: "/slides",
    title: "Branding",
    description: "Mira de cerca los manuales de marcas que hemos creado.",
  },
  {
    id: "open-source",
    label: "GitHub",
    href: "https://github.com/fafifo92",
    title: "GitHub",
    description: "Explora nuestros proyectos.",
  },
];

export const getNavigationItems = (): MenuItem[] => {
  return MENU_ITEMS;
};

export const DOODLE_EMOJIS = [
  "✨",
  "🚀",
  "💡",
  "🎉",
  "🔥",
  "🌟",
  "🤖",
  "🎃",
  "🔊",
  "📡",
];
