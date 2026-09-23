export const DEFAULT_THEME = "accueillant";
export const THEME_STORAGE_KEY = "theme";

export const THEMES = Object.freeze({
  accueillant: {
    id: "accueillant",
    label: "Accueillant",
    icon: "/images/logo/SPAccueillant.svg",
    headerLogo: "/images/logo/LogoBrown.svg",
    footerLogo: "/images/logo/LogoWhite.svg",
  },
  affirme: {
    id: "affirme",
    label: "Affirmé",
    icon: "/images/logo/SPAffirme.svg",
    headerLogo: "/images/logo/LogoAffirme.svg",
    footerLogo: "/images/logo/LogoAffirme.svg",
  },
  minimaliste: {
    id: "minimaliste",
    label: "Minimaliste",
    icon: "/images/logo/SPMinimaliste.svg",
    headerLogo: "/images/logo/LogoBlack.svg",
    footerLogo: "/images/logo/LogoWhite.svg",
  },
});

export const THEME_IDS = Object.freeze(Object.keys(THEMES));

const LEGACY_THEME_ALIASES = Object.freeze({
  energique: "affirme",
});

export function normalizeTheme(theme) {
  const normalizedTheme = LEGACY_THEME_ALIASES[theme] || theme;
  return THEME_IDS.includes(normalizedTheme) ? normalizedTheme : DEFAULT_THEME;
}

export function getThemeConfig(theme) {
  return THEMES[normalizeTheme(theme)];
}

export function isTheme(theme) {
  return THEME_IDS.includes(theme);
}
