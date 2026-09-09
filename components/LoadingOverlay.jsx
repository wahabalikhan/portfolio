'use client';

import { useEffect, useRef, useState } from 'react';
import { OVERLAY_BG_STYLE, OverlayIcons } from './OverlayBackground';

const QUOTES = [
  "I'd rather prove a decision than defend one.",
  "The best design is the one nobody has to think about.",
  "If something's broken, I don't wait to be told to fix it.",
  "Somewhere, a designer is still arguing about dropdowns versus radio buttons. It's probably me.",
  "I built this loading screen mostly so you'd have something to read while I finish the next case study.",
];

export default function LoadingOverlay({ onExiting }) {
  // Check sessionStorage synchronously so the overlay returns null from the
  // very first client render on returning visits, rather than waiting for useEffect.
  // SSR gets 'idle' (no window); the hydration mismatch is recovered by React.
  const [phase, setPhase] = useState(() => {
    if (typeof window === 'undefined') return 'idle';
    try {
      if (sessionStorage.getItem('splash_shown')) return 'done';
    } catch {}
    return 'idle';
  });
  const [quote, setQuote] = useState('');
  // Guards against React Strict Mode's double-invocation of useEffect in dev.
  // Refs persist across the cleanup→reinvoke cycle, so the second invocation
  // restarts timers (cleared by cleanup) rather than re-running first-time setup.
  const initDoneRef = useRef(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('splash_shown')) {
        onExiting?.();
        setPhase('done');
        return;
      }
    } catch {
      onExiting?.();
      setPhase('done');
      return;
    }

    // Start timers. On Strict Mode's second invocation, initDoneRef is true and
    // phase is already 'entering' — just restart the timers that cleanup cleared.
    if (!initDoneRef.current) {
      initDoneRef.current = true;
      try {
        const idx = Math.floor(Math.random() * QUOTES.length);
        sessionStorage.setItem('splash_quote', String(idx));
        setQuote(QUOTES[idx]);
      } catch {}
      setPhase('entering');
    }

    // Timeline: 800ms entrance → 2500ms hold → 700ms exit.
    // splash_shown is written at t2 (overlay completed), not at start —
    // so mid-overlay navigation doesn't consume the one-time show prematurely.
    const t1 = setTimeout(() => setPhase('holding'), 800);
    const t2 = setTimeout(() => {
      setPhase('exiting');
      onExiting?.();
      try { sessionStorage.setItem('splash_shown', '1'); } catch {}
    }, 3300);
    const t3 = setTimeout(() => setPhase('done'), 4000);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (phase === 'done') return null;

  const isExiting = phase === 'exiting';
  const isVisible = phase !== 'idle';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        ...OVERLAY_BG_STYLE,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isExiting ? 0 : 1,
        transition: isExiting ? 'opacity 0.7s cubic-bezier(0.4,0,0.2,1)' : 'none',
        pointerEvents: isExiting ? 'none' : 'auto',
      }}
    >
      <OverlayIcons visible={isVisible} />

      {/* Quote content — sits above icons via z-index */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '1rem',
          maxWidth: 'min(90vw, 900px)',
          padding: '0 2rem',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <p
          style={{
            fontSize: '2.75rem',
            fontWeight: 700,
            lineHeight: 1.12,
            color: '#111827',
            margin: 0,
          }}
        >
          "{quote}"
        </p>

        <div style={{ height: 1, width: 48, backgroundColor: '#d1d5db', borderRadius: 1 }} />

        <p style={{ fontSize: '0.9375rem', fontWeight: 400, color: '#6b7280', margin: 0 }}>
          Wahab
        </p>
      </div>
    </div>
  );
}
