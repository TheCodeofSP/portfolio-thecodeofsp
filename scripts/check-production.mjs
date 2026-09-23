import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const CANONICAL_DOMAIN = "https://thecodeofsp.fr";
const PUBLIC_CASE_STUDIES = [
  "the-code-of-sp",
  "manon-pontasse",
  "the-quiz-of-sp",
  "stratusse",
];

const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function read(relativePath) {
  const absolutePath = resolve(relativePath);
  assert(existsSync(absolutePath), `Fichier absent : ${relativePath}`);
  return existsSync(absolutePath) ? readFileSync(absolutePath, "utf8") : "";
}

const index = read("index.html");
const robots = read("public/robots.txt");
const sitemap = read("public/sitemap.xml");
const htaccess = read("public/.htaccess");
const siteConfig = read("src/config/site.config.js");
const environmentExample = read(".env.example");

assert(existsSync(resolve("public/og-image.png")), "Image sociale absente : public/og-image.png");
assert(index.includes(`${CANONICAL_DOMAIN}/og-image.png`), "Image sociale incorrecte dans index.html");
assert(robots.includes(`Sitemap: ${CANONICAL_DOMAIN}/sitemap.xml`), "Sitemap incorrect dans robots.txt");
assert(siteConfig.includes(`domain: "${CANONICAL_DOMAIN}"`), "Domaine canonique incorrect dans la configuration");
assert(siteConfig.includes('email: "contact@thecodeofsp.fr"'), "Adresse de contact publique incorrecte");
assert(environmentExample.includes("VITE_GA_MEASUREMENT_ID"), "Variable Analytics absente de .env.example");
assert(htaccess.includes("thecodeofsp.fr"), "Domaine absent de la configuration OVH");

for (const slug of PUBLIC_CASE_STUDIES) {
  assert(
    sitemap.includes(`${CANONICAL_DOMAIN}/realisations/${slug}`),
    `Étude de cas absente du sitemap : ${slug}`,
  );
}

const inspectedFiles = [index, robots, sitemap, siteConfig];
assert(
  inspectedFiles.every((content) => !content.includes("thecodeofsp.com")),
  "Une ancienne adresse en .com subsiste dans la configuration publique",
);
assert(
  inspectedFiles.every((content) => !content.includes("www.thecodeofsp.fr")),
  "Une URL canonique avec www subsiste dans la configuration publique",
);
assert(
  inspectedFiles.every((content) => !content.includes("thecodeofsp@gmail.com")),
  "L’adresse Gmail ne doit pas être exposée dans la configuration publique",
);

if (errors.length > 0) {
  console.error("Vérification de production échouée :");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("Configuration SEO, contact et OVH validée.");
