export const PROJECT_STEPS = Object.freeze([
  "Ton activité",
  "Ton idée",
  "Ton public",
  "Le cadre",
  "La suite",
]);

export const REQUIRED_FIELDS_BY_STEP = Object.freeze([
  ["name", "email", "company", "sector"],
  ["need", "idea", "objective"],
  ["audience", "stage"],
  ["timing", "budget"],
  ["contactPreference", "privacy"],
]);

export const NEED_OPTIONS = Object.freeze([
  "Je veux créer un site vitrine",
  "J’ai une idée d’application ou de plateforme",
  "J’ai besoin de faire mûrir mon idée",
  "Je veux faire évoluer une solution existante",
  "Je ne sais pas encore précisément",
]);

export const BUDGET_OPTIONS = Object.freeze([
  "De 750 à 1 400 €",
  "De 1 400 à 2 500 €",
  "De 2 500 à 5 000 €",
  "De 5 000 à 10 000 €",
  "Plus de 10 000 €",
  "Je ne sais pas encore",
]);

export const PROJECT_STAGE_OPTIONS = Object.freeze([
  "Une première idée",
  "Un besoin déjà défini",
  "Des contenus ou maquettes existent",
  "Une première version existe déjà",
]);

export const CONTENT_STATUS_OPTIONS = Object.freeze([
  "Prêts",
  "En cours",
  "À créer",
]);

export const VISUAL_IDENTITY_OPTIONS = Object.freeze([
  "Oui",
  "En cours",
  "Non",
]);

export const CONTACT_PREFERENCE_OPTIONS = Object.freeze([
  "Visio",
  "Appel téléphonique",
  "Sans préférence",
]);

export const CONTACT_FORM_COPY = Object.freeze({
  directSubject: "Nouvelle demande de renseignement — The Code of SP",
  projectSubject: "Nouvelle découverte projet",
  directError: "Le message n’a pas pu être envoyé.",
  projectError: "La demande n’a pas pu être envoyée.",
  fallback: `Tu peux aussi m’écrire à ${SITE.email}.`,
});

export const INITIAL_PROJECT_FORM = Object.freeze({
  name: "",
  email: "",
  company: "",
  sector: "",
  website: "",
  need: "",
  idea: "",
  objective: "",
  audience: "",
  stage: "",
  contents: "",
  identity: "",
  features: "",
  timing: "",
  budget: "",
  constraints: "",
  contactPreference: "Visio",
  availability: "",
  extra: "",
  privacy: false,
});
import { SITE } from "../config/site.config.js";
