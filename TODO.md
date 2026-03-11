# TODO — SportSee Dashboard

## Layout & Navigation

- [ ] **US#1 — Horizontal nav bar**
  - Black background, full-width, top of page
  - SportSee logo on the left
  - Links: Accueil, Profil, Réglage, Communauté
  - White text, spaced evenly

- [ ] **US#2 — Vertical icon sidebar**
  - Left side, dark background, full height below nav bar
  - 4 icon buttons stacked vertically: yoga, swim, bike, fitness (SVGs in `public/assets/`)
  - "Copyright, SportSee 2020" rotated vertically at the bottom

- [ ] **US#3 — Desktop layout (min 1024x780)**
  - No mobile/tablet needed for now
  - Dashboard grid: sidebar left, main content center, key info cards right
  - Must be readable at 1024x780 minimum

## Data Layer (mock-first → then real API)

- [ ] **TypeScript types** — define interfaces for all API response shapes
  - `UserMainData`, `UserActivity`, `UserAverageSessions`, `UserPerformance`
  - Normalized types for component consumption (standardized score field, French kind labels)

- [ ] **Mock data** — local copy of `Backend/app/data.js` as typed TS
  - Mirror exact API response shape for users 12 and 18
  - Used during development before backend integration

- [ ] **Data service layer** (`src/services/`)
  - All calls outside React components (use Axios)
  - One function per endpoint: `getUserInfo(id)`, `getUserActivity(id)`, `getUserAverageSessions(id)`, `getUserPerformance(id)`
  - Toggle between mock data and real API (env var or config flag)

- [ ] **US#5 — Fetch user info** — `GET /user/:id`
  - Returns: `userInfos` (firstName, lastName, age), `score` or `todayScore`, `keyData` (calorieCount, proteinCount, carbohydrateCount, lipidCount)

- [ ] **US#6 — Fetch daily activity** — `GET /user/:id/activity`
  - Returns: `sessions[]` with `day`, `kilogram`, `calories`

- [ ] **US#7 — Fetch average sessions** — `GET /user/:id/average-sessions`
  - Returns: `sessions[]` with `day` (1-7), `sessionLength` (minutes)

- [ ] **US#9 — Fetch performance** — `GET /user/:id/performance`
  - Returns: `kind` (1-6 mapping to category names), `data[]` with `value` and `kind`
  - Categories: cardio, energy, endurance, strength, speed, intensity

- [ ] **US#8 — Normalize score field**
  - User 12 uses `todayScore`, user 18 uses `score` — standardize to a single field
  - Value is a float 0-1 representing completion percentage

- [ ] **US#10 — Extract key figures from user info**
  - Key data comes from `GET /user/:id` → `keyData` object
  - `calorieCount` (format: "X,XXXkCal"), `proteinCount` (Xg), `carbohydrateCount` (Xg), `lipidCount` (Xg)

- [ ] **Data standardization/formatting**
  - Normalize API differences between users before components consume them
  - Format numbers for display (e.g., 1930 → "1,930kCal")

## Charts (Recharts)

- [ ] **US#11 — BarChart: Activité quotidienne**
  - Title: "Activité quotidienne"
  - Legend: "Poids (kg)" (black dots) + "Calories brûlées (kCal)" (red dots)
  - X-axis: day numbers (1-10), Y-axis left: calories, Y-axis right: weight (kg) with range ~69-71
  - Black bars = weight, red bars = calories, side by side per day
  - Tooltip on hover showing "Xkg" and "XkCal" values
  - Light gray background highlight on hovered day group
  - Rounded bar tops

- [ ] **US#12 — LineChart: Durée moyenne des sessions**
  - Title: "Durée moyenne des sessions" (white text on red background)
  - Red gradient background card
  - X-axis: days of week (L, M, M, J, V, S, D)
  - White curved line showing session duration trend
  - Tooltip on hover showing "X min"
  - Area to the right of cursor point darkened on hover
  - White dot on the active data point

- [ ] **US#13 — RadarChart: Type d'activité**
  - Dark background (near black)
  - 6 axes: Intensité (top), Vitesse (top-right), Force (bottom-right), Endurance (bottom), Énergie (bottom-left), Cardio (top-left)
  - Red filled polygon showing performance values
  - White labels for each axis

- [ ] **US#14 — RadialBarChart: Score**
  - Title: "Score" at top-left
  - Red arc on light background showing completion percentage
  - Center text: "X%" in large bold + "de votre objectif" below
  - Arc starts from top (12 o'clock position)
  - Rounded end caps on the arc

## UI Components

- [ ] **US#4 — User greeting**
  - "Bonjour" in black + firstName in red (from `GET /user/:id` → `userInfos.firstName`)
  - Below: "Félicitation ! Vous avez explosé vos objectifs hier 👏"

- [ ] **US#15 — Key info cards** (right sidebar, 4 cards stacked vertically)
  - Each card: colored icon on left, value + label on right
  - Calories: fire icon (red bg), "X,XXXkCal" + "Calories"
  - Protéines: chicken icon (blue bg), "Xg" + "Protéines"
  - Glucides: apple icon (yellow bg), "Xg" + "Glucides"
  - Lipides: burger icon (pink bg), "Xg" + "Lipides"
  - Icons available in `public/assets/` (energy.svg, proteines.svg, apple.svg, lipides.svg)
