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
- **Home Run (HR)** — 10% chance. 💥 The rarest and most celebrated outcome. Triggers confetti and crowd fanfare.

These probabilities were chosen to feel like real baseball — most sessions are singles, home runs are special. The randomness keeps each session outcome unpredictable and gives the app a sense of aliveness.

### The Scorecard

Today's Scorecard shows your stats for the current calendar day: At Bats, Singles, Doubles, Triples, and Home Runs. It resets automatically at midnight and persists across page refreshes so closing and reopening the app doesn't lose your progress.

The decision to remove the "H" (total hits) column was intentional — since every at-bat is a hit, it was a redundant number that added visual noise without adding meaning.

### Career Stats

Career Stats accumulate across all sessions and all days. They live in the Settings panel and show:
- **Focus Time** — total hours, minutes, and seconds of focus time across your career
- **Lifetime hit counts** — Singles, Doubles, Triples, Home Runs

Career Stats persist to localStorage and survive page refreshes. They can be reset with a two-tap confirmation to prevent accidental wipes.

### The Ticker

The ticker is a collapsible play-by-play log at the bottom of the scorecard. It shows the most recent hit as a compact bar. Tapping it expands a horizontally scrollable list of all today's hits with timestamps — like a game log. It holds up to 50 entries in memory per session.

---

## Timer Behavior

**Starting a session:** Tap "Play Ball" to begin. The arc ring drains clockwise. A pulsing LIVE indicator appears.

**Break mode:** When a focus session ends, the app automatically switches to Dugout (break) mode. A "CHANGING SIDES" indicator replaces LIVE with a softer pulse. You can also manually switch to Dugout via the mode tabs at any time.

**Switching modes manually:** Tapping a mode tab while the timer is running stops the timer and resets it to the new mode's duration. This is intentional — switching modes is a deliberate action, not something that should preserve a partial countdown.

**Resetting:** Tap "Reset Timer" to return to the start of the current mode without switching modes.

**Duration changes:** Changing durations in Settings takes effect immediately when the timer is not running. If the timer is running, the new duration applies to the next session, not the current one.

---

## Sound Design

All sounds are synthesized in-browser using the Web Audio API. There are no audio files. Each interaction has a distinct sound designed to feel tactile and baseball-adjacent:

| Action | Sound | Design Intent |
|---|---|---|
| Play Ball / Resume / Start Break | Sharp mechanical click | Feels like a starter's pistol |
| Pause | Ball hitting glove | Low, satisfying thud |
| Reset | Double clock tick | Like resetting a scoreboard |
| Mode tab switch | Softer click (60% pitch) | Lighter action, lower stakes |
| Single | Bat crack + light crowd | Clean contact |
| Double | Bat crack + stronger crowd | Extra bases excitement |
| Triple | Bat crack + loud crowd | Rare, energetic |
| Home Run | Bat crack + roar + 4-note fanfare chime | Full celebration |

Sound can be toggled on/off via the speaker icon in Settings. The preference is persisted to localStorage.

---

## Themes

Three themes ship with V1. All colors are specified as design tokens — every visual element in the app is wired to a theme token, making future theme additions straightforward.

### Day Game
Dark forest green background with gold stat accents and cream break elements. High contrast, bold, and easy to read in both work and break modes. The palette evokes an outdoor ballpark on a summer afternoon.

### Statsheet
Warm parchment paper background (`#ece5d0`) with vintage ink red (`#7a3030`) as the accent color throughout. The work background reads as aged paper; the break background shifts to a slightly lighter, fresher tone. The concept is a hand-scored game sheet — charcoal for structure, red pen for the active elements.

### Bananas
Bright yellow background with dark brown work elements and deep teal (`#1a5c50`) break accents. Bold and energetic. The yellow is a strong brand color — the theme is immediately distinctive. Deep teal was chosen over cyan for warmth and to avoid the clinical feeling that pure cyan had against the warm yellow/brown palette.

### Theme Design Decisions

**All theme colors pass WCAG AA (4.5:1) contrast.** Every color pairing — text on backgrounds, chips on backgrounds, buttons — was audited computationally before being committed. Contrast was checked across all surfaces including the settings panel (which has its own background), break mode backgrounds, and floating chip animations.

**Break mode background shifts** were tuned per theme. The shift needs to be noticeable enough to signal a mode change but not so jarring that it feels like a different app. Day Game shifts from deep green to a slightly lighter green; Statsheet from warm parchment to a slightly airier parchment; Bananas from bold yellow to a softer yellow.

**Sound icon uses a dedicated token** (`soundIconColor`) rather than the navbar icon color. This was added because the general navbar icon color was designed to be subtle in context — too subtle for the settings panel where the icon needs to hold its own weight alongside text labels.

**Chip colors are theme-specific and fully tokened.** Hit celebration chips were redesigned to be distinct from the regular UI rather than using work button colors. Each theme has a `chipBg`/`chipText` pair for regular hits and a `chipHRBg`/`chipHRText` pair for Home Runs. HR chips receive special treatment — gold for Day Game and Statsheet, deep red for Bananas (gold blended into the yellow background).

---

## Settings Panel

The Settings panel slides up from within the phone frame. It covers the main UI with a darkened backdrop — tapping outside the panel closes it.

**Sections:**
- **Timer Durations** — At Plate (1–60 min) and Dugout (1–30 min) duration steppers
- **Sound** — Speaker icon toggle, persisted to localStorage
- **Theme** — Radio-style toggles, only one theme active at a time
- **Career Stats** — Focus time, lifetime hit counts, reset button

**Reset confirmation:** Tapping "Reset Career Stats" changes the button text to "Are you sure? Tap to confirm." A second tap wipes the stats. Closing the settings panel without confirming cancels the reset — the confirmation state does not persist.

---

## Player Name

The player name appears in the navbar. Tapping it opens an inline text input with a 20-character limit. Pressing Enter or blurring the input saves the name. Pressing Escape cancels. An empty name falls back to "Player." The name is persisted to localStorage.

---

## Accessibility

- All interactive elements have ARIA labels
- Timer has a live region `role="timer"` with a human-readable label
- Floating chips use `role="alert"` for screen reader announcements
- Stat card uses `role="list"` / `role="listitem"`
- Mode tabs use `role="tablist"` / `role="tab"` with `aria-selected`
- Settings panel uses `role="dialog"` with `aria-modal`
- All button states are labeled (Play Ball / Pause / Resume differentiated)
- Focus visible outlines on all interactive elements, using theme accent color

**Known limitation:** The settings panel does not currently trap keyboard focus. Tab key can reach elements behind the backdrop. This will be addressed when building the web version.

---

## Known Limitations (V1)

- Timer pauses when the browser tab is backgrounded — no background execution
- Session history (ticker log) resets on page refresh — not persisted
- Confetti colors are hardcoded and not theme-aware
- No onboarding for first-time users
- No streak tracking (placeholder present in Career Stats section)
- Timer does not account for the edge case of the app being open across midnight
