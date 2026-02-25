# ⚾ Baseball Pomodoro

A focus timer built around the Pomodoro Technique, themed entirely around baseball. Every completed focus session earns you a hit — a Single, Double, Triple, or Home Run — turning your workday into a box score.

Built as a single React component, designed to eventually ship as a native iOS app and PWA.

---

## What It Does

Baseball Pomodoro is a productivity timer where your focus sessions map to at-bats. Complete a session and you get a randomly awarded hit, with probability weighted toward Singles and away from Home Runs — just like real baseball. Your stats accumulate throughout the day and across your career, giving you a running record of your focus history.

The app runs inside a simulated iPhone frame in the browser. Three themes are available: Day Game, Statsheet, and Bananas.

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

## Tech Stack

- **React** (hooks only, no external state library)
- **Web Audio API** — all sounds synthesized in-browser, no audio files
- **CSS-in-JS** — all styles injected via a `<style>` tag, theme-aware via template literals
- **localStorage** — persistence for preferences, today's stats, career stats, and player name
- **requestAnimationFrame** — arc progress ring updated at 60fps without React re-renders
- **Barlow Condensed** — Google Font used throughout

No build tool required for development. Runs directly as a React artifact.

---

## Running Locally

This is a single `.jsx` file designed to run in a React environment. To run it locally:

```bash
npx create-react-app baseball-pomodoro
cd baseball-pomodoro
# Replace src/App.js contents with the contents of baseball-pomodoro.jsx
npm start
```

Or drop it into any React sandbox (CodeSandbox, StackBlitz, etc.) with the default export wired up.

---

## Project Structure

The entire app lives in `baseball-pomodoro.jsx`. Internal structure:

```
THEMES                  — Token objects for all three themes
STATS / HR_CALLS        — Hit type definitions and flavor text
getRandomStat()         — Weighted random hit selection
Confetti                — HR confetti component
PlayerName              — Inline editable name component
Ticker                  — Collapsible play-by-play log
DurationStepper         — +/− stepper control for settings
SettingsPanel           — Slide-up settings drawer
BaseballPomodoro        — Main component (state, audio, timer, UI)
```

---

## localStorage Keys

| Key | Contents |
|---|---|
| `ballpark_prefs_v1` | workMins, breakMins, theme, sound on/off |
| `ballpark_name` | Player name string |
| `ballpark_today` | `{ date, atBats, stats }` — resets at midnight |
| `ballpark_lifetime_v1` | `{ focusSecs, hits: { 1B, 2B, 3B, HR } }` |

---

## Themes

Three themes ship with V1:

- **Day Game** — Dark forest green with gold accents. Bold and high-contrast.
- **Statsheet** — Warm parchment paper with vintage ink red accents. Light and readable.
- **Bananas** — Bright yellow with dark brown and deep teal accents. Fun and energetic.

All theme colors pass WCAG AA contrast (4.5:1 minimum) across every surface including settings panels, break mode backgrounds, and floating chip animations.

---

## Roadmap

- [ ] PWA manifest + service worker (installable from browser)
- [ ] Streak tracking (consecutive days of focus)
- [ ] Session history persistence across refreshes
- [ ] React Native conversion for App Store submission
- [ ] Background timer support (Web Worker / native background tasks)
- [ ] Dynamic Island / Live Activity integration (iOS native)
- [ ] Haptic feedback (native only)
- [ ] Keyboard focus trapping in settings panel (web accessibility)
- [ ] Onboarding screen for first-time users
- [ ] Additional themes

---

## License

MIT
