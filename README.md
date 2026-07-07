<h1 align="center">SportSee — Tableau de Bord du Profil Utilisateur</h1>

<p align="center"><strong>Languages:</strong> <a href="README.md">Français</a> | <a href="README.en.md">English</a></p>

<p align="center">
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React" /></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript" alt="TypeScript" /></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=node.js" alt="Node.js" /></a>
  <a href="https://pnpm.io"><img src="https://img.shields.io/badge/pnpm-10-F69220?style=flat-square&logo=pnpm&logoColor=white" alt="pnpm" /></a>
  <a href="https://vitejs.dev"><img src="https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite" alt="Vite" /></a>
  <a href="https://recharts.org"><img src="https://img.shields.io/badge/Recharts-3-8884D8?style=flat-square" alt="Recharts" /></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" /></a>
  <a href="https://github.com"><img src="https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square" alt="Status" /></a>
</p>

<p align="center">
  <img src="public/mockup/mockup.png" alt="Sportsee responsive mockup" width="1024" />
</p>

## 📋 Présentation

SportSee est un tableau de bord de suivi des performances sportives qui affiche l'activité de l'utilisateur, les métriques de performance et les indicateurs de santé clés. Construit avec **React + TypeScript**, il offre la récupération de données en temps réel à partir d'une API backend Node.js.

### Périmètre Actuel

- ✅ Mise en page desktop (1024x780px minimum)
- ✅ 15 user stories implémentées
- ✅ Adaptations mobile et tablette (points de rupture 768px / 420px)

## 🚀 Démarrage

### Prérequis

- Node.js 20+ et [pnpm](https://pnpm.io) 10 (`corepack enable`)
- API backend en cours d'exécution (voir dossier `/Backend`) si `VITE_USE_API=true`

### Installation

```bash
# Installer les dépendances
pnpm install

# Démarrer le serveur de développement
pnpm dev

# Démarrer le front + le backend ensemble
pnpm dev:all

# Construire pour la production
pnpm build

# Aperçu de la build production
pnpm preview

# Lancer le linting
pnpm lint
```

## 📁 Structure du Projet

```
src/
├── components/          # Composants React réutilisables
│   ├── Charts/         # Composants graphiques (BarChart, LineChart, RadarChart, RadialChart)
│   ├── Layout/         # Navigation et mise en page
│   └── MetricCard/     # Cartes de métriques clés
├── pages/              # Composants au niveau des pages
│   ├── Home/
│   └── Profile/        # Page du tableau de bord principal
├── client/             # Services clients API
│   ├── apiClient.ts    # Client HTTP utilisant Axios
│   ├── mockClient.ts   # Données de test pour le développement
│   └── builders.ts     # Transformateurs de données
├── data/               # Données de test
├── loaders/            # React Router loaders pour la récupération de données
├── types/              # Définitions de types TypeScript
├── constants/          # Constantes de l'application
└── helpers/            # Fonctions utilitaires
```

## 🎯 Fonctionnalités Clés (15 User Stories)

### Mise en Page et Navigation

- **US#1** : Barre de navigation horizontale avec liens (Accueil, Profil, Réglage, Communauté)
- **US#2** : Barre latérale verticale avec boutons de type d'activité
- **US#3** : Mise en page optimisée desktop (1024x780px minimum)

### Tableau de Bord Utilisateur

- **US#4** : Salutation personnalisée avec le prénom de l'utilisateur
- **US#5** : Informations utilisateur du endpoint `/user/:id`
- **US#10** : Cartes de métriques clés (Calories, Protéines, Glucides, Lipides)

### Récupération de Données

- **US#6** : Données d'activité quotidienne de `/user/:id/activity`
- **US#7** : Durée moyenne des sessions de `/user/:id/average-sessions`
- **US#8** : Score quotidien de `/user/:id`
- **US#9** : Métriques de performance de `/user/:id/performance`

### Graphiques et Visualisations

- **US#11** : BarChart — Activité quotidienne (poids et calories)
- **US#12** : LineChart — Tendance de la durée moyenne des sessions
- **US#13** : RadarChart — Performance par type d'activité
- **US#14** : RadialBarChart — Score de réalisation de l'objectif quotidien
- **US#15** : Cartes de métriques — Chiffres clés de santé avec icônes

## 📚 Documentation

**[Voir la Documentation Complète de l'API →](https://steinshy.github.io/OC-SportSee/jdocs/)**
Générée avec [TypeDoc](https://typedoc.org/) via `pnpm docs` (dossier `docs/` non versionné, publié par la CI sous `/jdocs`)

## 🔌 Intégration API

### Sources de Données

L'application récupère les données à partir de 4 endpoints principaux :

```typescript
// Informations utilisateur
GET /user/:id
→ Retourne : userInfos, score/todayScore, keyData

// Activité quotidienne
GET /user/:id/activity
→ Retourne : sessions[] avec day, kilogram, calories

// Durée moyenne des sessions
GET /user/:id/average-sessions
→ Retourne : sessions[] avec day (1-7), sessionLength

// Données de performance
GET /user/:id/performance
→ Retourne : kind (1-6 mapping), data[] avec value et kind
```

### API Mockée vs Réelle

La source de données est choisie à la build via la variable d'environnement `VITE_USE_API` :

- `.env` (développement) : `VITE_USE_API=true` → appels HTTP vers `VITE_API_URL` (backend local, port 3000). Passez à `false` pour utiliser les données de test (`src/data/mockData.ts`, utilisateurs 12 et 18).
- `.env.production` : `VITE_USE_API=false` → la build déployée sur GitHub Pages utilise les données mockées (aucun backend disponible).

### Normalisation des Données

Le client standardise les données avant leur consommation par les composants :

- Normalise le champ `score`/`todayScore` en un seul champ
- Formate les nombres (ex. 1930 → "1,930 kCal")
- Mappe les catégories de performance (cardio, énergie, endurance, force, vitesse, intensité)

## 📊 Composants Graphiques

### ActivityBarChart

Affiche le poids quotidien et la consommation de calories avec des barres à double axe.

- Axe Y gauche : Calories
- Axe Y droit : Poids (kg)
- Tooltip au survol avec les valeurs

### SessionLineChart

Affiche la tendance de la durée moyenne des sessions sur la semaine.

- Arrière-plan dégradé animé
- Ligne courbe avec effets au survol
- Indicateur de point de données blanc

### PerformanceRadarChart

Graphique radar à 6 axes affichant les performances par catégorie.

- Arrière-plan sombre
- Polygone rempli de rouge
- Étiquettes blanches pour chaque axe

### ScoreRadialChart

Indicateur de progression circulaire pour la réalisation de l'objectif quotidien.

- Arc rouge sur fond clair
- Pourcentage au centre
- Extrémités arrondies

## 🛠️ Directives de Développement

### Flux de Données

1. Le loader de route récupère les données à partir du client API/mock
2. Les composants reçoivent les données via `useLoaderData()`
3. Les données sont formatées et affichées dans les graphiques/cartes

### Ajouter de Nouvelles Fonctionnalités

- Créer des composants dans `src/components/`
- Utiliser `src/client/` pour les appels API (jamais directement depuis les composants)
- Définir les types dans `src/types/`

### Normes de Code

- Utiliser TypeScript pour la sécurité des types
- Les composants sont fonctionnels avec hooks
- Les styles organisés par composant

## 🔄 Modèles de Données

```typescript
// Données principales de l'utilisateur
UserMainData {
  userInfos: { firstName, lastName, age }
  score | todayScore: number (0-1)
  nutritionData: { calorieCount, proteinCount, carbohydrateCount, lipidCount }
}

// Sessions d'activité
ActivitySession {
  day: string
  kilogram: number
  calories: number
}

// Performance
UserPerformance {
  categories: Record<number, string>
  data: Array<{ value: number, type: number }>
}
```

## 🌍 Support des Navigateurs

- Navigateurs modernes (ES2020+)
- Navigateurs desktop (Chrome, Firefox, Safari, Edge)

## 📝 Dépendances

### Core

- **React 19** : Framework UI
- **React Router** : Routage côté client
- **TypeScript** : Typage statique

### Données & HTTP

- **Axios** : Client HTTP
- **Recharts** : Bibliothèque de visualisation de graphiques

### Build & Dev

- **Vite** : Outil de build et serveur de développement
- **ESLint** : Linting de code

## 📚 Scripts Disponibles

| Commande           | Objectif                                |
| ------------------ | --------------------------------------- |
| `pnpm dev`         | Démarrer le serveur de développement    |
| `pnpm dev:all`     | Démarrer le front + le backend          |
| `pnpm build`       | Construire pour la production           |
| `pnpm preview`     | Aperçu de la build production           |
| `pnpm lint`        | Exécuter ESLint                         |
| `pnpm lint:fix`    | Corriger les problèmes de linting       |
| `pnpm lint:styles` | Linter les feuilles de style (Stylelint) |
| `pnpm format`      | Formater le code avec Prettier          |
| `pnpm docs`        | Générer la documentation TypeDoc        |

## 🚀 Déploiement

Le déploiement est automatisé : chaque push sur `main` construit et publie l'application sur GitHub Pages (`.github/workflows/deploy.yml`), documentation TypeDoc incluse sous `/jdocs`.

Build manuelle :

```bash
pnpm build
```

Le dossier `dist/` contient la build optimisée prête pour le déploiement (avec rapport de bundle `dist/stats.html`).

## 📖 Prochaines Étapes

- Implémentations supplémentaires de user stories
- Tests unitaires et E2E

## 📞 Support et Contribution

Pour des questions ou des problèmes, consultez les exigences du projet dans `.oc/Kanban.md` et les maquettes de conception dans `.oc/`.

---

**Construit avec ❤️ en utilisant React, TypeScript et Recharts**
