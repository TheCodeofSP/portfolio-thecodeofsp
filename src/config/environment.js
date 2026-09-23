export const ANALYTICS_CONSENT_KEY = "thecodeofsp_analytics_consent";
export const ANALYTICS_SETTINGS_EVENT = "thecodeofsp-open-cookie-settings";

export const analyticsMeasurementId = (
  import.meta.env.VITE_GA_MEASUREMENT_ID || ""
).trim();

export const hasAnalyticsConfig = /^G-[A-Z0-9]+$/i.test(
  analyticsMeasurementId,
);
