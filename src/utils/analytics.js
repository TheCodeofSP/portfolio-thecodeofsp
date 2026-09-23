import {
  ANALYTICS_CONSENT_KEY,
  analyticsMeasurementId,
  hasAnalyticsConfig,
} from "../config/environment.js";

const ANALYTICS_SCRIPT_SELECTOR = "script[data-thecodeofsp-ga]";

export { hasAnalyticsConfig };

export function getAnalyticsConsent() {
  try {
    return localStorage.getItem(ANALYTICS_CONSENT_KEY);
  } catch {
    return null;
  }
}

export function setAnalyticsConsent(value) {
  try {
    localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
  } catch {
    // Le choix reste actif dans React si le stockage est indisponible.
  }
}

export function loadAnalytics() {
  if (
    !hasAnalyticsConfig ||
    getAnalyticsConsent() !== "accepted" ||
    document.querySelector(ANALYTICS_SCRIPT_SELECTOR)
  ) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };

  window.gtag("js", new Date());
  window.gtag("config", analyticsMeasurementId, {
    allow_ad_personalization_signals: false,
    allow_google_signals: false,
    anonymize_ip: true,
    send_page_view: false,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsMeasurementId}`;
  script.dataset.thecodeofspGa = "true";
  document.head.appendChild(script);
}

function removeAnalyticsCookies() {
  const hostname = window.location.hostname;
  const domains = [hostname, `.${hostname}`];

  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    if (!name.startsWith("_ga")) return;

    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    domains.forEach((domain) => {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}; SameSite=Lax`;
    });
  });
}

export function disableAnalytics() {
  document.querySelector(ANALYTICS_SCRIPT_SELECTOR)?.remove();
  removeAnalyticsCookies();
  delete window.gtag;
  delete window.dataLayer;
}

export function trackPageView(path) {
  if (
    getAnalyticsConsent() !== "accepted" ||
    typeof window.gtag !== "function"
  ) {
    return;
  }

  window.gtag("event", "page_view", {
    page_location: window.location.href,
    page_path: path,
    page_title: document.title,
  });
}

export function trackEvent(name, parameters = {}) {
  if (
    getAnalyticsConsent() !== "accepted" ||
    typeof window.gtag !== "function"
  ) {
    return;
  }

  window.gtag("event", name, parameters);
}
