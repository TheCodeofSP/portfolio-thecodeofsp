import { useEffect } from "react";

import { SITE } from "../config/site.config.js";

function getOrCreateMeta(attribute, value) {
  let element = document.head.querySelector(`meta[${attribute}="${value}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }

  return element;
}

function setMeta(attribute, key, content) {
  if (!content) return;
  getOrCreateMeta(attribute, key).setAttribute("content", content);
}

function setCanonical(href) {
  let canonical = document.head.querySelector('link[rel="canonical"]');

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }

  canonical.setAttribute("href", href);
}

function normalizeMetadata(metadata, legacyDescription) {
  if (typeof metadata === "string") {
    return { title: metadata, description: legacyDescription };
  }

  return metadata;
}

export function usePageMetadata(metadata, legacyDescription) {
  const options = normalizeMetadata(metadata, legacyDescription);
  const {
    canonicalPath,
    description = SITE.description,
    image = SITE.socialImage,
    robots = "index, follow",
    title,
    type = "website",
  } = options;

  useEffect(() => {
    const path = canonicalPath ?? window.location.pathname;
    const canonical = `${SITE.domain}${path === "/" ? "" : path}`;
    const socialImage = image.startsWith("http")
      ? image
      : `${SITE.domain}${image}`;

    document.title = title;
    setCanonical(canonical);
    setMeta("name", "description", description);
    setMeta("name", "robots", robots);

    setMeta("property", "og:type", type);
    setMeta("property", "og:site_name", SITE.name);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:image", socialImage);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", socialImage);
  }, [canonicalPath, description, image, robots, title, type]);
}
