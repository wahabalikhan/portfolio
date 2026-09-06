'use client';

import { useEffect, useState } from 'react';

const QUOTES = [
  "I'd rather prove a decision than defend one.",
  "The best design is the one nobody has to think about.",
  "If something's broken, I don't wait to be told to fix it.",
  "Somewhere, a designer is still arguing about dropdowns versus radio buttons. It's probably me.",
  "I built this loading screen mostly so you'd have something to read while I finish the next case study.",
];

export default function LoadingOverlay({ onExiting }) {
  const [phase, setPhase] = useState('idle');
  const [quote, setQuote] = useState('');

  useEffect(() => {
    try {
      if (sessionStorage.getItem('splash_shown')) {
        onExiting?.();
        return;
      }
      const idx = Math.floor(Math.random() * QUOTES.length);
      sessionStorage.setItem('splash_quote', String(idx));
      sessionStorage.setItem('splash_shown', '1');
      setQuote(QUOTES[idx]);
    } catch {
      onExiting?.();
      return;
    }

    setPhase('entering');

    // Timeline: 800ms entrance → 3000ms hold → 700ms exit
    const t1 = setTimeout(() => setPhase('holding'), 800);
    const t2 = setTimeout(() => { setPhase('exiting'); onExiting?.(); }, 3800);
    const t3 = setTimeout(() => setPhase('done'), 4500);

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
        backgroundColor: '#F8FAFD',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isExiting ? 0 : 1,
        transition: isExiting ? 'opacity 0.7s cubic-bezier(0.4,0,0.2,1)' : 'none',
        pointerEvents: isExiting ? 'none' : 'auto',
      }}
    >
      <div
        style={{
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
          “{quote}”
        </p>

        <div style={{ height: 1, width: 48, backgroundColor: '#d1d5db', borderRadius: 1 }} />

        <p
          style={{
            fontSize: '0.9375rem',
            fontWeight: 400,
            color: '#6b7280',
            margin: 0,
          }}
        >
          Wahab
        </p>
      </div>
    </div>
  );
}
