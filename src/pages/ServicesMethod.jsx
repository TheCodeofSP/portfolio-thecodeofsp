import { Link } from "react-router-dom";

import PageHero from "../components/shared/PageHero.jsx";
import PageSection from "../components/shared/PageSection.jsx";
import {
  detailedMethod,
  methodOfferCoverage,
  offers,
} from "../content/portfolio.content.js";
import { getThemeCopy, getThemedMethod } from "../content/theme.content.js";
import { usePageMetadata } from "../hooks/usePageMetadata.js";

import "./portfolio.scss";

function OfferCard({ offer, theme }) {
  const voice = offer.voices?.[theme] || {};

  return (
    <article className={`portfolio-offer portfolio-offer--${offer.id}`}>
      <div className="portfolio-offer__head">
        <span>
          {offer.step} · {offer.name}
        </span>
        <strong>{offer.price}</strong>
      </div>
      <h3>{offer.title}</h3>
      <p>{voice.description || offer.description}</p>
      <ul>
        {offer.details.map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>
      {voice.result && <p className="portfolio-offer__example">{voice.result}</p>}
    </article>
  );
}

export default function ServicesMethod({ theme = "accueillant" }) {
  const content = getThemeCopy(theme).services;
  const methodLabels = getThemedMethod(theme);
  const productOffers = offers.filter((offer) => offer.group === "product");
  const websiteOffers = offers.filter((offer) => offer.group === "website");
  const method = detailedMethod.map(([title, text, outcome], index) => [
    methodLabels[index]?.[0] || title,
    text,
    outcome,
  ]);

  usePageMetadata(
    "Services & méthode — The Code of SP",
    "Découvrez les services, les offres et la méthode de The Code of SP pour concevoir, développer et mettre en ligne votre solution numérique.",
  );

  return (
    <main className="portfolio">
      <PageHero
        kicker={content.kicker}
        title={content.title}
        intro={content.intro}
      />

      <PageSection variant="soft">
        <p className="portfolio-kicker">{content.commitmentsKicker}</p>
        <h2>{content.commitmentsTitle}</h2>
        <div className="portfolio-grid portfolio-grid--3">
          {content.commitments.map(([title, text], index) => (
            <article className="portfolio-card" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection>
        <p className="portfolio-kicker">{content.websiteKicker}</p>
        <h2>{content.websiteTitle}</h2>
        <p className="portfolio-lead">{content.websiteIntro}</p>
        <div className="portfolio-grid portfolio-grid--2 portfolio-grid--offers">
          {websiteOffers.map((offer) => (
            <OfferCard offer={offer} theme={theme} key={offer.id} />
          ))}
        </div>
        <p className="portfolio-note">{content.websitePriceNote}</p>
      </PageSection>

      <PageSection variant="soft">
        <p className="portfolio-kicker">{content.productKicker}</p>
        <h2>{content.productTitle}</h2>
        <p className="portfolio-lead">{content.productIntro}</p>
        <div className="portfolio-offer-flow">
          <OfferCard offer={productOffers[0]} theme={theme} />
          <div className="portfolio-offer-flow__bridge">
            <span aria-hidden="true">2.1 / 2.2</span>
            <p>{content.productBridge}</p>
          </div>
          <OfferCard offer={productOffers[1]} theme={theme} />
        </div>
        <p className="portfolio-note">{content.productPriceNote}</p>
      </PageSection>

      <PageSection variant="contrast">
        <p className="portfolio-kicker">{content.methodKicker}</p>
        <h2>{content.methodTitle}</h2>
        <ol className="portfolio-method portfolio-method--expanded">
          {method.map(([title, text, outcome], index) => (
            <li key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <strong>{outcome}</strong>
              <div className="portfolio-method__coverage">
                <span className="portfolio-method__coverage-label">
                  {content.methodOffersLabel}
                </span>
                <div className="portfolio-method__offer-list">
                  {methodOfferCoverage[index].map((offerName) => (
                    <span className="portfolio-method__offer" key={offerName}>
                      {offerName}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection containerClassName="portfolio-story">
        <div>
          <p className="portfolio-kicker">{content.networkKicker}</p>
          <h2>{content.networkTitle}</h2>
        </div>
        <div>
          {content.network.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </PageSection>

      <section className="portfolio-cta">
        <div className="portfolio-shell">
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
