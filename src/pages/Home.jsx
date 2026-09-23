import { Link } from "react-router-dom";

import RevealOnScroll from "../components/common/RevealOnScroll.jsx";
import ThemeSignature from "../components/home/ThemeSignature.jsx";
import PageSection from "../components/shared/PageSection.jsx";
import { SITE } from "../config/site.config.js";
import { caseStudies, themeCopy } from "../content/portfolio.content.js";
import {
  getThemeCopy,
  getThemedCase,
  getThemedMethod,
} from "../content/theme.content.js";
import { usePageMetadata } from "../hooks/usePageMetadata.js";

import "./portfolio.scss";

const HOME_DESCRIPTION =
  "The Code of SP conçoit, développe et met en ligne des sites et applications web sur mesure pour les entrepreneurs et porteurs de projet.";

function HeroManifesto() {
  return (
    <RevealOnScroll
      as="aside"
      className="portfolio-hero__manifesto"
      variant="card"
      delay={100}
    >
      <span>const projet = &#123;</span>
      <strong>besoin: "compris",</strong>
      <strong>solution: "sur mesure",</strong>
      <strong>code: "évolutif"</strong>
      <span>&#125;;</span>
      <p>Code tes Ambitions !</p>
    </RevealOnScroll>
  );
}

export default function Home({ theme = "accueillant" }) {
  const hero = themeCopy[theme] || themeCopy.accueillant;
  const content = getThemeCopy(theme).home;
  const method = getThemedMethod(theme);

  usePageMetadata(
    "The Code of SP — Sites et applications web sur mesure",
    HOME_DESCRIPTION,
  );

  return (
    <main className="portfolio home-page">
      <section className="portfolio-hero">
        <div className="portfolio-shell portfolio-hero__grid">
          <RevealOnScroll as="div" className="portfolio-hero__content" variant="hero">
            <p className="portfolio-kicker">{hero.eyebrow}</p>
            <h1>{hero.title}</h1>
            <p className="portfolio-lead">{hero.intro}</p>

            <div className="portfolio-actions">
              <Link className="portfolio-button portfolio-button--primary" to="/contact">
                Parler de ton projet
              </Link>
              <Link className="portfolio-button portfolio-button--ghost" to="/services">
                Découvrir mes services
              </Link>
            </div>
          </RevealOnScroll>

          <HeroManifesto />
        </div>
      </section>

      <PageSection variant="contrast">
        <p className="portfolio-kicker">{content.pathsKicker}</p>
        <h2>{content.pathsTitle}</h2>
        <div className="portfolio-grid portfolio-grid--2">
          {content.paths.map(([title, text], index) => (
            <article className="portfolio-card" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection>
        <p className="portfolio-kicker">{content.methodKicker}</p>
        <h2>{content.methodTitle}</h2>
        <ThemeSignature theme={theme} labels={method.map(([title]) => title)} />
        <ol className="portfolio-method portfolio-method--details">
          {method.map(([title, text], index) => (
            <li key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
        <Link className="portfolio-text-link" to="/services">
          {content.methodLink}
        </Link>
      </PageSection>

      <PageSection variant="soft">
        <p className="portfolio-kicker">{content.projectsKicker}</p>
        <h2>{content.projectsTitle}</h2>
        <div className="portfolio-grid portfolio-grid--3">
          {caseStudies.map((project) => {
            const item = getThemedCase(project, theme);

            return (
              <article className="portfolio-project" key={item.slug}>
                <Link
                  className="portfolio-project__media"
                  to={`/realisations/${item.slug}`}
                  aria-label={`Découvrir ${item.title}`}
                >
                  <img src={item.hero} alt="" loading="lazy" />
                </Link>
                <div className="portfolio-project__content">
                  <p>{item.category}</p>
                  <h3>{item.title}</h3>
                  <strong>{item.hook}</strong>
                  <Link to={`/realisations/${item.slug}`}>
                    {content.projectLink}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </PageSection>

      <PageSection containerClassName="portfolio-story">
        <div>
          <p className="portfolio-kicker">{content.storyKicker}</p>
          <h2>{content.storyTitle}</h2>
        </div>
        <div>
          {content.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <a
            className="portfolio-text-link"
            href={SITE.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            {content.storyLink}
          </a>
        </div>
      </PageSection>

      <section className="portfolio-cta">
        <div className="portfolio-shell">
          <p className="portfolio-kicker">{content.ctaKicker}</p>
          <h2>{content.ctaTitle}</h2>
          <p>{content.ctaText}</p>
          <Link className="portfolio-button portfolio-button--primary" to="/contact">
            {content.ctaButton}
          </Link>
        </div>
      </section>
    </main>
  );
}
