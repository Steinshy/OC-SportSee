# SportSee — Backend Micro API

Express.js micro API serving mocked sports analytics data for the SportSee dashboard.

## Prerequisites

- [Node.js](https://nodejs.org/) v12.18+ (tested up to v20)
- npm or [Yarn](https://yarnpkg.com/)

> Using multiple Node versions? Consider [nvm](https://github.com/nvm-sh/nvm).

## Getting Started

```bash
# Install dependencies
npm install   # or: yarn

# Start the server (port 3000)
npm run start # or: yarn dev
```

The API will be available at **http://localhost:3000**.

## Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/user/:id` | User info, daily score, and key nutritional data |
| GET | `/user/:id/activity` | Daily activity (weight in kg, calories burned) |
| GET | `/user/:id/average-sessions` | Average session duration per weekday (Mon–Sun) |
| GET | `/user/:id/performance` | Performance metrics (energy, endurance, etc.) |

> **Only two users are mocked:** IDs **12** and **18**.

### Example Requests

```
GET http://localhost:3000/user/12
GET http://localhost:3000/user/12/activity
GET http://localhost:3000/user/18/performance
GET http://localhost:3000/user/18/average-sessions
```

---

# SportSee — Micro API Backend

Micro API Express.js fournissant des données sportives mockées pour le tableau de bord SportSee.

## Prérequis

- [Node.js](https://nodejs.org/) v12.18+ (testé jusqu'à v20)
- npm ou [Yarn](https://yarnpkg.com/)

> Vous utilisez plusieurs versions de Node ? Pensez à [nvm](https://github.com/nvm-sh/nvm).

## Démarrage

```bash
# Installer les dépendances
npm install   # ou : yarn

# Lancer le serveur (port 3000)
npm run start # ou : yarn dev
```

L'API sera accessible à l'adresse **http://localhost:3000**.

## Endpoints disponibles

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/user/:id` | Infos utilisateur, score du jour et données nutritionnelles |
| GET | `/user/:id/activity` | Activité quotidienne (poids en kg, calories brûlées) |
| GET | `/user/:id/average-sessions` | Durée moyenne des sessions par jour de la semaine (lun.–dim.) |
| GET | `/user/:id/performance` | Indicateurs de performance (énergie, endurance, etc.) |

> **Seuls deux utilisateurs sont mockés :** IDs **12** et **18**.

### Exemples de requêtes

```
GET http://localhost:3000/user/12
GET http://localhost:3000/user/12/activity
GET http://localhost:3000/user/18/performance
GET http://localhost:3000/user/18/average-sessions
```
