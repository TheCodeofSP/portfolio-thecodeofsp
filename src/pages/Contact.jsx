import { useEffect, useRef, useState } from "react";

import Field from "../components/forms/Field.jsx";
import ProjectFormSteps from "../components/forms/ProjectFormSteps.jsx";
import PageHero from "../components/shared/PageHero.jsx";
import PageSection from "../components/shared/PageSection.jsx";
import {
  CONTACT_FORM_COPY,
  INITIAL_PROJECT_FORM,
  PROJECT_STEPS,
  REQUIRED_FIELDS_BY_STEP,
} from "../content/contact.content.js";
import { getThemeCopy } from "../content/theme.content.js";
import { usePageMetadata } from "../hooks/usePageMetadata.js";
import { submitForm } from "../services/form.service.js";
import { trackEvent } from "../utils/analytics.js";

import "./contact.scss";
import "./portfolio.scss";

const INITIAL_SUBMISSION_STATE = {
  submitting: false,
  succeeded: false,
  error: "",
};

function buildAutoResponse(data) {
  return `Bonjour ${data.name || ""},

Merci d’avoir présenté ton projet à The Code of SP. Voici une copie de ton point de départ :

Activité : ${data.company}
Besoin : ${data.need}
Idée : ${data.idea}
Objectif : ${data.objective}
Public : ${data.audience}
Avancement : ${data.stage}
Période : ${data.timing}
Budget : ${data.budget}
Préférence d’échange : ${data.contactPreference}

Je vais étudier personnellement ta demande et je reviendrai vers toi sous une semaine pour te proposer la suite la plus pertinente.

À bientôt,
Sandrine — The Code of SP`;
}

function HiddenFormFields({ children }) {
  return (
    <>
      {children}
      <input type="hidden" name="_template" value="table" />
      <input
        type="text"
        name="_gotcha"
        tabIndex="-1"
        autoComplete="off"
        className="discovery__honeypot"
      />
    </>
  );
}

function ContactPaths({ content }) {
  const paths = [
    {
      button: content.inquiryButton,
      href: "#renseignement",
      kicker: content.inquiryKicker,
      style: "ghost",
      text: content.inquiryText,
      title: content.inquiryTitle,
    },
    {
      button: content.projectButton,
      href: "#projet",
      kicker: content.projectKicker,
      style: "primary",
      text: content.projectText,
      title: content.projectTitle,
    },
  ];

  return (
    <PageSection className="contact-paths">
      <div className="contact-paths__grid">
        {paths.map((path) => (
          <article className="contact-paths__card" key={path.href}>
            <p className="portfolio-kicker">{path.kicker}</p>
            <h2>{path.title}</h2>
            <p>{path.text}</p>
            <a
              className={`portfolio-button portfolio-button--${path.style}`}
              href={path.href}
            >
              {path.button}
            </a>
          </article>
        ))}
      </div>
    </PageSection>
  );
}

function InquirySection({ content }) {
  const [submission, setSubmission] = useState(INITIAL_SUBMISSION_STATE);
  const successRef = useRef(null);

  useEffect(() => {
    if (!submission.succeeded) return;

    window.requestAnimationFrame(() => {
      successRef.current?.focus({ preventScroll: true });
      document.getElementById("renseignement")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [submission.succeeded]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmission({ submitting: true, succeeded: false, error: "" });

    try {
      await submitForm(form, CONTACT_FORM_COPY.directError);
      trackEvent("generate_lead", { lead_source: "inquiry_form" });
      form.reset();
      setSubmission({ submitting: false, succeeded: true, error: "" });
    } catch (error) {
      setSubmission({ submitting: false, succeeded: false, error: error.message });
    }
  };

  return (
    <PageSection variant="soft" id="renseignement" containerClassName="inquiry">
      <div className="inquiry__intro">
        <p className="portfolio-kicker">{content.freeKicker}</p>
        <h2>{content.freeTitle}</h2>
        <p>{content.freeText}</p>
      </div>

      {submission.succeeded ? (
        <div
          className="inquiry__success"
          ref={successRef}
          role="status"
          tabIndex="-1"
        >
          <h3>Ton message est bien parti.</h3>
          <p>Merci pour ton message. Je reviendrai vers toi personnellement sous une semaine.</p>
        </div>
      ) : (
        <form className="discovery__form inquiry__form" onSubmit={handleSubmit}>
          <HiddenFormFields>
            <input type="hidden" name="_subject" value={CONTACT_FORM_COPY.directSubject} />
          </HiddenFormFields>
          <Field label="Nom et prénom" name="contact_name" required />
          <Field label="Adresse e-mail" name="contact_email" required type="email" />
          <Field label="Objet de ta demande" name="contact_subject" required />
          <Field label="Ton message" name="contact_message" required textarea />

          <label className="discovery__consent">
            <input type="checkbox" name="contact_privacy" required />
            J’accepte que mes données soient utilisées uniquement pour répondre à ma demande. *
          </label>

          {submission.error && (
            <p role="alert" className="contact__error">
              {submission.error} {CONTACT_FORM_COPY.fallback}
            </p>
          )}

          <button
            className="portfolio-button portfolio-button--primary"
            type="submit"
            disabled={submission.submitting}
          >
            {submission.submitting ? "Envoi en cours…" : "Envoyer mon message"}
          </button>
        </form>
      )}
    </PageSection>
  );
}

function ProjectDiscoverySection({ content, onSuccess }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ ...INITIAL_PROJECT_FORM });
  const [submission, setSubmission] = useState(INITIAL_SUBMISSION_STATE);

  const canContinue = REQUIRED_FIELDS_BY_STEP[step].every((field) => data[field]);

  const updateField = ({ target }) => {
    const value = target.type === "checkbox" ? target.checked : target.value;
    setData((currentData) => ({ ...currentData, [target.name]: value }));
  };

  const scrollToForm = () => {
    window.requestAnimationFrame(() => {
      document.getElementById("projet")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const changeStep = (nextStep) => {
    setStep(nextStep);
    scrollToForm();
  };

  const goNext = () => {
    if (canContinue) {
      changeStep(Math.min(step + 1, PROJECT_STEPS.length - 1));
    }
  };

  const goBack = () => changeStep(Math.max(step - 1, 0));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmission({ submitting: true, succeeded: false, error: "" });

    try {
      await submitForm(event.currentTarget, CONTACT_FORM_COPY.projectError);
      trackEvent("generate_lead", { lead_source: "project_discovery_form" });
      setSubmission({ submitting: false, succeeded: true, error: "" });
      onSuccess();
    } catch (error) {
      setSubmission({ submitting: false, succeeded: false, error: error.message });
    }
  };

  return (
    <section className="portfolio-section" id="projet">
      <div className="portfolio-shell discovery__project-heading">
        <p className="portfolio-kicker">{content.formKicker}</p>
        <h2>{content.formTitle}</h2>
        <p>{content.formText}</p>
        <ol className="discovery__progress" aria-label="Progression du formulaire">
          {PROJECT_STEPS.map((label, index) => (
            <li key={label} className={index <= step ? "is-active" : ""}>
              <span>{index + 1}</span>
              <small>{label}</small>
            </li>
          ))}
        </ol>
      </div>

      <div className="portfolio-shell discovery__layout">
        <aside>
          <p className="portfolio-kicker">
            Étape {step + 1} sur {PROJECT_STEPS.length}
          </p>
          <h2>{PROJECT_STEPS[step]}</h2>
          <p>Les champs marqués d’un astérisque sont nécessaires pour continuer.</p>
        </aside>

        <form className="discovery__form" onSubmit={handleSubmit}>
          <HiddenFormFields>
            <input
              type="hidden"
              name="_subject"
              value={`${CONTACT_FORM_COPY.projectSubject} — ${data.company || data.name}`}
            />
            <input type="hidden" name="_replyto" value={data.email} />
            <input type="hidden" name="_autoresponse" value={buildAutoResponse(data)} />
            <input
              type="hidden"
              name="reponses_completes"
              value={JSON.stringify(data, null, 2)}
            />
          </HiddenFormFields>

          <ProjectFormSteps
            data={data}
            error={submission.error}
            onChange={updateField}
            onEdit={() => changeStep(0)}
            step={step}
          />

          <div className="discovery__actions">
            {step > 0 && (
              <button
                className="portfolio-button portfolio-button--ghost"
                type="button"
                onClick={goBack}
              >
                Retour
              </button>
            )}

            {step < PROJECT_STEPS.length - 1 ? (
              <button
                className="portfolio-button portfolio-button--primary"
                type="button"
                onClick={goNext}
                disabled={!canContinue}
              >
                Continuer
              </button>
            ) : (
              <button
                className="portfolio-button portfolio-button--primary"
                type="submit"
                disabled={!canContinue || submission.submitting}
              >
                {submission.submitting ? "Envoi en cours…" : "Envoyer ma demande"}
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default function Contact({ theme = "accueillant" }) {
  const content = getThemeCopy(theme).contact;
  const [projectSubmitted, setProjectSubmitted] = useState(false);

  useEffect(() => {
    if (!projectSubmitted) return;

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    });
  }, [projectSubmitted]);

  usePageMetadata(
    "Démarrer un projet — The Code of SP",
    "Présentez votre besoin, posez une question ou préparez votre projet de site ou d’application avec The Code of SP.",
  );

  if (projectSubmitted) {
    return (
      <main className="portfolio">
        <PageHero
          kicker="Demande envoyée"
          title="Merci de m’avoir partagé ton projet."
          intro="Tu vas recevoir une copie de tes réponses. Je vais les étudier personnellement et je reviendrai vers toi sous une semaine pour te proposer un appel téléphonique ou une visio."
        />
      </main>
    );
  }

  return (
    <main className="portfolio discovery">
      <PageHero
        className="discovery__hero"
        kicker={content.kicker}
        title={content.title}
        intro={content.intro}
      />
      <ContactPaths content={content} />
      <InquirySection content={content} />
      <ProjectDiscoverySection
        content={content}
        onSuccess={() => setProjectSubmitted(true)}
      />
    </main>
  );
}
