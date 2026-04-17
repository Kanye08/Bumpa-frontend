# Bumpa Loyalty — Frontend

A React + Vite single-page application for the Bumpa Loyalty Program. Displays a customer's unlocked achievements, current badge, progress toward the next badge, and lets you simulate purchases to test the loyalty engine.

---

## Tech Stack

- **React 18**
- **Vite 5** — dev server and bundler
- **React Router v6** — client-side routing
- **Vanilla CSS** — no UI library, fully custom design
- **Google Fonts** — Syne (headings) + DM Sans (body)

---

## Requirements

- Node.js 18 or higher
- npm 9+ (or yarn)
- The backend API running at `http://localhost:8000` (see `/backend/README.md`)

---

## Installation

```bash
# 1. Move into the frontend directory
cd bumpa-achievement-dashboard

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**.

---

## Environment Variables

Create a `.env` file (copy from `.env.example`):

```env
VITE_API_URL=http://localhost:8000/api
```

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:8000/api` | Base URL of the Laravel backend API |

---

## Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production (outputs to /dist)
npm run build

# Preview the production build locally
npm run preview
```

---

## Project Structure

```
frontend/
├── index.html                  # App entry point (loads fonts, mounts root)
├── vite.config.js              # Vite config + API proxy
├── .env.example
└── src/
    ├── main.jsx                # React root — wraps app in BrowserRouter
    ├── App.jsx                 # Top-level: routes between Auth and Dashboard
    ├── index.css               # All styles (CSS variables, components, responsive)
    │
    ├── api/
    │   └── client.js           # All fetch calls in one place — login, register, achievements, purchases
    │
    ├── hooks/
    │   └── useAuth.js          # Auth state: user, login(), register(), logout()
    │
    ├── pages/
    │   ├── AuthPage.jsx        # Login / Register form with tab switcher
    │   └── DashboardPage.jsx   # Main loyalty dashboard
    │
    └── components/
        ├── BadgeCard.jsx       # Current badge display + progress bar toward next badge
        ├── AchievementGrid.jsx # Grid of unlocked and locked achievement chips
        └── PurchaseSimulator.jsx # Form to record a purchase and trigger the loyalty engine
```

---

## Pages & Components

### `AuthPage`
Handles both login and registration in a single tabbed form. On success, stores the Sanctum API token in `localStorage` and redirects to the dashboard.

### `DashboardPage`
The main view after login. Fetches the user's loyalty summary from `GET /api/users/{id}/achievements` and renders three child components side by side.

### `BadgeCard`
Displays:
- The user's current badge name and icon
- The name of the next badge to earn
- An animated progress bar showing how many achievements remain

### `AchievementGrid`
Two sections:
- **Unlocked** — green chips for each achievement the user has earned
- **Still to Unlock** — grey chips for achievements not yet earned

### `PurchaseSimulator`
A form for testing the loyalty engine. Choose a preset amount (₦500, ₦1,000, ₦5,000, ₦10,000) or type a custom value. Hitting **Record Purchase** calls `POST /api/purchases` and instantly updates the dashboard with the returned summary — no page refresh needed.

---

## Authentication Flow

```
App loads
  └── useAuth checks localStorage for token
        ├── Token found → GET /api/me → set user → show Dashboard
        └── No token    → show AuthPage

User logs in / registers
  └── POST /api/login or /api/register
        └── token saved to localStorage → user set → Dashboard shown

User logs out
  └── POST /api/logout → token deleted from localStorage → AuthPage shown
```

---

## API Integration

All API calls live in `src/api/client.js`. The token is read from `localStorage` and attached as a Bearer header automatically on every request.

```js
// Example — manually calling the API
import { api } from './api/client'

// Get achievements for user 1
const summary = await api.getAchievements(1)

// Record a ₦5000 purchase
const result = await api.makePurchase(5000)
```

Available methods:

| Method | Backend endpoint |
|--------|-----------------|
| `api.login(email, password)` | `POST /api/login` |
| `api.register(name, email, password)` | `POST /api/register` |
| `api.logout()` | `POST /api/logout` |
| `api.me()` | `GET /api/me` |
| `api.getAchievements(userId)` | `GET /api/users/{id}/achievements` |
| `api.makePurchase(amount)` | `POST /api/purchases` |
| `api.getPurchases()` | `GET /api/purchases` |

---

## Demo Credentials

Make sure the backend has been seeded (`php artisan db:seed`), then use:

```
Email:    demo@bumpa.com
Password: password
```

---

## Simulating Purchases

Use the **Purchase Simulator** widget on the dashboard to unlock achievements and badges:

| Purchase(s) | What unlocks |
|-------------|-------------|
| 1× any amount | First Purchase achievement |
| 5 purchases total | Shopper achievement |
| 1× ₦10,000 | Loyal Buyer achievement |
| 2 achievements reached | 🥉 Beginner badge + ₦300 cashback logged |
| 10 purchases total | Regular Customer achievement |
| 1× ₦50,000 | Big Spender achievement |
| 4 achievements reached | 🥈 Bronze badge + ₦300 cashback logged |
| 1× ₦100,000 | Champion achievement |
| 6 achievements reached | 🥇 Silver badge + ₦300 cashback logged |
| 25 purchases total | VIP achievement |
| 50 purchases total | Elite Member achievement |
| 8 achievements reached | 🏆 Gold badge + ₦300 cashback logged |

---

## Building for Production

```bash
npm run build
```
