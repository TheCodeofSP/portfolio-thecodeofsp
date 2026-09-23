import { Link } from "react-router-dom";

import PageHero from "../components/shared/PageHero.jsx";
import PageSection from "../components/shared/PageSection.jsx";
import { caseStudies } from "../content/portfolio.content.js";
import { getThemeCopy, getThemedCase } from "../content/theme.content.js";
import { usePageMetadata } from "../hooks/usePageMetadata.js";

import "./portfolio.scss";

export default function Projects({ theme = "accueillant" }) {
  const content = getThemeCopy(theme).projects;

  usePageMetadata(
    "Réalisations — The Code of SP",
    "Découvrez les sites, applications et produits numériques conçus et développés par The Code of SP.",
  );

  return (
    <main className="portfolio">
      <PageHero
        kicker={content.kicker}
        title={content.title}
        intro={content.intro}
      />

      <PageSection>
        <div className="portfolio-cases">
          {caseStudies.map((project, index) => {
            const item = getThemedCase(project, theme);

            return (
              <article className="portfolio-case" key={item.slug}>
                <div className="portfolio-case__number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="portfolio-case__content">
                  <p className="portfolio-kicker">{item.category}</p>
                  <h2>{item.title}</h2>
                  <strong>{item.hook}</strong>
                  <p>{item.summary}</p>
                  <div className="portfolio-actions">
                    <Link
                      className="portfolio-button portfolio-button--ghost"
                      to={`/realisations/${item.slug}`}
                    >
                      {content.studyButton}
                    </Link>
                    {item.liveUrl && (
                      <a
                        className="portfolio-button portfolio-button--primary"
                        href={item.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {content.liveButton}
                      </a>
                    )}
                  </div>
                </div>

                <Link
                  className="portfolio-case__media"
                  to={`/realisations/${item.slug}`}
                  aria-label={`${content.studyButton} : ${item.title}`}
                >
                  <img src={item.hero} alt={item.heroAlt} loading="lazy" />
                </Link>
              </article>
            );
          })}
        </div>
      </PageSection>
    </main>
  );
}
