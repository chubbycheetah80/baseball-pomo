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
              { key:"1B", label:"Singles"   },
              { key:"2B", label:"Doubles"   },
              { key:"3B", label:"Triples"   },
              { key:"HR", label:"Home Runs" },
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
  const forceHRRef = useRef(false);

  // DEBUG: Shift+D sets career HRs to 99 for milestone testing
  useEffect(() => {
    const handler = (e) => {
      if (e.shiftKey && e.key === 'D') {
        const empty = { focusSecs: 0, hits: { "1B": 0, "2B": 0, "3B": 0, "HR": 0 } };
        const current = (() => { try { return JSON.parse(localStorage.getItem("ballpark_lifetime_v1")) || empty; } catch(e) { return empty; } })();
        const updated = { ...current, hits: { ...current.hits, HR: 99 } };
        localStorage.setItem("ballpark_lifetime_v1", JSON.stringify(updated));
        setLifetime(updated);
        alert("Career HRs set to 99. Now Alt+click the timer to trigger the 100th!");
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

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
    const stat = forceHRRef.current
      ? STATS.find(s => s.key === "HR")
      : getRandomStat();
    forceHRRef.current = false;
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
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600&display=swap');
        *,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
        body { background:${T.wallBg}; display:flex; align-items:center; justify-content:center; min-height:100vh; font-family:'Barlow',sans-serif; }
        /* ── Mobile full-screen override ── */
        @media (max-width: 480px) {
          body { background:${mode==="work" ? T.scrollBg : T.scrollBgBreak}; min-height:100dvh; align-items:stretch; }
          .phone { width:100% !important; height:100dvh !important; border-radius:0 !important; box-shadow:none !important; }
          .phone::before, .phone::after { display:none !important; }
          .notch { display:none !important; }
          .status { display:none !important; }
          .scroll {
            overflow:hidden !important;
            padding: env(safe-area-inset-top, 20px) 20px 0 20px;
            justify-content:space-between;
          }
          .navbar { padding:8px 0 10px; }
          .stat-card-wrap { padding:10px 8px 8px; margin-bottom:8px; }
          .stat-date { margin-bottom:8px; }
          .stat-col-val { font-size:26px !important; }
          .ticker-wrap { margin-bottom:8px; }
          .mode-tabs { margin-bottom:10px; }
          .hr-banner-wrap { height:32px !important; }
          .hr-banner { font-size:18px !important; }
          .live-bar { min-height:20px !important; margin-bottom:6px !important; }
          .timer-wrap { flex:0 0 auto !important; padding:0 !important; align-items:center; }
          .timer-ring { width:220px !important; height:220px !important; }
          .timer-ring svg { width:220px !important; height:220px !important; }
          .timer-inner { width:220px !important; height:220px !important; }
          .timer-digits { font-size:74px !important; }
          .btn-stack { padding:8px 0 max(env(safe-area-inset-bottom, 16px), 20px); gap:8px; }
          .btn-primary { min-height:50px !important; }
          .btn-reset { min-height:40px !important; }
          .floating-chip-wrap { border-radius:0 !important; }
          .settings-backdrop { border-radius:0 !important; }
          .settings-panel { border-radius:0 44px 44px 0 !important; }
        }

        /* ── Phone ── */
        .phone { width:375px; height:812px; border-radius:44px; box-shadow: 0 0 0 2px ${T.phoneRing}, 0 0 0 7px #111, 0 40px 100px rgba(0,0,0,0.55); position:relative; overflow:hidden; display:flex; flex-direction:column; transition:background 0.5s ease; }
        .phone::before { content:''; position:absolute; right:-3px; top:120px; width:3px; height:60px; background:#0e0e0e; border-radius:0 2px 2px 0; box-shadow:0 80px 0 #0e0e0e; }
        .phone::after  { content:''; position:absolute; left:-3px; top:100px; width:3px; height:36px; background:#0e0e0e; border-radius:2px 0 0 2px; box-shadow:0 52px 0 #0e0e0e, 0 96px 0 #0e0e0e; }
        .notch { position:absolute; top:0; left:50%; transform:translateX(-50%); width:126px; height:34px; background:#0e0e0e; border-radius:0 0 22px 22px; z-index:100; }

        /* ── Status bar ── */
        .status { height:44px; flex-shrink:0; z-index:10; position:relative; display:flex; align-items:flex-end; justify-content:space-between; padding:0 28px 6px; }
        .s-time { font-family:'Barlow Condensed',sans-serif; font-size:15px; font-weight:700; color:${T.statusColor}; letter-spacing:0.04em; }
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
        .stat-date { font-family:'Barlow Condensed',sans-serif; font-size:13px; font-weight:600; color:${T.cardDate}; letter-spacing:0.16em; text-transform:uppercase; text-align:center; margin-bottom:12px; }
        .stat-row { display:flex; align-items:flex-start; }
        .stat-col { flex:1; text-align:center; position:relative; }
        .stat-col+.stat-col::before { content:''; position:absolute; left:0; top:50%; transform:translateY(-50%); width:1px; height:55%; background:${T.statDivider}; }
        .stat-col-key { font-family:'Barlow Condensed',sans-serif; font-size:13px; font-weight:700; color:${T.statKey}; letter-spacing:0.14em; text-transform:uppercase; margin-bottom:5px; }
        .stat-col-val { font-family:'Barlow Condensed',sans-serif; font-size:32px; font-weight:800; line-height:1; color:${T.statValDim}; transition:color 0.3s; }
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
        .break-label { font-family:'Barlow Condensed',sans-serif; font-size:13px; font-weight:700; color:${T.liveLabel}; letter-spacing:0.22em; }
        .live-label { font-family:'Barlow Condensed',sans-serif; font-size:13px; font-weight:800; color:${T.liveLabel}; letter-spacing:0.26em; }

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
        .settings-panel { position:absolute; top:0; right:0; bottom:0; width:88%; background:${T.settingsBg}; transition:background 0.5s ease; border-radius:0 44px 44px 0; z-index:201; transform:translateX(100%); transition:transform 0.3s cubic-bezier(0.4,0,0.2,1); display:flex; flex-direction:column; overflow-y:auto; scrollbar-width:none; border-left:1px solid ${T.settingsDivider}; }
        .settings-panel::-webkit-scrollbar { display:none; }
        .settings-panel.open { transform:translateX(0); }
        .settings-header { display:flex; align-items:center; justify-content:space-between; padding:52px 24px 20px; border-bottom:1px solid ${T.settingsDivider}; flex-shrink:0; }
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
        .stepper-value { font-family:'Barlow Condensed',sans-serif; font-size:28px; font-weight:800; color:${T.stepperVal}; min-width:52px; text-align:center; letter-spacing:-0.01em; }
        .stepper-unit { font-size:14px; font-weight:600; color:${T.stepperUnit}; margin-left:4px; }

        /* Lifetime stats */
        .lifetime-row-single { display:flex; align-items:center; justify-content:space-between; padding:10px 4px; margin-bottom:4px; }
        .lifetime-row-label { font-size:17px; font-weight:700; color:${T.lifetimeLabel}; letter-spacing:0.04em; font-family:'Barlow Condensed',sans-serif; }
        .lifetime-row-val { font-family:'Barlow Condensed',sans-serif; font-size:17px; font-weight:700; color:${T.lifetimeVal}; letter-spacing:0.04em; }
        .lifetime-hits-grid { display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:1px; background:${T.lifetimeGridBg}; border-radius:12px; overflow:hidden; margin:12px 0 16px; }
        .lifetime-cell { background:${T.lifetimeCellBg}; padding:12px 4px; text-align:center; display:flex; flex-direction:column; gap:4px; }
        .lifetime-val { font-family:'Barlow Condensed',sans-serif; font-size:22px; font-weight:800; color:${T.lifetimeVal}; letter-spacing:-0.01em; line-height:1; }
        .lifetime-key { font-size:9px; font-weight:600; color:${T.lifetimeKey}; letter-spacing:0.12em; text-transform:uppercase; }
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
        .settings-coming-soon { display:flex; align-items:center; justify-content:space-between; padding:10px 4px; font-family:'Barlow Condensed',sans-serif; font-size:16px; font-weight:600; color:${T.comingSoonColor}; letter-spacing:0.04em; }
        .settings-badge { font-size:10px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; background:${T.badgeBg}; color:${T.badgeColor}; padding:3px 8px; border-radius:6px; }
        .settings-badge-soon { font-size:10px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; background:${T.badgeSoonBg}; color:${T.badgeSoonColor}; padding:3px 8px; border-radius:6px; }

        /* ── Keyframes ── */
        @keyframes confettiFall { 0% { transform:translateY(0) rotate(0deg); opacity:1; } 100% { transform:translateY(950px) rotate(720deg); opacity:0; } }
        @keyframes floatUp1b { 0% { bottom:38%; opacity:1; transform:translateX(-50%) scale(0.8); } 15% { transform:translateX(-50%) scale(1.05); } 85% { opacity:1; } 100% { bottom:88%; opacity:0; transform:translateX(-50%) scale(0.95); } }
        @keyframes floatUp2b { 0% { bottom:38%; opacity:1; transform:translateX(-50%) scale(0.8); } 15% { transform:translateX(-50%) scale(1.08); } 85% { opacity:1; } 100% { bottom:88%; opacity:0; transform:translateX(-50%) scale(0.95); } }
        @keyframes floatUp3b { 0% { bottom:38%; opacity:1; transform:translateX(-50%) scale(0.8); } 15% { transform:translateX(-50%) scale(1.1); } 85% { opacity:1; } 100% { bottom:88%; opacity:0; transform:translateX(-50%) scale(0.95); } }
        @keyframes floatUpHR { 0% { bottom:38%; opacity:1; transform:translateX(-50%) scale(0.7); } 12% { transform:translateX(-50%) scale(1.15); } 20% { transform:translateX(-50%) scale(0.95); } 28% { transform:translateX(-50%) scale(1.05); } 85% { opacity:1; } 100% { bottom:90%; opacity:0; transform:translateX(-50%) scale(1); } }
        @keyframes numPop { 0%,100% { transform:scale(1); } 45% { transform:scale(1.18); } }
        @keyframes livePulse { 0% { box-shadow:0 0 0 0 rgba(192,57,43,0.8); } 65% { box-shadow:0 0 0 8px rgba(192,57,43,0); } 100% { box-shadow:0 0 0 0 rgba(192,57,43,0); } }
        @keyframes breakPulse { 0%,100% { opacity:0.5; } 50% { opacity:1; } }
      `}</style>

      <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100dvh",background:T.wallBg}}>
        <div className="phone" role="main" aria-label="Ballpark Focus Pomodoro Timer" style={{background: mode==="work" ? T.scrollBg : T.scrollBgBreak, transition:"background 0.5s ease"}}>
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

          <div className="scroll">

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
              <div className="timer-ring" style={{width:"280px",height:"280px",maxWidth:"100%"}}>
                <svg width="280" height="280" viewBox="0 0 280 280" aria-hidden="true">
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
                <div className="timer-inner">
                  <div className="timer-digits" role="timer" aria-label={`${fmt(timeLeft)} remaining`}
                    onClick={(e) => { if (e.altKey) { forceHRRef.current = true; awardStat(); } }}
                    style={{cursor:"default"}}>
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
            <div className="btn-stack">
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
