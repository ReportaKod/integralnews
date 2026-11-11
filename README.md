# Intégrales Togo News

Site d'actualité multilingue d'**Intégrales Togo News**, journal édité par la société
**Djif Communication**, publié sur
[www.integrales-togo-news.com](https://www.integrales-togo-news.com). Les articles sont rédigés
dans un studio d'édition intégré ([Sanity](https://www.sanity.io)) et affichés par une application
[Next.js](https://nextjs.org).

Le projet est parti du modèle [`cms-sanity`](https://github.com/vercel/next.js/tree/canary/examples/cms-sanity)
(Next.js et Sanity), largement adapté depuis : rubriques, multilingue, articles illustrés, audio,
gestion des cookies, etc.

## Fonctionnalités

- **Articles et rubriques** : articles classés par thème (rubriques), avec chapeau, texte enrichi,
  images à côté du texte, galerie en fin d'article, vidéos YouTube et lecteur audio.
- **Trois langues** : français (`fr`), français du Togo (`fr-TG`) et anglais (`en`), avec des
  adresses préfixées (`/fr/...`, `/en/...`).
- **Studio d'édition** intégré au site, accessible sur `/fr/studio`, avec aperçu des brouillons.
- **Référencement** : `sitemap.xml`, `robots.txt`, métadonnées Open Graph, et images de partage
  générées à la volée (`/api/og`).
- **Respect de la vie privée** : bandeau de consentement aux cookies, pages de mentions légales
  et de politique de confidentialité.
- **En-tête qui se réduit au défilement**, mises en page adaptées au mobile.

## Technologies

| | |
|---|---|
| Framework | Next.js 16 (App Router, build webpack), React 19 |
| Contenu | Sanity 5 et `next-sanity` 12 |
| Traductions | `next-intl` 4 |
| Style | Tailwind CSS 3 |
| Langage | TypeScript |
| Hébergement | Vercel |
| Gestionnaire de paquets | **pnpm** (version fixée par `packageManager`) |

## Installation en local

### Prérequis

- **Node.js 20.9 ou plus récent** (requis par Next.js 16).
- **pnpm**, via Corepack : `corepack enable` (la version exacte est lue dans `package.json`).
- Un accès au projet Sanity du site (identifiant du projet, dataset et un jeton de lecture).

### Étapes

```bash
git clone https://github.com/ReportaKod/integralnews.git
cd integralnews
pnpm install
cp .env.local.example .env.local   # puis renseigner les valeurs (voir ci-dessous)
pnpm dev
```

Le site est alors disponible sur <http://localhost:3000> (qui redirige vers `/fr`) et le studio sur
<http://localhost:3000/fr/studio>.

> Utilisez **pnpm** uniquement. Le projet n'a qu'un fichier de verrouillage (`pnpm-lock.yaml`) ;
> ne lancez pas `npm install` ni `yarn`, qui créeraient un second fichier et fausseraient les
> alertes de sécurité.

### Variables d'environnement

| Variable | Obligatoire | Rôle |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | oui | Identifiant du projet Sanity |
| `NEXT_PUBLIC_SANITY_DATASET` | oui | Dataset utilisé (`production`, `development`…) |
| `SANITY_API_READ_TOKEN` | oui | Jeton de **lecture** Sanity, utilisé côté serveur uniquement |
| `NEXT_PUBLIC_SITE_URL` | non | Adresse publique du site, pour le sitemap et Open Graph (par défaut `https://www.integrales-togo-news.com`) |
| `OG_ALLOWED_HOSTS` | non | Noms de domaine supplémentaires acceptés par `/api/og`, séparés par des virgules |
| `NEXT_PUBLIC_SANITY_API_VERSION` | non | Version de l'API Sanity |

Pour obtenir les valeurs : `pnpm setup` (CLI Sanity) ou le tableau de bord sur
[sanity.io/manage](https://www.sanity.io/manage). Le jeton se crée dans **API → Tokens**, avec le
rôle **Viewer** (lecture seule).

### Commandes utiles

| Commande | Effet |
|---|---|
| `pnpm dev` | Serveur de développement |
| `pnpm build` | Build de production (génère d'abord les types Sanity) |
| `pnpm start` | Lance le build de production |
| `pnpm lint` | Vérifie le code avec ESLint |
| `pnpm typegen` | Régénère les types TypeScript depuis le schéma Sanity et les requêtes GROQ |

Les types (`sanity.types.ts`, `schema.json`) sont régénérés automatiquement avant `dev` et
`build`. Relancez `pnpm typegen` après toute modification d'une requête GROQ ou d'un schéma.

## Précautions

### Données et secrets

- **Ne commitez jamais** `.env.local` ni aucun jeton. Seul `.env.local.example` (sans valeurs)
  est versionné.
- Le jeton `SANITY_API_READ_TOKEN` ne doit jamais atteindre le navigateur : il est chargé dans un
  module `server-only` et protégé contre une fuite par `taint`. Ne l'importez pas dans un composant
  client.
- **Attention aux scripts `sync:prod-to-dev` et `sync:dev-to-prod`.** Ils exportent un dataset
  puis **écrasent l'autre** : `sync:dev-to-prod` remplace le contenu de production par celui de
  développement. À n'utiliser qu'en sachant exactement ce que vous faites, après sauvegarde.
- Vérifiez le dataset ciblé dans `.env.local` avant d'éditer du contenu dans le studio.

### Développement

- **Build avec webpack** : les scripts `dev` et `build` utilisent `--webpack` car le projet a une
  configuration webpack personnalisée (`next.config.js`). Ne retirez pas ce drapeau sans migrer
  cette configuration vers Turbopack.
- **Proxy i18n** : le routage des langues est géré par `proxy.ts` (équivalent de l'ancien
  `middleware.ts`, renommé par Next.js 16).
- **Politique de contenu (CSP)** : `vercel.json` limite les domaines autorisés (scripts, images,
  vidéos, polices). Si vous ajoutez un service tiers, il faut aussi l'ajouter à cette liste, sinon
  le navigateur le bloquera.
- **Images** : les domaines d'images distants autorisés sont listés dans `next.config.js`
  (`images.remotePatterns`).

### Route `/api/og`

Cette route génère les images de partage en lisant des pages du site. Elle n'accepte que les
adresses du site lui-même (domaines Vercel, domaines listés dans `OG_ALLOWED_HOSTS`) et refuse
les autres, pour ne pas servir de relais vers des adresses arbitraires. Si vous changez de nom de
domaine, ajoutez-le dans `OG_ALLOWED_HOSTS`. Elle tourne en runtime **Node.js** (et non Edge) à
cause de la limite de taille des fonctions Edge du plan gratuit de Vercel.

### Dépendances

- Les mises à jour sont suivies par **Dependabot** (`.github/dependabot.yml`), avec des groupes
  pour Next/React et pour Sanity, qui doivent évoluer ensemble.
- Les correctifs de dépendances indirectes sont forcés dans `package.json` (`pnpm.overrides`).
- Avant de fusionner une mise à jour **majeure** (Next.js, React, Sanity, `next-intl`,
  Tailwind), faites un `pnpm build` en local et testez : les versions de ces paquets sont liées
  entre elles.
- Après tout changement de `package.json`, committez aussi `pnpm-lock.yaml` : Vercel installe
  avec le fichier de verrouillage tel quel.

## Structure du projet

```text
app/[locale]/(blog)/   pages publiques (accueil, rubriques, articles, pages légales)
app/[locale]/(sanity)/ studio d'édition
app/api/og/            génération des images de partage
components/            composants (en-tête, pied de page, images, cookies, partage…)
i18n/                  configuration des langues
messages/              traductions (fr, fr-TG, en)
sanity/                schémas de contenu, requêtes, configuration du studio
proxy.ts               routage des langues
```

## Déploiement

Le site est déployé sur [Vercel](https://vercel.com) à chaque push sur `main`. Dans le projet
Vercel, renseignez les mêmes variables d'environnement qu'en local (voir plus haut) et attachez
les noms de domaine du site. Redéployez après toute modification d'une variable.

## Sécurité

Pour signaler une faille, **n'ouvrez pas d'issue publique** : lisez [SECURITY.md](SECURITY.md).

## Remerciements

Modèle d'origine : [`cms-sanity`](https://github.com/vercel/next.js/tree/canary/examples/cms-sanity)
de Vercel et Sanity.
