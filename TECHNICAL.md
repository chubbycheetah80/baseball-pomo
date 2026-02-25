# Baseball Pomodoro — Technical Documentation

## Architecture Overview

The entire application is a single React component file (`baseball-pomodoro.jsx`). There is no build pipeline, no external state library, no CSS framework, and no audio assets. Everything is self-contained.

### File Structure (within the single file)

```
Constants & Theme Tokens       Lines ~4–263
  THEMES object                All three theme token maps
  STATS array                  Hit type definitions and weights
  HR_CALLS / HIT_CALLS         Flavor text per hit type

Pure Functions                 Lines ~279–288
  getRandomStat()              Weighted random hit selection
  getCall()                    Random flavor text for a hit key
  fmt()                        Seconds → "MM:SS" string

Sub-Components                 Lines ~290–558
  Confetti                     60-piece CSS animation confetti
  PlayerName                   Inline editable name with input toggle
  Ticker                       Collapsible play-by-play log
  DurationStepper              +/− minute stepper for settings
  SettingsPanel                Full slide-up settings drawer

Main Component                 Lines ~561–1283
  BaseballPomodoro             State, effects, audio engine, UI
```

---

## Theme System

Themes are plain objects stored in a `THEMES` constant. Each theme contains ~70 named design tokens covering every color used in the app. The active theme is selected by `themeKey` state and aliased as `T`:

```js
const T = THEMES[themeKey] || THEMES.dayGame;
```

All CSS is injected via a `<style>` tag inside the component render, using template literals with `T.tokenName` references. This means the entire visual appearance re-renders when the theme changes — there is no class-swapping or CSS variable system.

### Token Categories

| Prefix | Purpose |
|---|---|
| `phoneBg`, `phoneRing`, `wallBg` | Phone frame and background |
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
| `reset*`, `resetConfirm*` | Career stats reset button states |
| `chipBg`, `chipHRBg` | Floating hit chip colors |
| `soundIconColor` | Sound toggle icon (separate from navbarIcon) |

### Adding a New Theme

1. Copy an existing theme object in `THEMES`
2. Give it a new key and `name`
3. Update every token — all ~70 values
4. Add it to the theme selector array in `SettingsPanel`
5. Audit all colors for WCAG AA contrast (4.5:1 minimum)

---

## State Reference

All state lives in `BaseballPomodoro`. No context, no external store.

| State | Type | Purpose |
|---|---|---|
| `workMins` | number | Focus session duration in minutes |
| `breakMins` | number | Break session duration in minutes |
| `themeKey` | string | Active theme key |
| `mode` | `"work"` \| `"break"` | Current timer mode |
| `timeLeft` | number | Seconds remaining |
| `running` | boolean | Timer is counting down |
| `atBats` | number | Today's completed sessions |
| `stats` | object | Today's hit counts per type |
| `lastStat` | object\|null | Most recently awarded hit |
| `confetti` | boolean | HR confetti active |
| `call` | string | Flavor text (unused in UI currently) |
| `log` | array | In-memory play-by-play log (up to 50) |
| `playerName` | string | Display name |
| `settingsOpen` | boolean | Settings panel visibility |
| `lifetime` | object | Career stats `{ focusSecs, hits }` |
| `floatingChips` | array | Active floating chip animations |
| `soundOn` | boolean | Sound effects enabled |

### Refs

| Ref | Purpose |
|---|---|
| `intervalRef` | `setInterval` handle for the 1-second tick |
| `animTimerRef` | Unused holdover — safe to remove in cleanup |
| `arcRef` | Direct DOM reference to the SVG arc element |
| `rafRef` | `requestAnimationFrame` handle |
| `audioCtxRef` | Shared `AudioContext` instance |
| `arcStartRef` | Unused — safe to remove in cleanup |

---

## Timer Engine

The timer uses two separate mechanisms that work together:

### 1. setInterval — Game Logic (1-second resolution)

A `setInterval` fires every second when `running` is true. It:
- Decrements `timeLeft` by 1
- Accumulates `focusSecs` to lifetime stats when in work mode
- On reaching zero: awards a stat, switches mode, resets `timeLeft`

The interval is cleared and restarted via a `useEffect` that depends on `[running, mode, awardStat, WORK, BREAK]`.

### 2. requestAnimationFrame — Visual Arc (60fps)

The arc progress ring bypasses React state entirely. An `arcRef` holds a direct reference to the SVG `<circle>` element, and a rAF loop updates `strokeDashoffset` at 60fps using `performance.now()` timestamps rather than counting seconds.

This was a deliberate architectural decision: updating the arc via React state would cause the entire component to re-render 60 times per second. Direct DOM mutation via rAF is the correct solution for smooth animation at this frequency.

The rAF loop records a start time and start offset when the timer begins/resumes, then interpolates to the end offset over the remaining `timeLeft * 1000` milliseconds.

---

## Audio Engine

All sounds are synthesized using the Web Audio API. No audio files are loaded. A single shared `AudioContext` is created lazily on first sound and reused (`audioCtxRef`).

### Sound Functions

**`sfxTap(pitch)`** — Sharp mechanical click for Play Ball / Resume / Start Break. Two-layer design: a short noise burst high-passed at 3000Hz + a sine oscillator sweeping 300→80Hz. `pitch` parameter allows the mode-switch variant to play at 60% frequency.

**`sfxPause()`** — Ball hitting a glove. Low-passed noise burst at 600Hz + a sine oscillator sweeping 140→55Hz. Softer, more muted than the tap.

**`sfxReset()`** — Double clock tick. Two identical noise bursts (bandpass at 4000Hz) fired 100ms apart.

**`sfxCrack(ctx)`** — Internal helper. Bat crack: noise burst high-passed at 2000Hz + sine sweeping 220→60Hz.

**`sfxCrowd(ctx, intensity, duration)`** — Internal helper. Synthesized crowd noise using four layered bandpass-filtered noise buffers at 400, 800, 1400, 2200Hz. A swell envelope (fade in, hold, fade out) approximates the feel of a crowd reacting. `intensity` scales volume; `duration` scales length.

**`sfxHit(key)`** — Public hit sound. Calls `sfxCrack`, then `sfxCrowd` after 80ms delay. HR additionally fires four ascending sine tones (C5, E5, G5, C6) as a fanfare chime.

### Known Audio Issue

`getCtx()` is not wrapped in `useCallback`. This is a stale closure risk — if `audioCtxRef.current` changes between renders, functions that call `getCtx()` internally may not see the update. In practice this doesn't cause bugs because the AudioContext is created once and never replaced, but it should be addressed before a production native build.

---

## localStorage Persistence

| Key | Schema | Notes |
|---|---|---|
| `ballpark_prefs_v1` | `{ workMins, breakMins, theme, sound }` | Loaded synchronously on init |
| `ballpark_name` | string | Saved on every name change |
| `ballpark_today` | `{ date: "YYYY-MM-DD", atBats, stats }` | Saved on every stat change via useEffect; date compared on load to auto-reset |
| `ballpark_lifetime_v1` | `{ focusSecs, hits: { "1B", "2B", "3B", "HR" } }` | Saved inline within awardStat and the interval tick |

All localStorage access is wrapped in try/catch to handle private browsing mode and storage quota errors silently.

---

## Floating Chip Animation System

When a hit is awarded, a chip is added to the `floatingChips` state array with a unique `id`, the `stat` object (spread to a new object to avoid reference sharing), and a `dur` duration in milliseconds.

The chip renders inside `.floating-chip-wrap`, an absolutely positioned overlay that covers the phone content area. Each chip uses a CSS keyframe animation (`floatUp1b` through `floatUpHR`) that animates from ~38% from the bottom of the phone to ~88–90% (near the top), with an opacity fade-out in the final 15% of the animation.

HR chips include a bounce sequence (scale 0.7 → 1.15 → 0.95 → 1.05) before floating up.

After `dur + 100ms`, the chip is removed from state via a `setTimeout`. The 100ms buffer ensures the CSS animation has fully completed (and opacity reached 0) before the DOM element is removed.

**Note:** On real devices, chips may animate into the notch or Dynamic Island area. This will be addressed with `env(safe-area-inset-top)` when building the PWA or native version.

---

## Known Technical Debt

1. **`getCtx` stale closure** — not wrapped in `useCallback`, low risk currently but should be fixed before native build
2. **`animTimerRef` and `arcStartRef`** — declared but unused, safe to remove
3. **`awardStat` deps** — currently `[sfxHit, soundOn]`, may still have edge cases
4. **No error boundary** — an uncaught render error will blank the entire app
5. **Timer pauses when tab is hidden** — `setInterval` throttles in background tabs; background execution requires Web Worker or native solution
6. **Midnight edge case** — `todayKey` is computed once on component mount; a user who leaves the app open across midnight will see stale date until refresh
7. **Confetti colors hardcoded** — not theme-aware, uses Day Game palette regardless of active theme
8. **`call` state** — flavor text is computed and stored but never displayed in the UI

---

## QA Test Plan & Results

All tests below were performed manually on the V1 build. All passed unless otherwise noted.

### Run Once (Any Theme)

**Core Timer**
- [x] Start timer — LIVE dot appears and counts down
- [x] Pause — LIVE disappears, glove thud sound plays
- [x] Resume — LIVE reappears, click sound plays
- [x] Reset while running — clock tick plays, timer resets to full
- [x] Reset while paused — timer resets to full
- [x] Let work timer reach zero — stat awarded, floating chip animates up, mode switches to Dugout automatically
- [x] Let break timer reach zero — returns to At Plate automatically
- [x] Start Break manually — CHANGING SIDES appears with pulse dot

**Floating Chips**
- [x] Complete sessions until you get a Single, Double, Triple and HR — each shows the correct label
- [x] HR — confetti fires and fanfare plays alongside chip
- [x] Chip animates up and fades out cleanly without affecting button layout

**Sound**
- [x] Play Ball / Resume / Start Break → sharp click
- [x] Pause → glove thud
- [x] Reset → double clock tick
- [x] Mode tab switch → softer click
- [x] Mute via speaker icon — all sounds go silent
- [x] Unmute — double tick confirmation plays
- [x] Single / Double / Triple / HR — crowd intensity scales up with each
- [x] HR — fanfare chime plays over crowd

**Stats & Scoring**
- [x] AB increments every session
- [x] Today's Scorecard updates correctly
- [x] Ticker log updates with correct timestamps
- [x] Lifetime Career Stats accumulate and persist after page refresh
- [x] Today's Scorecard persists after page refresh on same calendar day

**Settings**
- [x] Change At Plate duration — timer reflects new value if not running
- [x] Change At Plate duration while running — doesn't affect current session
- [x] Change Dugout duration — same checks
- [x] Stepper can't go below 1 min on either
- [x] Only one theme toggle can be on at a time
- [x] Tap outside settings panel — closes it
- [x] First tap Reset Career Stats — button changes to "Are you sure? Tap to confirm"
- [x] Second tap — stats wiped
- [x] Close settings without confirming — confirm state resets to "Reset Career Stats"

**Player Name**
- [x] Tap pencil — input appears
- [x] Type name and confirm — saves correctly
- [x] Refresh page — name persists
- [x] Clear name — falls back to "Player"

**Edge Cases**
- [x] Rapid mode tab switching while timer is running — UI settles correctly, no glitches
- [x] Open/close settings repeatedly while timer running — timer continues unaffected
- [x] Switch theme mid-countdown — time doesn't reset
- [x] Very long player name — navbar handles gracefully
- [x] HR confetti clears after ~3 seconds

---

### Per-Theme Visual Checks

**Day Game**
- [x] At Plate background is dark green, Dugout shifts to lighter green
- [x] LIVE dot visible and readable
- [x] CHANGING SIDES dot and text readable
- [x] Timer digits readable in both modes
- [x] Floating chips legible against background — cream for hits, gold for HR
- [x] Work button (Play Ball) — white text on green
- [x] Break button (Start Break) — white text on tan/cream
- [x] Mode tabs readable in both states
- [x] Settings panel — all text readable
- [x] Sound icon visible (white)
- [x] Reset Career Stats confirm state — coral text readable
- [x] Theme switch transition smooth, timer unaffected

**Statsheet**
- [x] At Plate background is warm parchment, Dugout shifts subtly lighter
- [x] LIVE dot visible and readable
- [x] CHANGING SIDES dot and text readable
- [x] Timer digits readable in both modes
- [x] Floating chips legible — dusty red for hits, gold for HR
- [x] Work button — white text on charcoal
- [x] Break button — white text on dusty red
- [x] Mode tabs readable in both states
- [x] Settings panel — all text readable
- [x] Sound icon visible (dark charcoal)
- [x] Reset Career Stats confirm state — dusty red text readable
- [x] Theme switch transition smooth, timer unaffected

**Bananas**
- [x] At Plate background is yellow, Dugout shifts to softer yellow
- [x] LIVE dot visible and readable
- [x] CHANGING SIDES dot and text readable
- [x] Timer digits readable in both modes
- [x] Floating chips legible — deep teal for hits, deep red for HR
- [x] Work button — white text on brown
- [x] Break button — white text on deep teal
- [x] Mode tabs readable in both states
- [x] Settings panel — all text readable
- [x] Sound icon visible (dark brown)
- [x] Reset Career Stats confirm state — burnt orange text readable
- [x] Theme switch transition smooth, timer unaffected

---

### Follow-Up Issues Found During QA (All Resolved)

| Issue | Resolution |
|---|---|
| Player name not persisted after browser refresh | Added localStorage save on name change, lazy init from storage |
| Today's Scorecard reset on every page refresh | Added date-keyed localStorage persistence; auto-resets at midnight |
| Floating chip showed wrong hit type | Fixed stale closure in chip state; stat object now spread to fresh copy |
| Reset Career Stats confirm state persisted after closing settings | Added `useEffect` to reset `confirmReset` when `open` prop goes false |
| Sound icon low contrast on Day Game | Added `soundIconColor` token per theme, separate from `navbarIcon` |
| Settings section titles too small | Bumped from 11px to 13px |
| Focus Time in Career Stats visually subordinate | Matched to `stepper-label` size (17px/700 weight) |
| HR chip color read as brown on Bananas and Statsheet | Replaced with bright gold `#E0A800` on Statsheet; deep red `#8B1A1A` on Bananas |
| All chip colors used work button colors (not distinctive) | Introduced per-theme `chipBg`/`chipHRBg` token system |
| Emoji contrast poor on Day Game gold chip | Switched Day Game normal chips to cream `#8C6238` with white text |
| Statsheet background too neutral/grey | Warmed to parchment `#ece5d0`; accent updated to vintage ink red `#7a3030` |
| Statsheet Dugout background shift too jarring / too subtle | Tuned to `#f5ede2` as middle ground |
| Bananas accent cyan felt clinical against warm palette | Replaced with deep teal `#1a5c50` |

---

## WCAG Contrast Audit Summary

All theme color pairings were audited computationally. Minimum threshold: 4.5:1 (WCAG AA).

Every text-on-background, button-text-on-button, and chip-text-on-chip combination passes. The tightest passing value in the final build is deep teal on Bananas settings background at 4.94:1.

Reset button normal and confirm states were individually audited per theme across both the base button background and the confirmed button background, all passing.
