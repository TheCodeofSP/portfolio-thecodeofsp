import RevealOnScroll from "../components/common/RevealOnScroll.jsx";
import { SITE } from "../config/site.config.js";
import { usePageMetadata } from "../hooks/usePageMetadata.js";
import "./informationPages.scss";

const Privacy = ({ theme }) => {
  usePageMetadata(
    "Politique de confidentialité | The Code of SP",
    "Politique de confidentialité relative au traitement des données personnelles sur le site The Code of SP.",
  );

  return (
    <main className={`privacy theme-${theme}`}>
      <section className="privacy__container">
        <RevealOnScroll
          as="header"
          className="privacy__header"
          variant="hero"
          delay={0}
        >
          <h1 className="page-title">Politique de confidentialité</h1>
        </RevealOnScroll>

        <RevealOnScroll variant="section" delay={80}>
          <article className="privacy__block">
            <h2>Responsable du traitement</h2>
            <p>
              Le présent site est édité par <strong>{SITE.owner}</strong>,
              développeuse web freelance.
            </p>
            <p>
              Pour toute question relative à la protection des données
              personnelles, vous pouvez écrire à :
              <br />
              <strong>{SITE.email}</strong>
            </p>
          </article>
        </RevealOnScroll>

        <RevealOnScroll variant="section" delay={120}>
          <article className="privacy__block">
            <h2>Données collectées</h2>
            <p>
              Lorsque vous utilisez le formulaire de découverte, les données
              suivantes peuvent être collectées :
            </p>

            <ul>
              <li>nom</li>
              <li>adresse email</li>
              <li>activité et secteur professionnel</li>
              <li>informations relatives au projet, à son public, à son budget et à son calendrier</li>
              <li>préférence de contact et disponibilités</li>
            </ul>

            <p>
              Seules les données strictement nécessaires au traitement de votre
              demande sont collectées.
            </p>
          </article>
        </RevealOnScroll>

        <RevealOnScroll variant="section" delay={160}>
          <article className="privacy__block">
            <h2>Finalité du traitement</h2>
            <p>
              Les données transmises via le formulaire de contact sont utilisées
              uniquement pour :
            </p>

            <ul>
              <li>répondre à votre demande</li>
              <li>échanger avec vous au sujet de votre projet</li>
              <li>assurer le suivi de nos échanges</li>
            </ul>

            <p>
              Vos données ne sont pas utilisées à des fins de prospection
              commerciale sans votre accord préalable.
            </p>
          </article>
        </RevealOnScroll>

        <RevealOnScroll variant="section" delay={200}>
          <article className="privacy__block">
            <h2>Base légale</h2>
            <p>
              Le traitement de vos données repose sur la nécessité de répondre à
              votre demande et, selon le contexte, sur l’exécution de mesures
              précontractuelles.
            </p>
          </article>
        </RevealOnScroll>

        <RevealOnScroll variant="section" delay={240}>
          <article className="privacy__block">
            <h2>Destinataires des données</h2>
            <p>
              Les données collectées sont destinées uniquement à{" "}
              <strong>{SITE.owner}</strong>.
            </p>
            <p>
              Le formulaire est géré via <strong>Formspree</strong>, prestataire
              technique.
            </p>
          </article>
        </RevealOnScroll>

        <RevealOnScroll variant="section" delay={280}>
          <article className="privacy__block">
            <h2>Durée de conservation</h2>
            <p>
              Les données sont conservées uniquement pendant la durée nécessaire
              au traitement de votre demande.
            </p>
          </article>
        </RevealOnScroll>

        <RevealOnScroll variant="section" delay={320}>
          <article className="privacy__block">
            <h2>Vos droits</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>

            <ul>
              <li>droit d’accès</li>
              <li>droit de rectification</li>
              <li>droit à l’effacement</li>
              <li>droit d’opposition</li>
            </ul>

            <p>
              Contact : <br />
              <strong>{SITE.email}</strong>
            </p>
          </article>
        </RevealOnScroll>

        <RevealOnScroll variant="section" delay={360}>
          <article className="privacy__block">
            <h2>Sécurité</h2>
            <p>
              Des mesures raisonnables sont mises en œuvre pour protéger vos
              données.
            </p>
          </article>
        </RevealOnScroll>

        <RevealOnScroll variant="section" delay={400}>
          <article className="privacy__block">
            <h2>Cookies</h2>
            <p>
              Le choix de l’univers est conservé uniquement pendant la session.
              Google Analytics n’est chargé qu’après votre acceptation explicite.
              En cas de refus, aucun tag Analytics n’est chargé. Lorsque la mesure
              est acceptée, elle porte sur les pages consultées, le choix d’univers,
              les études de cas ouvertes, les liens vers les projets et les
              formulaires envoyés. Aucune donnée saisie dans les formulaires n’est
              transmise à Analytics et les fonctions publicitaires sont désactivées.
              Le choix peut être modifié depuis le lien « Gérer mes cookies » du
              pied de page.
            </p>
          </article>
        </RevealOnScroll>

        <RevealOnScroll variant="section" delay={440}>
          <article className="privacy__block">
            <h2>Mise à jour</h2>
            <p>
              Cette politique peut être modifiée à tout moment pour refléter les
              évolutions légales ou techniques.
            </p>
          </article>
        </RevealOnScroll>
      </section>
    </main>
  );
};

export default Privacy;
