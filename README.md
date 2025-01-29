# Test Technique chez LikeWatt

Réalisation d’un test technique dans le cadre du processus de recrutement chez LikeWatt. Ce test a été développé en utilisant les technologies suivantes :

- Next.js
- Typescript
- TailwindCSS
- Shadcn
- Framer Motion (Pour le Loader)
- Redux
- Jest
- Cypress (E2E)
- Zod

## Installation

Cloner le projet :

```bash
# SSH
git@github.com:PikkMoune71/likewatt-test.git
```

```bash
# HTTPS
https://github.com/PikkMoune71/likewatt-test.git
```

```bash
cd likewatt-test
```

## Créer un .env

Dans le .env à la racine du projet et mettre les variables importantes :

```bash
  NEXT_PUBLIC_LIKEWATT_API_URL=url_likewatt_test
  NEXT_PUBLIC_OPENWEATHER_API_URL=https://api.openweathermap.org/data/2.5/forecast
  NEXT_PUBLIC_OPENWEATHER_API_KEY=api_key_openweather
```

## Développement

Pour lancer le projet en mode Développement :

pnpm :

```bash
pnpm install
```

```bash
pnpm dev
```

## Lint & Test

Avant de build, il est nécessaire de lint les erreurs :

```bash
pnpm lint
```

et lancer les tests :

```bash
pnpm test
```

Pour les test E2E avec cypress :

```bash
pnpm cypress open
```

Puis choisir E2E testing et le navigateur Google Chrome.

## Production

Pour lancer le projet en mode production :

```bash
pnpm build
```

## Documentation

Cette mini application permet de visualiser et modifier des données de panneaux solaires à travers deux sections distinctes dans l'interface utilisateur. Sur la gauche, un tableau de données est affiché de manière non-éditable, tandis que sur la droite, un formulaire permet de modifier les valeurs affichées. En plus de ces tableaux, une fonctionnalité météo est ajoutée pour afficher les prévisions météorologiques sur 5 jours basées sur la localisation de l'utilisateur à l'aide de l'API OpenWeather.

Voici un aperçu des wireframes que j'ai réalisés sur Figma, afin d'obtenir une première vision de l'application :  
[Accédez au lien Figma ici](https://www.figma.com/design/rgmRAdxtR5gQUX3JjffhVm/Test-Technique-LikeWatt?node-id=0-1&t=3KMv4JUvSEKkZ5Kb-1).

### Fonctionnalités

#### Visualisation des données

Au chargement de l'application, les données sont récupérées depuis une API externe et stockées dans le store Redux. Ces données sont ensuite extraites du store et affichées dans un tableau non-éditable situé à gauche de l'écran.

#### Édition des données

À droite de l'écran, un tableau similaire est disponible, mais il permet de modifier les données. Chaque ligne du tableau comporte :

- Un label.
- Un input texte pour saisir des valeurs.
- Un input numérique avec bornes (pour les valeurs dans une plage spécifique).
- Un input numérique sans borne (pour les valeurs libres).
- Une case à cocher.
- Un bouton supprimer pour retirer une ligne du tableau.

#### Affichage de la météo

Un composant dédié affiche la météo actuelle sur 5 jours pour la localisation de l'utilisateur. La localisation est détectée automatiquement grâce aux fonctionnalités de géolocalisation du navigateur. Les données météo proviennent de l'API OpenWeather.

### Composant Principaux

#### PanelList

Ce composant affiche les données récupérées depuis l'API sous forme d'un tableau non-éditable. Il sert simplement à visualiser les informations et à les afficher à l'utilisateur.

#### PanelEditor

Ce composant permet à l'utilisateur d'éditer les données visibles dans le tableau. Chaque ligne du tableau contient plusieurs types d'inputs (texte, numérique, case à cocher, bouton supprimer) permettant de modifier les données et de les mettre à jour. Pour la vérification du formulaire, j'ai utilisé la librairie Zod.

#### WeatherForecast

Ce composant affiche les prévisions météo actuelles pour la position géographique de l'utilisateur. Il utilise l'API OpenWeather pour récupérer les données météorologiques sur 5 jours.

### Déploiement du projet

Le déploiement du projet est automatisé à l'aide de Vercel et d'un workflow GitHub. Dès qu'un merge est effectué sur la branche main, le processus de déploiement est déclenché. Ce processus comporte deux étapes clés :

#### Linting et Tests

Lors du lancement du workflow, les étapes de lint et de tests sont exécutées. Si ces étapes sont validées avec succès, le processus passe à l'étape suivante.

#### Déploiement sur Vercel

Si les étapes de linting et de tests sont réussies, le déploiement automatique de l'application est effectué sur Vercel. Une fois cette étape validée, l'application est accessible via le lien suivant : https://likewatt-test.vercel.app/.
