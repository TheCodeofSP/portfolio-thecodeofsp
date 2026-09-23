import {
  BUDGET_OPTIONS,
  CONTACT_FORM_COPY,
  CONTACT_PREFERENCE_OPTIONS,
  CONTENT_STATUS_OPTIONS,
  NEED_OPTIONS,
  PROJECT_STAGE_OPTIONS,
  VISUAL_IDENTITY_OPTIONS,
} from "../../content/contact.content.js";
import Field from "./Field.jsx";

function SelectOptions({ emptyLabel, options }) {
  return (
    <>
      {emptyLabel && <option value="">{emptyLabel}</option>}
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </>
  );
}

export default function ProjectFormSteps({
  data,
  error,
  onChange,
  onEdit,
  step,
}) {
  if (step === 0) {
    return (
      <div className="discovery__panel">
        <Field label="Nom et prénom" name="name" value={data.name} onChange={onChange} required />
        <Field label="Adresse e-mail" name="email" value={data.email} onChange={onChange} required type="email" />
        <Field label="Nom de l’activité ou du projet" name="company" value={data.company} onChange={onChange} required />
        <Field label="Secteur d’activité" name="sector" value={data.sector} onChange={onChange} required />
        <Field label="Site actuel, s’il existe" name="website" value={data.website} onChange={onChange} type="url" />
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="discovery__panel">
        <Field label="Quel est ton besoin aujourd’hui ?" name="need" required>
          <select id="need" name="need" value={data.need} onChange={onChange} required>
            <SelectOptions emptyLabel="Choisis la situation la plus proche" options={NEED_OPTIONS} />
          </select>
        </Field>
        <Field
          label="Décris-moi ton idée ou ton besoin"
          name="idea"
          value={data.idea}
          onChange={onChange}
          required
          textarea
          hint="Il n’est pas nécessaire d’utiliser des termes techniques."
        />
        <Field label="Quel est l’objectif principal ?" name="objective" value={data.objective} onChange={onChange} required textarea />
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="discovery__panel">
        <Field label="À qui la solution doit-elle servir ?" name="audience" value={data.audience} onChange={onChange} required textarea />
        <Field label="Où en est le projet aujourd’hui ?" name="stage" required>
          <select id="stage" name="stage" value={data.stage} onChange={onChange} required>
            <SelectOptions emptyLabel="Choisis une étape" options={PROJECT_STAGE_OPTIONS} />
          </select>
        </Field>
        <Field label="Où en sont les contenus ?" name="contents">
          <select id="contents" name="contents" value={data.contents} onChange={onChange}>
            <SelectOptions emptyLabel="Non défini" options={CONTENT_STATUS_OPTIONS} />
          </select>
        </Field>
        <Field label="As-tu déjà une identité visuelle ?" name="identity">
          <select id="identity" name="identity" value={data.identity} onChange={onChange}>
            <SelectOptions emptyLabel="Non défini" options={VISUAL_IDENTITY_OPTIONS} />
          </select>
        </Field>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="discovery__panel">
        <Field label="Quelles fonctionnalités imagines-tu déjà ?" name="features" value={data.features} onChange={onChange} textarea />
        <Field label="Quelle période de lancement imagines-tu ?" name="timing" value={data.timing} onChange={onChange} required />
        <Field label="Quel budget envisages-tu ?" name="budget" required>
          <select id="budget" name="budget" value={data.budget} onChange={onChange} required>
            <SelectOptions emptyLabel="Choisis une fourchette" options={BUDGET_OPTIONS} />
          </select>
        </Field>
        {data.budget === "Je ne sais pas encore" && (
          <p className="discovery__reassurance">
            Aucun problème : la conception sert aussi à définir un périmètre réaliste et le budget associé.
          </p>
        )}
        <Field label="Y a-t-il une contrainte particulière ?" name="constraints" value={data.constraints} onChange={onChange} textarea />
      </div>
    );
  }

  return (
    <div className="discovery__panel">
      <Field label="Comment préfères-tu échanger ?" name="contactPreference" required>
        <select
          id="contactPreference"
          name="contactPreference"
          value={data.contactPreference}
          onChange={onChange}
          required
        >
          <SelectOptions options={CONTACT_PREFERENCE_OPTIONS} />
        </select>
      </Field>
      <Field label="Quelles sont généralement tes disponibilités ?" name="availability" value={data.availability} onChange={onChange} />
      <Field label="Souhaites-tu ajouter quelque chose ?" name="extra" value={data.extra} onChange={onChange} textarea />

      <div className="discovery__summary">
        <h3>Ton point de départ</h3>
        <p>
          <strong>{data.company}</strong> · {data.need}
        </p>
        <p>{data.objective}</p>
        <button type="button" onClick={onEdit}>Modifier mes réponses</button>
      </div>

      <label className="discovery__consent">
        <input
          type="checkbox"
          name="privacy"
          checked={data.privacy}
          onChange={onChange}
          required
        />
        J’accepte que mes données soient utilisées uniquement pour étudier ma demande et me recontacter. *
      </label>

      {error && (
        <p role="alert" className="contact__error">
          {error} {CONTACT_FORM_COPY.fallback}
        </p>
      )}
    </div>
  );
}
