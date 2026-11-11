# Politique de sécurité

## Signaler une vulnérabilité

Si vous pensez avoir trouvé une faille de sécurité dans ce projet ou dans le site
[Intégrales Togo News](https://www.integrales-togo-news.com), **merci de ne pas ouvrir
d'issue publique.**

Utilisez le signalement privé de GitHub :

1. Ouvrez l'onglet **Security** du dépôt.
2. Cliquez sur **Report a vulnerability**.
3. Décrivez le problème : ce qui est affecté, comment le reproduire et l'impact que vous
   estimez.

Merci d'inclure, si possible :

- l'adresse ou la route concernée ;
- les étapes pour reproduire, ou une preuve de concept minimale ;
- la version ou le commit testé.

## Ce que vous pouvez attendre

- Un accusé de réception sous **5 jours ouvrés**.
- Une première évaluation (confirmée, non reproductible, hors périmètre) sous **14 jours**.
- Un correctif aussi vite que possible selon la gravité, et une information de votre part
  avant toute publication.

Il s'agit d'un projet maintenu par une petite équipe, ces délais sont donc des objectifs et
non des garanties.

## Périmètre

Sont concernés :

- le code de ce dépôt (application Next.js, Sanity Studio, routes API) ;
- le site de production et ses déploiements de prévisualisation.

Ne sont pas concernés :

- les vulnérabilités qui n'affectent que des outils de développement ou la CI et qui ne sont
  pas exploitables en production ;
- les problèmes dans des services tiers (Sanity, Vercel, GitHub) : merci de les signaler
  directement à leurs équipes ;
- l'ingénierie sociale, les attaques par déni de service volumétrique et les tests qui
  dégradent le service pour les autres lecteurs.

## Versions prises en charge

Seule la branche `main`, déployée en production, reçoit des correctifs de sécurité.

## Dépendances

Les dépendances sont surveillées par Dependabot. Les alertes sont traitées par ordre de
gravité ; les correctifs de dépendances critiques ou élevées sont prioritaires.
