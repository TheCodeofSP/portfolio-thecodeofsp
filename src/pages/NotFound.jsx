import { Link } from "react-router-dom";

import {
  LEGAL_NAVIGATION,
  MAIN_NAVIGATION,
} from "../config/site.config.js";
import { usePageMetadata } from "../hooks/usePageMetadata.js";

import "./notFound.scss";

const PAGE_METADATA = {
  title: "404 | Page introuvable | The Code of SP",
  description:
    "La page demandée est introuvable. Retournez à l'accueil, découvrez les projets ou contactez TheCodeOfSP.",
  robots: "noindex, follow",
};

const SUGGESTED_LINKS = [...MAIN_NAVIGATION, ...LEGAL_NAVIGATION].filter(
  ({ to }) => to !== "/",
);

export default function NotFound({ theme }) {
  usePageMetadata(PAGE_METADATA);

  return (
    <main className={`not-found theme-${theme}`}>
      <section className="not-found__container">
        <p className="not-found__eyebrow">Erreur 404</p>
        <div className="not-found__badge" aria-hidden="true">
          404
        </div>
        <h1 className="page-title not-found__title">Page introuvable</h1>
        <p className="not-found__subtitle">
          Oups. Cette page n’existe pas ou n’est plus disponible.
        </p>
        <p className="not-found__text">
          Tu peux revenir à l’accueil, consulter mes projets ou me contacter
          directement si tu cherchais une information précise.
        </p>

        <div className="not-found__actions">
          <Link to="/" className="not-found__button">
            Retour à l’accueil
          </Link>
          <Link
            to="/realisations"
            className="not-found__button not-found__button--ghost"
          >
            Voir les projets
          </Link>
          <Link
            to="/contact"
            className="not-found__button not-found__button--ghost"
          >
            Me contacter
          </Link>
        </div>

        <div className="not-found__card">
          <h2>Tu cherchais peut-être :</h2>
          <ul>
            {SUGGESTED_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
