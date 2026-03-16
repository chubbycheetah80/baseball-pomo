# ⚾ Baseball Pomodoro

A focus timer built around the Pomodoro Technique, themed entirely around baseball. Every completed focus session earns you a hit — a Single, Double, Triple, or Home Run — turning your workday into a box score.

Built as a single React component, currently deployed as a PWA (Progressive Web App) for mobile usability testing. Native iOS app planned.

---

## What It Does

Baseball Pomodoro is a productivity timer where your focus sessions map to at-bats. Complete a session and you get a randomly awarded hit, with probability weighted toward Singles and away from Home Runs — just like real baseball. Your stats accumulate throughout the day and across your career, giving you a running record of your focus history.

On desktop the app renders inside a simulated iPhone frame. On mobile it runs full-screen as a PWA installable to your home screen.

---

## The Baseball Metaphor

| Baseball Term | Pomodoro Meaning |
|---|---|
| At Plate | Focus session (work mode) |
| Dugout | Break session |
| At Bat (AB) | Completed focus session |
| Single / Double / Triple / HR | Hit type awarded at session end |
| Today's Scorecard | Stats for the current calendar day |
| Career Stats | Lifetime accumulated stats |

Hit probabilities: Single 45%, Double 30%, Triple 15%, Home Run 10%.

---

## Features

- **Three themes** — Day Game, Statsheet, Bananas
- **Sound design** — all sounds synthesized via Web Audio API, no audio files
- **Career milestones** — celebrated at every 100 HRs and every 1,000 career hits
- **HR distance** — every Home Run shows a realistic random distance (350–550 ft)
- **Play-by-play ticker** — collapsible log of all today's hits with timestamps
- **Floating chip animations** — hit type celebration on session completion
- **Splash screen** — shown on first launch after hard close
- **Full PWA support** — installable to iPhone/Android home screen
- **Mobile-responsive** — full-screen layout on real devices, simulated phone frame on desktop
- **Persistent stats** — today's scorecard, career stats, and settings all saved to localStorage
- **WCAG AA accessible** — all color pairings pass 4.5:1 contrast minimum

---

## Tech Stack

- **React** (hooks only, no external state library)
- **Web Audio API** — all sounds synthesized in-browser, no audio files
- **CSS-in-JS** — all styles injected via a style tag, theme-aware via template literals
- **localStorage** — persistence for preferences, today's stats, career stats, and player name
- **sessionStorage** — splash screen shown only on fresh hard close
- **requestAnimationFrame** — arc progress ring updated at 60fps without React re-renders
- **Vite** — build tool for the web deployment
- **Barlow Condensed** — Google Font used throughout

---

## Running Locally

```bash
git clone https://github.com/YOUR_USERNAME/baseball-pomodoro.git
cd baseball-pomodoro
npm install
npm run dev
```

---

## Project Structure

```
baseball-pomodoro/
├── src/
│   ├── App.jsx          — Full application (single component file)
│   └── main.jsx         — React entry point
├── public/
│   ├── manifest.json    — PWA manifest
│   └── icons/           — App icons (192px, 512px)
├── index.html           — HTML entry point with PWA meta tags
├── vite.config.js       — Vite configuration
├── package.json
├── README.md
├── PRODUCT.md
└── TECHNICAL.md
```

---

## localStorage Keys

| Key | Contents |
|---|---|
| `ballpark_prefs_v1` | workMins, breakMins, theme, sound on/off |
| `ballpark_name` | Player name string |
| `ballpark_today` | { date, atBats, stats } — resets at midnight |
| `ballpark_lifetime_v1` | { focusSecs, hits: { 1B, 2B, 3B, HR } } |

---

## Themes

- **Day Game** — Dark forest green with gold accents.
- **Statsheet** — Warm parchment with vintage ink red accents.
- **Bananas** — Near-black with yellow, teal, and warm pink. Inspired by the Savannah Bananas.

All colors pass WCAG AA (4.5:1 minimum).

---

## Deploying to Vercel

1. Push to GitHub
2. Import repo at vercel.com — Vite is auto-detected
3. Deploy — every push to main redeploys automatically

---

## Installing as a PWA

**iPhone:** Open in Safari → Share → Add to Home Screen
**Android:** Open in Chrome → three dots → Add to Home Screen

---

## Roadmap

- [ ] Native iOS app via React Native / Expo
- [ ] Background timer support
- [ ] Push notifications on session end
- [ ] Dynamic Island integration (requires native Live Activities API)
- [ ] Streak tracking
- [ ] Session history persistence across refreshes
- [ ] PWA service worker for offline support
- [ ] App name and icon finalized
- [ ] App Store submission
- [ ] Haptic feedback (native)
- [ ] Onboarding screen
- [ ] Additional themes

---

## License

MIT
