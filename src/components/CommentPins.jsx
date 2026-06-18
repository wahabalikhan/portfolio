import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MousePointer2, MessageCircle, Trash2, LogOut, Eye, EyeOff, X, Pencil, GripHorizontal } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const PRESET_COLOR = '#7F77DD';
const VISITOR_COLORS = ['#1D9E75', '#D85A30', '#D4537E', '#378ADD', '#BA7517'];
const CURSOR_COLORS = ['#F97316', '#3B82F6', '#EC4899', '#FACC15', '#14B8A6', '#8B5CF6', '#EF4444', '#06B6D4'];

// Maximum play area width: 14-inch MacBook Pro logical CSS pixels (1512px).
// Comments cannot be placed or dragged outside this centered boundary.
const PLAY_AREA_WIDTH = 1300;

// Returns the min/max x_pct values (content-relative) that correspond to the PLAY_AREA_WIDTH
// boundary centered on the current viewport. Allows pins to reach the edge of a 14" MBP screen
// but no further, regardless of how wide the actual viewport is.
const getPlayAreaXBounds = (contentLeft, contentWidth) => {
  const halfPlay   = PLAY_AREA_WIDTH / 2;
  const pageCenter = window.innerWidth / 2;
  const playLeft   = pageCenter - halfPlay;
  const playRight  = pageCenter + halfPlay;
  return {
    minX: (playLeft  - contentLeft) / contentWidth * 100,
    maxX: (playRight - contentLeft) / contentWidth * 100,
  };
};

// Coordinate system:
//   x_pct = (clientX - contentLeft) / contentWidth * 100
//     → content-container-relative; 0 = left edge, 100 = right edge,
//       negative = left of content, >100 = right of content.
//   y_pct = (pageY - contentAbsTop) / contentHeight * 100
//     → content-height-relative from the content container's absolute top.
//     Uses content column height (not document.scrollHeight) so positions are
//     consistent across screen sizes — scrollHeight inflates on tall monitors
//     due to min-height: 100vh, causing y-axis drift if used as denominator.
//
// Rendering converts back to absolute page pixels:
//   left = contentLeft + x_pct/100 * contentWidth
//   top  = contentAbsTop + y_pct/100 * contentHeight
//
// The overlay is a portal on document.body (position:absolute, top:0, left:0, full page).
// Pins can be placed and dragged anywhere on the page, not just within the content column.
//
// VERSION 6 preset positions — recalibrated for content-height y denominator and
// (window.innerWidth - contentWidth)/2 contentLeft formula.
const PRESET_PINS = [
  { id: 'preset-1', x_pct: 78, y_pct: 14, author: 'Wahab', body: 'took about 3 attempts to get this headline right 😅', preset: true },
  { id: 'preset-2', x_pct: 8,  y_pct: 65, author: 'Wahab', body: 'built this portfolio at 2am. Claude Code did not judge me 🤝', preset: true },
  { id: 'preset-3', x_pct: 18, y_pct: 35, author: 'Wahab', body: 'yes I did time it with a stopwatch 👀 36.1% is very real', preset: true, tabs: ['Design'] },
  { id: 'preset-4', x_pct: 75, y_pct: 50, author: 'Wahab', body: 'this one kept me up at night. in a good way 🌙', preset: true, tabs: ['Design'] },
  { id: 'preset-5', x_pct: 80, y_pct: 78, author: 'Wahab', body: "if you've scrolled this far... you should probably just hire me 👋", preset: true, tabs: ['Design'] },
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

const ADJECTIVES = ['Purple', 'Blue', 'Green', 'Orange', 'Pink', 'Teal', 'Amber', 'Coral', 'Slate', 'Indigo'];
const NOUNS      = ['Designer', 'Visitor', 'Explorer', 'Thinker', 'Maker', 'Builder', 'Creator', 'Dreamer', 'Reader', 'Wanderer'];

const getOrCreateAnonName = () => {
  try {
    const existing = sessionStorage.getItem('wahab_anon_name');
    if (existing) return existing;
    const adj  = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
    const name = `${adj} ${noun}`;
    sessionStorage.setItem('wahab_anon_name', name);
    return name;
  } catch { return 'Anonymous'; }
};

const getDisplayName = (ownerFlag) => {
  if (ownerFlag) return 'Wahab';
  try {
    const realName = localStorage.getItem('wahab_visitor_name');
    if (realName) return realName;
  } catch {}
  return getOrCreateAnonName();
};

// Full-page overlay portaled to document.body so pins can exist anywhere on the page.
// cursor is managed imperatively via overlayRef (see cursor-style effect) so it updates
// instantly on mousemove without triggering React re-renders.
const overlayStyle = (mode, height) => ({
  position: 'absolute',
  top: 0, left: 0,
  width: '100%',
  height: height > 0 ? `${height}px` : '100%',
  zIndex: 30,
  pointerEvents: mode === 'comment' ? 'auto' : 'none',
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
  zIndex: 35,
  transition: 'left 0.08s linear, top 0.08s linear',
  color,
});

const toolbarStyle = {
  position: 'fixed',
  bottom: '2rem',
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
  const modeRef          = useRef('cursor'); // kept in sync for use in event handler closures
  const isOwnerRef       = useRef(false);   // kept in sync for use in setTimeout callbacks
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
  // height is the content column's own rendered height — used as the y denominator so pin
  // positions are consistent across screen sizes (document.scrollHeight inflates on taller
  // monitors due to min-height: 100vh, causing y-axis drift).
  const [contentMetrics, setContentMetrics] = useState({ left: 0, width: 768, absTop: 0, height: 0 });
  const contentMetricsRef = useRef({ left: 0, width: 768, absTop: 0, height: 0 });

  // Portal root: a div appended to document.body that hosts the full-page overlay.
  const [portalRoot, setPortalRoot] = useState(null);

  const [mode, setMode]           = useState('cursor');
  const [comments, setComments]   = useState([]);
  const [draft, setDraft]         = useState(null);
  const [draftAuthor, setDraftAuthor] = useState('');
  const [draftBody, setDraftBody] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [saving, setSaving]       = useState(false);
  const [hidden, setHidden]       = useState(() => {
    try { return localStorage.getItem('wahab_comments_hidden') === 'true'; } catch { return false; }
  });
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
  const [pinSaveError, setPinSaveError]       = useState(null);

  const [draggingId, setDraggingId] = useState(null);
  const [dragPos, setDragPos]       = useState(null);

  const [mobileToastVisible, setMobileToastVisible] = useState(false);
  const [mobileToastFading,  setMobileToastFading]  = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editBody,  setEditBody]  = useState('');

  const displayNameRef = useRef(''); // synced to getDisplayName(isOwner) on every render

  const [presetPositions, setPresetPositions] = useState(() =>
    Object.fromEntries(PRESET_PINS.map(p => [p.id, { x_pct: p.x_pct, y_pct: p.y_pct }]))
  );

  // Per-page localStorage position cache for regular comments.
  // Writes on drag and on remote updates; survives refresh even if the async DB write
  // hasn't returned yet (or silently failed due to RLS). DB positions seed the cache for
  // brand-new comments so the initial render is always correct.
  const [commentPosCache, setCommentPosCache] = useState(() => {
    try {
      const saved = localStorage.getItem(`cc-pos-${page}`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {};
  });

  useEffect(() => {
    try { localStorage.removeItem(`cc-overlay-h-${page}`); } catch {}
  }, [page]);


  // Clear any stale visitor-position overrides from localStorage — positions now live
  // entirely in the DB and are loaded via the comments state on every mount.
  try { localStorage.removeItem('visitor-comment-positions'); } catch {}

  const [annotationPos, setAnnotationPos] = useState({ x_pct: 22, y_pct: 78 });

  // Create the portal root div and append it to body.
  useEffect(() => {
    const div = document.createElement('div');
    div.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:0;overflow:visible;pointer-events:none;';
    document.body.appendChild(div);
    setPortalRoot(div);
    return () => { document.body.removeChild(div); };
  }, []);

  // The portal container is position:fixed so it doesn't add to document scroll height.
  // We scroll-link the overlay by translating it by -scrollY so pins stay page-anchored.
  useEffect(() => {
    const sync = () => {
      if (overlayRef.current) {
        overlayRef.current.style.transform = `translateY(${-window.scrollY}px)`;
      }
    };
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    return () => window.removeEventListener('scroll', sync);
  }, [portalRoot]);

  // Measure the content container's position and dimensions.
  // Uses functional state update with equality check to avoid re-renders when nothing changed.
  const updateContentMetrics = () => {
    const rect = contentAnchorRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const newWidth  = rect.width;
    const newAbsTop = rect.top + window.scrollY;
    const newHeight = contentAnchorRef.current?.parentElement?.getBoundingClientRect().height ?? 0;
    // Derive contentLeft from window.innerWidth instead of rect.left.
    // getBoundingClientRect().left differs between browsers (Chrome vs Safari) due to
    // scrollbar-width handling. For a centred max-width container this is always correct.
    const newLeft = (window.innerWidth - newWidth) / 2;
    setContentMetrics(prev => {
      if (prev.left === newLeft && prev.width === newWidth && prev.absTop === newAbsTop && prev.height === newHeight) return prev;
      return { left: newLeft, width: newWidth, absTop: newAbsTop, height: newHeight };
    });
    contentMetricsRef.current = { left: newLeft, width: newWidth, absTop: newAbsTop, height: newHeight };
    console.log('[CommentPins] contentLeft fixed:', newLeft, 'window.innerWidth:', window.innerWidth, 'contentWidth:', newWidth);
  };

  useLayoutEffect(() => { updateContentMetrics(); }, []);

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
    if (!isMobile) return;
    try { if (sessionStorage.getItem('wahab_desktop_toast_shown')) return; } catch {}
    let dismissTimer;
    const showTimer = setTimeout(() => {
      try { sessionStorage.setItem('wahab_desktop_toast_shown', 'true'); } catch {}
      setMobileToastVisible(true);
      dismissTimer = setTimeout(() => {
        setMobileToastFading(true);
        setTimeout(() => { setMobileToastFading(false); setMobileToastVisible(false); }, 200);
      }, 4000);
    }, 4000);
    return () => { clearTimeout(showTimer); clearTimeout(dismissTimer); };
  }, [isMobile]);

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

  activeTabRef.current   = activeTab;
  modeRef.current        = mode;
  isOwnerRef.current     = isOwner;
  displayNameRef.current = getDisplayName(isOwner);

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
    const raf = requestAnimationFrame(() => {
      setOverlayHeight(document.documentElement.scrollHeight);
    });
    return () => cancelAnimationFrame(raf);
  }, [activeTab]);

  // Load owner-positioned preset pin and annotation positions from Supabase on mount.
  // Merges DB values over hardcoded defaults so all browsers see the owner's layout.
  useEffect(() => {
    if (isMobile) return;
    supabase.from('pin_positions').select('*').eq('page', page).then(({ data, error }) => {
      if (error) { console.warn('[CommentPins] Failed to load pin positions:', error); return; }
      if (!data || data.length === 0) return;
      setPresetPositions(prev => {
        const next = { ...prev };
        data.filter(r => r.type === 'preset').forEach(r => {
          if (r.id in next) next[r.id] = { x_pct: r.x_pct, y_pct: r.y_pct };
        });
        return next;
      });
      const ann = data.find(r => r.type === 'annotation');
      if (ann) setAnnotationPos({ x_pct: ann.x_pct, y_pct: ann.y_pct });
    });
  }, [page, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    supabase.from('comments').select('*').eq('page', page).then(({ data, error }) => {
      if (!error && data) {
        setComments(data);
        // Seed cache for any comment not yet in it; clean up deleted ones.
        setCommentPosCache(prev => {
          const dbIds = new Set(data.map(c => c.id));
          const n = { ...prev };
          let changed = false;
          data.forEach(c => {
            if (!(c.id in n)) { n[c.id] = { x_pct: c.x_pct, y_pct: c.y_pct }; changed = true; }
          });
          Object.keys(n).forEach(id => {
            if (!dbIds.has(id)) { delete n[id]; changed = true; }
          });
          if (!changed) return prev;
          try { localStorage.setItem(`cc-pos-${page}`, JSON.stringify(n)); } catch {}
          return n;
        });
      }
    });
  }, [page, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const channel = supabase.channel(`room:${page}`, { config: { broadcast: { self: false }, presence: { key: sessionId } } });
    channel
      .on('broadcast', { event: 'cursor' }, ({ payload }) => {
        if (payload.id === sessionId) return;
        setCursors(prev => ({ ...prev, [payload.id]: payload }));
      })
      .on('broadcast', { event: 'pin_position_update' }, ({ payload }) => {
        if (!payload?.id) return;
        if (payload.id === 'annotation') {
          setAnnotationPos({ x_pct: payload.x_pct, y_pct: payload.y_pct });
        } else {
          setPresetPositions(prev => ({ ...prev, [payload.id]: { x_pct: payload.x_pct, y_pct: payload.y_pct } }));
        }
      })
      .on('broadcast', { event: 'card_delete' }, ({ payload }) => {
        setComments(prev => prev.filter(c => c.id !== payload.id));
      })
      .on('broadcast', { event: 'card_edit' }, ({ payload }) => {
        setComments(prev => prev.map(c => c.id === payload.id ? { ...c, body: payload.body } : c));
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
          setCommentPosCache(prev => {
            const n = { ...prev, [payload.id]: { x_pct: payload.x_pct, y_pct: payload.y_pct } };
            try { localStorage.setItem(`cc-pos-${page}`, JSON.stringify(n)); } catch {}
            return n;
          });
        }
      })
      .on('presence', { event: 'sync' }, () => {
        setViewerCount(Object.keys(channel.presenceState()).length);
      })
      .on('presence', { event: 'leave' }, ({ key }) => {
        setCursors(prev => { if (!(key in prev)) return prev; const n = { ...prev }; delete n[key]; return n; });
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'comments', filter: `page=eq.${page}` },
        ({ new: row }) => {
          setComments(prev => prev.some(c => c.id === row.id) ? prev : [...prev, row]);
          setCommentPosCache(prev => {
            if (prev[row.id]) return prev;
            const n = { ...prev, [row.id]: { x_pct: row.x_pct, y_pct: row.y_pct } };
            try { localStorage.setItem(`cc-pos-${page}`, JSON.stringify(n)); } catch {}
            return n;
          });
        }
      )
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'comments', filter: `page=eq.${page}` },
        ({ old: row }) => {
          setComments(prev => prev.filter(c => c.id !== row.id));
          setCommentPosCache(prev => {
            if (!(row.id in prev)) return prev;
            const n = { ...prev }; delete n[row.id];
            try { localStorage.setItem(`cc-pos-${page}`, JSON.stringify(n)); } catch {}
            return n;
          });
        }
      )
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'comments', filter: `page=eq.${page}` },
        ({ new: row }) => {
          setComments(prev => prev.map(c => c.id === row.id
            ? { ...c, x_pct: row.x_pct, y_pct: row.y_pct, body: row.body, author: row.author } : c));
          setCommentPosCache(prev => {
            const n = { ...prev, [row.id]: { x_pct: row.x_pct, y_pct: row.y_pct } };
            try { localStorage.setItem(`cc-pos-${page}`, JSON.stringify(n)); } catch {}
            return n;
          });
          setRemoteCardMoves(prev => { const n = { ...prev }; delete n[row.id]; return n; });
          clearTimeout(remoteMoveTimers.current[row.id]);
          delete remoteMoveTimers.current[row.id];
        }
      )
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pin_positions', filter: `page=eq.${page}` },
        ({ eventType, new: row }) => {
          if (eventType === 'INSERT' || eventType === 'UPDATE') {
            if (row.type === 'preset') {
              setPresetPositions(prev => ({ ...prev, [row.id]: { x_pct: row.x_pct, y_pct: row.y_pct } }));
            } else if (row.type === 'annotation') {
              setAnnotationPos({ x_pct: row.x_pct, y_pct: row.y_pct });
            }
          }
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
  }, [page, sessionId, cursorColor, isMobile]);

  const resyncComments = useCallback(async () => {
    if (isMobile) return;
    const { data, error } = await supabase
      .from('comments').select('*').eq('page', page).order('created_at', { ascending: true });
    if (error) { console.warn('[CommentPins] Resync failed:', error); return; }
    if (data) {
      setComments(data);
      setCommentPosCache(() => {
        const n = Object.fromEntries(data.map(c => [c.id, { x_pct: c.x_pct, y_pct: c.y_pct }]));
        try { localStorage.setItem(`cc-pos-${page}`, JSON.stringify(n)); } catch {}
        return n;
      });
    }
  }, [page, isMobile]);

  // Resync comments when the tab becomes visible again after being inactive.
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState !== 'visible') return;
      const channelState = channelRef.current?.state;
      if (channelState === 'closed' || channelState === 'errored') {
        channelRef.current?.subscribe();
      }
      await resyncComments();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [resyncComments]);

  useEffect(() => {
    let lastFocusResync = 0;
    const handleFocus = async () => {
      const now = Date.now();
      if (now - lastFocusResync > 1000) {
        lastFocusResync = now;
        await resyncComments();
      }
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [resyncComments]);

  // Cursor broadcast — x_pct/y_pct are content-relative so remote cursors appear at the
  // same content position regardless of each viewer's screen width.
  useEffect(() => {
    if (isTouchDevice()) return;
    if (isMobile) return;
    let lastSent = 0;
    const onMove = (e) => {
      const now = performance.now();
      if (now - lastSent < 50) return;
      lastSent = now;
      const ch = channelRef.current;
      if (ch?.state !== 'joined') return;
      const m = contentMetricsRef.current;
      if (m.width === 0) return;
      ch.send({ type: 'broadcast', event: 'cursor', payload: {
        id: sessionId,
        x_pct: ((e.clientX - m.left) / m.width) * 100,
        y_pct: m.height > 0 ? ((e.pageY - m.absTop) / m.height) * 100 : 0,
        color: cursorColor,
        name: displayNameRef.current,
      }});
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [sessionId, cursorColor, isMobile]);

  // Cursor style: copy (can place) vs not-allowed (outside play area).
  // Runs unthrottled on mousemove and writes directly to the overlay's DOM style
  // to avoid triggering React re-renders on every mouse movement.
  useEffect(() => {
    if (isTouchDevice()) return;
    const onMove = (e) => {
      if (!overlayRef.current) return;
      if (modeRef.current !== 'comment') return;
      const m = contentMetricsRef.current;
      if (m.width === 0) return;
      const { minX, maxX } = getPlayAreaXBounds(m.left, m.width);
      const x_pct = (e.clientX - m.left) / m.width * 100;
      overlayRef.current.style.cursor = (x_pct >= minX && x_pct <= maxX) ? 'copy' : 'not-allowed';
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Reset overlay cursor whenever mode changes.
  useEffect(() => {
    if (!overlayRef.current) return;
    overlayRef.current.style.cursor = mode === 'comment' ? 'not-allowed' : 'default';
  }, [mode]);

  useEffect(() => {
    if (!expandedId) return;
    const close = (e) => {
      if (editingId) return;
      if (e.target.closest('.cc-delete, .cc-edit-btn, .cc-edit-form')) return;
      setExpandedId(null);
      setEditingId(null);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [expandedId, editingId]);

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
      const { minX, maxX } = getPlayAreaXBounds(m.left, m.width);
      const x_pct = Math.max(minX, Math.min(maxX, (relX - meta.offsetX_px) / m.width * 100));
      const y_pct = (meta.isAnnotation || meta.isPreset)
        ? Math.max(0, Math.min(95, (pageY - meta.offsetY_px) / window.innerHeight * 100))
        : Math.max(0, Math.min(95, ((relY - meta.offsetY_px) / m.height) * 100));
      dragPosRef.current = { x_pct, y_pct };

      const now = performance.now();
      if (now - lastUpdate >= 33) {
        lastUpdate = now;
        setDragPos({ x_pct, y_pct });
        if (!meta.isAnnotation && !meta.isPreset && !meta.isDraft && channelRef.current?.state === 'joined') {
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
        if (meta.isDraft) {
          setDraft(prev => prev ? { ...prev, x_pct: pos.x_pct, y_pct: pos.y_pct } : null);
          justDraggedRef.current = true;
        } else if (meta.isAnnotation) {
          const newPos = { x_pct: pos.x_pct, y_pct: pos.y_pct };
          setAnnotationPos(newPos);
          if (isOwnerRef.current) {
            const ch = channelRef.current;
            if (ch?.state === 'joined') {
              ch.send({ type: 'broadcast', event: 'pin_position_update', payload: { id: 'annotation', x_pct: newPos.x_pct, y_pct: newPos.y_pct } });
            }
            supabase.from('pin_positions').upsert(
              { id: 'annotation', x_pct: newPos.x_pct, y_pct: newPos.y_pct, type: 'annotation', page, updated_at: new Date().toISOString() },
              { onConflict: 'id' }
            ).then(({ error }) => {
              if (error) {
                console.warn('[CommentPins] Failed to save annotation position:', error);
                setPinSaveError('annotation');
                setTimeout(() => setPinSaveError(null), 2000);
              }
            });
          }
          justDraggedRef.current = true;
        } else if (meta.isPreset) {
          const finalX = pos.x_pct;
          const finalY = pos.y_pct;
          const preDrag = preDragPosRef.current;
          const positionChanged = !preDrag
            || Math.abs(finalX - preDrag.x_pct) > 0.1
            || Math.abs(finalY - preDrag.y_pct) > 0.1;
          if (positionChanged) {
            setPresetPositions(prev => ({ ...prev, [meta.id]: { x_pct: finalX, y_pct: finalY } }));
            if (isOwnerRef.current) {
              const capturedId = meta.id;
              const ch = channelRef.current;
              if (ch?.state === 'joined') {
                ch.send({ type: 'broadcast', event: 'pin_position_update', payload: { id: capturedId, x_pct: finalX, y_pct: finalY } });
              }
              supabase.from('pin_positions').upsert(
                { id: capturedId, x_pct: finalX, y_pct: finalY, type: 'preset', page, updated_at: new Date().toISOString() },
                { onConflict: 'id' }
              ).then(({ error }) => {
                if (error) {
                  console.warn('[CommentPins] Failed to save preset position:', error);
                  setPinSaveError(capturedId);
                  setTimeout(() => setPinSaveError(null), 2000);
                }
              });
            }
          }
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
            if (ch?.state === 'joined') {
              ch.send({ type: 'broadcast', event: 'card_move', payload: {
                id: meta.id, x_pct: finalX, y_pct: finalY, dragging: false,
              }});
            }
            setComments(prev => prev.map(c => c.id === meta.id
              ? { ...c, x_pct: finalX, y_pct: finalY } : c));
            setCommentPosCache(prev => {
              const n = { ...prev, [meta.id]: { x_pct: finalX, y_pct: finalY } };
              try { localStorage.setItem(`cc-pos-${page}`, JSON.stringify(n)); } catch {}
              return n;
            });

            clearTimeout(dbWriteTimerRef.current);
            const capturedId    = meta.id;
            const capturedPre   = preDrag;
            const capturedToken = meta.sessionToken;
            dbWriteTimerRef.current = setTimeout(async () => {
              const base = supabase.from('comments').update({ x_pct: finalX, y_pct: finalY }).eq('id', capturedId);
              const result = await (capturedToken ? base.eq('session_token', capturedToken) : base);
              if (capturedToken) console.log('Visitor DB write result:', result);
              const { error } = result;
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
      if (meta && !meta.isAnnotation && !meta.isPreset && preDrag) {
        setComments(prev => prev.map(c => c.id === meta.id
          ? { ...c, x_pct: preDrag.x_pct, y_pct: preDrag.y_pct } : c));
        const ch = channelRef.current;
        if (ch?.state === 'joined') {
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
  }, [draggingId]);

  // Cancel owner-initiated drag if they log out mid-drag.
  useEffect(() => {
    if (isOwner || !draggingId || draggingId === '__annotation__' || draggingId === '__draft__') return;
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
    if (!isOwner) return;
    e.stopPropagation();
    const m = contentMetricsRef.current;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    dragMetaRef.current = {
      id: '__annotation__',
      isAnnotation: true,
      offsetX_px: (e.clientX - m.left) - (annotationPos.x_pct / 100) * m.width,
      offsetY_px: e.pageY - (annotationPos.y_pct / 100) * window.innerHeight,
    };
    dragPosRef.current = { ...annotationPos };
    setExpandedId(null);
    setDraggingId('__annotation__');
  };

  const startDraftDrag = (e) => {
    if (!draft) return;
    e.stopPropagation();
    const m = contentMetricsRef.current;
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    const pageY   = e.pageY ?? e.touches?.[0]?.pageY ?? (clientY + window.scrollY);
    dragMetaRef.current = {
      id: '__draft__',
      isDraft: true,
      isAnnotation: false,
      isPreset: false,
      sessionToken: null,
      offsetX_px: (clientX - m.left) - (draft.x_pct / 100) * m.width,
      offsetY_px: (pageY   - m.absTop) - (draft.y_pct / 100) * m.height,
    };
    dragPosRef.current = { x_pct: draft.x_pct, y_pct: draft.y_pct };
    setDraggingId('__draft__');
  };

  const handleEdit = async (id, newBody) => {
    if (!newBody.trim()) return;
    const trimmed = newBody.trim();
    setComments(prev => prev.map(c => c.id === id ? { ...c, body: trimmed } : c));
    setEditingId(null);
    const ch = channelRef.current;
    if (ch?.state === 'joined') ch.send({ type: 'broadcast', event: 'card_edit', payload: { id, body: trimmed } });
    await supabase.from('comments').update({ body: trimmed }).eq('id', id);
  };

  const handleVisitorEdit = async (id, newBody) => {
    if (!newBody.trim()) return;
    const trimmed = newBody.trim();
    const token = localSessionToken.current;
    setComments(prev => prev.map(c => c.id === id ? { ...c, body: trimmed } : c));
    setEditingId(null);
    const ch = channelRef.current;
    if (ch?.state === 'joined') ch.send({ type: 'broadcast', event: 'card_edit', payload: { id, body: trimmed } });
    await supabase.from('comments').update({ body: trimmed }).eq('id', id).eq('session_token', token);
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
      isPreset: PRESET_PINS.some(p => p.id === id),
      sessionToken: isOwner ? null : localSessionToken.current,
      offsetX_px: (clientX - m.left) - (x_pct / 100) * m.width,
      offsetY_px: PRESET_PINS.some(p => p.id === id)
        ? pageY - (y_pct / 100) * window.innerHeight
        : (pageY - m.absTop) - (y_pct / 100) * m.height,
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
    // Reject clicks outside the 1512px centered play area
    const { minX, maxX } = getPlayAreaXBounds(m.left, m.width);
    const x_pct = ((e.clientX - m.left) / m.width) * 100;
    if (x_pct < minX || x_pct > maxX) return;
    const y_pct = m.height > 0 ? ((e.pageY - m.absTop) / m.height) * 100 : 0;
    setDraft({ x_pct, y_pct });
    const savedRealName = isOwner ? 'Wahab' : (() => { try { return localStorage.getItem('wahab_visitor_name') || ''; } catch { return ''; } })();
    setDraftAuthor(savedRealName); setDraftBody('');
  };

  const cancelDraft = () => { setDraft(null); setDraftAuthor(''); setDraftBody(''); };

  const saveDraft = async () => {
    if (!draftBody.trim() || !draft) return;
    setSaving(true);
    const token = getOrCreateSessionToken();
    localSessionToken.current = token;
    const enteredName = draftAuthor.trim();
    const { data, error } = await supabase.from('comments').insert({
      page, x_pct: draft.x_pct, y_pct: draft.y_pct,
      author: enteredName || 'Anonymous', body: draftBody.trim(),
      session_token: token,
    }).select().single();
    setSaving(false);
    if (!error && data) {
      setComments(prev => prev.some(c => c.id === data.id) ? prev : [...prev, data]);
      setCommentPosCache(prev => {
        if (prev[data.id]) return prev;
        const n = { ...prev, [data.id]: { x_pct: data.x_pct, y_pct: data.y_pct } };
        try { localStorage.setItem(`cc-pos-${page}`, JSON.stringify(n)); } catch {}
        return n;
      });
      if (enteredName && enteredName !== 'Anonymous') {
        try { localStorage.setItem('wahab_visitor_name', enteredName); } catch {}
      }
    }
    cancelDraft();
  };

  const handleDelete = async (id) => {
    setComments(prev => prev.filter(c => c.id !== id));
    setCommentPosCache(prev => {
      if (!(id in prev)) return prev;
      const n = { ...prev }; delete n[id];
      try { localStorage.setItem(`cc-pos-${page}`, JSON.stringify(n)); } catch {}
      return n;
    });
    setExpandedId(null);
    setEditingId(null);
    const ch = channelRef.current;
    if (ch?.state === 'joined') ch.send({ type: 'broadcast', event: 'card_delete', payload: { id } });
    await supabase.from('comments').delete().eq('id', id);
  };

  const handleVisitorDelete = async (id) => {
    const card = comments.find(c => c.id === id);
    if (!card) return;
    setComments(prev => prev.filter(c => c.id !== id));
    setCommentPosCache(prev => {
      if (!(id in prev)) return prev;
      const n = { ...prev }; delete n[id];
      try { localStorage.setItem(`cc-pos-${page}`, JSON.stringify(n)); } catch {}
      return n;
    });
    setExpandedId(null);
    setEditingId(null);
    const ch = channelRef.current;
    if (ch?.state === 'joined') ch.send({ type: 'broadcast', event: 'card_delete', payload: { id } });
    const token = localStorage.getItem('wahab_session_token');
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

  const onCardEnter = (id) => { if (!isTouchDevice() && !editingId) setExpandedId(id); };
  const onCardLeave = (id) => { if (!isTouchDevice() && !editingId) { setExpandedId(null); } };
  const onCardClick = (e, id) => {
    e.stopPropagation();
    const start = dragStartRef.current;
    const moved = start && (Math.abs(e.clientX - start.x) > 5 || Math.abs(e.clientY - start.y) > 5);
    if (moved) return;
    if (isTouchDevice()) setExpandedId(prev => prev === id ? null : id);
  };

  const { left: cLeft, width: cWidth, absTop: cAbsTop, height: cHeight } = contentMetrics;

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
    const canDrag   = isPreset ? isOwner : (isOwner || isOwnCard);
    const canDelete = !isPreset && (isOwner || isOwnCard);
    const canEdit   = !isPreset && (isOwner || isOwnCard);

    const wrapperStyle = {
      ...cardWrapperStyle(displayX, displayY, deg, cLeft, cWidth, cAbsTop, cHeight),
      ...(isPreset ? { top: `${(displayY / 100) * window.innerHeight}px` } : {}),
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
        onMouseDown={canDrag ? (e) => { if (e.target.closest('.cc-delete,.cc-edit-btn,.cc-edit-form')) return; startDrag(e, id, x_pct, y_pct); } : undefined}
        onTouchStart={canDrag ? (e) => { if (e.target.closest('.cc-delete,.cc-edit-btn,.cc-edit-form')) return; startDrag(e, id, x_pct, y_pct); } : undefined}
        onClick={(e) => onCardClick(e, id)}
        onMouseEnter={() => onCardEnter(id)}
        onMouseLeave={() => onCardLeave(id)}
      >
        <div className={cardClass} style={pulseAnim}>
          <div className="cc-header">
            <span className="cc-dot" style={{ backgroundColor: color }} />
            <span className="cc-author">{author}</span>
            <span className={`cc-preview${isExpanded ? ' cc-preview-hidden' : ''}`}>{truncate(body)}</span>
          </div>
          {editingId === id ? (
            <div className="cc-edit-form" onClick={(e) => e.stopPropagation()}>
              <textarea
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
                rows={3}
                autoFocus
                style={{ ...inputStyle, resize: 'vertical', marginBottom: '0.375rem' }}
              />
              <div style={{ display: 'flex', gap: '0.375rem', justifyContent: 'flex-end' }}>
                <button type="button" className="cc-btn-cancel" onClick={(e) => { e.stopPropagation(); setEditingId(null); }}>Cancel</button>
                <button
                  type="button"
                  className="cc-btn-save"
                  onClick={(e) => { e.stopPropagation(); isOwner ? handleEdit(id, editBody) : handleVisitorEdit(id, editBody); }}
                  disabled={!editBody.trim()}
                  style={{ opacity: !editBody.trim() ? 0.6 : 1 }}
                >Save</button>
              </div>
            </div>
          ) : (
            <p className={`cc-body${isExpanded ? ' cc-body-visible' : ''}`}>{body}</p>
          )}
          {isExpanded && editingId !== id && canEdit && (
            <button
              type="button"
              className="cc-edit-btn"
              onClick={(e) => { e.stopPropagation(); setEditBody(body); setEditingId(id); }}
              aria-label="Edit comment"
            >
              <Pencil size={12} />
            </button>
          )}
          {isExpanded && editingId !== id && canDelete && (
            <button
              type="button"
              className="cc-delete"
              onClick={(e) => { e.stopPropagation(); isOwner ? handleDelete(id) : handleVisitorDelete(id); }}
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
            return (
              <React.Fragment key={pin.id}>
                {renderCard(pin.id, pin.author, pin.body, PRESET_COLOR, pos.x_pct, pos.y_pct, true, i, pin.id === draggingId, null,
                  { opacity, transition: 'opacity 150ms ease' })}
                {pinSaveError === pin.id && (
                  <div style={{
                    position: 'absolute',
                    left: `${cLeft + (pos.x_pct / 100) * cWidth}px`,
                    top: `${(pos.y_pct / 100) * window.innerHeight - 32}px`,
                    transform: 'translateX(-50%)',
                    background: '#ef4444',
                    color: '#fff',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    zIndex: 50,
                  }}>position not saved</div>
                )}
              </React.Fragment>
            );
          })}

          {comments.map((pin, i) => {
            const cached = commentPosCache[pin.id];
            const x = cached ? cached.x_pct : pin.x_pct;
            const y = cached ? cached.y_pct : pin.y_pct;
            return renderCard(pin.id, pin.author || 'Anonymous', pin.body, visitorColor(pin.id), x, y, false, i, pin.id === draggingId, pin.session_token);
          })}

          {page === 'home' && (() => {
            const isDragging = draggingId === '__annotation__';
            const pos = isDragging && dragPos ? dragPos : annotationPos;
            return (
              <>
                <div
                  style={{
                    position: 'absolute',
                    left: `${cLeft + (pos.x_pct / 100) * cWidth}px`,
                    top: `${(pos.y_pct / 100) * window.innerHeight}px`,
                    transform: 'translate(-50%, -50%) rotate(-2deg)',
                    pointerEvents: 'auto',
                    cursor: !isOwner ? 'default' : (isDragging ? 'grabbing' : 'grab'),
                    zIndex: 31,
                    userSelect: 'none',
                  }}
                  onMouseDown={isOwner ? startAnnotationDrag : undefined}
                >
                  <div className="floating-annotation">
                    <div>got thoughts?</div>
                    <div>drop a comment</div>
                    <div>anywhere on the page</div>
                    <svg width="52" height="38" viewBox="0 0 52 38" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: 6, marginLeft: 12 }}>
                      <path d="M6 3 C2 14 28 18 24 34" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M19 30 L24 34 L28 29" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                {pinSaveError === 'annotation' && (
                  <div style={{
                    position: 'absolute',
                    left: `${cLeft + (pos.x_pct / 100) * cWidth}px`,
                    top: `${(pos.y_pct / 100) * window.innerHeight - 48}px`,
                    transform: 'translateX(-50%)',
                    background: '#ef4444',
                    color: '#fff',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    zIndex: 50,
                  }}>position not saved</div>
                )}
              </>
            );
          })()}
        </>
      )}

      {Object.entries(cursors).map(([id, c]) => (
        <div key={id} style={cursorStyle(c.x_pct, c.y_pct, c.color, cLeft, cWidth, cAbsTop, cHeight)}>
          <MousePointer2 size={20} fill={c.color} fillOpacity={0.25} />
          {c.name && (
            <div style={{
              position: 'absolute',
              top: '18px',
              left: '14px',
              backgroundColor: c.color,
              color: '#fff',
              fontSize: '0.6875rem',
              fontWeight: 600,
              lineHeight: 1,
              padding: '3px 6px',
              borderRadius: '4px',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              fontFamily: 'inherit',
              boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
            }}>
              {c.name}
            </div>
          )}
        </div>
      ))}

      {draft && !hidden && (() => {
        const draftX = (draggingId === '__draft__' && dragPos) ? dragPos.x_pct : draft.x_pct;
        const draftY = (draggingId === '__draft__' && dragPos) ? dragPos.y_pct : draft.y_pct;
        return (
        <div style={{
          ...cardWrapperStyle(draftX, draftY, 0, cLeft, cWidth, cAbsTop, cHeight),
          cursor: draggingId === '__draft__' ? 'grabbing' : 'default', zIndex: 40,
        }}>
          <div className="cc-card cc-draft" onClick={(e) => e.stopPropagation()}>
            <div
              className="cc-draft-handle"
              onMouseDown={startDraftDrag}
              onTouchStart={startDraftDrag}
            >
              <GripHorizontal size={14} />
            </div>
            <input
              type="text"
              placeholder="Your name (or leave anonymous)"
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
        );
      })()}
    </div>
  );

  const dismissToast = () => {
    setMobileToastFading(true);
    setTimeout(() => { setMobileToastFading(false); setMobileToastVisible(false); }, 200);
  };

  if (isMobile) {
    return mobileToastVisible ? (
      <div className={`mobile-toast${mobileToastFading ? ' mobile-toast-out' : ''}`}>
        <span>✨ More fun on desktop — drop comments, see who else is here.</span>
        <button className="mobile-toast-close" onClick={dismissToast} aria-label="Dismiss">
          <X size={14} />
        </button>
      </div>
    ) : null;
  }

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
            onClick={() => setHidden(h => {
              const next = !h;
              try { localStorage.setItem('wahab_comments_hidden', next); } catch {}
              return next;
            })}>
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
