import { Link } from "react-router-dom";
import RevealOnScroll from "../components/common/RevealOnScroll.jsx";
import {
  LEGAL_NAVIGATION,
  MAIN_NAVIGATION,
} from "../config/site.config.js";
import { usePageMetadata } from "../hooks/usePageMetadata.js";
import "./informationPages.scss";

const SiteMap = ({ theme }) => {
  usePageMetadata(
    "Plan du site | The Code of SP",
    "Plan du site The Code of SP : accueil, services, réalisations, contact, mentions légales et confidentialité.",
  );

  return (
    <main className={`site-map theme-${theme}`}>
      <section className="site-map__container">
        <RevealOnScroll
          as="header"
          className="site-map__header"
          variant="hero"
          delay={0}
        >
          <h1 className="page-title">Plan du site</h1>
        </RevealOnScroll>

        <RevealOnScroll variant="section" delay={80}>
          <article className="site-map__block">
            <h2>Pages principales</h2>
            <ul>
              {MAIN_NAVIGATION.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </article>
        </RevealOnScroll>

        <RevealOnScroll variant="section" delay={120}>
          <article className="site-map__block">
            <h2>Pages légales</h2>
            <ul>
              {LEGAL_NAVIGATION.map(({ label, siteMapLabel, to }) => (
                <li key={to}>
                  <Link to={to}>{siteMapLabel || label}</Link>
                </li>
              ))}
            </ul>
          </article>
        </RevealOnScroll>
      </section>
    </main>
  );
};

export default SiteMap;
