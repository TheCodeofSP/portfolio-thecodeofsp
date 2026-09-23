import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { THEME_IDS } from "../src/config/themes.config.js";
import { caseStudies } from "../src/content/portfolio.content.js";
import {
  themedMethodCopy,
  themedPageCopy,
} from "../src/content/theme.content.js";

const PUBLIC_DIRECTORY = resolve("public");
const MEDIA_DIRECTORY_ALIASES = Object.freeze({
  "projet-en-cours": "projet-mystere",
});

const errors = [];
const projectSlugs = new Set();
let mediaCount = 0;

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function assertPublicFile(publicPath, context) {
  const localPath = resolve(PUBLIC_DIRECTORY, publicPath.replace(/^\//, ""));
  assert(existsSync(localPath), `${context} : fichier absent (${publicPath})`);
  mediaCount += 1;
}

for (const theme of THEME_IDS) {
  assert(themedPageCopy[theme], `Contenus de page absents pour le thème « ${theme} »`);
  assert(
    themedMethodCopy[theme]?.length === 6,
    `La méthode du thème « ${theme} » doit contenir 6 étapes`,
  );
}

for (const project of caseStudies) {
  assert(!projectSlugs.has(project.slug), `Slug dupliqué : ${project.slug}`);
  projectSlugs.add(project.slug);

  assert(project.title, `Titre absent pour ${project.slug}`);
  assert(project.hero, `Visuel principal absent pour ${project.slug}`);
  assert(project.decisions?.length > 0, `Décisions absentes pour ${project.slug}`);
  assert(project.stack?.length > 0, `Stack absente pour ${project.slug}`);

  if (project.hero) assertPublicFile(project.hero, `${project.slug} / hero`);

  const mediaDirectory = MEDIA_DIRECTORY_ALIASES[project.slug] || project.slug;

  for (const group of project.mediaGroups || []) {
    for (const [filename] of group.items || []) {
      assertPublicFile(
        `/media/case-studies/${mediaDirectory}/${filename}`,
        `${project.slug} / ${group.title}`,
      );
    }
  }

  for (const [filename] of project.videos || []) {
    assertPublicFile(
      `/media/case-studies/${mediaDirectory}/${filename}`,
      `${project.slug} / vidéo`,
    );
  }
}

if (errors.length > 0) {
  console.error("Vérification des contenus échouée :");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(
  `${THEME_IDS.length} thèmes, ${caseStudies.length} études de cas et ${mediaCount} médias validés.`,
);
