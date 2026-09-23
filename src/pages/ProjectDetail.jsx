import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import PageSection from "../components/shared/PageSection.jsx";
import { caseStudies } from "../content/portfolio.content.js";
import { getThemeCopy, getThemedCase } from "../content/theme.content.js";
import { usePageMetadata } from "../hooks/usePageMetadata.js";
import { trackEvent } from "../utils/analytics.js";

import "./portfolio.scss";

const MEDIA_ROOT = "/media/case-studies";
const MEDIA_DIRECTORIES = Object.freeze({
  "projet-en-cours": "projet-mystere",
});

function getProjectMediaPath(project, filename) {
  const directory = MEDIA_DIRECTORIES[project.slug] || project.slug;
  return `${MEDIA_ROOT}/${directory}/${filename}`;
}

function MediaFigure({ item, project }) {
  const [filename, alt, caption] = item;

  return (
    <figure className="case-media">
      <div className="case-media__frame">
        <img
          src={getProjectMediaPath(project, filename)}
          alt={alt}
          loading="lazy"
        />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function CaseStudyMeta({ copy, project }) {
  const metadata = [
    [copy.status, project.status],
    [copy.role, project.role],
    [copy.duration, project.duration],
    [copy.audience, project.audience],
    [copy.value, project.value],
  ].filter(([, value]) => value);

  return (
    <dl className="case-study__meta">
      {metadata.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function CaseGallery({ copy, group, project }) {
  return (
    <PageSection className="case-gallery">
      <div className="case-gallery__header">
        <p className="portfolio-kicker">{copy.interface}</p>
        <h2>{group.title}</h2>
        {group.intro && <p>{group.intro}</p>}
      </div>

      <div className={`case-gallery__grid case-gallery__grid--${group.layout || "three"}`}>
        {group.items.map((item) => (
          <MediaFigure key={item[0]} project={project} item={item} />
        ))}
      </div>
    </PageSection>
  );
}

function CaseVideos({ copy, project }) {
  if (project.videos.length === 0) return null;

  return (
    <PageSection variant="soft" className="case-videos">
      <div className="case-gallery__header">
        <p className="portfolio-kicker">{copy.motion}</p>
        <h2>{copy.motionTitle}</h2>
      </div>

      <div className="case-videos__grid">
        {project.videos.map(([filename, title]) => (
          <figure key={filename}>
            <video controls playsInline preload="metadata" aria-label={title}>
              <source
                src={getProjectMediaPath(project, filename)}
                type="video/mp4"
              />
              Ton navigateur ne permet pas de lire cette vidéo.
            </video>
            <figcaption>{title}</figcaption>
          </figure>
        ))}
      </div>
    </PageSection>
  );
}

function CaseTestimonial({ copy, testimonial }) {
  if (!testimonial) return null;

  return (
    <PageSection
      variant="soft"
      className="case-testimonial"
      containerClassName="case-testimonial__layout"
    >
      <div className="case-testimonial__header">
        <p className="portfolio-kicker">{copy.testimonialKicker}</p>
        <h2>{copy.testimonialTitle}</h2>
      </div>

      <figure className="case-testimonial__quote">
        <blockquote>
          {testimonial.quote.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </blockquote>
        <figcaption>
          <strong>{testimonial.author}</strong>
          <span>{testimonial.role}</span>
        </figcaption>
      </figure>
    </PageSection>
  );
}

export default function ProjectDetail({ theme = "accueillant" }) {
  const { slug } = useParams();
  const sourceProject = caseStudies.find((item) => item.slug === slug);
  const project = sourceProject ? getThemedCase(sourceProject, theme) : null;
  const projectSlug = project?.slug;
  const copy = getThemeCopy(theme).caseUi;

  usePageMetadata(
    project
      ? {
          title: `${project.title} — Réalisation The Code of SP`,
          description: project.summary,
          image: project.hero,
          robots:
            project.slug === "projet-en-cours"
              ? "noindex, follow"
              : "index, follow",
          type: "article",
        }
      : {
          title: "Réalisation introuvable — The Code of SP",
          description: "Cette réalisation n’existe pas ou n’est plus disponible.",
          robots: "noindex, follow",
        },
  );

  useEffect(() => {
    if (projectSlug) {
      trackEvent("case_study_view", { project_name: projectSlug });
    }
  }, [projectSlug]);

  if (!project) {
    return (
      <main className="portfolio">
        <section className="portfolio-page-hero">
          <div className="portfolio-shell">
            <h1>Cette réalisation n’existe pas.</h1>
            <Link className="portfolio-back" to="/realisations">
              ← Retour aux réalisations
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={`portfolio case-study case-study--${project.slug}`}>
      <section className="portfolio-page-hero case-study__hero">
        <div className="portfolio-shell">
          <div className="case-study__hero-grid">
            <div className="case-study__hero-copy">
              <p className="portfolio-kicker">{project.category}</p>
              <h1>{project.title}</h1>
              <p className="portfolio-lead">{project.hook}</p>
              <p className="case-study__summary">{project.summary}</p>
              <div className="case-study__hero-actions">
                {project.liveUrl && (
                  <a
                    className="portfolio-button portfolio-button--primary"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent("project_link_click", {
                        project_name: project.slug,
                      })
                    }
                  >
                    {copy.openProject}
                  </a>
                )}
                <a className="portfolio-text-link" href="#etude">
                  {copy.openStudy}
                </a>
              </div>
            </div>

            <figure className="case-study__hero-media">
              <img src={project.hero} alt={project.heroAlt} />
            </figure>
          </div>
        </div>
      </section>

      <PageSection className="case-study__identity" id="etude">
        <CaseStudyMeta copy={copy} project={project} />
      </PageSection>

      <PageSection variant="soft" containerClassName="case-study__narrative">
        <article>
          <p className="portfolio-kicker">{copy.contextKicker}</p>
          <h2>{copy.contextTitle}</h2>
          <p>{project.context}</p>
        </article>
        <article>
          <p className="portfolio-kicker">{copy.challengeKicker}</p>
          <h2>{copy.challengeTitle}</h2>
          <p>{project.challenge}</p>
        </article>
      </PageSection>

      <PageSection variant="contrast" containerClassName="case-study__decisions">
        <div>
          <p className="portfolio-kicker">{copy.decisionsKicker}</p>
          <h2>{copy.decisionsTitle}</h2>
          <p>{project.response}</p>
        </div>
        <ol>
          {project.decisions.map((decision, index) => (
            <li key={decision}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{decision}</p>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection className="case-study__numbers">
        <p className="portfolio-kicker">{copy.highlights}</p>
        <div className="case-study__highlights">
          {project.highlights.map(([value, label]) => (
            <article key={label}>
              <strong>{value}</strong>
              <p>{label}</p>
            </article>
          ))}
        </div>
      </PageSection>

      {project.mediaGroups.map((group) => (
        <CaseGallery key={group.title} copy={copy} group={group} project={project} />
      ))}

      <CaseVideos copy={copy} project={project} />

      <CaseTestimonial copy={copy} testimonial={project.testimonial} />

      <PageSection className="case-study__outcome" containerClassName="case-study__outcome-grid">
        <div>
          <p className="portfolio-kicker">{copy.result}</p>
          <h2>{project.result}</h2>
        </div>
        <div>
          {project.evolution && (
            <>
              <h3>{copy.next}</h3>
              <p>{project.evolution}</p>
            </>
          )}
          <p className="case-study__closing">{project.closing}</p>
          <div className="portfolio-stack">
            <p>{copy.stack}</p>
            <ul>
              {project.stack.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
            {project.repositoryUrl && (
              <a
                className="portfolio-button portfolio-button--ghost portfolio-stack__repository"
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("repository_link_click", {
                    project_name: project.slug,
                  })
                }
              >
                {copy.repository}
              </a>
            )}
          </div>
        </div>
      </PageSection>

      <section className="portfolio-cta">
        <div className="portfolio-shell">
          <p className="portfolio-kicker">{copy.ctaKicker}</p>
          <h2>{project.cta}</h2>
          <p>{copy.ctaText}</p>
          <Link className="portfolio-button portfolio-button--primary" to="/contact">
            {copy.ctaButton}
          </Link>
        </div>
      </section>

      <div className="portfolio-shell case-study__back">
        <Link className="portfolio-back" to="/realisations">
          {copy.back}
        </Link>
      </div>
    </main>
  );
}
