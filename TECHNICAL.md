# Baseball Pomodoro — Technical Documentation

## Architecture Overview

The entire application is a single React component file (`src/App.jsx`). There is no build pipeline complexity, no external state library, no CSS framework, and no audio assets. Everything is self-contained.

### File Structure (within App.jsx)

```
Constants & Theme Tokens       
  THEMES object                All three theme token maps (~70 tokens each)
  STATS array                  Hit type definitions and weights
  HR_CALLS / HIT_CALLS         Flavor text per hit type

Pure Functions                 
  getRandomStat()              Weighted random hit selection
  getCall()                    Random flavor text for a hit key
  fmt()                        Seconds → "MM:SS" string

Sub-Components                 
  Confetti                     60-piece CSS animation confetti
  PlayerName                   Inline editable name with input toggle
  Ticker                       Collapsible play-by-play log
  DurationStepper              +/− minute stepper for settings
  SettingsPanel                Full slide-up settings drawer

Main Component                 
  BaseballPomodoro             State, effects, audio engine, UI
```

---

## Theme System

Themes are plain objects stored in a `THEMES` constant. Each theme contains ~70 named design tokens. The active theme is aliased as `T`:

```js
const T = THEMES[themeKey] || THEMES.dayGame;
```

All CSS is injected via a `<style>` tag inside the component render, using template literals with `T.tokenName` references. The entire visual appearance re-renders when the theme changes.

### Token Categories

| Prefix | Purpose |
|---|---|
| `phoneBg`, `phoneRing`, `wallBg` | Phone frame and desktop background |
| `scrollBg`, `scrollBgBreak` | Main content area per mode |
| `settingsBg` | Settings panel background |
| `navbar*` | Name, icon colors |
| `card*`, `stat*` | Scorecard and stat values |
| `ticker*`, `chip*` | Ticker log and history chips |
| `modeTab*` | Tab bar colors per state |
| `arc*` | Progress ring colors |
| `btn*` | Primary and reset buttons |
| `stepper*` | Duration stepper controls |
| `lifetime*` | Career stats section |
| `toggle*`, `badge*` | Settings toggles and badges |
| `reset*` | Career stats reset button |
| `chipBg`, `chipHRBg` | Floating hit chip colors |
| `soundIconColor` | Sound toggle icon |
| `cardDate` | Scorecard date label (distinct accent per theme) |

---

## State Reference

| State | Type | Purpose |
|---|---|---|
| `workMins` | number | Focus session duration |
| `breakMins` | number | Break session duration |
| `themeKey` | string | Active theme key |
| `isMobile` | boolean | True when viewport ≤ 500px |
| `mode` | "work" \| "break" | Current timer mode |
| `timeLeft` | number | Seconds remaining |
| `running` | boolean | Timer counting down |
| `atBats` | number | Today's completed sessions |
| `stats` | object | Today's hit counts per type |
| `lastStat` | object\|null | Most recently awarded hit |
| `confetti` | boolean | HR confetti active |
| `log` | array | In-memory play-by-play (up to 50) |
| `playerName` | string | Display name |
| `settingsOpen` | boolean | Settings panel visibility |
| `lifetime` | object | Career stats `{ focusSecs, hits }` |
| `floatingChips` | array | Active floating chip animations |
| `activeBanner` | object\|null | Currently showing banner `{ text }` |
| `soundOn` | boolean | Sound effects enabled |
| `showSplash` | boolean | Splash screen visible |
| `splashFading` | boolean | Splash screen fading out |

### Refs

| Ref | Purpose |
|---|---|
| `intervalRef` | setInterval handle for 1-second tick |
| `arcRef` | Direct DOM reference to SVG arc element |
| `rafRef` | requestAnimationFrame handle |
| `audioCtxRef` | Shared AudioContext instance |
| `bannerQueueRef` | Queue of pending banner messages |
| `bannerTimerRef` | setTimeout handle for banner sequencing |

---

## Mobile Layout System

The app uses an `isMobile` boolean state (true when `window.innerWidth <= 500`) to switch between desktop and mobile layouts via inline styles on key elements. CSS media queries proved unreliable due to specificity conflicts with base styles, so all critical mobile layout properties are applied as React inline styles directly.

Key mobile overrides:
- `.app-outer` — `display:block` (removes desktop flex centering)
- `.phone` — `width:100%`, `height:100dvh`, `overflow:hidden`, `display:flex`, `flexDirection:column`
- `.scroll` — `flex:1 1 0`, `minHeight:0`, `overflow:hidden`
- `.timer-ring` — 240px (vs 280px desktop)
- `.timer-digits` — 80px font (vs 96px desktop)

The `isMobile` state updates on resize via a `window.addEventListener("resize", handler)` in a useEffect.

---

## Timer Engine

### setInterval — Game Logic (1-second resolution)

Fires every second when `running` is true. Decrements `timeLeft`, accumulates `focusSecs` in work mode, and on reaching zero awards a stat, switches mode, and resets `timeLeft`.

### requestAnimationFrame — Visual Arc (60fps)

The arc progress ring bypasses React state entirely. A `arcRef` holds a direct DOM reference to the SVG `<circle>` element. A rAF loop updates `strokeDashoffset` at 60fps using `performance.now()` timestamps.

This avoids 60 React re-renders per second. The rAF loop records a start time and offset when the timer begins, then interpolates to completion over the remaining `timeLeft * 1000ms`.

---

## Audio Engine

All sounds synthesized via Web Audio API. No audio files. Single shared `AudioContext` created lazily on first use.

| Function | Sound | Design |
|---|---|---|
| `sfxTap(pitch)` | Mechanical click | Noise burst (HP 3kHz) + sine sweep 300→80Hz |
| `sfxPause()` | Glove thud | Noise burst (LP 600Hz) + sine sweep 140→55Hz |
| `sfxReset()` | Double tick | Two bandpass noise bursts (4kHz), 100ms apart |
| `sfxCrack(ctx)` | Bat crack | Noise burst (HP 2kHz) + sine sweep 220→60Hz |
| `sfxCrowd(ctx, intensity, duration)` | Crowd noise | 4 layered bandpass noise buffers (400/800/1400/2200Hz) with swell envelope |
| `sfxHit(key)` | Hit sound | sfxCrack + sfxCrowd (scaled by hit type) + HR fanfare (4 ascending sine tones) |

### Known Issue

`getCtx()` is not wrapped in `useCallback`. Low risk since AudioContext is created once and never replaced, but should be addressed before a production native build.

---

## Banner Queue System

Hit distance and milestone messages share a single `activeBanner` state driven by a `bannerQueueRef` array. The `enqueueBanner(text)` function pushes to the queue and starts displaying if nothing is currently showing. Each banner displays for 4 seconds with a 300ms gap before the next. This ensures distance and milestone messages never overlap.

HR distance is enqueued first (in `awardStat`), then milestone checks run inside `setLifetime` using `setTimeout(() => enqueueBanner(...), 0)` to ensure they queue after the distance.

---

## Milestone System

Milestones are checked inside the `setLifetime` updater function using computed new totals — not React state — to avoid stale closure issues:

```js
const totalHits = newHits["1B"] + newHits["2B"] + newHits["3B"] + newHits["HR"];
if (newHits["HR"] > 0 && newHits["HR"] % 100 === 0) enqueueBanner(...)
if (totalHits > 0 && totalHits % 1000 === 0) enqueueBanner(...)
```

No upper limit — the modulo check works identically at 100 HRs or 100,000 HRs.

---

## Splash Screen

Uses `sessionStorage` (not `localStorage`) to detect fresh hard closes. `sessionStorage` clears when the app is fully terminated but persists through background/resume — matching the expected behavior.

On mount, `showSplash` initializes from `sessionStorage`. If true, the splash renders as a `position:fixed` overlay above everything, sets the session key immediately, then fades out at 1.5s and unmounts at 2.0s.

---

## localStorage Persistence

| Key | Schema | Notes |
|---|---|---|
| `ballpark_prefs_v1` | `{ workMins, breakMins, theme, sound }` | Loaded synchronously on init |
| `ballpark_name` | string | Saved on every name change |
| `ballpark_today` | `{ date: "YYYY-MM-DD", atBats, stats }` | Saved on every stat change; date-keyed to auto-reset at midnight |
| `ballpark_lifetime_v1` | `{ focusSecs, hits: { "1B", "2B", "3B", "HR" } }` | Saved inline within awardStat and the interval tick |

All access wrapped in try/catch to handle private browsing and storage quota errors.

---

## Known Technical Debt

1. **`getCtx` not in useCallback** — low risk currently, should fix before native build
2. **`animTimerRef`** — declared but unused, safe to remove
3. **`awardStat` deps** — `[sfxHit, soundOn, enqueueBanner]`, may have edge cases
4. **No error boundary** — uncaught render error will blank the app
5. **Timer pauses in background** — setInterval throttles in background tabs; requires Web Worker or native solution
6. **Midnight edge case** — `todayKey` computed on mount; app open across midnight shows stale date until refresh
7. **Confetti colors hardcoded** — not theme-aware, uses Day Game palette
8. **`call` state** — computed and stored but never displayed in UI

---

## QA Test Plan & Results

All tests performed manually on V1 build. All passed.

### Core Timer
- [x] Start → LIVE dot appears, countdown begins
- [x] Pause → glove thud, LIVE disappears
- [x] Resume → click sound, LIVE returns
- [x] Reset while running → double tick, resets to full
- [x] Reset while paused → resets to full
- [x] Work timer reaches zero → stat awarded, chip animates, mode switches to Dugout
- [x] Break timer reaches zero → returns to At Plate
- [x] Manual mode switch → resets timer to new mode duration

### Stats & Scoring
- [x] AB increments every session
- [x] Today's Scorecard updates correctly
- [x] Ticker log updates with correct timestamps
- [x] HR shows distance in ticker instead of time
- [x] HR distance banner appears below mode tabs
- [x] HR distance banner does not shift layout
- [x] Milestone banner queues after HR distance
- [x] Both milestones queue sequentially if triggered together
- [x] Career Stats accumulate and persist after refresh
- [x] Today's Scorecard persists after refresh on same day

### Sound
- [x] All button sounds fire correctly
- [x] Hit sounds scale with hit type (Singles quieter than HRs)
- [x] HR fanfare plays
- [x] Mute silences all sounds
- [x] Unmute plays confirmation tick

### Settings
- [x] Duration changes apply when not running
- [x] Duration changes don't affect running session
- [x] Theme switches apply immediately without resetting timer
- [x] Reset Career Stats two-tap confirmation
- [x] Confirm state clears when settings panel closes
- [x] Sound preference persists after refresh

### Themes — Visual Checks (all three themes)
- [x] At Plate and Dugout backgrounds visually distinct
- [x] All text readable in both modes
- [x] Floating chips legible
- [x] Settings panel readable
- [x] Transition smooth between themes

### Splash Screen
- [x] Shows on first launch after hard close
- [x] Does not show on background/resume
- [x] Fades out smoothly at 1.5s
- [x] Fully gone at 2s
- [x] App renders correctly beneath it

### Mobile PWA
- [x] Installs to home screen on iPhone
- [x] Launches fullscreen with no browser chrome
- [x] No scroll required on main screen
- [x] All elements full-width
- [x] Safe area insets respected

---

### Follow-Up Issues Found During QA (All Resolved)

| Issue | Resolution |
|---|---|
| Player name not persisted | Added localStorage save on name change |
| Today's Scorecard reset on refresh | Added date-keyed localStorage persistence |
| Reset confirm state persisted after closing settings | Added useEffect to reset on panel close |
| Sound icon low contrast on Day Game | Added per-theme `soundIconColor` token |
| Empty stat values (0) failed contrast | Brightened `statValDim` per theme |
| CHANGING SIDES label failed contrast on all themes | Brightened `breakLabel` per theme |
| Reset button text failed contrast on Statsheet | Darkened to `#4a4a4a` |
| Statsheet background too grey | Warmed to parchment `#ece5d0` |
| Bananas cyan felt clinical | Replaced with deep teal `#1a5c50` → `#00C4A0` |
| Bananas navy read as Michigan Wolverines | Switched to near-black base |
| Mobile layout showed narrow centered column | Switched from CSS media queries to isMobile inline styles |
| isMobile defined in wrong component scope | Moved from SettingsPanel to BaseballPomodoro |
| HR banner shifted layout on trigger | Switched to fixed-height wrapper always present in DOM |

---

## WCAG Contrast Audit Summary

All theme color pairings audited computationally. Minimum threshold: 4.5:1 (WCAG AA), 3.0:1 for large text.

Every text-on-background, button-text-on-button, and chip-text-on-chip combination passes across all three themes in both At Plate and Dugout modes, including the settings panel background. The tightest passing value is deep teal on Bananas settings background at 4.94:1.
