'use client';

import { useEffect, useRef, useState } from 'react';

const QUOTES = [
  "I'd rather prove a decision than defend one.",
  "The best design is the one nobody has to think about.",
  "If something's broken, I don't wait to be told to fix it.",
  "Somewhere, a designer is still arguing about dropdowns versus radio buttons. It's probably me.",
  "I built this loading screen mostly so you'd have something to read while I finish the next case study.",
];

// unstyled   — 56×56 wrapper, bare img, no background or border
// rounded    — 56×56 wrapper with borderRadius + overflow:hidden, no background or border
// container  — 56×56 wrapper with white bg, rounded, soft grey outline
const TOOL_ICONS = [
  { name: 'Figma',       src: '/images/icons/figma.png',       alt: 'Figma',       group: 'unstyled',  top: '7%',  left: '8%',  rotate: '-14deg', opacity: 0.17 },
  { name: 'React',       src: '/images/icons/react.svg',       alt: 'React',       group: 'container', top: '12%', left: '55%', rotate:  '11deg', opacity: 0.15 },
  { name: 'Slack',       src: '/images/icons/slack.svg',       alt: 'Slack',       group: 'unstyled',  top: '6%',  left: '38%', rotate:  '-7deg', opacity: 0.14 },
  { name: 'VSCode',      src: '/images/icons/vs-code.svg',     alt: 'VS Code',     group: 'container', top: '15%', left: '78%', rotate:  '15deg', opacity: 0.16 },
  { name: 'GitHub',      src: '/images/icons/github.png',      alt: 'GitHub',      group: 'unstyled',  top: '8%',  left: '88%', rotate:  '-9deg', opacity: 0.18 },
  { name: 'Claude',      src: '/images/icons/claude.svg',      alt: 'Claude',      group: 'unstyled',  top: '28%', left: '5%',  rotate:   '8deg', opacity: 0.15 },
  { name: 'Git',         src: '/images/icons/git.png',         alt: 'Git',         group: 'unstyled',  top: '33%', left: '72%', rotate: '-12deg', opacity: 0.16 },
  { name: 'Jira',        src: '/images/icons/jira.webp',       alt: 'Jira',        group: 'unstyled',  top: '45%', left: '14%', rotate:  '14deg', opacity: 0.14 },
  { name: 'Supabase',    src: '/images/icons/supabase.jpeg',   alt: 'Supabase',    group: 'unstyled',  top: '52%', left: '85%', rotate: '-10deg', opacity: 0.17 },
  { name: 'Notion',      src: '/images/icons/notion.png',      alt: 'Notion',      group: 'unstyled',  top: '40%', left: '48%', rotate: '-13deg', opacity: 0.15 },
  { name: 'Confluence',  src: '/images/icons/confluence.png',  alt: 'Confluence',  group: 'unstyled',  top: '62%', left: '7%',  rotate:   '9deg', opacity: 0.13 },
  { name: 'Miro',        src: '/images/icons/miro.png',        alt: 'Miro',        group: 'unstyled',  top: '58%', left: '65%', rotate:  '-8deg', opacity: 0.16 },
  { name: 'Pendo',       src: '/images/icons/pendo.avif',      alt: 'Pendo',       group: 'rounded',   top: '72%', left: '28%', rotate:  '11deg', opacity: 0.14 },
  { name: 'Cloudflare',  src: '/images/icons/cloudflare.png',  alt: 'Cloudflare',  group: 'rounded',   top: '78%', left: '78%', rotate:   '7deg', opacity: 0.17 },
  { name: 'UserTesting', src: '/images/icons/usertesting.png', alt: 'UserTesting', group: 'unstyled',  top: '85%', left: '10%', rotate: '-11deg', opacity: 0.15 },
  { name: 'Heap',        src: '/images/icons/heap.png',        alt: 'Heap',        group: 'container', top: '88%', left: '50%', rotate:  '13deg', opacity: 0.16 },
  { name: 'Zoom',        src: '/images/icons/zoom.svg',        alt: 'Zoom',        group: 'unstyled',  top: '82%', left: '88%', rotate:  '-9deg', opacity: 0.18 },
];

export default function LoadingOverlay({ onExiting }) {
  const [phase, setPhase] = useState('idle');
  const [quote, setQuote] = useState('');
  // Guards against React Strict Mode's double-invocation of useEffect in dev.
  // Refs persist across the cleanup→reinvoke cycle, so the second invocation
  // restarts timers (cleared by cleanup) rather than re-running first-time setup.
  const initDoneRef = useRef(false);

  useEffect(() => {
    // Returning visitor: overlay already completed this session.
    try {
      if (sessionStorage.getItem('splash_shown')) {
        onExiting?.();
        setPhase('done');
        return;
      }
    } catch {
      onExiting?.();
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
      {/* Tool icons — scattered across the full viewport, behind the quote */}
      {TOOL_ICONS.map(({ name, src, alt, group, top, left, rotate, opacity }) => (
        <div
          key={name}
          style={{
            position: 'absolute',
            top,
            left,
            transform: `rotate(${rotate})`,
            opacity: isVisible ? opacity : 0,
            transition: 'opacity 0.55s cubic-bezier(0.16,1,0.3,1)',
            pointerEvents: 'none',
            lineHeight: 0,
          }}
        >
          {group === 'container' ? (
            <div style={{
              width: 56, height: 56, boxSizing: 'border-box',
              background: 'white', borderRadius: 10,
              border: '1px solid #e5e7eb', padding: 8,
            }}>
              <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
            </div>
          ) : group === 'rounded' ? (
            <div style={{ width: 56, height: 56, borderRadius: 10, overflow: 'hidden' }}>
              <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
            </div>
          ) : (
            <div style={{ width: 56, height: 56 }}>
              <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
            </div>
          )}
        </div>
      ))}

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
