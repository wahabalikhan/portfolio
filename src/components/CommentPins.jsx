import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MousePointer2, MessageCircle, Trash2, LogOut, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const PRESET_COLOR = '#7F77DD';
const VISITOR_COLORS = ['#1D9E75', '#D85A30', '#D4537E', '#378ADD', '#BA7517'];
const CURSOR_COLORS = ['#F97316', '#3B82F6', '#EC4899', '#FACC15', '#14B8A6', '#8B5CF6', '#EF4444', '#06B6D4'];

const PRESET_PINS = [
  { id: 'preset-1', x_pct: 72, y_pct: 8,  author: 'Wahab', body: 'took about 3 attempts to get this headline right 😅', preset: true },
  { id: 'preset-2', x_pct: 28, y_pct: 32, author: 'Wahab', body: 'yes I did time it with a stopwatch 👀 36.1% is very real', preset: true },
  { id: 'preset-3', x_pct: 68, y_pct: 48, author: 'Wahab', body: 'this one kept me up at night. in a good way 🌙', preset: true },
  { id: 'preset-4', x_pct: 18, y_pct: 62, author: 'Wahab', body: 'built this portfolio at 2am. Claude Code did not judge me 🤝', preset: true },
  { id: 'preset-5', x_pct: 82, y_pct: 78, author: 'Wahab', body: "if you've scrolled this far... you should probably just hire me 👋", preset: true },
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
  return (hash % 7) - 3; // -3 to +3
};

const truncate = (text, words = 7) => {
  const parts = text.trim().split(/\s+/);
  if (parts.length <= words) return text;
  return parts.slice(0, words).join(' ') + '…';
};

const overlayStyle = (mode) => ({
  position: 'absolute',
  top: 0, left: 0, right: 0, bottom: 0,
  zIndex: 30,
  pointerEvents: mode === 'comment' ? 'auto' : 'none',
  cursor: mode === 'comment' ? 'crosshair' : 'default',
});

const cardWrapperStyle = (xPct, yPct, deg) => ({
  position: 'absolute',
  left: `${xPct}%`,
  top: `${yPct}%`,
  transform: `translate(-50%, -50%) rotate(${deg}deg)`,
  pointerEvents: 'auto',
  zIndex: 31,
});

const cursorStyle = (xPct, yPct, color) => ({
  position: 'absolute',
  left: `${xPct}%`,
  top: `${yPct}%`,
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

export default function CommentPins({ page, showPresets = true }) {
  const overlayRef = useRef(null);
  const channelRef = useRef(null);

  const [mode, setMode]           = useState('cursor');
  const [comments, setComments]   = useState([]);
  const [draft, setDraft]         = useState(null);
  const [draftAuthor, setDraftAuthor] = useState('');
  const [draftBody, setDraftBody] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [saving, setSaving]       = useState(false);
  const [hidden, setHidden]       = useState(false);
  const [overlayHeight, setOverlayHeight] = useState(0);
  const [cursors, setCursors]     = useState({});
  const [viewerCount, setViewerCount] = useState(0);
  const [isMobile, setIsMobile]   = useState(() => typeof window !== 'undefined' && window.innerWidth <= 767);
  const [pulseActive, setPulseActive] = useState(true);

  const [isOwner, setIsOwner]         = useState(false);
  const [showLogin, setShowLogin]     = useState(false);
  const [loginEmail, setLoginEmail]   = useState('');
  const [loginPw, setLoginPw]         = useState('');
  const [loginError, setLoginError]   = useState('');

  const [sessionId]    = useState(randomId);
  const [cursorColor]  = useState(() => CURSOR_COLORS[Math.floor(Math.random() * CURSOR_COLORS.length)]);

  const [presetPositions, setPresetPositions] = useState(() => {
    try {
      const saved = localStorage.getItem('preset-pin-positions');
      if (saved) return JSON.parse(saved);
    } catch {}
    return Object.fromEntries(PRESET_PINS.map((p) => [p.id, { x_pct: p.x_pct, y_pct: p.y_pct }]));
  });

  useEffect(() => {
    try { localStorage.setItem('preset-pin-positions', JSON.stringify(presetPositions)); } catch {}
  }, [presetPositions]);

  const [visitorPositions, setVisitorPositions] = useState(() => {
    try {
      const saved = localStorage.getItem('visitor-comment-positions');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {};
  });

  useEffect(() => {
    try { localStorage.setItem('visitor-comment-positions', JSON.stringify(visitorPositions)); } catch {}
  }, [visitorPositions]);

  const [annotationPos, setAnnotationPos] = useState(() => {
    try {
      const saved = localStorage.getItem('annotation-position');
      if (saved) return JSON.parse(saved);
    } catch {}
    return { x_pct: 8, y_pct: 90 };
  });

  useEffect(() => {
    try { localStorage.setItem('annotation-position', JSON.stringify(annotationPos)); } catch {}
  }, [annotationPos]);

  const [draggingId, setDraggingId] = useState(null);
  const [dragPos, setDragPos]       = useState(null);
  const dragMetaRef  = useRef(null);
  const dragPosRef   = useRef(null);
  const dragStartRef = useRef(null);
  const justDraggedRef = useRef(false);

  // Pulse fires once; allow stagger offset of 4 cards × 50ms + 600ms anim = ~800ms
  useEffect(() => {
    const t = setTimeout(() => setPulseActive(false), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Secret shortcut: Shift+Alt+L toggles the owner login form
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

  useLayoutEffect(() => {
    const update = () => { if (overlayRef.current) setOverlayHeight(overlayRef.current.offsetHeight); };
    update();
    const ro = new ResizeObserver(update);
    if (overlayRef.current) ro.observe(overlayRef.current);
    window.addEventListener('resize', update);
    return () => { ro.disconnect(); window.removeEventListener('resize', update); };
  }, []);

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
      .subscribe(status => { if (status === 'SUBSCRIBED') channel.track({ color: cursorColor }); });

    channelRef.current = channel;
    return () => { supabase.removeChannel(channel); channelRef.current = null; setCursors({}); setViewerCount(0); };
  }, [page, sessionId, cursorColor]);

  useEffect(() => {
    if (isTouchDevice()) return;
    let lastSent = 0;
    const onMove = (e) => {
      const now = performance.now();
      if (now - lastSent < 50) return;
      lastSent = now;
      const ch = channelRef.current;
      if (!ch) return;
      ch.send({ type: 'broadcast', event: 'cursor', payload: {
        id: sessionId,
        x_pct: (e.clientX / window.innerWidth) * 100,
        y_pct: overlayHeight > 0 ? (e.pageY / overlayHeight) * 100 : 0,
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

  useEffect(() => {
    if (!draggingId) return;
    document.body.style.userSelect = 'none';

    const onMove = (e) => {
      const meta = dragMetaRef.current;
      if (!meta) return;
      const x_pct = Math.max(0, Math.min(100, ((e.clientX - meta.offsetX_px) / window.innerWidth) * 100));
      const y_pct = Math.max(0, Math.min(100, ((e.pageY  - meta.offsetY_px) / overlayHeight) * 100));
      dragPosRef.current = { x_pct, y_pct };
      setDragPos({ x_pct, y_pct });
    };

    const onUp = () => {
      const meta = dragMetaRef.current;
      const pos  = dragPosRef.current;
      if (meta && pos) {
        if (meta.isAnnotation) {
          setAnnotationPos({ x_pct: pos.x_pct, y_pct: pos.y_pct });
        } else if (meta.isPreset) {
          setPresetPositions(prev => ({ ...prev, [meta.id]: { x_pct: pos.x_pct, y_pct: pos.y_pct } }));
        } else {
          setComments(prev => prev.map(c => c.id === meta.id ? { ...c, ...pos } : c));
          setVisitorPositions(prev => ({ ...prev, [meta.id]: { x_pct: pos.x_pct, y_pct: pos.y_pct } }));
          supabase.from('comments').update({ x_pct: pos.x_pct, y_pct: pos.y_pct }).eq('id', meta.id);
        }
        justDraggedRef.current = true;
      }
      document.body.style.userSelect = '';
      setDraggingId(null); setDragPos(null);
      dragMetaRef.current = null; dragPosRef.current = null;
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      document.body.style.userSelect = '';
    };
  }, [draggingId, overlayHeight]);

  const startAnnotationDrag = (e) => {
    e.stopPropagation();
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    dragMetaRef.current = {
      id: '__annotation__',
      isPreset: false,
      isAnnotation: true,
      offsetX_px: e.clientX - (annotationPos.x_pct / 100) * window.innerWidth,
      offsetY_px: e.pageY  - (annotationPos.y_pct / 100) * overlayHeight,
    };
    dragPosRef.current = { ...annotationPos };
    setExpandedId(null);
    setDraggingId('__annotation__');
  };

  const startDrag = (e, id, x_pct, y_pct, isPreset = false) => {
    e.stopPropagation();
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    dragMetaRef.current  = {
      id, isPreset,
      offsetX_px: e.clientX - (x_pct / 100) * window.innerWidth,
      offsetY_px: e.pageY  - (y_pct / 100) * overlayHeight,
    };
    dragPosRef.current = { x_pct, y_pct };
    setExpandedId(null);
    setDraggingId(id);
  };

  const handleOverlayClick = (e) => {
    if (justDraggedRef.current) { justDraggedRef.current = false; return; }
    setExpandedId(null);
    if (mode !== 'comment' || draft) return;
    const rect = overlayRef.current.getBoundingClientRect();
    setDraft({
      x_pct: ((e.clientX - rect.left) / rect.width)  * 100,
      y_pct: ((e.clientY - rect.top)  / rect.height) * 100,
    });
    setDraftAuthor(''); setDraftBody('');
  };

  const cancelDraft = () => { setDraft(null); setDraftAuthor(''); setDraftBody(''); };

  const saveDraft = async () => {
    if (!draftBody.trim() || !draft) return;
    setSaving(true);
    const { data, error } = await supabase.from('comments').insert({
      page, x_pct: draft.x_pct, y_pct: draft.y_pct,
      author: draftAuthor.trim() || 'Anonymous', body: draftBody.trim(),
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

  const renderCard = (id, author, body, color, x_pct, y_pct, isPreset, pulseIndex, isDragging) => {
    const pos        = isDragging && dragPos ? dragPos : { x_pct, y_pct };
    const isExpanded = expandedId === id;
    const deg        = getDeg(id);
    const pulseAnim  = pulseActive && isPreset
      ? { animation: `cc-pulse 600ms ease ${pulseIndex * 50}ms 1 both` }
      : {};

    return (
      <div
        key={id}
        style={{ ...cardWrapperStyle(pos.x_pct, pos.y_pct, deg), cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseDown={(e) => startDrag(e, id, pos.x_pct, pos.y_pct, isPreset)}
        onClick={(e) => onCardClick(e, id)}
        onMouseEnter={() => onCardEnter(id)}
        onMouseLeave={onCardLeave}
      >
        <div className={`cc-card${isExpanded ? ' cc-card-expanded' : ''}`} style={pulseAnim}>
          <div className="cc-header">
            <span className="cc-dot" style={{ backgroundColor: color }} />
            <span className="cc-author">{author}</span>
            <span className={`cc-preview${isExpanded ? ' cc-preview-hidden' : ''}`}>{truncate(body)}</span>
          </div>
          <p className={`cc-body${isExpanded ? ' cc-body-visible' : ''}`}>{body}</p>
          {isExpanded && isOwner && !isPreset && (
            <button
              type="button"
              className="cc-delete"
              onClick={(e) => { e.stopPropagation(); handleDelete(id); }}
              aria-label="Delete comment"
            >
              <Trash2 size={12} />
            </button>
          )}
        </div>
      </div>
    );
  };

  return createPortal(
    <>
      <div ref={overlayRef} style={overlayStyle(mode)} onClick={handleOverlayClick}>

        {!hidden && (
          <>
            {showPresets && PRESET_PINS.map((pin, i) => {
              const pos = presetPositions[pin.id];
              return renderCard(pin.id, pin.author, pin.body, PRESET_COLOR, pos.x_pct, pos.y_pct, true, i, pin.id === draggingId);
            })}
            {comments.map((pin, i) => {
              const override = visitorPositions[pin.id];
              const x = override ? override.x_pct : pin.x_pct;
              const y = override ? override.y_pct : pin.y_pct;
              return renderCard(pin.id, pin.author || 'Anonymous', pin.body, visitorColor(pin.id), x, y, false, i, pin.id === draggingId);
            })}
          </>
        )}

        {page === 'home' && (() => {
          const isDragging = draggingId === '__annotation__';
          const pos = isDragging && dragPos ? dragPos : annotationPos;
          return (
            <div
              style={{
                position: 'absolute',
                left: `${pos.x_pct}%`,
                top: `${pos.y_pct}%`,
                transform: `translate(-50%, -50%) rotate(-2deg)`,
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

        {Object.entries(cursors).map(([id, c]) => (
          <div key={id} style={cursorStyle(c.x_pct, c.y_pct, c.color)}>
            <MousePointer2 size={20} fill={c.color} fillOpacity={0.25} />
          </div>
        ))}

        {draft && !hidden && (
          <div style={{ ...cardWrapperStyle(draft.x_pct, draft.y_pct, 0), cursor: 'default', zIndex: 40 }}>
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

      {/* Toolbar */}
      <div style={toolbarStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0 0.625rem', fontSize: '0.75rem', fontWeight: 500, color: '#374151', whiteSpace: 'nowrap' }}>
          <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', backgroundColor: '#22c55e' }} />
          {viewerCount} viewing
        </div>
        <div style={toolbarDivider} />
        <button type="button" aria-label="Cursor mode" style={toolbarBtnStyle(mode === 'cursor')}
          onClick={() => { setMode('cursor'); cancelDraft(); }}>
          <MousePointer2 size={18} />
        </button>
        <button type="button" aria-label="Comment mode" style={toolbarBtnStyle(mode === 'comment')}
          onClick={() => setMode('comment')}>
          <MessageCircle size={18} />
        </button>
        <button type="button" aria-label={hidden ? 'Show comments' : 'Hide comments'} style={toolbarBtnStyle(hidden)}
          onClick={() => setHidden(h => !h)}>
          {hidden ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
        {isOwner && (
          <>
            <div style={toolbarDivider} />
            <button type="button" aria-label="Log out" style={toolbarBtnStyle(false)}
              onClick={() => supabase.auth.signOut()}>
              <LogOut size={18} />
            </button>
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
    </>,
    document.body
  );
}
