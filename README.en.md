<h1 align="center">SportSee — User Profile Dashboard</h1>

<p align="center"><strong>Languages:</strong> <a href="README.md">English</a> | <a href="README.fr.md">Français</a></p>

<p align="center">
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react" alt="React" /></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript" alt="TypeScript" /></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/Node.js-16+-339933?style=flat-square&logo=node.js" alt="Node.js" /></a>
  <a href="https://vitejs.dev"><img src="https://img.shields.io/badge/Vite-5.0+-646CFF?style=flat-square&logo=vite" alt="Vite" /></a>
  <a href="https://recharts.org"><img src="https://img.shields.io/badge/Recharts-2.0+-8884D8?style=flat-square" alt="Recharts" /></a>
  <a href="./public/mockup"><img src="https://img.shields.io/badge/Mockup-public%2Fmockup-FF6B6B?style=flat-square&logo=figma&logoColor=white" alt="Mockup" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" /></a>
  <a href="https://github.com"><img src="https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square" alt="Status" /></a>
</p>

<p align="center">
  <img src="public/mockup/mockup.png" alt="Sportsee responsive mockup" width="1024" />
</p>

## 📋 Overview

SportSee is a responsive fitness tracking dashboard that displays user activity, performance metrics, and key health indicators. Built with **React + TypeScript**, it features real-time data fetching from a Node.js backend API.

### Current Scope

- ✅ Desktop layout (1024x780px minimum)
- ✅ 15 implemented user stories
- ⏳ Mobile/tablet versions planned for next sprint

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Backend API running (see `/Backend` folder)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Charts/         # Chart components (BarChart, LineChart, RadarChart, RadialChart)
│   ├── Layout/         # Navigation and page layout
│   └── MetricCard/     # Key metrics display cards
├── pages/              # Page-level components
│   ├── Home/
│   └── Profile/        # Main dashboard page
├── client/             # API client services
│   ├── apiClient.ts    # HTTP client using Axios
│   ├── mockClient.ts   # Mock data for development
│   └── builders.ts     # Data transformation builders
├── data/               # Mock data
├── loaders/            # React Router loaders for data fetching
├── types/              # TypeScript type definitions
├── constants/          # App constants
└── helpers/            # Utility functions
```

## 🎯 Key Features (15 User Stories)

### Layout & Navigation

- **US#1**: Horizontal navigation bar with links (Accueil, Profil, Réglage, Communauté)
- **US#2**: Vertical icon sidebar with activity type buttons
- **US#3**: Desktop-optimized layout (1024x780px minimum)

### User Dashboard

- **US#4**: Personalized greeting with user's first name
- **US#5**: User information from `/user/:id` endpoint
- **US#10**: Key metrics cards (Calories, Proteins, Carbs, Fats)

### Data Fetching

- **US#6**: Daily activity data from `/user/:id/activity`
- **US#7**: Average session duration from `/user/:id/average-sessions`
- **US#8**: Daily score completion from `/user/:id`
- **US#9**: Performance metrics from `/user/:id/performance`

### Charts & Visualizations

- **US#11**: BarChart — Daily activity (weight & calories)
- **US#12**: LineChart — Average session duration trend
- **US#13**: RadarChart — Performance by activity type
- **US#14**: RadialBarChart — Daily objective completion score
- **US#15**: Metric cards — Key health figures with icons

## 📚 Documentation

**[View Complete API Documentation →](https://steinshy.github.io/SportSee/jdocs/)**
Generated with [TypeDoc](https://typedoc.org/) | Full function signatures, parameter types, and examples

## 🔌 API Integration

### Data Sources

The application fetches data from 4 main endpoints:

```typescript
// User information
GET /user/:id
→ Returns: userInfos, score/todayScore, keyData

// Daily activity
GET /user/:id/activity
→ Returns: sessions[] with day, kilogram, calories

// Average session duration
GET /user/:id/average-sessions
→ Returns: sessions[] with day (1-7), sessionLength

// Performance data
GET /user/:id/performance
→ Returns: kind (1-6 mapping), data[] with value and kind
```

### Mock vs Real API

**Development** — Uses mock data (`src/data/mockData.ts`):

```bash
npm run dev
```

**Production** — Switches to real API via environment configuration in `apiClient.ts`

### Data Normalization

The client standardizes data before component consumption:

- Normalizes `score`/`todayScore` field to single field
- Formats numbers (e.g., 1930 → "1,930 kCal")
- Maps performance categories (cardio, energy, endurance, strength, speed, intensity)

## 📊 Chart Components

### ActivityBarChart

Displays daily weight and calorie burn with dual-axis bars.

- Left Y-axis: Calories
- Right Y-axis: Weight (kg)
- Hover tooltip with values

### SessionLineChart

Shows average session duration trend across the week.

- Animated gradient background
- Curved line with hover effects
- White data point indicator

### PerformanceRadarChart

6-axis radar chart displaying performance across categories.

- Dark background
- Red filled polygon
- White labels for each axis

### ScoreRadialChart

Circular progress indicator for daily objective completion.

- Red arc on light background
- Center percentage text
- Rounded end caps

## 🛠️ Development Guidelines

### Data Flow

1. Route loader fetches data from API/mock client
2. Components receive data via `useLoaderData()`
3. Data is formatted and displayed in charts/cards

### Adding New Features

- Create components in `src/components/`
- Use `src/client/` for API calls (never call API directly from components)
- Define types in `src/types/`

### Code Standards

- Use TypeScript for type safety
- Components are functional with hooks
- Styles organized by component

## 🔄 Data Models

```typescript
// Main user data
UserMainData {
  userInfos: { firstName, lastName, age }
  score | todayScore: number (0-1)
  nutritionData: { calorieCount, proteinCount, carbohydrateCount, lipidCount }
}

// Activity sessions
ActivitySession {
  day: number | string
  kilogram: number
  calories: number
}

// Performance
PerformanceData {
  kind: Record<number, string>
  data: Array<{ value: number, kind: number }>
}
```

## 🌍 Browser Support

- Modern browsers (ES2020+)
- Desktop browsers (Chrome, Firefox, Safari, Edge)

## 📝 Dependencies

### Core

- **React 18+**: UI framework
- **React Router**: Client-side routing
- **TypeScript**: Static typing

### Data & HTTP

- **Axios**: HTTP client
- **Recharts**: Chart visualization library

### Build & Dev

- **Vite**: Build tool and dev server
- **ESLint**: Code linting

## 📚 Available Scripts

| Command            | Purpose                  |
| ------------------ | ------------------------ |
| `npm run dev`      | Start development server |
| `npm run build`    | Build for production     |
| `npm run preview`  | Preview production build |
| `npm run lint`     | Run ESLint               |
| `npm run lint:fix` | Fix linting issues       |

## 🚀 Deployment

Build the production bundle:

```bash
npm run build
```

The `dist/` folder contains the optimized build ready for deployment.

## 📖 Next Steps

- Mobile & tablet responsive design (next sprint)
- Additional user story implementations
- Performance optimization
- E2E testing with Playwright

## 📞 Support & Contribution

For questions or issues, refer to the project requirements in `.oc/Kanban.md` and design mockups in `.oc/`.

---

**Built with ❤️ using React, TypeScript, and Recharts**
