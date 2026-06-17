import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MousePointer2, MessageCircle, Trash2, LogOut, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const PRESET_COLOR = '#7F77DD';
const VISITOR_COLORS = ['#1D9E75', '#D85A30', '#D4537E', '#378ADD', '#BA7517'];
const CURSOR_COLORS = ['#F97316', '#3B82F6', '#EC4899', '#FACC15', '#14B8A6', '#8B5CF6', '#EF4444', '#06B6D4'];

// Coordinate system:
//   x_pct = (clientX - contentLeft) / contentWidth * 100
//     → content-container-relative; 0 = left edge, 100 = right edge,
//       negative = left of content, >100 = right of content.
//   y_pct = (pageY - contentAbsTop) / overlayHeight * 100
//     → page-height-relative from the content container's absolute top.
//
// Rendering converts back to absolute page pixels:
//   left = contentLeft + x_pct/100 * contentWidth
//   top  = contentAbsTop + y_pct/100 * overlayHeight
//
// The overlay is a portal on document.body (position:absolute, top:0, left:0, full page).
// Pins can be placed and dragged anywhere on the page, not just within the content column.
//
// VERSION 5 preset positions (x_pct already content-relative from previous commit).
const PRESET_PINS = [
  { id: 'preset-1', x_pct: 75, y_pct: 8,  author: 'Wahab', body: 'took about 3 attempts to get this headline right 😅', preset: true },
  { id: 'preset-2', x_pct: 12, y_pct: 62, author: 'Wahab', body: 'built this portfolio at 2am. Claude Code did not judge me 🤝', preset: true },
  { id: 'preset-3', x_pct: 22, y_pct: 32, author: 'Wahab', body: 'yes I did time it with a stopwatch 👀 36.1% is very real', preset: true, tabs: ['Design'] },
  { id: 'preset-4', x_pct: 72, y_pct: 48, author: 'Wahab', body: 'this one kept me up at night. in a good way 🌙', preset: true, tabs: ['Design'] },
  { id: 'preset-5', x_pct: 83, y_pct: 75, author: 'Wahab', body: "if you've scrolled this far... you should probably just hire me 👋", preset: true, tabs: ['Design'] },
];

const randomId = () =>
  (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : Math.random().toString(36).slice(2);

const isTouchDevice = () =>
  typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

const visitorColor = (id) => {
  const hash = String(id).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return VISITOR_COLORS[hash % VISITOR_COLORS.length];
};

const cardRotation = (id) => {
  const hash = String(id).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return (hash % 7) - 3;
};

const truncate = (text, words = 7) => {
  const parts = text.trim().split(/\s+/);
  if (parts.length <= words) return text;
  return parts.slice(0, words).join(' ') + '…';
};

const getOrCreateSessionToken = () => {
  try {
    const existing = localStorage.getItem('wahab_session_token');
    if (existing) return existing;
    const token = crypto.randomUUID();
    localStorage.setItem('wahab_session_token', token);
    return token;
  } catch { return null; }
};

// Full-page overlay portaled to document.body so pins can exist anywhere on the page.
const overlayStyle = (mode, height) => ({
  position: 'absolute',
  top: 0, left: 0,
  width: '100%',
  height: height > 0 ? `${height}px` : '100%',
  zIndex: 30,
  pointerEvents: mode === 'comment' ? 'auto' : 'none',
  cursor: mode === 'comment' ? 'crosshair' : 'default',
});

// Converts content-relative x_pct and page-relative y_pct to absolute pixel positions
// within the full-page overlay. contentLeft/contentWidth/contentAbsTop come from
// measuring the contentAnchorRef div inside the content container.
const cardWrapperStyle = (xPct, yPct, deg, contentLeft, contentWidth, contentAbsTop, overlayHeight) => ({
  position: 'absolute',
  left: `${contentLeft + (xPct / 100) * contentWidth}px`,
  top: `${contentAbsTop + (yPct / 100) * overlayHeight}px`,
  transform: `translate(-50%, -50%) rotate(${deg}deg)`,
  pointerEvents: 'auto',
  zIndex: 31,
});

const cursorStyle = (xPct, yPct, color, contentLeft, contentWidth, contentAbsTop, overlayHeight) => ({
  position: 'absolute',
  left: `${contentLeft + (xPct / 100) * contentWidth}px`,
  top: `${contentAbsTop + (yPct / 100) * overlayHeight}px`,
  pointerEvents: 'none',
  zIndex: 29,
  transition: 'left 0.08s linear, top 0.08s linear',
  color,
});

const toolbarStyle = {
  position: 'fixed',
  bottom: '1.5rem',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: '0.375rem',
  backgroundColor: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '9999px',
  padding: '0.375rem',
  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
  zIndex: 100,
};

const toolbarBtnStyle = (active) => ({
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  width: '2.25rem', height: '2.25rem',
  borderRadius: '9999px', border: 'none',
  backgroundColor: active ? '#111827' : 'transparent',
  color: active ? '#ffffff' : '#6b7280',
  transition: 'background-color 0.15s ease, color 0.15s ease',
  cursor: 'pointer',
});

const toolbarDivider = {
  width: '1px', alignSelf: 'stretch',
  backgroundColor: '#e5e7eb', margin: '0.25rem 0.125rem',
};

const inputStyle = {
  display: 'block', width: '100%',
  fontSize: '0.8125rem', fontFamily: 'inherit',
  padding: '0.375rem 0.5rem', marginBottom: '0.5rem',
  borderRadius: '0.375rem', border: '1px solid #e5e7eb',
  color: '#111827', backgroundColor: '#ffffff', boxSizing: 'border-box',
};

export default function CommentPins({ page, showPresets = true, activeTab }) {
  // contentAnchorRef — zero-height div inside the content container.
  // Its getBoundingClientRect() tells us the content column's left, width,
  // and absolute top position, used for all coordinate conversions.
  const contentAnchorRef = useRef(null);
  const overlayRef       = useRef(null);
  const channelRef       = useRef(null);
  const activeTabRef     = useRef(activeTab);
  const prevTabRef       = useRef(activeTab);
  const tabFadeTimer     = useRef(null);

  // Drag refs
  const dragMetaRef     = useRef(null);
  const dragPosRef      = useRef(null);
  const dragStartRef    = useRef(null);
  const justDraggedRef  = useRef(false);
  const preDragPosRef   = useRef(null);
  const dbWriteTimerRef = useRef(null);

  // Remote move auto-clear timers
  const remoteMoveTimers = useRef({});

  // Session token for visitor self-service
  const localSessionToken = useRef(
    typeof window !== 'undefined' ? localStorage.getItem('wahab_session_token') : null
  );

  // contentMetrics: measured from contentAnchorRef, kept in sync via ResizeObserver + resize event.
  // contentMetricsRef mirrors the state value for use in event handlers (avoids stale closures).
  const [contentMetrics, setContentMetrics] = useState({ left: 0, width: 768, absTop: 0 });
  const contentMetricsRef = useRef({ left: 0, width: 768, absTop: 0 });

  // Portal root: a div appended to document.body that hosts the full-page overlay.
  const [portalRoot, setPortalRoot] = useState(null);

  const [mode, setMode]           = useState('cursor');
  const [comments, setComments]   = useState([]);
  const [draft, setDraft]         = useState(null);
  const [draftAuthor, setDraftAuthor] = useState('');
  const [draftBody, setDraftBody] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [saving, setSaving]       = useState(false);
  const [hidden, setHidden]       = useState(false);
  const [overlayHeight, setOverlayHeight] = useState(() =>
    typeof window !== 'undefined' ? document.documentElement.scrollHeight : 0
  );
  const [cursors, setCursors]     = useState({});
  const [viewerCount, setViewerCount] = useState(0);
  const [isMobile, setIsMobile]   = useState(() => typeof window !== 'undefined' && window.innerWidth <= 767);
  const [pulseActive, setPulseActive] = useState(true);
  const [fadingOutIds, setFadingOutIds] = useState(() => new Set());
  const [fadingInIds,  setFadingInIds]  = useState(() => new Set());

  const [isOwner, setIsOwner]         = useState(false);
  const [showLogin, setShowLogin]     = useState(false);
  const [loginEmail, setLoginEmail]   = useState('');
  const [loginPw, setLoginPw]         = useState('');
  const [loginError, setLoginError]   = useState('');

  const [sessionId]   = useState(randomId);
  const [cursorColor] = useState(() => CURSOR_COLORS[Math.floor(Math.random() * CURSOR_COLORS.length)]);

  const [remoteCardMoves, setRemoteCardMoves] = useState({});
  const [cardErrors, setCardErrors]           = useState({});

  const [draggingId, setDraggingId] = useState(null);
  const [dragPos, setDragPos]       = useState(null);

  const [presetPositions, setPresetPositions] = useState(() => {
    const VERSION = '5';
    const defaults = Object.fromEntries(PRESET_PINS.map((p) => [p.id, { x_pct: p.x_pct, y_pct: p.y_pct }]));
    try {
      if (localStorage.getItem('preset-positions-v') === VERSION) {
        const saved = localStorage.getItem('preset-pin-positions');
        if (saved) return JSON.parse(saved);
      }
    } catch {}
    try {
      localStorage.setItem('preset-positions-v', VERSION);
      localStorage.setItem('preset-pin-positions', JSON.stringify(defaults));
    } catch {}
    return defaults;
  });

  useEffect(() => {
    try { localStorage.removeItem(`cc-overlay-h-${page}`); } catch {}
  }, [page]);

  const [visitorPositions, setVisitorPositions] = useState(() => {
    try {
      const saved = localStorage.getItem('visitor-comment-positions');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {};
  });

  const [annotationPos, setAnnotationPos] = useState(() => {
    const VERSION = '3';
    const DEFAULT = { x_pct: 68, y_pct: 15 };
    try {
      if (localStorage.getItem('annotation-pos-v') === VERSION) {
        const saved = localStorage.getItem('annotation-position');
        if (saved) return JSON.parse(saved);
      }
    } catch {}
    try {
      localStorage.setItem('annotation-pos-v', VERSION);
      localStorage.setItem('annotation-position', JSON.stringify(DEFAULT));
    } catch {}
    return DEFAULT;
  });

  // Create the portal root div and append it to body.
  useEffect(() => {
    const div = document.createElement('div');
    div.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:0;overflow:visible;pointer-events:none;';
    document.body.appendChild(div);
    setPortalRoot(div);
    return () => { document.body.removeChild(div); };
  }, []);

  // Measure the content container's position and dimensions.
  // Called on mount, layout changes, and viewport resize.
  const updateContentMetrics = () => {
    const rect = contentAnchorRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const metrics = { left: rect.left, width: rect.width, absTop: rect.top + window.scrollY };
    setContentMetrics(metrics);
    contentMetricsRef.current = metrics;
  };

  useLayoutEffect(() => { updateContentMetrics(); });

  useEffect(() => {
    const observer = new ResizeObserver(updateContentMetrics);
    if (contentAnchorRef.current?.parentElement) {
      observer.observe(contentAnchorRef.current.parentElement);
    }
    window.addEventListener('resize', updateContentMetrics);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateContentMetrics);
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setPulseActive(false), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const prevTab = prevTabRef.current;
    prevTabRef.current = activeTab;
    if (!activeTab || prevTab === activeTab) return;

    const wasVisible   = (p) => !p.tabs || p.tabs.includes(prevTab);
    const isNowVisible = (p) => !p.tabs || p.tabs.includes(activeTab);

    const leaving  = PRESET_PINS.filter(p => wasVisible(p) && !isNowVisible(p));
    const entering = PRESET_PINS.filter(p => !wasVisible(p) && isNowVisible(p));

    if (leaving.length > 0) {
      clearTimeout(tabFadeTimer.current);
      setFadingOutIds(new Set(leaving.map(p => p.id)));
      tabFadeTimer.current = setTimeout(() => setFadingOutIds(new Set()), 150);
    }
    if (entering.length > 0) {
      const ids = new Set(entering.map(p => p.id));
      setFadingInIds(ids);
      requestAnimationFrame(() => requestAnimationFrame(() => setFadingInIds(new Set())));
    }

    return () => clearTimeout(tabFadeTimer.current);
  }, [activeTab]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'L') setShowLogin(s => !s);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setIsOwner(!!session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => setIsOwner(!!session));
    return () => subscription.unsubscribe();
  }, []);

  activeTabRef.current = activeTab;

  useLayoutEffect(() => {
    const h = document.documentElement.scrollHeight;
    setOverlayHeight(prev => h > prev ? h : prev);

    const onWindowResize = () => {
      if (activeTabRef.current && activeTabRef.current !== 'Design') return;
      setOverlayHeight(document.documentElement.scrollHeight);
    };
    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
  }, []);

  useEffect(() => {
    if (activeTab !== 'Design') return;
    const raf = requestAnimationFrame(() => {
      setOverlayHeight(prev => Math.max(document.documentElement.scrollHeight, prev));
    });
    return () => cancelAnimationFrame(raf);
  }, [activeTab]);

  useEffect(() => {
    supabase.from('comments').select('*').eq('page', page).then(({ data, error }) => {
      if (!error && data) setComments(data);
    });
  }, [page]);

  useEffect(() => {
    const channel = supabase.channel(`room:${page}`, { config: { presence: { key: sessionId } } });
    channel
      .on('broadcast', { event: 'cursor' }, ({ payload }) => {
        if (payload.id === sessionId) return;
        setCursors(prev => ({ ...prev, [payload.id]: payload }));
      })
      .on('broadcast', { event: 'card_delete' }, ({ payload }) => {
        setComments(prev => prev.filter(c => c.id !== payload.id));
      })
      .on('broadcast', { event: 'card_move' }, ({ payload }) => {
        if (payload.dragging) {
          setRemoteCardMoves(prev => ({ ...prev, [payload.id]: { x_pct: payload.x_pct, y_pct: payload.y_pct } }));
          clearTimeout(remoteMoveTimers.current[payload.id]);
          remoteMoveTimers.current[payload.id] = setTimeout(() => {
            setRemoteCardMoves(prev => { const n = { ...prev }; delete n[payload.id]; return n; });
          }, 2000);
        } else {
          clearTimeout(remoteMoveTimers.current[payload.id]);
          delete remoteMoveTimers.current[payload.id];
          setRemoteCardMoves(prev => { const n = { ...prev }; delete n[payload.id]; return n; });
          setComments(prev => prev.map(c => c.id === payload.id
            ? { ...c, x_pct: payload.x_pct, y_pct: payload.y_pct } : c));
        }
      })
      .on('presence', { event: 'sync' }, () => {
        setViewerCount(Object.keys(channel.presenceState()).length);
      })
      .on('presence', { event: 'leave' }, ({ key }) => {
        setCursors(prev => { if (!(key in prev)) return prev; const n = { ...prev }; delete n[key]; return n; });
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'comments', filter: `page=eq.${page}` },
        ({ new: row }) => setComments(prev => prev.some(c => c.id === row.id) ? prev : [...prev, row])
      )
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'comments', filter: `page=eq.${page}` },
        ({ old: row }) => setComments(prev => prev.filter(c => c.id !== row.id))
      )
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'comments', filter: `page=eq.${page}` },
        ({ new: row }) => {
          setComments(prev => prev.map(c => c.id === row.id
            ? { ...c, x_pct: row.x_pct, y_pct: row.y_pct } : c));
          setVisitorPositions(prev => {
            if (!prev[row.id]) return prev;
            const n = { ...prev }; delete n[row.id]; return n;
          });
          setRemoteCardMoves(prev => { const n = { ...prev }; delete n[row.id]; return n; });
          clearTimeout(remoteMoveTimers.current[row.id]);
          delete remoteMoveTimers.current[row.id];
        }
      )
      .subscribe(status => { if (status === 'SUBSCRIBED') channel.track({ color: cursorColor }); });

    channelRef.current = channel;
    return () => {
      supabase.removeChannel(channel);
      channelRef.current = null;
      setCursors({}); setViewerCount(0);
      Object.values(remoteMoveTimers.current).forEach(clearTimeout);
      remoteMoveTimers.current = {};
    };
  }, [page, sessionId, cursorColor]);

  // Cursor broadcast — x_pct/y_pct are content-relative so remote cursors appear at the
  // same content position regardless of each viewer's screen width.
  useEffect(() => {
    if (isTouchDevice()) return;
    let lastSent = 0;
    const onMove = (e) => {
      const now = performance.now();
      if (now - lastSent < 50) return;
      lastSent = now;
      const ch = channelRef.current;
      if (!ch) return;
      const m = contentMetricsRef.current;
      if (m.width === 0) return;
      ch.send({ type: 'broadcast', event: 'cursor', payload: {
        id: sessionId,
        x_pct: ((e.clientX - m.left) / m.width) * 100,
        y_pct: overlayHeight > 0 ? ((e.pageY - m.absTop) / overlayHeight) * 100 : 0,
        color: cursorColor,
      }});
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [sessionId, cursorColor, overlayHeight]);

  useEffect(() => {
    if (!expandedId) return;
    const close = () => setExpandedId(null);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [expandedId]);

  // Main drag effect.
  // Uses contentMetricsRef for fresh content position values without stale closures.
  useEffect(() => {
    if (!draggingId) return;
    document.body.style.userSelect = 'none';

    let lastUpdate = 0;

    const getXY = (e) => {
      if (e.changedTouches && e.changedTouches.length > 0) {
        return { clientX: e.changedTouches[0].clientX, pageY: e.changedTouches[0].pageY };
      }
      return { clientX: e.clientX, pageY: e.pageY };
    };

    const onMove = (e) => {
      const meta = dragMetaRef.current;
      if (!meta) return;
      const { clientX, pageY } = getXY(e);
      const m = contentMetricsRef.current;
      if (m.width === 0) return;

      const relX = clientX - m.left;
      const relY = pageY - m.absTop;
      // No X clamp — allow pins outside the content column
      const x_pct = (relX - meta.offsetX_px) / m.width * 100;
      const y_pct = Math.max(0, Math.min(95, ((relY - meta.offsetY_px) / overlayHeight) * 100));
      dragPosRef.current = { x_pct, y_pct };

      const now = performance.now();
      if (now - lastUpdate >= 33) {
        lastUpdate = now;
        setDragPos({ x_pct, y_pct });
        if (!meta.isAnnotation && channelRef.current) {
          channelRef.current.send({ type: 'broadcast', event: 'card_move', payload: {
            id: meta.id, x_pct, y_pct, dragging: true,
          }});
        }
      }
    };

    const onUp = () => {
      const meta = dragMetaRef.current;
      const pos  = dragPosRef.current;

      if (meta && pos) {
        if (meta.isAnnotation) {
          const newPos = { x_pct: pos.x_pct, y_pct: pos.y_pct };
          setAnnotationPos(newPos);
          try {
            localStorage.setItem('annotation-pos-v', '3');
            localStorage.setItem('annotation-position', JSON.stringify(newPos));
          } catch {}
          justDraggedRef.current = true;
        } else {
          const finalX = pos.x_pct;
          const finalY = pos.y_pct;
          const preDrag = preDragPosRef.current;
          const positionChanged = !preDrag
            || Math.abs(finalX - preDrag.x_pct) > 0.1
            || Math.abs(finalY - preDrag.y_pct) > 0.1;

          if (positionChanged) {
            const ch = channelRef.current;
            if (ch) {
              ch.send({ type: 'broadcast', event: 'card_move', payload: {
                id: meta.id, x_pct: finalX, y_pct: finalY, dragging: false,
              }});
            }
            setComments(prev => prev.map(c => c.id === meta.id
              ? { ...c, x_pct: finalX, y_pct: finalY } : c));

            clearTimeout(dbWriteTimerRef.current);
            const capturedId    = meta.id;
            const capturedPre   = preDrag;
            const capturedToken = meta.sessionToken;
            dbWriteTimerRef.current = setTimeout(async () => {
              const base = supabase.from('comments').update({ x_pct: finalX, y_pct: finalY }).eq('id', capturedId);
              const { error } = await (capturedToken ? base.eq('session_token', capturedToken) : base);
              if (error && capturedPre) {
                setComments(prev => prev.map(c => c.id === capturedId
                  ? { ...c, x_pct: capturedPre.x_pct, y_pct: capturedPre.y_pct } : c));
                setCardErrors(prev => ({ ...prev, [capturedId]: true }));
                setTimeout(() => setCardErrors(prev => {
                  const n = { ...prev }; delete n[capturedId]; return n;
                }), 3000);
              }
            }, 100);

            justDraggedRef.current = true;
          }
        }
      }

      document.body.style.userSelect = '';
      setDraggingId(null); setDragPos(null);
      dragMetaRef.current = null; dragPosRef.current = null;
    };

    const onCancel = () => {
      document.body.style.userSelect = '';
      setDraggingId(null); setDragPos(null);
      dragMetaRef.current = null; dragPosRef.current = null;
    };

    const onEscape = (e) => {
      if (e.key !== 'Escape') return;
      const meta    = dragMetaRef.current;
      const preDrag = preDragPosRef.current;
      if (meta && !meta.isAnnotation && preDrag) {
        setComments(prev => prev.map(c => c.id === meta.id
          ? { ...c, x_pct: preDrag.x_pct, y_pct: preDrag.y_pct } : c));
        const ch = channelRef.current;
        if (ch) {
          ch.send({ type: 'broadcast', event: 'card_move', payload: {
            id: meta.id, x_pct: preDrag.x_pct, y_pct: preDrag.y_pct, dragging: false,
          }});
        }
      }
      document.body.style.userSelect = '';
      setDraggingId(null); setDragPos(null);
      dragMetaRef.current = null; dragPosRef.current = null;
    };

    window.addEventListener('mousemove',   onMove);
    window.addEventListener('mouseup',     onUp);
    window.addEventListener('touchmove',   onMove, { passive: false });
    window.addEventListener('touchend',    onUp);
    window.addEventListener('touchcancel', onCancel);
    window.addEventListener('keydown',     onEscape);
    return () => {
      window.removeEventListener('mousemove',   onMove);
      window.removeEventListener('mouseup',     onUp);
      window.removeEventListener('touchmove',   onMove);
      window.removeEventListener('touchend',    onUp);
      window.removeEventListener('touchcancel', onCancel);
      window.removeEventListener('keydown',     onEscape);
      document.body.style.userSelect = '';
    };
  }, [draggingId, overlayHeight]);

  // Cancel owner-initiated drag if they log out mid-drag.
  useEffect(() => {
    if (isOwner || !draggingId || draggingId === '__annotation__') return;
    const meta = dragMetaRef.current;
    if (meta && meta.sessionToken !== null) return;
    const preDrag = preDragPosRef.current;
    if (preDrag) {
      setComments(prev => prev.map(c => c.id === draggingId
        ? { ...c, x_pct: preDrag.x_pct, y_pct: preDrag.y_pct } : c));
    }
    setDraggingId(null); setDragPos(null);
    dragMetaRef.current = null; dragPosRef.current = null;
    document.body.style.userSelect = '';
  }, [isOwner, draggingId]);

  const startAnnotationDrag = (e) => {
    e.stopPropagation();
    const m = contentMetricsRef.current;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    dragMetaRef.current = {
      id: '__annotation__',
      isAnnotation: true,
      offsetX_px: (e.clientX - m.left) - (annotationPos.x_pct / 100) * m.width,
      offsetY_px: (e.pageY - m.absTop)  - (annotationPos.y_pct / 100) * overlayHeight,
    };
    dragPosRef.current = { ...annotationPos };
    setExpandedId(null);
    setDraggingId('__annotation__');
  };

  const startDrag = (e, id, x_pct, y_pct) => {
    if (!isOwner && !localSessionToken.current) return;
    if (e.stopPropagation) e.stopPropagation();
    const m = contentMetricsRef.current;
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    const pageY   = e.pageY   ?? e.touches?.[0]?.pageY   ?? (clientY + window.scrollY);
    dragStartRef.current  = { x: clientX, y: clientY };
    preDragPosRef.current = { x_pct, y_pct };
    dragMetaRef.current = {
      id,
      isAnnotation: false,
      sessionToken: isOwner ? null : localSessionToken.current,
      offsetX_px: (clientX - m.left)  - (x_pct / 100) * m.width,
      offsetY_px: (pageY   - m.absTop) - (y_pct / 100) * overlayHeight,
    };
    dragPosRef.current = { x_pct, y_pct };
    setExpandedId(null);
    setDraggingId(id);
  };

  const handleOverlayClick = (e) => {
    if (justDraggedRef.current) { justDraggedRef.current = false; return; }
    setExpandedId(null);
    if (mode !== 'comment' || draft) return;
    const m = contentMetricsRef.current;
    if (m.width === 0) return;
    setDraft({
      x_pct: ((e.clientX - m.left) / m.width) * 100,
      y_pct: overlayHeight > 0 ? ((e.pageY - m.absTop) / overlayHeight) * 100 : 0,
    });
    setDraftAuthor(''); setDraftBody('');
  };

  const cancelDraft = () => { setDraft(null); setDraftAuthor(''); setDraftBody(''); };

  const saveDraft = async () => {
    if (!draftBody.trim() || !draft) return;
    setSaving(true);
    const token = getOrCreateSessionToken();
    localSessionToken.current = token;
    const { data, error } = await supabase.from('comments').insert({
      page, x_pct: draft.x_pct, y_pct: draft.y_pct,
      author: draftAuthor.trim() || 'Anonymous', body: draftBody.trim(),
      session_token: token,
    }).select().single();
    setSaving(false);
    if (!error && data) setComments(prev => prev.some(c => c.id === data.id) ? prev : [...prev, data]);
    cancelDraft();
  };

  const handleDelete = async (id) => {
    setComments(prev => prev.filter(c => c.id !== id));
    setVisitorPositions(prev => { const n = { ...prev }; delete n[id]; return n; });
    setExpandedId(null);
    await supabase.from('comments').delete().eq('id', id);
  };

  const handleVisitorDelete = async (id) => {
    const card = comments.find(c => c.id === id);
    if (!card) return;
    setComments(prev => prev.filter(c => c.id !== id));
    setVisitorPositions(prev => { const n = { ...prev }; delete n[id]; return n; });
    setExpandedId(null);
    const ch = channelRef.current;
    if (ch) ch.send({ type: 'broadcast', event: 'card_delete', payload: { id } });
    const token = localSessionToken.current;
    const { error } = await supabase.from('comments').delete().eq('id', id).eq('session_token', token);
    if (error) {
      setComments(prev => prev.some(c => c.id === id) ? prev : [...prev, card]);
      setCardErrors(prev => ({ ...prev, [id]: true }));
      setTimeout(() => setCardErrors(prev => { const n = { ...prev }; delete n[id]; return n; }), 3000);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPw });
    if (error) { setLoginError(error.message); }
    else { setShowLogin(false); setLoginError(''); setLoginEmail(''); setLoginPw(''); }
  };

  const getDeg = (id) => {
    const deg = cardRotation(id);
    return isMobile ? Math.max(-1, Math.min(1, deg)) : deg;
  };

  const onCardEnter = (id) => { if (!isTouchDevice()) setExpandedId(id); };
  const onCardLeave = ()    => { if (!isTouchDevice()) setExpandedId(null); };
  const onCardClick = (e, id) => {
    e.stopPropagation();
    const start = dragStartRef.current;
    const moved = start && (Math.abs(e.clientX - start.x) > 5 || Math.abs(e.clientY - start.y) > 5);
    if (moved) return;
    if (isTouchDevice()) setExpandedId(prev => prev === id ? null : id);
  };

  const { left: cLeft, width: cWidth, absTop: cAbsTop } = contentMetrics;

  const renderCard = (id, author, body, color, x_pct, y_pct, isPreset, pulseIndex, isDragging, sessionToken, extraWrapperStyle) => {
    const remoteMove = !isPreset && remoteCardMoves[id];
    let displayX = x_pct;
    let displayY = y_pct;
    let isRemotelyMoving = false;

    if (isDragging && dragPos) {
      displayX = dragPos.x_pct;
      displayY = dragPos.y_pct;
    } else if (remoteMove) {
      displayX = remoteMove.x_pct;
      displayY = remoteMove.y_pct;
      isRemotelyMoving = true;
    }

    const isExpanded = expandedId === id;
    const deg        = getDeg(id);
    const pulseAnim  = pulseActive && isPreset
      ? { animation: `cc-pulse 600ms ease ${pulseIndex * 50}ms 1 both` }
      : {};

    const isOwnCard = !isPreset && !!sessionToken && sessionToken === localSessionToken.current;
    const canDrag   = !isPreset && (isOwner || isOwnCard);
    const canDelete = !isPreset && (isOwner || isOwnCard);

    const wrapperStyle = {
      ...cardWrapperStyle(displayX, displayY, deg, cLeft, cWidth, cAbsTop, overlayHeight),
      cursor: canDrag ? (isDragging ? 'grabbing' : 'grab') : 'default',
      ...(isDragging ? { willChange: 'transform' } : {}),
      ...(isRemotelyMoving ? { transition: 'left 0.05s linear, top 0.05s linear' } : {}),
      ...extraWrapperStyle,
    };

    const cardClass = [
      'cc-card',
      isExpanded       ? 'cc-card-expanded'     : '',
      isRemotelyMoving ? 'cc-card-remote-moving' : '',
    ].filter(Boolean).join(' ');

    return (
      <div
        key={id}
        style={wrapperStyle}
        onMouseDown={canDrag ? (e) => startDrag(e, id, x_pct, y_pct) : undefined}
        onTouchStart={canDrag ? (e) => startDrag(e, id, x_pct, y_pct) : undefined}
        onClick={(e) => onCardClick(e, id)}
        onMouseEnter={() => onCardEnter(id)}
        onMouseLeave={onCardLeave}
      >
        <div className={cardClass} style={pulseAnim}>
          <div className="cc-header">
            <span className="cc-dot" style={{ backgroundColor: color }} />
            <span className="cc-author">{author}</span>
            <span className={`cc-preview${isExpanded ? ' cc-preview-hidden' : ''}`}>{truncate(body)}</span>
          </div>
          <p className={`cc-body${isExpanded ? ' cc-body-visible' : ''}`}>{body}</p>
          {isExpanded && canDelete && (
            <button
              type="button"
              className="cc-delete"
              onClick={(e) => {
                e.stopPropagation();
                isOwner ? handleDelete(id) : handleVisitorDelete(id);
              }}
              aria-label="Delete comment"
            >
              <Trash2 size={12} />
            </button>
          )}
          {cardErrors[id] && (
            <div style={{
              position: 'absolute', top: -4, right: -4,
              width: 8, height: 8, borderRadius: '50%',
              backgroundColor: '#ef4444', border: '1.5px solid white',
            }} />
          )}
        </div>
      </div>
    );
  };

  const overlay = (
    <div
      ref={overlayRef}
      style={overlayStyle(mode, overlayHeight)}
      onClick={handleOverlayClick}
    >
      {!hidden && (
        <>
          {showPresets && PRESET_PINS.filter(pin =>
            !pin.tabs || pin.tabs.includes(activeTab) || fadingOutIds.has(pin.id)
          ).map((pin, i) => {
            const pos = presetPositions[pin.id];
            if (!pos) return null;
            const isFadingOut = fadingOutIds.has(pin.id);
            const isFadingIn  = fadingInIds.has(pin.id);
            const opacity = isFadingOut || isFadingIn ? 0 : 1;
            return renderCard(pin.id, pin.author, pin.body, PRESET_COLOR, pos.x_pct, pos.y_pct, true, i, false, null,
              { opacity, transition: 'opacity 150ms ease' });
          })}

          {comments.map((pin, i) => {
            const override = visitorPositions[pin.id];
            const x = override ? override.x_pct : pin.x_pct;
            const y = override ? override.y_pct : pin.y_pct;
            return renderCard(pin.id, pin.author || 'Anonymous', pin.body, visitorColor(pin.id), x, y, false, i, pin.id === draggingId, pin.session_token);
          })}

          {page === 'home' && (() => {
            const isDragging = draggingId === '__annotation__';
            const pos = isDragging && dragPos ? dragPos : annotationPos;
            return (
              <div
                style={{
                  position: 'absolute',
                  left: `${cLeft + (pos.x_pct / 100) * cWidth}px`,
                  top: `${cAbsTop + (pos.y_pct / 100) * overlayHeight}px`,
                  transform: 'translate(-50%, -50%) rotate(-2deg)',
                  pointerEvents: 'auto',
                  cursor: isDragging ? 'grabbing' : 'grab',
                  zIndex: 31,
                  userSelect: 'none',
                }}
                onMouseDown={startAnnotationDrag}
              >
                <div className="floating-annotation">
                  <div>got thoughts?</div>
                  <div>drop a comment</div>
                  <div>anywhere on the page ↓</div>
                  <svg width="52" height="38" viewBox="0 0 52 38" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: 6, marginLeft: 12 }}>
                    <path d="M6 3 C2 14 28 18 24 34" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M19 30 L24 34 L28 29" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            );
          })()}
        </>
      )}

      {Object.entries(cursors).map(([id, c]) => (
        <div key={id} style={cursorStyle(c.x_pct, c.y_pct, c.color, cLeft, cWidth, cAbsTop, overlayHeight)}>
          <MousePointer2 size={20} fill={c.color} fillOpacity={0.25} />
        </div>
      ))}

      {draft && !hidden && (
        <div style={{
          ...cardWrapperStyle(draft.x_pct, draft.y_pct, 0, cLeft, cWidth, cAbsTop, overlayHeight),
          cursor: 'default', zIndex: 40,
        }}>
          <div className="cc-card cc-draft" onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              placeholder="Your name (optional)"
              value={draftAuthor}
              onChange={(e) => setDraftAuthor(e.target.value)}
              style={inputStyle}
            />
            <textarea
              placeholder="Leave a comment…"
              value={draftBody}
              onChange={(e) => setDraftBody(e.target.value)}
              rows={3}
              autoFocus
              style={{ ...inputStyle, resize: 'vertical', marginBottom: '0.625rem' }}
            />
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button type="button" className="cc-btn-cancel" onClick={cancelDraft}>Cancel</button>
              <button
                type="button"
                className="cc-btn-save"
                onClick={saveDraft}
                disabled={saving || !draftBody.trim()}
                style={{ opacity: saving || !draftBody.trim() ? 0.6 : 1 }}
              >
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Zero-height anchor inside the content container — gives us contentLeft, contentWidth,
          and contentAbsTop for converting between content-relative coords and page pixels. */}
      <div
        ref={contentAnchorRef}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 0, pointerEvents: 'none' }}
      />

      {portalRoot && createPortal(overlay, portalRoot)}

      {/* Toolbar */}
      <div style={toolbarStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0 0.625rem', fontSize: '0.75rem', fontWeight: 500, color: '#374151', whiteSpace: 'nowrap' }}>
          <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', backgroundColor: '#22c55e' }} />
          {viewerCount} viewing
        </div>
        <div style={toolbarDivider} />
        <div className="ftip-wrap">
          <button type="button" aria-label="Cursor mode" style={toolbarBtnStyle(mode === 'cursor')}
            onClick={() => { setMode('cursor'); cancelDraft(); }}>
            <MousePointer2 size={18} />
          </button>
          <div className="ftip">Cursor</div>
        </div>
        <div className="ftip-wrap">
          <button type="button" aria-label="Comment mode" style={toolbarBtnStyle(mode === 'comment')}
            onClick={() => setMode('comment')}>
            <MessageCircle size={18} />
          </button>
          <div className="ftip">Comment</div>
        </div>
        <div className="ftip-wrap">
          <button type="button" aria-label={hidden ? 'Show comments' : 'Hide comments'} style={toolbarBtnStyle(hidden)}
            onClick={() => setHidden(h => !h)}>
            {hidden ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          <div className="ftip">{hidden ? 'Show' : 'Hide'} comments</div>
        </div>
        {isOwner && (
          <>
            <div style={toolbarDivider} />
            <div className="ftip-wrap">
              <button type="button" aria-label="Log out" style={toolbarBtnStyle(false)}
                onClick={() => supabase.auth.signOut()}>
                <LogOut size={18} />
              </button>
              <div className="ftip">Log out</div>
            </div>
          </>
        )}
      </div>

      {/* Login form */}
      {showLogin && !isOwner && (
        <div
          style={{
            position: 'fixed', bottom: '5rem', left: '50%', transform: 'translateX(-50%)',
            backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '0.75rem',
            padding: '1rem', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 101, width: '240px',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <input type="email" placeholder="Email" value={loginEmail}
              onChange={e => setLoginEmail(e.target.value)} style={inputStyle} required />
            <input type="password" placeholder="Password" value={loginPw}
              onChange={e => setLoginPw(e.target.value)} style={inputStyle} required />
            {loginError && <p style={{ fontSize: '0.75rem', color: '#ef4444', margin: 0 }}>{loginError}</p>}
            <button type="submit" className="cc-btn-save" style={{ opacity: 1 }}>Sign in</button>
          </form>
        </div>
      )}
    </>
  );
}
