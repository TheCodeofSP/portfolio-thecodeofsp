export const SITE = Object.freeze({
  name: "The Code of SP",
  owner: "Sandrine Pham",
  domain: "https://thecodeofsp.fr",
  description:
    "Conception, développement et mise en ligne de sites et applications web sur mesure pour les entrepreneurs et porteurs de projet.",
  socialImage: "/og-image.png",
  email: "contact@thecodeofsp.fr",
  github: "https://github.com/TheCodeOfSP",
  instagram: "https://www.instagram.com/thecodeofsp/",
  linkedin: "https://www.linkedin.com/in/sandrinepham69132b145",
  tagline: "Conception · Développement · Mise en ligne",
  formEndpoint: "https://formspree.io/f/xqeyldol",
});

export const MAIN_NAVIGATION = Object.freeze([
  { to: "/", label: "Accueil" },
  { to: "/services", label: "Services & méthode" },
  { to: "/realisations", label: "Réalisations" },
  { to: "/contact", label: "Démarrer un projet" },
]);

export const LEGAL_NAVIGATION = Object.freeze([
  { to: "/legal", label: "Mentions légales" },
  {
    to: "/privacy",
    label: "Confidentialité",
    siteMapLabel: "Politique de confidentialité",
  },
  { to: "/sitemap", label: "Plan du site" },
]);

export const SOCIAL_LINKS = Object.freeze([
  {
    type: "internal",
    to: "/contact",
    label: "Envoyer un email à The Code of SP",
    icon: "mail",
  },
  {
    type: "external",
    href: SITE.github,
    label: "Profil GitHub de The Code of SP",
    icon: "github",
  },
  {
    type: "external",
    href: SITE.linkedin,
    label: "Profil LinkedIn de Sandrine Pham",
    icon: "linkedin",
  },
  {
    type: "external",
    href: SITE.instagram,
    label: "Profil Instagram de The Code of SP",
    icon: "instagram",
  },
]);

export const FOOTER_DESCRIPTIONS = Object.freeze({
  accueillant:
    "Je conçois, développe et mets en ligne une solution fidèle à ton projet, puis je te transmets des repères simples pour la faire vivre sereinement.",
  affirme:
    "Je transforme ton ambition en une solution numérique conçue, développée, déployée et prête à être prise en main.",
  minimaliste:
    "Solutions numériques sur mesure : conception, développement, mise en ligne et prise en main.",
});

export const LEGACY_ROUTES = Object.freeze([
  { from: "/accompagnement", to: "/services" },
  { from: "/websiteCreations", to: "/services" },
  { from: "/projects", to: "/realisations" },
]);
