import { useEffect, useState } from "react";

import { ANALYTICS_SETTINGS_EVENT } from "../../config/environment.js";
import {
  disableAnalytics,
  getAnalyticsConsent,
  hasAnalyticsConfig,
  loadAnalytics,
  setAnalyticsConsent,
  trackEvent,
  trackPageView,
} from "../../utils/analytics.js";

import "./consentBanner.scss";

export default function ConsentBanner({ theme }) {
  const [choice, setChoice] = useState(getAnalyticsConsent);
  const [isOpen, setIsOpen] = useState(() => !getAnalyticsConsent());

  useEffect(() => {
    if (choice === "accepted") {
      loadAnalytics();
      trackPageView(
        `${window.location.pathname}${window.location.search}${window.location.hash}`,
      );

      const projectSlug = window.location.pathname.match(
        /^\/realisations\/([^/]+)\/?$/,
      )?.[1];
      if (projectSlug) {
        trackEvent("case_study_view", { project_name: projectSlug });
      }
    }
    if (choice === "refused") disableAnalytics();
  }, [choice]);

  useEffect(() => {
    const openSettings = () => setIsOpen(true);
    window.addEventListener(ANALYTICS_SETTINGS_EVENT, openSettings);

    return () => {
      window.removeEventListener(ANALYTICS_SETTINGS_EVENT, openSettings);
    };
  }, []);

  if (!hasAnalyticsConfig || !isOpen) return null;

  const decide = (value) => {
    setAnalyticsConsent(value);
    setChoice(value);
    setIsOpen(false);

    if (value === "accepted") {
      loadAnalytics();
      trackEvent("theme_selected", { theme_name: theme });
    } else {
      disableAnalytics();
    }
  };

  return (
    <aside
      className="consent"
      aria-labelledby="analytics-consent-title"
      aria-describedby="analytics-consent-description"
    >
      <div>
        <strong id="analytics-consent-title">
          Des statistiques, seulement avec ton accord.
        </strong>
        <p id="analytics-consent-description">
          Google Analytics m’aide à comprendre les pages consultées, l’univers
          choisi et les prises de contact. Aucun tag n’est chargé avant ton
          acceptation.
        </p>
      </div>

      <div className="consent__actions">
        <button type="button" onClick={() => decide("refused")}>
          Refuser
        </button>
        <button type="button" onClick={() => decide("accepted")}>
          Accepter
        </button>
      </div>
    </aside>
  );
}
