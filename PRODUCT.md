# Baseball Pomodoro — Product Documentation

## Overview

Baseball Pomodoro is a Pomodoro-style focus timer built around a baseball metaphor. The core idea: your workday is a game. Each focus session is an at-bat. Complete it, and you get a hit. Your stats accumulate into a career record, turning productivity into something that feels earned rather than tracked.

The app is designed for people who want a focus timer that feels playful and motivating without being gamified in a shallow or distracting way. The baseball framing is consistent and meaningful — it's not a skin on top of a generic timer, it's a full reframe of how you think about focused work.

---

## Core Concepts

### The At-Bat

When you start a focus session, you're "At Plate." The timer counts down. If you complete the full session without resetting, you earn a hit at the end. The hit type is randomly awarded with weighted probabilities:

- **Single (1B)** — 45% chance. ⚾ The most common outcome. Solid, dependable work.
- **Double (2B)** — 30% chance. ✌️ A strong session.
- **Triple (3B)** — 15% chance. 🏃 A standout effort.
- **Home Run (HR)** — 10% chance. 💥 The rarest and most celebrated outcome. Triggers confetti, crowd fanfare, and a distance announcement.

These probabilities were chosen to feel like real baseball — most sessions are singles, home runs are special. The randomness keeps each session outcome unpredictable and gives the app a sense of aliveness.

### Home Run Distance

Every Home Run shows a randomly generated distance (350–550 ft) displayed below the mode tabs after the session ends. The range reflects realistic MLB home run distances. The distance appears for 4 seconds then fades — no tap needed to see it.

### Career Milestones

The app tracks lifetime career stats and celebrates when you hit:
- **Every 100 Home Runs** — "🏆 100 Career Home Runs"
- **Every 1,000 total hits** — "🏆 1,000 Career Hits" (singles + doubles + triples + home runs combined)

Milestone messages appear in the same banner area as the HR distance and queue sequentially if multiple milestones trigger at once (e.g. an HR that's also the 100th HR and the 1,000th hit shows both one after the other).

### The Scorecard

Today's Scorecard shows your stats for the current calendar day: At Bats, Singles, Doubles, Triples, and Home Runs. It resets automatically at midnight and persists across app restarts so closing and reopening doesn't lose your progress.

The H (total hits) column was intentionally omitted — since every at-bat results in a hit, it was a redundant number that added visual noise.

### Career Stats

Career Stats accumulate across all sessions and all days. They live in the Settings panel and show:
- **Focus Time** — total hours, minutes, and seconds of focus time across your career
- **Lifetime hit counts** — Singles, Doubles, Triples, Home Runs

Career Stats persist to localStorage and survive app restarts. They can be reset with a two-tap confirmation to prevent accidental wipes.

### The Ticker

The ticker is a collapsible play-by-play log below the scorecard. It shows the most recent hit as a compact bar. Tapping it expands a horizontally scrollable list of all today's hits. Regular hits show a timestamp; Home Runs show their distance instead (the distance is the more interesting data point).

---

## Timer Behavior

**Starting a session:** Tap "Play Ball" to begin. The arc ring drains clockwise. A pulsing LIVE indicator appears.

**Break mode:** When a focus session ends, the app automatically switches to Dugout (break) mode. A "CHANGING SIDES" indicator replaces LIVE. You can also manually switch to Dugout at any time.

**Switching modes manually:** Tapping a mode tab stops and resets the timer to the new mode's duration. This is intentional — mode switches are deliberate actions.

**Resetting:** Tap "Reset Timer" to return to the start of the current mode without switching modes.

**Duration changes:** Changing durations in Settings takes effect immediately when the timer is not running. If running, the new duration applies to the next session.

---

## Sound Design

All sounds are synthesized in-browser using the Web Audio API. No audio files are loaded.

| Action | Sound |
|---|---|
| Play Ball / Resume / Start Break | Sharp mechanical click |
| Pause | Ball hitting glove |
| Reset | Double clock tick |
| Mode tab switch | Softer click |
| Single | Bat crack + light crowd |
| Double | Bat crack + stronger crowd |
| Triple | Bat crack + loud crowd |
| Home Run | Bat crack + roar + 4-note ascending fanfare |

Sound can be toggled on/off via the speaker icon in Settings. The preference persists to localStorage.

---

## Splash Screen

A splash screen appears on the first launch after a hard close. It shows the Baseball Pomodoro name with an animated baseball icon, fades out after 1.5–2 seconds, and cannot be skipped. It uses sessionStorage to detect fresh launches — backgrounding and resuming the app will not retrigger it.

---

## Themes

Three themes ship with V1. All colors are specified as design tokens — every visual element is wired to a theme token, making future theme additions straightforward.

### Day Game
Dark forest green background with gold stat accents and cream/tan break elements. High contrast and bold. The palette evokes an outdoor ballpark on a summer afternoon. Declared complete early in development — the strongest and most cohesive of the three themes.

### Statsheet
Warm parchment paper background (`#ece5d0`) with vintage ink red (`#7a3030`) as the accent. Work background reads as aged paper; break background shifts to a slightly airier parchment. Concept: a hand-scored game sheet with red pen marks.

The scorecard date uses a dark olive-sepia (`#6b5518`) that reads like an ink stamp — warm and on-theme without competing with the red accents. This color was chosen to be distinct from the Day Game cream, which has a similar luminance.

### Bananas
Near-black background (`#1a1a1a`) with three accent colors: bright yellow (`#F4D000`) for work/primary elements, deep teal (`#00C4A0`) for scorecard and ticker accents, and warm pink (`#FF5FA0`) for break elements. Inspired by the Savannah Bananas color palette.

**Design evolution:** Bananas went through three major iterations before landing on the final palette — starting as a yellow-primary theme (too electric), then navy-based (read as Michigan Wolverines), then pure black-based. The three-color accent system (yellow, teal, pink) was added after feedback that the two-color version felt too stark.

### Theme Design Decisions

**All colors pass WCAG AA (4.5:1).** Every text-on-background, button-text-on-button, and chip-text-on-chip combination was audited computationally before being committed. The tightest passing value in the final build is deep teal on Bananas settings background at 4.94:1.

**Break mode background shifts** are tuned per theme to be noticeable but not jarring. Day Game shifts from deep green to lighter green; Statsheet from warm parchment to airier parchment; Bananas from near-black to slightly lighter black.

**Chip colors are theme-specific.** Hit celebration chips use `chipBg`/`chipText` for regular hits and `chipHRBg`/`chipHRText` for Home Runs. HR chips receive special treatment — gold on Day Game and Statsheet, yellow (same as work accent) on Bananas.

**Scorecard date uses a distinct accent color per theme** — gold on Day Game, sepia on Statsheet, teal on Bananas. This helps the date header stand out as a proper label rather than blending into the card.

---

## Settings Panel

The Settings panel slides up from within the phone frame. Tapping outside closes it.

**Sections:**
- **Timer Durations** — At Plate (1–60 min) and Dugout (1–30 min)
- **Sound** — Speaker icon toggle
- **Theme** — Radio-style toggles, one active at a time
- **Career Stats** — Focus time, lifetime hit counts, reset button

**Reset confirmation:** First tap changes to "Are you sure? Tap to confirm." Closing settings without confirming cancels the reset.

---

## Player Name

Tap the name in the navbar to edit inline. 20-character limit. Enter or blur saves; Escape cancels. Empty name falls back to "Player." Persisted to localStorage.

---

## Accessibility

- All interactive elements have ARIA labels
- Timer has `role="timer"` with a human-readable label
- Floating chips use `role="alert"` for screen reader announcements
- Stat card uses `role="list"` / `role="listitem"`
- Mode tabs use `role="tablist"` / `role="tab"` with `aria-selected`
- Settings panel uses `role="dialog"` with `aria-modal`
- All button states labeled (Play Ball / Pause / Resume differentiated)
- Focus visible outlines on all interactive elements using theme accent color

**Known limitation:** The settings panel does not currently trap keyboard focus.

---

## PWA Behavior

The app is installable as a PWA on iPhone (via Safari → Add to Home Screen) and Android (via Chrome → Add to Home Screen). Once installed it launches fullscreen with no browser chrome.

**Stats storage:** All stats use localStorage which is browser-scoped. Stats persist across sessions on the same device and browser but do not sync across devices. Clearing Safari's browsing data will wipe stats.

**Background timer:** The timer pauses when the app is backgrounded on iOS. This is a PWA platform limitation. Background timer support requires the native iOS app.

---

## Known Limitations (V1 PWA)

- Timer pauses when app is backgrounded — no background execution
- No push notifications on session end
- No Dynamic Island support (requires native iOS app)
- Session history (ticker log) resets on page refresh — not persisted
- Confetti colors are hardcoded and not theme-aware
- No onboarding for first-time users
- No streak tracking
- Midnight edge case — timer date stale if app open across midnight without refresh
