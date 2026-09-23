# The Code of SP

Portfolio professionnel de Sandrine Pham, développeuse web freelance. Le site présente ses services, sa méthode de travail et ses réalisations à travers trois directions visuelles complètes : Accueillant, Affirmé et Minimaliste.

## Principes du projet

- une architecture et des contenus communs aux trois univers ;
- une identité, un vocabulaire et des animations propres à chaque univers ;
- des études de cas pilotées par les données ;
- une expérience responsive et accessible au clavier ;
- un chargement de Google Analytics uniquement après consentement ;
- deux parcours de contact : demande de renseignement ou découverte de projet.

## Stack

- React 19 ;
- React Router 7 ;
- Vite 7 ;
- Sass ;
- ESLint ;
- Formspree pour les formulaires.

## Architecture

```text
src/
├── components/
│   ├── common/       # éléments globaux et introduction
│   ├── forms/        # champs et étapes des formulaires
│   ├── home/         # composants propres à l’accueil
│   └── shared/       # structures réutilisées entre les pages
├── config/           # identité du site, routes et thèmes
├── content/          # contenus éditoriaux et études de cas
├── hooks/            # comportements React réutilisables
├── pages/            # composants de pages et styles associés
├── routes/           # déclaration des routes
├── services/         # échanges avec les services externes
├── styles/
│   ├── foundations/  # tokens et mixins communs
│   └── univers/      # tokens, mixins et animations par univers
└── utils/            # fonctions utilitaires sans état
```

Les médias des études de cas se trouvent dans `public/media/case-studies/`.

## Installation

```bash
npm install
npm run dev
```

## Vérifications

```bash
npm run check
```

Cette commande exécute :

1. ESLint ;
2. la validation de la structure des contenus et de tous les médias référencés ;
3. la validation de la configuration SEO et OVH ;
4. le build de production.

Les commandes peuvent également être lancées séparément :

```bash
npm run lint
npm run check:content
npm run check:production
npm run build
```

## Conventions

- composants React et fichiers JSX en `PascalCase` ;
- utilitaires, configurations et contenus avec des noms explicites ;
- classes CSS selon une convention BEM ;
- valeurs visuelles partagées centralisées dans les tokens Sass ;
- textes éditoriaux centralisés dans `src/content` ;
- données techniques et liens centralisés dans `src/config` ;
- aucun style inline dans les composants.

## Déploiement

Le projet est conçu pour être déployé sur un hébergement OVH. Le fichier
`public/.htaccess` est automatiquement copié dans `dist` pendant le build : il
assure le HTTPS, redirige le sous-domaine `www` vers le domaine canonique et
permet à React Router de gérer les accès directs aux différentes pages.

Avant le build de production, copier `.env.example` vers `.env.production`, puis
y déclarer l’identifiant de la propriété Google Analytics 4 :

```text
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Exécuter ensuite :

```bash
npm install
npm run check
```

Le contenu du dossier `dist` peut alors être transféré dans le dossier Web de
l’hébergement OVH, notamment avec FileZilla. Il faut transférer le contenu du
dossier, y compris le fichier `.htaccess`, et non le dossier `dist` lui-même.

Le tag Analytics est injecté uniquement après acceptation. Le portfolio mesure
alors les pages vues, l’univers choisi, les études de cas consultées, les clics
vers les projets et les formulaires envoyés, sans transmettre le contenu des
formulaires ni activer les fonctions publicitaires.
