import { Link } from "react-router-dom";

import {
  FOOTER_DESCRIPTIONS,
  LEGAL_NAVIGATION,
  SITE,
  SOCIAL_LINKS,
} from "../../config/site.config.js";
import {
  ANALYTICS_SETTINGS_EVENT,
  hasAnalyticsConfig,
} from "../../config/environment.js";
import { getThemeConfig, normalizeTheme } from "../../config/themes.config.js";
import { trackEvent } from "../../utils/analytics.js";

import "./footer.scss";

const ICON_PATHS = {
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  github: (
    <>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.4 4 5 5 0 0 0 19.3.5S18.2.1 15 1.8a13.4 13.4 0 0 0-6 0C5.8.1 4.7.5 4.7.5A5 5 0 0 0 4.6 4a5.4 5.4 0 0 0-1.4 3.7c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 9 18v4" />
      <path d="M9 18c-4.5 2-5-2-7-2" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="9" width="4" height="12" />
      <path d="M5 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
      <path d="M11 21V9h4v2c1-1.4 2.2-2.3 4-2 2.2.3 2 3 2 5v7h-4v-6c0-1.5-.2-3-2-3s-2 1.7-2 3v6Z" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".75" className="footer__icon-dot" />
    </>
  ),
};

function FooterIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {ICON_PATHS[name]}
    </svg>
  );
}

function SocialLink({ item }) {
  const content = <FooterIcon name={item.icon} />;
  const sharedProps = {
    className: "footer__contact-link",
    "aria-label": item.label,
  };

  if (item.type === "internal") {
    return (
      <Link
        to={item.to}
        onClick={() =>
          trackEvent("contact_click", {
            contact_method: item.icon,
            link_location: "footer",
          })
        }
        {...sharedProps}
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackEvent("contact_click", {
          contact_method: item.icon,
          link_location: "footer",
        })
      }
      {...sharedProps}
    >
      {content}
    </a>
  );
}

export default function Footer({ theme }) {
  const currentTheme = normalizeTheme(theme);
  const currentYear = new Date().getFullYear();
  const { footerLogo } = getThemeConfig(currentTheme);

  return (
    <footer className="footer">
      <div className="footer__container">
        <section className="footer__intro" aria-labelledby="footer-title">
          <h2 id="footer-title" className="footer__title footer__title--brand">
            <Link to="/" className="footer__logo-link" aria-label="Retour à l’accueil">
              <img src={footerLogo} alt={SITE.name} className="footer__logo" />
            </Link>
          </h2>

          <p className="footer__eyebrow">{SITE.tagline}</p>
          <p className="footer__description">
            {FOOTER_DESCRIPTIONS[currentTheme]}
          </p>
        </section>

        <section className="footer__contact" aria-labelledby="footer-contact-title">
          <div className="footer__contact-block">
            <h3 id="footer-contact-title" className="footer__subtitle">
              Contact
            </h3>

            <ul className="footer__icons" aria-label="Réseaux sociaux">
              {SOCIAL_LINKS.map((item) => (
                <li key={item.label}>
                  <SocialLink item={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="footer__bottom" aria-label="Informations légales">
          <nav className="footer__links" aria-label="Liens légaux">
            {LEGAL_NAVIGATION.map(({ label, to }) => (
              <Link key={to} to={to}>
                {label}
              </Link>
            ))}
            {hasAnalyticsConfig && (
              <button
                type="button"
                className="footer__settings-button"
                onClick={() =>
                  window.dispatchEvent(new Event(ANALYTICS_SETTINGS_EVENT))
                }
              >
                Gérer mes cookies
              </button>
            )}
          </nav>

          <p className="footer__rights">
            © {currentYear} {SITE.name} - Tous droits réservés
          </p>
        </section>
      </div>
    </footer>
  );
}
