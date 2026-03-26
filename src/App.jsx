import { useState, useEffect, useRef, useCallback } from "react";

// ── Themes ───────────────────────────────────────────────────────────────────
const THEMES = {
  dayGame: {
    name: "Day Game",
    phoneBg:        "#1a3a2a",
    phoneRing:      "#2a4a36",
    wallBg:         "#0d2318",
    scrollBg:       "#1a3a2a",
    scrollBgBreak:  "#224d38",
    settingsBg:     "#0f2a1c",
    statusColor:    "#e8f0e4",
    navbarName:     "#ffffff",
    editIcon:       "#ffffff",
    navbarIcon:     "#7a9e7a",
    soundIconColor: "#ffffff",
    navbarIconHover:"#e8f0e4",
    nameInputBg:    "rgba(255,255,255,0.1)",
    nameInputBorder:"#e8c547",
    cardBg:         "rgba(255,255,255,0.07)",
    cardDate:       "#e8c547",
    statDivider:    "rgba(255,255,255,0.1)",
    statKey:        "#b0d0b0",
    statValDim:     "#92b892",
    statValActive:  "#e8c547",
    tickerBg:       "rgba(255,255,255,0.05)",
    tickerChipsBg:  "rgba(0,0,0,0.2)",
    tickerChipBorder:"rgba(255,255,255,0.1)",
    tickerChipBg:   "rgba(255,255,255,0.07)",
    tickerDot:      "#e8c547",
    tickerText:     "#c8d8c8",
    chipKey:        "#e8c547",
    chipTime:       "#aacaaa",
    modeTabsBg:     "rgba(0,0,0,0.28)",
    modeTabColor:   "#5a7a5a",
    modeTabWorkBg:  "#2e7d4f",
    modeTabWorkText:"#ffffff",
modeTabBreakBg: "#8C6238",
    modeTabBreakText:"#ffffff",
    focusOutline:   "#e8c547",
    liveLabel:      "#e8f0e4",
    breakLabel:     "#90ccb0",
    timerDigits:    "#ffffff",
    timerModeLbl:   "#6a8a6a",
    arcTrack:       "rgba(255,255,255,0.12)",
    arcWork:        "#2e7d4f",
    arcBreak:       "#8C6238",
    statPopName:    "#e8c547",
    btnWorkBg:      "#2e7d4f",
    btnWorkText:    "#ffffff",
    btnWorkHover:   "#246e3e",
    btnBreakBg:     "#8C6238",
    btnBreakText:   "#ffffff",
    btnBreakHover:  "#7a5230",
    btnResetBg:     "rgba(255,255,255,0.06)",
    btnResetBorder: "rgba(255,255,255,0.13)",
    btnResetColor:  "#aac8aa",
    btnResetHover:  "rgba(255,255,255,0.11)",
    btnResetHoverColor:"#e8f0e4",
    settingsHeader: "rgba(255,255,255,0.08)",
    settingsTitle:  "#ffffff",
    settingsSectionTitle:"#7aaa7a",
    settingsDivider:"rgba(255,255,255,0.06)",
    stepperLabel:   "#e8f0e4",
    stepperSublabel:"#7aaa7a",
    stepperBtnBg:   "rgba(255,255,255,0.1)",
    stepperBtnBorder:"rgba(255,255,255,0.15)",
    stepperBtnColor:"#e8f0e4",
    stepperVal:     "#e8c547",
    stepperUnit:    "#9ab89a",
    lifetimeLabel:  "#9ab89a",
    lifetimeVal:    "#e8c547",
    lifetimeGridBg: "rgba(255,255,255,0.06)",
    lifetimeCellBg: "#0f2a1c",
    lifetimeKey:    "#6a8a6a",
    toggleOffBg:    "rgba(255,255,255,0.15)",
    toggleOnBg:     "#2d6b42",
    comingSoonColor:"#c8d8c8",
    badgeBg:        "#2d6b42",
    badgeColor:     "#e8f0e4",
    badgeSoonBg:    "rgba(255,255,255,0.1)",
    badgeSoonColor: "#6a8a6a",
    resetColor:        "#ff9980",
    resetConfirmColor: "#ffaa90",
    chipBg:            "#8C6238",
    chipText:          "#ffffff",
    chipHRBg:          "#ffd700",
    chipHRText:        "#1a3a2a",
  },
  bananas: {
    name: "Bananas",
    phoneBg:        "#1a1a1a",
    phoneRing:      "#2a2a2a",
    wallBg:         "#111111",
    scrollBg:       "#1a1a1a",
    scrollBgBreak:  "#222222",
    settingsBg:     "#111111",
    statusColor:    "#F4D000",
    navbarName:     "#ffffff",
    editIcon:       "#ffffff",
    navbarIcon:     "#969696",
    soundIconColor: "#ffffff",
    navbarIconHover:"#ffffff",
    nameInputBg:    "rgba(244,208,0,0.12)",
    nameInputBorder:"#F4D000",
    cardBg:         "rgba(255,255,255,0.06)",
    cardDate:       "#00C4A0",
    statDivider:    "rgba(255,255,255,0.1)",
    statKey:        "#969696",
    statValDim:     "#808080",
    statValActive:  "#F4D000",
    tickerBg:       "rgba(255,255,255,0.05)",
    tickerChipsBg:  "rgba(0,0,0,0.3)",
    tickerChipBorder:"rgba(0,196,160,0.25)",
    tickerChipBg:   "rgba(0,196,160,0.08)",
    tickerDot:      "#00C4A0",
    tickerText:     "#969696",
    chipKey:        "#00C4A0",
    chipTime:       "#969696",
    modeTabsBg:     "rgba(0,0,0,0.35)",
    modeTabColor:   "#969696",
    modeTabWorkBg:  "#F4D000",
    modeTabWorkText:"#1a1a1a",
    modeTabBreakBg: "#FF5FA0",
    modeTabBreakText:"#1a1a1a",
    focusOutline:   "#F4D000",
    liveLabel:      "#ffffff",
    breakLabel:     "#FF5FA0",
    timerDigits:    "#ffffff",
    timerModeLbl:   "#969696",
    arcTrack:       "rgba(255,255,255,0.1)",
    arcWork:        "#F4D000",
    arcBreak:       "#FF5FA0",
    statPopName:    "#F4D000",
    btnWorkBg:      "#F4D000",
    btnWorkText:    "#1a1a1a",
    btnWorkHover:   "#e0bc00",
    btnBreakBg:     "#FF5FA0",
    btnBreakText:   "#1a1a1a",
    btnBreakHover:  "#e04e8a",
    btnResetBg:     "rgba(255,255,255,0.06)",
    btnResetBorder: "rgba(255,255,255,0.13)",
    btnResetColor:  "#969696",
    btnResetHover:  "rgba(255,255,255,0.11)",
    btnResetHoverColor:"#ffffff",
    settingsHeader: "rgba(255,255,255,0.06)",
    settingsTitle:  "#ffffff",
    settingsSectionTitle:"#969696",
    settingsDivider:"rgba(255,255,255,0.08)",
    stepperLabel:   "#ffffff",
    stepperSublabel:"#969696",
    stepperBtnBg:   "rgba(255,255,255,0.1)",
    stepperBtnBorder:"rgba(255,255,255,0.15)",
    stepperBtnColor:"#ffffff",
    stepperVal:     "#F4D000",
    stepperUnit:    "#969696",
    lifetimeLabel:  "#969696",
    lifetimeVal:    "#00C4A0",
    lifetimeGridBg: "rgba(255,255,255,0.06)",
    lifetimeCellBg: "#111111",
    lifetimeKey:    "#969696",
    toggleOffBg:    "rgba(255,255,255,0.15)",
    toggleOnBg:     "#00C4A0",
    comingSoonColor:"#969696",
    badgeBg:        "#00C4A0",
    badgeColor:     "#1a1a1a",
    badgeSoonBg:    "rgba(255,255,255,0.1)",
    badgeSoonColor: "#969696",
    resetColor:        "#e07070",
    resetConfirmColor: "#e07070",
    chipBg:            "#00C4A0",
    chipText:          "#1a1a1a",
    chipHRBg:          "#F4D000",
    chipHRText:        "#1a1a1a",
  },
  statsheet: {
    name: "Statsheet",
    phoneBg:        "#ece5d0",
    phoneRing:      "#c4bfb0",
    wallBg:         "#b4ae9e",
    scrollBg:       "#ece5d0",
    scrollBgBreak:  "#f5ede2",
    settingsBg:     "#e4deca",
    statusColor:    "#2a2724",
    navbarName:     "#2a2724",
    editIcon:       "#3a3632",
    navbarIcon:     "#555250",
    soundIconColor: "#3a3632",
    navbarIconHover:"#1a1a1a",
    nameInputBg:    "rgba(0,0,0,0.08)",
    nameInputBorder:"#2a2724",
    cardBg:         "rgba(0,0,0,0.07)",
    cardDate:       "#6b5518",
    statDivider:    "rgba(0,0,0,0.1)",
    statKey:        "#555250",
    statValDim:     "#686460",
    statValActive:  "#7a3030",
    tickerBg:       "rgba(0,0,0,0.07)",
    tickerChipsBg:  "rgba(0,0,0,0.09)",
    tickerChipBorder:"rgba(0,0,0,0.12)",
    tickerChipBg:   "rgba(0,0,0,0.04)",
    tickerDot:      "#7a3030",
    tickerText:     "#5a5652",
    chipKey:        "#7a3030",
    chipTime:       "#5a5652",
    modeTabsBg:     "rgba(0,0,0,0.11)",
    modeTabColor:   "#555250",
    modeTabWorkBg:  "#2a2724",
    modeTabWorkText:"#f5f0e8",
    modeTabBreakBg: "#7a3030",
    modeTabBreakText:"#f5f0e8",
    focusOutline:   "#7a3030",
    liveLabel:      "#2a2724",
    breakLabel:     "#6a5a50",
    timerDigits:    "#2a2724",
    timerModeLbl:   "#636058",
    arcTrack:       "rgba(0,0,0,0.12)",
    arcWork:        "#2a2724",
    arcBreak:       "#7a3030",
    statPopName:    "#7a3030",
    btnWorkBg:      "#2a2724",
    btnWorkText:    "#ffffff",
    btnWorkHover:   "#4a4642",
    btnBreakBg:     "#7a3030",
    btnBreakText:   "#ffffff",
    btnBreakHover:  "#622020",
    btnResetBg:     "rgba(0,0,0,0.05)",
    btnResetBorder: "rgba(0,0,0,0.15)",
    btnResetColor:  "#4a4a4a",
    btnResetHover:  "rgba(0,0,0,0.1)",
    btnResetHoverColor:"#1a1a1a",
    settingsHeader: "rgba(0,0,0,0.06)",
    settingsTitle:  "#2a2724",
    settingsSectionTitle:"#636058",
    settingsDivider:"rgba(0,0,0,0.08)",
    stepperLabel:   "#2a2724",
    stepperSublabel:"#636058",
    stepperBtnBg:   "rgba(0,0,0,0.09)",
    stepperBtnBorder:"rgba(0,0,0,0.15)",
    stepperBtnColor:"#2a2724",
    stepperVal:     "#7a3030",
    stepperUnit:    "#555250",
    lifetimeLabel:  "#555250",
    lifetimeVal:    "#7a3030",
    lifetimeGridBg: "rgba(0,0,0,0.09)",
    lifetimeCellBg: "#e4deca",
    lifetimeKey:    "#636058",
    toggleOffBg:    "rgba(0,0,0,0.15)",
    toggleOnBg:     "#7a3030",
    comingSoonColor:"#5a5652",
    badgeBg:        "#7a3030",
    badgeColor:     "#f5f0e8",
    badgeSoonBg:    "rgba(0,0,0,0.08)",
    badgeSoonColor: "#636058",
    resetColor:        "#5a3030",
    resetConfirmColor: "#5a3030",
    chipBg:            "#7a3030",
    chipText:          "#ffffff",
    chipHRBg:          "#E0A800",
    chipHRText:        "#2a2724",
  },
};

const STATS = [
  { key: "1B", label: "Single",   emoji: "⚾", weight: 45 },
  { key: "2B", label: "Double",   emoji: "✌️", weight: 30 },
  { key: "3B", label: "Triple",   emoji: "🏃", weight: 15 },
  { key: "HR", label: "Home Run", emoji: "💥", weight: 10 },
];

const HR_CALLS  = ["Gone! Way back and GONE!", "See ya later!", "Out of the park!", "Absolutely crushed!", "It's outta here!"];
const HIT_CALLS = {
  "2B": ["Into the gap!", "Off the wall!", "Extra bases!"],
  "3B": ["Rounding second — three bases!", "Legs flying!"],
  "1B": ["Solid contact.", "Up the middle.", "Clean hit."],
};

function getRandomStat() {
  const total = STATS.reduce((s, st) => s + st.weight, 0);
  let r = Math.random() * total;
  for (const st of STATS) { r -= st.weight; if (r <= 0) return st; }
  return STATS[0];
}
function getCall(key) {
  const arr = key === "HR" ? HR_CALLS : (HIT_CALLS[key] || HIT_CALLS["1B"]);
  return arr[Math.floor(Math.random() * arr.length)];
}

function Confetti({ active }) {
  const pieces = useRef(Array.from({ length: 60 }, (_, i) => ({
    id: i, x: Math.random() * 100, delay: Math.random() * 0.8,
    size: 6 + Math.random() * 7,
    color: ["#e8c547","#2d6b42","#c0392b","#fff","#f5dfa0"][i % 5],
  })));
  if (!active) return null;
  return (
    <div style={{ position:"absolute",inset:0,overflow:"hidden",borderRadius:"44px",pointerEvents:"none",zIndex:50 }}>
      {pieces.current.map(p => (
        <div key={p.id} style={{
          position:"absolute", left:`${p.x}%`, top:"-14px",
          width:`${p.size}px`, height:`${p.size}px`,
          background: p.color,
          borderRadius: p.id % 2 === 0 ? "50%" : "2px",
          animation:`confettiFall 2.8s ease-in ${p.delay}s forwards`,
        }} />
      ))}
    </div>
  );
}

function fmt(s) {
  return `${Math.floor(s/60).toString().padStart(2,"0")}:${(s%60).toString().padStart(2,"0")}`;
}

function PlayerName({ name, onChange, T }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(name);
  const ref = useRef();
  useEffect(() => { if (editing) ref.current?.focus(); }, [editing]);
  const commit = () => {
    const v = draft.trim() || "Player";
    onChange(v); setDraft(v); setEditing(false);
  };
  if (editing) return (
    <input ref={ref} value={draft} className="name-input"
      onChange={e => setDraft(e.target.value)} onBlur={commit} maxLength={20}
      onKeyDown={e => { if (e.key==="Enter") commit(); if (e.key==="Escape"){ setDraft(name); setEditing(false); }}}
      aria-label="Edit player name" />
  );
  return (
    <button className="name-btn" onClick={() => setEditing(true)} aria-label={`Player: ${name}. Tap to edit.`}>
      {name.toUpperCase()}
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{color: T ? T.editIcon : "#7a9e7a", flexShrink:0, transition:"color 0.5s ease"}}>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    </button>
  );
}

function Ticker({ log }) {
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (open && scrollRef.current) scrollRef.current.scrollLeft = 0;
  }, [log.length, open]);

  if (!log.length) return <div style={{height:"10px"}} />;
  const latest = log[0];

  return (
    <div className="ticker-wrap">
      <button className="ticker-bar" onClick={() => setOpen(o => !o)}
        aria-expanded={open} aria-label={open ? "Collapse history" : "Expand play by play history"}>
        <span className="ticker-dot" aria-hidden="true" />
        <span className="ticker-latest">
{latest.stat.label}{latest.stat.key === "HR" && latest.distance ? ` · ${latest.distance} ft` : latest.time ? ` · ${latest.time}` : ""}
        </span>
        <span style={{color:"#6a8a6a",display:"flex",alignItems:"center",transition:"transform 0.25s",transform:open?"rotate(180deg)":"rotate(0deg)"}} aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 4l4 4 4-4"/></svg>
        </span>
      </button>
      {open && (
        <div ref={scrollRef} className="ticker-chips" role="list" aria-label="Play by play history">
          {log.map((entry, i) => (
            <div key={i} className="ticker-chip" role="listitem"
              aria-label={`AB ${log.length - i}: ${entry.stat.label}${entry.stat.key === "HR" && entry.distance ? ` · ${entry.distance} ft` : entry.time ? ` at ${entry.time}` : ""}`}>
              <span className="chip-key">{entry.stat.key}</span>
              <span className="chip-time">{entry.stat.key === "HR" && entry.distance ? `${entry.distance} ft` : entry.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Duration stepper ─────────────────────────────────────────────────────────
function DurationStepper({ label, sublabel, value, min, max, onChange }) {
  return (
    <div className="stepper-row">
      <div className="stepper-labels">
        <span className="stepper-label">{label}</span>
        <span className="stepper-sublabel">{sublabel}</span>
      </div>
      <div className="stepper-controls">
        <button
          className="stepper-btn"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`Decrease ${label} by 1 minute`}
        >−</button>
        <span className="stepper-value" aria-label={`${value} minutes`}>{value}<span className="stepper-unit">min</span></span>
        <button
          className="stepper-btn"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`Increase ${label} by 1 minute`}
        >+</button>
      </div>
    </div>
  );
}

// ── Settings panel ────────────────────────────────────────────────────────────
function SettingsPanel({ open, onClose, workMins, breakMins, onWorkChange, onBreakChange, soundOn, onSoundToggle, lifetime, onResetLifetime, themeKey, onThemeChange, T }) {
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    if (!open) setConfirmReset(false);
  }, [open]);

  const handleReset = () => {
    if (confirmReset) {
      onResetLifetime();
      setConfirmReset(false);
    } else {
      setConfirmReset(true);
    }
  };

  const fmtFocusTime = (secs) => {
    const s = Math.floor(secs || 0);
    const h = Math.floor(s / 3600);
    if (h >= 10000) return "9999h+";
    const m   = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    const mm  = String(m).padStart(2, "0");
    const ss  = String(sec).padStart(2, "0");
    return h > 0 ? `${h}:${mm}:${ss}` : `${m}:${ss}`;
  };

  return (
    <>
      {/* Backdrop — always rendered so click-outside works reliably */}
      <div
        className="settings-backdrop"
        onClick={onClose}
        aria-hidden="true"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Slide-in panel */}
      <div className={`settings-panel${open ? " open" : ""}`} role="dialog" aria-modal="true" aria-label="Settings">

        {/* Panel header */}
        <div className="settings-header">
          <span className="settings-title">Settings</span>
          <button className="settings-close" onClick={onClose} aria-label="Close settings">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Section: Timer durations */}
        <div className="settings-section">
          <div className="settings-section-title">Timer Durations</div>
          <DurationStepper label="At Plate" sublabel="Focus session" value={workMins} min={1} max={60} onChange={onWorkChange} />
          <div className="settings-divider" />
          <DurationStepper label="Dugout" sublabel="Break session" value={breakMins} min={1} max={30} onChange={onBreakChange} />
        </div>


        {/* Section: Sound */}
        <div className="settings-section">
          <div className="settings-section-title">Sound</div>
          <div className="stepper-row">
            <div className="stepper-labels">
              <span className="stepper-label">Sound Effects</span>
              <span className="stepper-sublabel">Button taps &amp; hit sounds</span>
            </div>
            <button onClick={onSoundToggle}
              aria-label={soundOn ? "Mute sounds" : "Enable sounds"}
              style={{background:"none",border:"none",cursor:"pointer",padding:"6px",borderRadius:"8px",color:T.soundIconColor,display:"flex",alignItems:"center",justifyContent:"center",transition:"color 0.2s"}}>
              {soundOn ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <line x1="23" y1="9" x2="17" y2="15"/>
                  <line x1="17" y1="9" x2="23" y2="15"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Section: Theme */}
        <div className="settings-section">
          <div className="settings-section-title">Theme</div>
          {[
            { key:"dayGame",   label:"Day Game"  },
            { key:"statsheet", label:"Statsheet" },
            { key:"bananas",   label:"Bananas"   },
          ].map(({ key, label }, i, arr) => (
            <div key={key}>
              <div className="stepper-row" style={{padding:"8px 0"}}>
                <span className="stepper-label">{label}</span>
                <button
                  className={`toggle-btn${themeKey===key ? " on" : ""}`}
                  onClick={() => onThemeChange(key)}
                  role="radio"
                  aria-checked={themeKey===key}
                  aria-label={`Select ${label} theme`}
                >
                  <span className="toggle-knob" />
                </button>
              </div>
              {i < arr.length - 1 && <div className="settings-divider" />}
            </div>
          ))}
        </div>

        {/* Section: Career stats */}
        <div className="settings-section">
          <div className="settings-section-title">Career Stats</div>
          <div className="lifetime-row-single">
            <span className="lifetime-row-label">Focus Time</span>
            <span className="lifetime-row-val">{fmtFocusTime(lifetime.focusSecs)}</span>
          </div>
          <div className="settings-divider" />
          <div className="lifetime-hits-grid">
            {[
              { key:"1B", label:"1B" },
              { key:"2B", label:"2B" },
              { key:"3B", label:"3B" },
              { key:"HR", label:"HR" },
            ].map(({ key, label }) => (
              <div key={key} className="lifetime-cell">
                <span className="lifetime-val">{lifetime.hits[key]}</span>
                <span className="lifetime-key">{label}</span>
              </div>
            ))}
          </div>
          <button
            className={`reset-btn${confirmReset ? " confirm" : ""}`}
            onClick={handleReset}
            aria-label={confirmReset ? "Confirm reset career stats" : "Reset career stats"}
          >
            {confirmReset ? "Are you sure? Tap to confirm" : "Reset Career Stats"}
          </button>
        </div>

      </div>
    </>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function BaseballPomodoro() {
  const PREFS_KEY = "ballpark_prefs_v1";
  const loadPrefs = () => {
    try {
      const s = localStorage.getItem("ballpark_prefs_v1");
      if (s) { const p = JSON.parse(s); return { work: p.workMins || 25, brk: p.breakMins || 5, theme: p.theme || "dayGame" }; }
    } catch(e) {}
    return { work: 25, brk: 5, theme: "dayGame" };
  };
  const initPrefs = loadPrefs();
  const [workMins,  setWorkMins]  = useState(initPrefs.work);
  const [breakMins, setBreakMins] = useState(initPrefs.brk);
  const [themeKey,  setThemeKey]  = useState(initPrefs.theme);
  const T = THEMES[themeKey] || THEMES.dayGame;

  const [isMobile, setIsMobile] = useState(() => {
    try { return typeof window !== "undefined" && window.innerWidth <= 500; } catch(e) { return false; }
  });
  useEffect(() => {
    try {
      const handler = () => setIsMobile(window.innerWidth <= 500);
      window.addEventListener("resize", handler);
      handler();
      return () => window.removeEventListener("resize", handler);
    } catch(e) {}
  }, []);



  // Splash screen — shows on first open after hard close (sessionStorage clears on hard close)
  const [showSplash, setShowSplash] = useState(() => {
    try { return !sessionStorage.getItem("ballpark_launched"); } catch(e) { return false; }
  });
  const [splashFading, setSplashFading] = useState(false);
  useEffect(() => {
    if (!showSplash) return;
    try { sessionStorage.setItem("ballpark_launched", "1"); } catch(e) {}
    // Start fade at 1.5s, fully hidden at 2s
    const fadeTimer = setTimeout(() => setSplashFading(true), 1500);
    const hideTimer = setTimeout(() => setShowSplash(false), 2000);
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer); };
  }, []);

  // Inject base reset into document.head
  useEffect(() => {
    try {
      const id = "baseball-mobile-reset";
      let el = document.getElementById(id);
      if (!el) {
        el = document.createElement("style");
        el.id = id;
        document.head.appendChild(el);
      }
      el.textContent = `
        html, body, #root {
          margin: 0; padding: 0;
          width: 100%;
          height: 100%;
        }
        body {
          overflow: hidden;
          background: transparent;
        }
      `;
    } catch(e) {}
  }, []);

  const WORK  = workMins  * 60;
  const BREAK = breakMins * 60;

  const [mode, setMode]             = useState("work");
  const [timeLeft, setTimeLeft]     = useState(WORK);
  const [running, setRunning]       = useState(false);
  const todayKey = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
  const [atBats, setAtBats] = useState(() => {
    try {
      const s = JSON.parse(localStorage.getItem("ballpark_today"));
      return s?.date === todayKey ? (s.atBats || 0) : 0;
    } catch(e) { return 0; }
  });
  const [stats, setStats] = useState(() => {
    try {
      const s = JSON.parse(localStorage.getItem("ballpark_today"));
      return s?.date === todayKey ? (s.stats || {"1B":0,"2B":0,"3B":0,"HR":0}) : {"1B":0,"2B":0,"3B":0,"HR":0};
    } catch(e) { return {"1B":0,"2B":0,"3B":0,"HR":0}; }
  });
  const [lastStat, setLastStat]     = useState(null);
  const [confetti, setConfetti]     = useState(false);
  const [call, setCall]             = useState("");
  const [log, setLog]               = useState([]);
  const [playerName, setPlayerName] = useState(() => {
    try { return localStorage.getItem("ballpark_name") || "Player"; } catch(e) { return "Player"; }
  });

  const handleNameChange = (name) => {
    setPlayerName(name);
    try { localStorage.setItem("ballpark_name", name); } catch(e) {}
  };
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Lifetime stats — persisted to localStorage
  const LIFETIME_KEY = "ballpark_lifetime_v1";
  const emptyLifetime = () => ({ focusSecs: 0, hits: { "1B":0,"2B":0,"3B":0,HR:0 } });
  const loadLifetime  = () => {
    try { const s = localStorage.getItem(LIFETIME_KEY); return s ? JSON.parse(s) : emptyLifetime(); }
    catch(e) { return emptyLifetime(); }
  };
  const [lifetime, setLifetime] = useState(loadLifetime);

  const saveLifetime = (updated) => {
    setLifetime(updated);
    try { localStorage.setItem(LIFETIME_KEY, JSON.stringify(updated)); } catch(e) {}
  };

  // Persist today's scorecard whenever it changes
  useEffect(() => {
    try { localStorage.setItem("ballpark_today", JSON.stringify({ date: todayKey, atBats, stats })); } catch(e) {}
  }, [atBats, stats]);

  const intervalRef  = useRef(null);
  const animTimerRef = useRef(null);
  const [floatingChips, setFloatingChips] = useState([]);
  const [activeBanner, setActiveBanner] = useState(null); // { text } currently showing
  const bannerQueueRef = useRef([]);       // pending banners to show
  const bannerTimerRef = useRef(null);
  const arcRef       = useRef(null);
  const rafRef       = useRef(null);
  const audioCtxRef  = useRef(null);
  const [soundOn, setSoundOn] = useState(() => { try { const p = JSON.parse(localStorage.getItem("ballpark_prefs_v1")); return p?.sound !== false; } catch(e) { return true; } });

  // When durations change while not running, update the display
  useEffect(() => {
    if (!running) {
      setTimeLeft(mode === "work" ? WORK : BREAK);
    }
  }, [workMins, breakMins]);

  // ── Sound engine ─────────────────────────────────────────────────────────────
  const getCtx = () => {
    if (!audioCtxRef.current)
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  };

  // Sharp mechanical click — Play Ball / Resume / Start Break
  const sfxTap = useCallback((pitch = 1.0) => {
    try {
      const ctx = getCtx();
      // Two-layer click: high transient + low body
      const bufSize = Math.floor(ctx.sampleRate * 0.003);
      const buf  = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufSize);
      const src = ctx.createBufferSource();
      const hp  = ctx.createBiquadFilter();
      const g   = ctx.createGain();
      src.buffer = buf;
      hp.type = "highpass"; hp.frequency.value = 3000 * pitch;
      g.gain.setValueAtTime(0.5, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      src.connect(hp); hp.connect(g); g.connect(ctx.destination);
      src.start();
      // Low body thud underneath
      const osc = ctx.createOscillator();
      const og  = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(300 * pitch, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80 * pitch, ctx.currentTime + 0.04);
      og.gain.setValueAtTime(0.3, ctx.currentTime);
      og.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(og); og.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 0.06);
    } catch(e) {}
  }, []);

  // Ball hitting glove — for pause
  const sfxPause = useCallback(() => {
    try {
      const ctx = getCtx();
      // Noise thud — leather impact
      const bufSize = Math.floor(ctx.sampleRate * 0.06);
      const buf  = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufSize, 1.5);
      const src = ctx.createBufferSource();
      const lp  = ctx.createBiquadFilter();
      const g   = ctx.createGain();
      src.buffer = buf;
      lp.type = "lowpass"; lp.frequency.value = 600; lp.Q.value = 1.5;
      g.gain.setValueAtTime(0.5, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      src.connect(lp); lp.connect(g); g.connect(ctx.destination);
      src.start();
      // Low pitched thud body
      const osc = ctx.createOscillator();
      const og  = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 0.07);
      og.gain.setValueAtTime(0.35, ctx.currentTime);
      og.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(og); og.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 0.12);
    } catch(e) {}
  }, []);

  // Clock tick — for reset
  const sfxReset = useCallback(() => {
    try {
      const ctx = getCtx();
      // Two ticks — like a clock resetting
      [0, 0.1].forEach((delay) => {
        const bufSize = Math.floor(ctx.sampleRate * 0.004);
        const buf  = ctx.createBuffer(1, bufSize, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufSize);
        const src = ctx.createBufferSource();
        const bp  = ctx.createBiquadFilter();
        const g   = ctx.createGain();
        src.buffer = buf;
        bp.type = "bandpass"; bp.frequency.value = 4000; bp.Q.value = 2;
        const t = ctx.currentTime + delay;
        g.gain.setValueAtTime(0.4, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
        src.connect(bp); bp.connect(g); g.connect(ctx.destination);
        src.start(t);
      });
    } catch(e) {}
  }, []);

  // Bat crack — sharp transient
  const sfxCrack = useCallback((ctx) => {
    // Noise burst for the crack
    const bufSize = ctx.sampleRate * 0.04;
    const buf  = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufSize);
    const src = ctx.createBufferSource();
    const hp  = ctx.createBiquadFilter();
    const g   = ctx.createGain();
    src.buffer = buf;
    hp.type = "highpass"; hp.frequency.value = 2000;
    g.gain.setValueAtTime(0.9, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
    src.connect(hp); hp.connect(g); g.connect(ctx.destination);
    src.start();
    // Low woody thud underneath
    const osc = ctx.createOscillator();
    const og  = ctx.createGain();
    osc.type = "sine"; osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.05);
    og.gain.setValueAtTime(0.6, ctx.currentTime);
    og.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.connect(og); og.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.1);
  }, []);

  // Synthesized crowd cheer of variable intensity
  const sfxCrowd = useCallback((ctx, intensity, duration) => {
    // Layered noise bands pitched to sound like voices
    [400, 800, 1400, 2200].forEach((freq, i) => {
      const bufSize = ctx.sampleRate * duration;
      const buf  = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let j = 0; j < bufSize; j++) data[j] = Math.random() * 2 - 1;
      const src = ctx.createBufferSource();
      const bp  = ctx.createBiquadFilter();
      const g   = ctx.createGain();
      src.buffer = buf;
      bp.type = "bandpass"; bp.frequency.value = freq; bp.Q.value = 1.2;
      const vol = intensity * [0.22, 0.18, 0.12, 0.08][i];
      // Swell envelope — builds then fades
      g.gain.setValueAtTime(0, ctx.currentTime);
      g.gain.linearRampToValueAtTime(vol, ctx.currentTime + duration * 0.2);
      g.gain.setValueAtTime(vol, ctx.currentTime + duration * 0.6);
      g.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
      src.connect(bp); bp.connect(g); g.connect(ctx.destination);
      src.start(); src.stop(ctx.currentTime + duration + 0.05);
    });
  }, []);

  // Hit-specific sounds
  const sfxHit = useCallback((key) => {
    try {
      const ctx = getCtx();
      sfxCrack(ctx);
      // Each hit type gets a different crowd intensity and duration
      const config = {
        "1B": { intensity: 0.4, duration: 1.2 },
        "2B": { intensity: 0.6, duration: 1.8 },
        "3B": { intensity: 0.8, duration: 2.5 },
        "HR": { intensity: 1.2, duration: 3.8 },
      };
      const { intensity, duration } = config[key] || config["1B"];
      // Slight delay after crack so crowd reacts
      setTimeout(() => sfxCrowd(ctx, intensity, duration), 80);
      // HR gets an extra fanfare — ascending 4-note chime
      if (key === "HR") {
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const g   = ctx.createGain();
          osc.type = "sine"; osc.frequency.value = freq;
          const t = ctx.currentTime + 0.1 + i * 0.12;
          g.gain.setValueAtTime(0, t);
          g.gain.linearRampToValueAtTime(0.3, t + 0.04);
          g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
          osc.connect(g); g.connect(ctx.destination);
          osc.start(t); osc.stop(t + 0.45);
        });
      }
    } catch(e) {}
  }, [sfxCrack, sfxCrowd]);

  // Enqueue a banner message — shows sequentially, never overlapping
  const enqueueBanner = useCallback((text) => {
    bannerQueueRef.current.push(text);
    if (bannerQueueRef.current.length === 1) {
      // Nothing currently showing — start immediately
      const show = () => {
        const next = bannerQueueRef.current[0];
        if (!next) { setActiveBanner(null); return; }
        setActiveBanner({ text: next });
        bannerTimerRef.current = setTimeout(() => {
          setActiveBanner(null);
          bannerQueueRef.current.shift();
          setTimeout(show, 300); // brief gap between sequential banners
        }, 4000);
      };
      show();
    }
  }, []);

  const awardStat = useCallback(() => {
    const stat = getRandomStat();
    if (soundOn) sfxHit(stat.key);
    setLastStat(stat);
    setAtBats(a => a+1);
    setStats(p => ({...p,[stat.key]:p[stat.key]+1}));
    const hrDistance = stat.key === "HR" ? Math.floor(Math.random() * (550 - 350 + 1)) + 350 : null;
    const logTime = new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});
    setLog(prev => [{ stat, time: logTime, distance: hrDistance }, ...prev.slice(0,49)]);
    if (stat.key==="HR"){
      setConfetti(true);
      setTimeout(()=>setConfetti(false),3200);
      if (hrDistance) enqueueBanner(`💥 ${hrDistance} ft`);
    }
    // Launch floating chip
    const chipId = Date.now();
    const durations = { "1B": 1200, "2B": 1400, "3B": 1600, "HR": 2000 };
    const dur = durations[stat.key] || 1400;
    setFloatingChips(prev => [...prev, { id: chipId, stat: {...stat}, dur }]);
    setTimeout(() => setFloatingChips(prev => prev.filter(c => c.id !== chipId)), dur + 100);
    // Compute new lifetime totals inline (don't rely on async state)
    setLifetime(prev => {
      const newHits = { ...prev.hits, [stat.key]: prev.hits[stat.key] + 1 };
      const updated = { ...prev, hits: newHits };
      try { localStorage.setItem(LIFETIME_KEY, JSON.stringify(updated)); } catch(e) {}

      // Milestone checks against new totals
      const totalHits = newHits["1B"] + newHits["2B"] + newHits["3B"] + newHits["HR"];
      const newHRs    = newHits["HR"];

      // HR milestone — every 100
      if (newHRs > 0 && newHRs % 100 === 0) {
        setTimeout(() => enqueueBanner(`🏆 ${newHRs.toLocaleString()} Career Home Runs`), 0);
      }
      // Hit milestone — every 1000
      if (totalHits > 0 && totalHits % 1000 === 0) {
        setTimeout(() => enqueueBanner(`🏆 ${totalHits.toLocaleString()} Career Hits`), 0);
      }

      return updated;
    });
  },[sfxHit, soundOn, enqueueBanner]);

  useEffect(()=>{
    if (!running){ clearInterval(intervalRef.current); return; }
    intervalRef.current = setInterval(()=>{
      // Accumulate focus time every minute tick
      if (mode === "work") {
        setLifetime(prev => {
          const updated = { ...prev, focusSecs: (prev.focusSecs || 0) + 1 };
          try { localStorage.setItem(LIFETIME_KEY, JSON.stringify(updated)); } catch(e) {}
          return updated;
        });
      }
      setTimeLeft(t=>{
        if (t<=1){
          clearInterval(intervalRef.current); setRunning(false);
          if (mode==="work"){ awardStat(); setMode("break"); setTimeLeft(BREAK); }
          else { setMode("work"); setTimeLeft(WORK); }
          return 0;
        }
        return t-1;
      });
    },1000);
    return ()=>clearInterval(intervalRef.current);
  },[running,mode,awardStat,WORK,BREAK]);

  // rAF loop — updates arc DOM directly at 60fps, no React re-render
  useEffect(() => {
    const CIRCUMFERENCE = 2 * Math.PI * 126;
    const cancelRaf = () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };

    if (!running) {
      cancelRaf();
      // Snap arc to current position when paused/stopped
      if (arcRef.current) {
        arcRef.current.style.strokeDashoffset =
          -CIRCUMFERENCE * (1 - timeLeft / (mode === "work" ? WORK : BREAK)); // negative = clockwise
      }
      return;
    }

    // Record start of this run segment
    const startTime   = performance.now();
    const total       = (mode === "work" ? WORK : BREAK);
    const elapsed     = 1 - timeLeft / total;           // fraction already done
    const startOffset = -CIRCUMFERENCE * elapsed;       // negative = clockwise
    const endOffset   = -CIRCUMFERENCE;                 // fully drained
    const duration    = timeLeft * 1000; // ms

    const tick = (now) => {
      const elapsed  = now - startTime;
      const fraction = Math.min(elapsed / duration, 1);
      const offset   = startOffset + (endOffset - startOffset) * fraction;
      if (arcRef.current) arcRef.current.style.strokeDashoffset = offset;
      if (fraction < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return cancelRaf;
  }, [running, mode, timeLeft === (mode === "work" ? WORK : BREAK)]); // only restart rAF on play/pause/reset

  // ── Audio engine ─────────────────────────────────────────────────────────────

  const switchMode = (m) => {
    if (m===mode) return;
    if (soundOn) sfxTap(0.6);
    clearInterval(intervalRef.current);
    setRunning(false); setMode(m);
    setTimeLeft(m==="work"?WORK:BREAK);
  };

  const toggle = () => { if (running) { if (soundOn) sfxPause(); } else { if (soundOn) sfxTap(); } setRunning(r=>!r); };
  const reset  = () => {
    if (soundOn) sfxReset();
    clearInterval(intervalRef.current);
    setRunning(false);
    setTimeLeft(mode==="work"?WORK:BREAK);
  };

  const savePrefs = (w, b, tk, snd) => {
    try { localStorage.setItem("ballpark_prefs_v1", JSON.stringify({ workMins: w, breakMins: b, theme: tk, sound: snd })); } catch(e) {}
  };
  const handleWorkChange = (val) => {
    setWorkMins(val);
    if (!running && mode==="work") setTimeLeft(val*60);
    savePrefs(val, breakMins, themeKey, soundOn);
  };
  const handleBreakChange = (val) => {
    setBreakMins(val);
    if (!running && mode==="break") setTimeLeft(val*60);
    savePrefs(workMins, val, themeKey, soundOn);
  };
  const handleThemeChange = (tk) => {
    setThemeKey(tk);
    savePrefs(workMins, breakMins, tk, soundOn);
  };

  const today     = new Date().toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"});
  const isAtStart = timeLeft===(mode==="work"?WORK:BREAK) && !running;
  const btnLabel  = running ? "PAUSE" : isAtStart ? (mode==="work" ? "PLAY BALL" : "START BREAK") : "RESUME";
  const isLive    = running;
  const progress   = 1 - timeLeft / (mode==="work" ? WORK : BREAK); // 0=start, 1=done

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600&display=swap');
        *,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
        body { background:${T.wallBg}; display:flex; align-items:center; justify-content:center; min-height:100vh; font-family:'Barlow',sans-serif; }

        /* ── Phone ── */
        .phone { width:375px; height:812px; border-radius:44px; box-shadow: 0 0 0 2px ${T.phoneRing}, 0 0 0 7px #111, 0 40px 100px rgba(0,0,0,0.55); position:relative; overflow:hidden; display:flex; flex-direction:column; transition:background 0.5s ease; }
        .phone::before { content:''; position:absolute; right:-3px; top:120px; width:3px; height:60px; background:#0e0e0e; border-radius:0 2px 2px 0; box-shadow:0 80px 0 #0e0e0e; }
        .phone::after  { content:''; position:absolute; left:-3px; top:100px; width:3px; height:36px; background:#0e0e0e; border-radius:2px 0 0 2px; box-shadow:0 52px 0 #0e0e0e, 0 96px 0 #0e0e0e; }
        .notch { position:absolute; top:0; left:50%; transform:translateX(-50%); width:126px; height:34px; background:#0e0e0e; border-radius:0 0 22px 22px; z-index:100; }

        /* ── Status bar ── */
        .status { height:44px; flex-shrink:0; z-index:10; position:relative; display:flex; align-items:flex-end; justify-content:space-between; padding:0 28px 6px; }
        .s-time { font-family:'Barlow',sans-serif; font-size:15px; font-weight:700; color:${T.statusColor}; letter-spacing:0.02em; }
        .s-icons { display:flex; gap:4px; align-items:center; color:${T.statusColor}; }

        /* ── Scroll ── */
        .scroll { flex:1; overflow-y:auto; display:flex; flex-direction:column; padding:0 26px; scrollbar-width:none; background:${mode==="work" ? T.scrollBg : T.scrollBgBreak}; transition:background 0.5s ease; }
        .scroll::-webkit-scrollbar { display:none; }

        /* ── Navbar ── */
        .navbar { display:flex; align-items:center; justify-content:space-between; padding:12px 0 16px; }
        .name-btn { display:flex; align-items:center; gap:7px; background:none; border:none; cursor:pointer; padding:0; font-family:'Barlow Condensed',sans-serif; font-size:22px; font-weight:800; color:${T.navbarName}; transition:color 0.5s ease; letter-spacing:0.04em; }
        .name-btn:focus-visible { outline:3px solid ${T.focusOutline}; outline-offset:3px; border-radius:3px; }
        .name-input { font-family:'Barlow Condensed',sans-serif; font-size:22px; font-weight:800; color:${T.navbarName}; background:${T.nameInputBg}; border:1.5px solid ${T.nameInputBorder}; border-radius:6px; padding:2px 10px; outline:none; letter-spacing:0.04em; width:190px; }
        .settings-btn { background:none; border:none; cursor:pointer; color:${T.navbarIcon}; padding:4px; min-width:44px; min-height:44px; display:flex; align-items:center; justify-content:center; border-radius:8px; transition:color 0.2s; }
        .settings-btn:hover { color:${T.navbarIconHover}; }
        .settings-btn:focus-visible { outline:3px solid ${T.focusOutline}; outline-offset:3px; border-radius:8px; }

        /* ── Stat card ── */
        .stat-card-wrap { background:${T.cardBg}; transition:background 0.5s ease; border-radius:14px; padding:14px 8px 12px; margin-bottom:10px; }
        .stat-date { font-family:'Silkscreen',sans-serif; font-size:13px; font-weight:400; color:${T.cardDate}; letter-spacing:0.05em; text-transform:uppercase; text-align:center; margin-bottom:12px; }
        .stat-row { display:flex; align-items:flex-start; }
        .stat-col { flex:1; text-align:center; position:relative; }
        .stat-col+.stat-col::before { content:''; position:absolute; left:0; top:50%; transform:translateY(-50%); width:1px; height:55%; background:${T.statDivider}; }
        .stat-col-key { font-family:'Barlow Condensed',sans-serif; font-size:13px; font-weight:700; color:${T.statKey}; letter-spacing:0.14em; text-transform:uppercase; margin-bottom:5px; }
        .stat-col-val { font-family:'Silkscreen',sans-serif; font-size:22px; font-weight:400; line-height:1; color:${T.statValDim}; transition:color 0.3s; }
        .stat-col-val.active { color:${T.statValActive}; }
        .stat-col-val.flash  { animation:numPop 0.4s cubic-bezier(0.34,1.56,0.64,1); }

        /* ── Ticker ── */
        .ticker-wrap { margin-bottom:14px; border-radius:10px; overflow:hidden; }
        .ticker-bar { width:100%; display:flex; align-items:center; gap:8px; padding:9px 13px; background:${T.tickerBg}; transition:background 0.5s ease; border:none; cursor:pointer; text-align:left; min-height:40px; border-radius:10px; }
        .ticker-bar:focus-visible { outline:3px solid ${T.focusOutline}; outline-offset:-2px; }
        .ticker-dot { width:6px; height:6px; border-radius:50%; background:${T.tickerDot}; flex-shrink:0; }
        .ticker-latest { flex:1; font-size:13px; color:${T.tickerText}; font-style:italic; }
        .ticker-chips { display:flex; flex-direction:row; gap:6px; padding:8px 12px; background:${T.tickerChipsBg}; border-top:1px solid ${T.tickerChipBorder}; overflow-x:auto; overflow-y:hidden; scrollbar-width:none; border-radius:0 0 10px 10px; }
        .ticker-chips::-webkit-scrollbar { display:none; }
        .ticker-chip { display:flex; flex-direction:column; align-items:center; gap:3px; flex-shrink:0; background:${T.tickerChipBg}; border:1px solid ${T.tickerChipBorder}; border-radius:8px; padding:8px 12px; min-width:54px; cursor:default; }
        .chip-key { font-family:'Barlow Condensed',sans-serif; font-size:13px; font-weight:700; color:${T.chipKey}; letter-spacing:0.08em; }
        .chip-time { font-size:9.5px; color:${T.chipTime}; font-style:italic; white-space:nowrap; }

        /* ── Mode tabs ── */
        .mode-tabs { display:flex; background:${T.modeTabsBg}; transition:background 0.5s ease; border-radius:12px; padding:3px; margin-bottom:16px; }
        .mode-tab { flex:1; padding:10px 0; border:none; cursor:pointer; border-radius:9px; font-family:'Barlow Condensed',sans-serif; font-size:15px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; transition:background 0.2s,color 0.2s; min-height:44px; background:transparent; color:${T.modeTabColor}; }
        .mode-tab:focus-visible { outline:3px solid ${T.focusOutline}; outline-offset:-3px; }
        .mode-tab.active.work  { background:${T.modeTabWorkBg};  color:${T.modeTabWorkText}; }
        .mode-tab.active.break { background:${T.modeTabBreakBg}; color:${T.modeTabBreakText}; }

        /* ── LIVE indicator ── */
        .live-bar { display:flex; align-items:center; justify-content:center; gap:7px; min-height:22px; }
        .live-dot { width:8px; height:8px; border-radius:50%; background:#c0392b; flex-shrink:0; animation:livePulse 1.8s ease-in-out infinite; }
        .break-dot { width:8px; height:8px; border-radius:50%; background:${T.breakLabel}; flex-shrink:0; animation:breakPulse 2.8s ease-in-out infinite; }
        .break-label { font-family:'Barlow Condensed',sans-serif; font-size:13px; font-weight:800; color:${T.liveLabel}; letter-spacing:0.22em; }
        .live-label { font-family:'Barlow Condensed',sans-serif; font-size:13px; font-weight:800; color:${T.liveLabel}; letter-spacing:0.22em; }

        /* ── Timer ── */
        .timer-wrap { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:0; }
        .timer-ring { position:relative; display:flex; align-items:center; justify-content:center; }
        .timer-ring svg { position:absolute; top:0; left:0; }
        .timer-inner { position:relative; z-index:1; display:flex; flex-direction:column; align-items:center; justify-content:center; width:280px; height:280px; }
        .timer-digits { font-family:'Barlow Condensed',sans-serif; font-size:96px; font-weight:800; color:${T.timerDigits}; transition:color 0.5s ease; letter-spacing:-0.02em; line-height:1; }
        .timer-mode-lbl { font-family:'Barlow Condensed',sans-serif; font-size:12px; font-weight:700; color:${T.timerModeLbl}; letter-spacing:0.18em; text-transform:uppercase; margin-top:4px; }
        @keyframes bannerFadeIn { from { opacity:0; } to { opacity:1; } }
        .hr-banner-wrap { height:48px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .hr-banner { text-align:center; font-family:'Barlow Condensed',sans-serif; font-size:23px; font-weight:800; letter-spacing:0.18em; text-transform:uppercase; color:${T.statValActive}; animation:bannerFadeIn 0.35s ease forwards; }
        .stat-announce { height:44px; flex-shrink:0; }
        .floating-chip-wrap { position:absolute; inset:0; pointer-events:none; overflow:hidden; border-radius:44px; z-index:100; }
        .floating-chip { position:absolute; left:50%; transform:translateX(-50%); white-space:nowrap; border-radius:999px; font-family:'Barlow Condensed',sans-serif; font-weight:800; letter-spacing:0.08em; text-transform:uppercase; display:flex; align-items:center; gap:6px; }
        .floating-chip.size-1b { font-size:16px; padding:6px 16px; }
        .floating-chip.size-2b { font-size:19px; padding:7px 18px; }
        .floating-chip.size-3b { font-size:22px; padding:8px 20px; }
        .floating-chip.size-hr { font-size:26px; padding:10px 24px; box-shadow:0 4px 20px rgba(0,0,0,0.25); }

        /* ── Buttons ── */
        .btn-stack { display:flex; flex-direction:column; gap:10px; width:100%; padding:0 0 32px; }
        .btn-primary { width:100%; min-height:58px; border-radius:14px; border:none; font-family:'Barlow Condensed',sans-serif; font-size:20px; font-weight:800; letter-spacing:0.12em; cursor:pointer; transition:background 0.15s, transform 0.1s; }
        .btn-primary:focus-visible { outline:3px solid ${T.focusOutline}; outline-offset:3px; }
        .btn-primary.work  { background:${T.btnWorkBg}; transition:background 0.5s ease, transform 0.1s;  color:${T.btnWorkText}; }
        .btn-primary.work:hover  { background:${T.btnWorkHover};  transform:translateY(-1px); }
        .btn-primary.break { background:${T.btnBreakBg}; transition:background 0.5s ease, transform 0.1s; color:${T.btnBreakText}; }
        .btn-primary.break:hover { background:${T.btnBreakHover}; transform:translateY(-1px); }
        .btn-reset { width:100%; min-height:46px; background:${T.btnResetBg}; transition:background 0.5s ease, color 0.5s ease; border:1px solid ${T.btnResetBorder}; border-radius:12px; font-family:'Barlow Condensed',sans-serif; font-size:15px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:${T.btnResetColor}; cursor:pointer; transition:background 0.15s, color 0.15s; }
        .btn-reset:hover { background:${T.btnResetHover}; color:${T.btnResetHoverColor}; }
        .btn-reset:focus-visible { outline:3px solid ${T.focusOutline}; outline-offset:3px; }

        /* ── Settings panel ── */
        .settings-backdrop { position:absolute; inset:0; background:rgba(0,0,0,0.45); z-index:200; border-radius:44px; }
        .settings-panel { position:absolute; top:0; right:0; bottom:0; width:88%; background:${T.settingsBg}; transition:background 0.5s ease; border-radius:0 44px 44px 0; z-index:201; transform:translateX(100%); transition:transform 0.3s cubic-bezier(0.4,0,0.2,1); display:flex; flex-direction:column; overflow-y:auto; -webkit-overflow-scrolling:touch; overscroll-behavior:none; scrollbar-width:none; border-left:1px solid ${T.settingsDivider}; }
        .settings-panel::-webkit-scrollbar { display:none; }
        .settings-panel.open { transform:translateX(0); }
        .settings-header { display:flex; align-items:center; justify-content:space-between; padding:0px 24px 20px; border-bottom:1px solid ${T.settingsDivider}; flex-shrink:0; }
        .settings-title { font-family:'Barlow Condensed',sans-serif; font-size:22px; font-weight:800; color:${T.settingsTitle}; letter-spacing:0.06em; text-transform:uppercase; }
        .settings-close { background:${T.settingsHeader}; border:none; cursor:pointer; color:${T.navbarIcon}; width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; transition:background 0.2s, color 0.2s; }
        .settings-close:hover { background:${T.cardBg}; color:${T.settingsTitle}; }
        .settings-close:focus-visible { outline:3px solid ${T.focusOutline}; outline-offset:3px; }
        .settings-section { padding:20px 24px; border-bottom:1px solid ${T.settingsDivider}; }
        .settings-section-title { font-family:'Barlow Condensed',sans-serif; font-size:13px; font-weight:700; color:${T.settingsSectionTitle}; letter-spacing:0.2em; text-transform:uppercase; margin-bottom:16px; }
        .settings-divider { height:1px; background:${T.settingsDivider}; margin:12px 0; }

        /* Stepper */
        .stepper-row { display:flex; align-items:center; justify-content:space-between; }
        .stepper-labels { display:flex; flex-direction:column; gap:2px; }
        .stepper-label { font-family:'Barlow Condensed',sans-serif; font-size:17px; font-weight:700; color:${T.stepperLabel}; letter-spacing:0.04em; }
        .stepper-sublabel { font-size:12px; color:${T.stepperSublabel}; font-style:italic; }
        .stepper-controls { display:flex; align-items:center; gap:12px; }
        .stepper-btn { width:36px; height:36px; border-radius:50%; background:${T.stepperBtnBg}; border:1px solid ${T.stepperBtnBorder}; color:${T.stepperBtnColor}; font-size:20px; font-weight:300; line-height:1; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background 0.15s, color 0.15s; flex-shrink:0; }
        .stepper-btn:hover:not(:disabled) { background:${T.cardBg}; }
        .stepper-btn:disabled { opacity:0.3; cursor:not-allowed; }
        .stepper-btn:focus-visible { outline:3px solid ${T.focusOutline}; outline-offset:3px; }
        .stepper-value { font-family:'Barlow Condensed',sans-serif; font-size:28px; font-weight:800; color:${T.stepperVal}; min-width:52px; text-align:center; letter-spacing:-0.02em; }
        .stepper-unit { font-size:14px; font-weight:400; color:${T.stepperUnit}; margin-left:4px; }

        /* Lifetime stats */
        .lifetime-row-single { display:flex; align-items:center; justify-content:space-between; padding:10px 4px; margin-bottom:4px; }
        .lifetime-row-label { font-size:17px; font-weight:700; color:${T.lifetimeLabel}; letter-spacing:0.04em; font-family:'Barlow Condensed',sans-serif; }
        .lifetime-row-val { font-family:'Barlow Condensed',sans-serif; font-size:17px; font-weight:700; color:${T.lifetimeVal}; letter-spacing:0.04em; }
        .lifetime-hits-grid { display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:1px; background:${T.lifetimeGridBg}; border-radius:12px; overflow:hidden; margin:12px 0 16px; }
        .lifetime-cell { background:${T.lifetimeCellBg}; padding:12px 4px; text-align:center; display:flex; flex-direction:column; gap:4px; }
        .lifetime-val { font-family:'Barlow Condensed',sans-serif; font-size:22px; font-weight:800; color:${T.lifetimeVal}; letter-spacing:-0.01em; line-height:1; }
        .lifetime-key { font-size:9px; font-weight:400; color:${T.lifetimeKey}; letter-spacing:0.05em; text-transform:uppercase; }
        .reset-btn { width:100%; min-height:40px; background:rgba(192,57,43,0.12); border:1px solid rgba(192,57,43,0.25); border-radius:10px; font-family:'Barlow Condensed',sans-serif; font-size:13px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:${T.resetColor}; cursor:pointer; transition:background 0.2s, color 0.2s; }
        .reset-btn:hover { background:rgba(192,57,43,0.22); }
        .reset-btn.confirm { background:rgba(192,57,43,0.18); color:${T.resetConfirmColor}; border-color:rgba(192,57,43,0.4); font-size:12px; }
        .reset-btn:focus-visible { outline:3px solid ${T.focusOutline}; outline-offset:3px; }

        /* Toggle */
        .toggle-btn { position:relative; width:46px; height:26px; border-radius:13px; border:none; cursor:pointer; background:${T.toggleOffBg}; transition:background 0.25s; flex-shrink:0; padding:0; }
        .toggle-btn.on { background:${T.toggleOnBg}; }
        .toggle-btn:focus-visible { outline:3px solid ${T.focusOutline}; outline-offset:3px; }
        .toggle-knob { position:absolute; top:3px; left:3px; width:20px; height:20px; border-radius:50%; background:#fff; transition:transform 0.25s; display:block; }
        .toggle-btn.on .toggle-knob { transform:translateX(20px); }

        /* Theme rows */
        /* Badges */
        .settings-coming-soon { display:flex; align-items:center; justify-content:space-between; padding:10px 4px; font-family:'Barlow',sans-serif; font-size:16px; font-weight:400; color:${T.comingSoonColor}; letter-spacing:0.02em; }
        .settings-badge { font-size:10px; font-weight:700; letter-spacing:0.05em; text-transform:uppercase; background:${T.badgeBg}; color:${T.badgeColor}; padding:3px 8px; border-radius:6px; }
        .settings-badge-soon { font-size:10px; font-weight:700; letter-spacing:0.05em; text-transform:uppercase; background:${T.badgeSoonBg}; color:${T.badgeSoonColor}; padding:3px 8px; border-radius:6px; }

        /* ── Mobile full-screen override ── */
        @media (max-width: 480px) {
          body { background:${mode==="work" ? T.scrollBg : T.scrollBgBreak}; min-height:100dvh; align-items:stretch; }
          .app-outer { display:block !important; min-height:calc(100dvh + 50px) !important; padding:0 !important; margin-bottom:-50px !important; background:${mode==="work" ? T.scrollBg : T.scrollBgBreak} !important; }
          .phone { width:100% !important; height:100dvh !important; border-radius:0 !important; box-shadow:none !important; overflow:hidden !important; overscroll-behavior:none !important; }
          .phone::before, .phone::after { display:none !important; }
          .notch { display:none !important; }
          .status { display:none !important; }
          .scroll {
            overflow:hidden !important;
            display:flex !important;
            flex-direction:column !important;
            height:100% !important;
            padding: env(safe-area-inset-top, 16px) 24px env(safe-area-inset-bottom, 16px) 24px !important;
            overscroll-behavior:none !important;
            -webkit-overflow-scrolling:touch !important;
            overflow-y:auto !important;
          }
          .navbar { padding:8px 0 10px; flex:0 0 auto; }
          .stat-card-wrap { padding:12px 12px 10px; margin-bottom:10px; flex:0 0 auto; width:100%; }
          .stat-date { margin-bottom:8px; }
          .stat-col-val { font-size:28px !important; }
          .ticker-wrap { margin-bottom:10px; flex:0 0 auto; }
          .mode-tabs { margin-bottom:8px; flex:0 0 auto; width:100%; }
          .hr-banner-wrap { height:26px !important; flex:0 0 26px; }
          .hr-banner { font-size:16px !important; }
          .timer-wrap { flex:1 1 0 !important; min-height:0 !important; padding:0 0 40px 0 !important; justify-content:center !important; overflow:hidden; width:100%; }
          .live-bar { min-height:18px !important; margin-bottom:6px !important; }
          .timer-ring { width:270px !important; height:270px !important; flex-shrink:0; }
          .timer-ring svg { width:270px !important; height:270px !important; }
          .timer-inner { width:270px !important; height:270px !important; }
          .timer-digits { font-size:82px !important; }
          .floating-chip-wrap { border-radius:0 !important; }
          .stat-announce { display:none !important; }
          .btn-stack { flex:0 0 auto; padding:10px 0 16px !important; gap:10px; width:100%; }
          .btn-primary { min-height:54px !important; width:100% !important; }
          .btn-reset { min-height:44px !important; width:100% !important; }
          .settings-backdrop { border-radius:0 !important; }
          .settings-panel { 
            position:absolute !important;
            top:0 !important;
            right:0 !important;
            bottom:-50px !important;
            width:88% !important;
            border-radius:0 !important;
            padding-top:calc(env(safe-area-inset-top, 0px) + 8px) !important;
            padding-bottom:calc(env(safe-area-inset-bottom, 0px) + 32px) !important;
            overscroll-behavior:none !important;
            -webkit-overflow-scrolling:touch !important;
            overflow-y:auto !important;
          }
          .settings-backdrop {
            border-radius:0 !important;
            bottom:-50px !important;
          }
        }

        /* ── Keyframes ── */
        @keyframes splashBallPop { 0% { transform:scale(0.4); opacity:0; } 100% { transform:scale(1); opacity:1; } }
        @keyframes splashTextFade { 0% { opacity:0; transform:translateY(10px); } 100% { opacity:1; transform:translateY(0); } }
        @keyframes confettiFall { 0% { transform:translateY(0) rotate(0deg); opacity:1; } 100% { transform:translateY(950px) rotate(720deg); opacity:0; } }
        @keyframes floatUp1b { 0% { bottom:38%; opacity:1; transform:translateX(-50%) scale(0.8); } 15% { transform:translateX(-50%) scale(1.05); } 85% { opacity:1; } 100% { bottom:88%; opacity:0; transform:translateX(-50%) scale(0.95); } }
        @keyframes floatUp2b { 0% { bottom:38%; opacity:1; transform:translateX(-50%) scale(0.8); } 15% { transform:translateX(-50%) scale(1.08); } 85% { opacity:1; } 100% { bottom:88%; opacity:0; transform:translateX(-50%) scale(0.95); } }
        @keyframes floatUp3b { 0% { bottom:38%; opacity:1; transform:translateX(-50%) scale(0.8); } 15% { transform:translateX(-50%) scale(1.1); } 85% { opacity:1; } 100% { bottom:88%; opacity:0; transform:translateX(-50%) scale(0.95); } }
        @keyframes floatUpHR { 0% { bottom:38%; opacity:1; transform:translateX(-50%) scale(0.7); } 12% { transform:translateX(-50%) scale(1.15); } 20% { transform:translateX(-50%) scale(0.95); } 28% { transform:translateX(-50%) scale(1.05); } 85% { opacity:1; } 100% { bottom:90%; opacity:0; transform:translateX(-50%) scale(1); } }
        @keyframes numPop { 0%,100% { transform:scale(1); } 45% { transform:scale(1.18); } }
        @keyframes livePulse { 0% { box-shadow:0 0 0 0 rgba(192,57,43,0.8); } 65% { box-shadow:0 0 0 8px rgba(192,57,43,0); } 100% { box-shadow:0 0 0 0 rgba(192,57,43,0); } }
        @keyframes breakPulse { 0%,100% { opacity:0.5; } 50% { opacity:1; } }
      `}</style>

      {/* ── Splash Screen ── */}
      {showSplash && (
        <div style={{
          position:"fixed", inset:0, zIndex:9999,
          background:"#1a3a2a",
          display:"flex", flexDirection:"column",
          alignItems:"center", justifyContent:"center", gap:"24px",
          opacity: splashFading ? 0 : 1,
          transition: splashFading ? "opacity 0.5s ease" : "none",
          pointerEvents:"none",
        }}>
          {/* PomoBall logo */}
          <img
            src="data:image/png;base64,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"
            alt="PomoBall"
            style={{
              width:"120px", height:"120px",
              imageRendering:"pixelated",
              animation:"splashBallPop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
            }}
          />
          {/* App name */}
          <div style={{
            display:"flex", flexDirection:"column", alignItems:"center", gap:"6px",
            animation:"splashTextFade 0.5s ease 0.25s both",
          }}>
            <div style={{
              fontFamily:"'Barlow Condensed',sans-serif",
              fontSize:"48px", fontWeight:800,
              letterSpacing:"0.06em",
              textTransform:"uppercase",
            }}>
              <span style={{color:"#ffffff"}}>Pomo</span><span style={{color:"#e8c547"}}>Ball</span>
            </div>
          </div>
        </div>
      )}

      <div className="app-outer" style={isMobile ? {display:"block",width:"100%",minHeight:"100dvh",background:mode==="work"?T.scrollBg:T.scrollBgBreak} : {display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100dvh",background:T.wallBg}}>
        <div className="phone" role="main" aria-label="Ballpark Focus Pomodoro Timer" style={isMobile ? {width:"100%",height:"100dvh",maxHeight:"100dvh",display:"flex",flexDirection:"column",borderRadius:0,boxShadow:"none",background:mode==="work"?T.scrollBg:T.scrollBgBreak,transition:"background 0.5s ease"} : {background:mode==="work"?T.scrollBg:T.scrollBgBreak,transition:"background 0.5s ease"}}>
          <Confetti active={confetti} />
          <div className="notch" aria-hidden="true" />

          {/* Settings panel */}
          <SettingsPanel
            open={settingsOpen}
            onClose={() => setSettingsOpen(false)}
            workMins={workMins}
            breakMins={breakMins}
            onWorkChange={handleWorkChange}
            soundOn={soundOn}
            onSoundToggle={() => {
              const next = !soundOn;
              setSoundOn(next);
              savePrefs(workMins, breakMins, themeKey, next);
              if (next) {
                // Small confirmation chime — two ascending notes
                try {
                  const ctx = audioCtxRef.current || new (window.AudioContext || window.webkitAudioContext)();
                  if (!audioCtxRef.current) audioCtxRef.current = ctx;
                  if (ctx.state === "suspended") ctx.resume();
                  // Double clock tick confirmation
                  [0, 0.1].forEach((delay) => {
                    const bufSize = Math.floor(ctx.sampleRate * 0.004);
                    const buf  = ctx.createBuffer(1, bufSize, ctx.sampleRate);
                    const data = buf.getChannelData(0);
                    for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufSize);
                    const src = ctx.createBufferSource();
                    const bp  = ctx.createBiquadFilter();
                    const g   = ctx.createGain();
                    src.buffer = buf;
                    bp.type = "bandpass"; bp.frequency.value = 4000; bp.Q.value = 2;
                    const t = ctx.currentTime + delay;
                    g.gain.setValueAtTime(0.4, t);
                    g.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
                    src.connect(bp); bp.connect(g); g.connect(ctx.destination);
                    src.start(t);
                  });
                } catch(e) {}
              }
            }}
            onBreakChange={handleBreakChange}
            lifetime={lifetime}
            onResetLifetime={() => saveLifetime(emptyLifetime())}
            themeKey={themeKey}
            onThemeChange={handleThemeChange}
            T={T}
          />

          {/* Status bar */}
          <div className="status" aria-hidden="true">
            <span className="s-time">9:41</span>
            <div className="s-icons">
              <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor"><rect x="0" y="3" width="3" height="9" rx="1"/><rect x="4.5" y="2" width="3" height="10" rx="1"/><rect x="9" y="0.5" width="3" height="11.5" rx="1"/><rect x="13.5" y="0" width="3" height="12" rx="1"/></svg>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.4C10.5 2.4 12.7 3.5 14.2 5.2L15.5 3.7C13.6 1.6 11 .4 8 .4S2.4 1.6.5 3.7l1.3 1.5C3.3 3.5 5.5 2.4 8 2.4z"/><path d="M8 5.2c1.7 0 3.2.7 4.3 1.8l1.3-1.5C12.1 4 10.2 3.2 8 3.2S3.9 4 2.4 5.5l1.3 1.5C4.8 5.9 6.3 5.2 8 5.2z"/><circle cx="8" cy="10" r="1.8"/></svg>
              <svg width="26" height="12" viewBox="0 0 26 12" fill="currentColor"><rect x="0" y="1" width="22" height="10" rx="3" fillOpacity=".35"/><rect x="1" y="2" width="18" height="8" rx="2"/><path d="M23 4v4a2 2 0 000-4z"/></svg>
            </div>
          </div>

          <div className="scroll" style={isMobile ? {padding:"env(safe-area-inset-top, 16px) 24px env(safe-area-inset-bottom, 16px) 24px", overflow:"hidden", display:"flex", flexDirection:"column", flex:"1 1 0", minHeight:0} : {}}>


            {/* Navbar */}
            <div className="navbar">
              <PlayerName name={playerName} onChange={handleNameChange} T={T} />
              <button className="settings-btn" onClick={() => setSettingsOpen(true)} aria-label="Open settings">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </button>
            </div>

            {/* Stat card */}
            <div className="stat-card-wrap" aria-label="Today's stats">
              <div className="stat-date">Today's Scorecard · {today}</div>
              <div className="stat-row" role="list">
                <div className="stat-col" role="listitem" aria-label={`At bats: ${atBats}`}>
                  <div className="stat-col-key">AB</div>
                  <div className={`stat-col-val${atBats>0?" active":""}`} aria-hidden="true">{atBats}</div>
                </div>
                {STATS.map(stat => {
                  const val   = stats[stat.key];
                  const isNew = false;
                  return (
                    <div key={stat.key} className="stat-col" role="listitem" aria-label={`${stat.label}: ${val}`}>
                      <div className="stat-col-key">{stat.key}</div>
                      <div className={`stat-col-val${val>0?" active":""}${isNew?" flash":""}`} aria-hidden="true">{val}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Ticker */}
            <Ticker log={log} />

            {/* Mode tabs */}
            <div className="mode-tabs" role="tablist" aria-label="Timer mode">
              <button className={`mode-tab${mode==="work"?" active work":""}`}
                role="tab" aria-selected={mode==="work"} onClick={()=>switchMode("work")}>
                At Plate
              </button>
              <button className={`mode-tab${mode==="break"?" active break":""}`}
                role="tab" aria-selected={mode==="break"} onClick={()=>switchMode("break")}>
                Dugout
              </button>
            </div>

            {/* HR Distance Banner — fixed height so nothing shifts */}
            <div className="hr-banner-wrap" role="status" aria-live="polite">
              {activeBanner && <span className="hr-banner">{activeBanner.text}</span>}
            </div>

            {/* Timer */}
            <div className="timer-wrap">
              {isLive
                ? (mode === "work"
                    ? <div className="live-bar" style={{marginBottom:"10px"}} aria-label="Timer is live"><span className="live-dot" aria-hidden="true" /><span className="live-label">LIVE</span></div>
                    : <div className="live-bar" style={{marginBottom:"10px"}} aria-label="Changing sides"><span className="break-dot" aria-hidden="true" /><span className="break-label">CHANGING SIDES</span></div>)
                : <div className="live-bar" aria-hidden="true" style={{opacity:0,marginBottom:"10px"}} />
              }

              {/* Progress ring — rAF driven for 60fps smoothness */}
              <div className="timer-ring" style={isMobile ? {width:"270px",height:"270px"} : {width:"280px",height:"280px",maxWidth:"100%"}}>
                <svg width="280" height="280" viewBox="0 0 280 280" aria-hidden="true" style={isMobile ? {width:"270px",height:"270px"} : {}}>
                  <circle cx="140" cy="140" r="126" fill="none" stroke={T.arcTrack} strokeWidth="6" transform="rotate(-90 140 140)" />
                  <circle
                    ref={arcRef}
                    cx="140" cy="140" r="126"
                    fill="none"
                    stroke={mode==="work" ? T.arcWork : T.arcBreak}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 126}
                    strokeDashoffset={-2 * Math.PI * 126 * progress}
                    transform="rotate(-90 140 140)"
                  />
                </svg>
                <div className="timer-inner" style={isMobile ? {width:"270px",height:"270px"} : {}}>
                  <div className="timer-digits" role="timer" aria-label={`${fmt(timeLeft)} remaining`}
                    style={isMobile ? {fontSize:"90px"} : {}}>
                    {fmt(timeLeft)}
                  </div>
                  <div className="timer-mode-lbl">{mode==="work" ? "Focus" : "Rest"}</div>
                </div>
              </div>
            </div>

            {/* Floating chip overlay */}
            <div className="floating-chip-wrap" aria-live="assertive" aria-atomic="true">
              {floatingChips.map(({ id, stat, dur }) => {
                const sizeClass = { "1B":"size-1b","2B":"size-2b","3B":"size-3b","HR":"size-hr" }[stat.key] || "size-1b";
                const animName  = { "1B":"floatUp1b","2B":"floatUp2b","3B":"floatUp3b","HR":"floatUpHR" }[stat.key] || "floatUp1b";
                const bgColor   = stat.key==="HR" ? T.chipHRBg : T.chipBg;
                const textColor = stat.key==="HR" ? T.chipHRText : T.chipText;
                return (
                  <div key={id} role="alert"
                    className={`floating-chip ${sizeClass}`}
                    style={{ background:bgColor, color:textColor, animation:`${animName} ${dur}ms cubic-bezier(0.22,1,0.36,1) forwards` }}>
                    <span aria-hidden="true">{stat.emoji}</span>{stat.label}!
                  </div>
                );
              })}
            </div>
            <div className="stat-announce" />

            {/* Buttons */}
            <div className="btn-stack" style={isMobile ? {flexShrink:0,padding:`10px 0 16px`,gap:"10px"} : {}}>
              <button className={`btn-primary ${mode}`} onClick={toggle}
                aria-label={running?"Pause timer":isAtStart?"Start timer":"Resume timer"}>
                {btnLabel}
              </button>
              <button className="btn-reset" onClick={reset} aria-label="Reset timer">
                Reset Timer
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
