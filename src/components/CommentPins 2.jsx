import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MousePointer2, MessageCircle, Trash2, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const PRESET_COLOR = '#7F77DD';
const VISITOR_COLOR = '#1D9E75';

// Palette for live-cursor colours - one is assigned at random per visitor session
const CURSOR_COLORS = ['#F97316', '#3B82F6', '#EC4899', '#FACC15', '#14B8A6', '#8B5CF6', '#EF4444', '#06B6D4'];

const randomId = () =>
  (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : Math.random().toString(36).slice(2);

const isTouchDevice = () =>
  typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

// Hardcoded "director's commentary" pins - always shown, regardless of the database
const PRESET_PINS = [
  {
    id: 'preset-1',
    x_pct: 50,
    y_pct: 22,
    author: 'Wahab',
    body: "this is the 36.1% one 👀 timed it myself with the design team",
  },
];

// Rendered via a portal directly into <body>, so this has no positioned
// ancestors - top/left/width are relative to the whole document, and
// height is set explicitly to the full document height so the overlay
// covers the entire page, not just the narrow content column.
const overlayStyle = (mode, height) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: `${height}px`,
  zIndex: 30,
  pointerEvents: mode === 'comment' ? 'auto' : 'none',
  cursor: mode === 'comment' ? 'crosshair' : 'default',
});

const pinWrapperStyle = (xPct, yPct) => ({
  position: 'absolute',
  left: `${xPct}%`,
  top: `${yPct}%`,
  transform: 'translate(-50%, -50%)',
  pointerEvents: 'auto',
  zIndex: 31,
});

const markerStyle = (color) => ({
  display: 'block',
  width: '16px',
  height: '16px',
  borderRadius: '50%',
  backgroundColor: color,
  border: '2px solid #ffffff',
  boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
  cursor: 'pointer',
  padding: 0,
});

const noteStyle = {
  position: 'absolute',
  top: '22px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '220px',
  maxWidth: 'calc(100vw - 40px)',
  backgroundColor: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '0.5rem',
  padding: '0.75rem',
  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  fontSize: '0.8125rem',
  lineHeight: 1.5,
  color: '#111827',
  zIndex: 32,
  boxSizing: 'border-box',
};

const inputStyle = {
  display: 'block',
  width: '100%',
  fontSize: '0.8125rem',
  fontFamily: 'inherit',
  padding: '0.375rem 0.5rem',
  marginBottom: '0.5rem',
  borderRadius: '0.375rem',
  border: '1px solid #e5e7eb',
  color: '#111827',
  backgroundColor: '#ffffff',
  boxSizing: 'border-box',
};

const toolbarStyle = {
  position: 'fixed',
  bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))',
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
  maxWidth: 'calc(100vw - 2rem)',
};

const toolbarButtonStyle = (active) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2.25rem',
  height: '2.25rem',
  borderRadius: '9999px',
  border: 'none',
  backgroundColor: active ? '#111827' : 'transparent',
  color: active ? '#ffffff' : '#6b7280',
  transition: 'background-color 0.15s ease, color 0.15s ease',
});

const toolbarDividerStyle = {
  width: '1px',
  alignSelf: 'stretch',
  backgroundColor: '#e5e7eb',
  margin: '0.25rem 0.125rem',
};

const viewerBadgeStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.375rem',
  padding: '0 0.625rem',
  fontSize: '0.75rem',
  fontWeight: 500,
  color: '#374151',
  whiteSpace: 'nowrap',
};

const greenDotStyle = {
  display: 'inline-block',
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: '#22c55e',
};

const cursorStyle = (xPct, yPct, color) => ({
  position: 'absolute',
  left: `${xPct}%`,
  top: `${yPct}%`,
  pointerEvents: 'none',
  zIndex: 29,
  transition: 'left 0.08s linear, top 0.08s linear',
  color,
});

const deleteButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '1.25rem',
  height: '1.25rem',
  borderRadius: '0.25rem',
  border: 'none',
  backgroundColor: 'transparent',
  color: '#9ca3af',
  cursor: 'pointer',
  padding: 0,
};

const loginFormStyle = {
  position: 'fixed',
  bottom: 'calc(4.5rem + env(safe-area-inset-bottom, 0px))',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '220px',
  maxWidth: 'calc(100vw - 40px)',
  backgroundColor: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '0.5rem',
  padding: '0.75rem',
  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  fontSize: '0.8125rem',
  zIndex: 101,
  boxSizing: 'border-box',
};

const loginButtonStyle = {
  display: 'block',
  width: '100%',
  fontSize: '0.8125rem',
  fontWeight: 500,
  padding: '0.375rem 0.75rem',
  borderRadius: '0.375rem',
  border: 'none',
  backgroundColor: '#111827',
  color: '#ffffff',
  cursor: 'pointer',
};

export default function CommentPins({ page }) {
  const overlayRef = useRef(null);
  const channelRef = useRef(null);
  const [mode, setMode] = useState('cursor');
  const [comments, setComments] = useState([]);
  const [draft, setDraft] = useState(null);
  const [draftAuthor, setDraftAuthor] = useState('');
  const [draftBody, setDraftBody] = useState('');
  const [openPinId, setOpenPinId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [overlayHeight, setOverlayHeight] = useState(0);
  const [cursors, setCursors] = useState({});
  const [viewerCount, setViewerCount] = useState(0);

  const [sessionId] = useState(randomId);
  const [cursorColor] = useState(() => CURSOR_COLORS[Math.floor(Math.random() * CURSOR_COLORS.length)]);

  const [isOwner, setIsOwner] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Measure the full document height so the overlay (portalled into <body>)
  // covers the entire page, including content outside the narrow content column
  useLayoutEffect(() => {
    const updateHeight = () => setOverlayHeight(document.documentElement.scrollHeight);
    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(document.body);
    window.addEventListener('resize', updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  // Owner auth: check for an existing session and keep isOwner in sync
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsOwner(!!data.session);
    }).catch(() => {});

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsOwner(!!session);
      if (session) setShowLoginForm(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Escape closes open notes, the draft form, and the login panel.
  // Ctrl+Shift+L toggles the owner login form.
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpenPinId(null);
        setDraft(null);
        setDraftAuthor('');
        setDraftBody('');
        setShowLoginForm(false);
      }
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setShowLoginForm((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const loadComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('page', page);

      if (!error && data) {
        setComments(data);
      }
    };

    loadComments();
  }, [page]);

  // Realtime: live cursors (broadcast), instant comments (postgres_changes),
  // and a viewer count (presence) - all on a single per-page channel
  useEffect(() => {
    const channel = supabase.channel(`room:${page}`, {
      config: {
        presence: { key: sessionId },
      },
    });

    channel
      .on('broadcast', { event: 'cursor' }, ({ payload }) => {
        if (payload.id === sessionId) return;
        setCursors((prev) => ({ ...prev, [payload.id]: payload }));
      })
      .on('presence', { event: 'sync' }, () => {
        setViewerCount(Object.keys(channel.presenceState()).length);
      })
      .on('presence', { event: 'leave' }, ({ key }) => {
        setCursors((prev) => {
          if (!(key in prev)) return prev;
          const next = { ...prev };
          delete next[key];
          return next;
        });
      })
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'comments', filter: `page=eq.${page}` },
        ({ new: row }) => {
          setComments((prev) => (prev.some((c) => c.id === row.id) ? prev : [...prev, row]));
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'comments', filter: `page=eq.${page}` },
        ({ old: row }) => {
          setComments((prev) => prev.filter((c) => c.id !== row.id));
          setOpenPinId((prev) => (prev === row.id ? null : prev));
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          channel.track({ color: cursorColor });
        }
      });

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
      channelRef.current = null;
      setCursors({});
      setViewerCount(0);
    };
  }, [page, sessionId, cursorColor]);

  // Broadcast this visitor's cursor position (as page-relative percentages),
  // throttled to ~20fps. Skipped entirely on touch devices.
  useEffect(() => {
    if (isTouchDevice()) return;

    let lastSent = 0;
    const handleMouseMove = (e) => {
      const now = performance.now();
      if (now - lastSent < 50) return;
      lastSent = now;

      const channel = channelRef.current;
      if (!channel) return;

      const x_pct = (e.clientX / window.innerWidth) * 100;
      const y_pct = (e.pageY / document.documentElement.scrollHeight) * 100;

      channel.send({
        type: 'broadcast',
        event: 'cursor',
        payload: { id: sessionId, x_pct, y_pct, color: cursorColor },
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [sessionId, cursorColor]);

  const handleOverlayClick = (e) => {
    if (mode !== 'comment' || draft) return;

    const rect = overlayRef.current.getBoundingClientRect();
    const x_pct = ((e.clientX - rect.left) / rect.width) * 100;
    const y_pct = ((e.clientY - rect.top) / rect.height) * 100;

    setOpenPinId(null);
    setDraft({ x_pct, y_pct });
    setDraftAuthor('');
    setDraftBody('');
  };

  // Tap-to-drop on touch devices. Only handle taps that land on the overlay
  // background itself (not on pins/notes/toolbar, which stop propagation on click)
  const handleOverlayTouchEnd = (e) => {
    if (mode !== 'comment' || draft) return;
    if (e.target !== overlayRef.current) return;

    const touch = e.changedTouches[0];
    if (!touch) return;

    e.preventDefault();

    const rect = overlayRef.current.getBoundingClientRect();
    const x_pct = ((touch.clientX - rect.left) / rect.width) * 100;
    const y_pct = ((touch.clientY - rect.top) / rect.height) * 100;

    setOpenPinId(null);
    setDraft({ x_pct, y_pct });
    setDraftAuthor('');
    setDraftBody('');
  };

  const handleCancelDraft = () => {
    setDraft(null);
    setDraftAuthor('');
    setDraftBody('');
  };

  const handleSaveDraft = async () => {
    if (!draftBody.trim() || !draft) return;

    setSaving(true);
    const { data, error } = await supabase
      .from('comments')
      .insert({
        page,
        x_pct: draft.x_pct,
        y_pct: draft.y_pct,
        author: draftAuthor.trim() || 'Anonymous',
        body: draftBody.trim(),
      })
      .select()
      .single();
    setSaving(false);

    if (!error && data) {
      setComments((prev) => (prev.some((c) => c.id === data.id) ? prev : [...prev, data]));
    }

    handleCancelDraft();
  };

  const togglePin = (id) => {
    setOpenPinId((prev) => (prev === id ? null : id));
  };

  const handleDeleteComment = async (id) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
    setOpenPinId((prev) => (prev === id ? null : prev));
    await supabase.from('comments').delete().eq('id', id);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError('');

    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail.trim(),
      password: loginPassword,
    });

    setLoggingIn(false);

    if (error) {
      setLoginError(error.message);
      return;
    }

    setShowLoginForm(false);
    setLoginEmail('');
    setLoginPassword('');
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return createPortal(
    <>
      <div
        ref={overlayRef}
        style={overlayStyle(mode, overlayHeight)}
        onClick={handleOverlayClick}
        onTouchEnd={handleOverlayTouchEnd}
      >
        {PRESET_PINS.map((pin) => (
          <div key={pin.id} style={pinWrapperStyle(pin.x_pct, pin.y_pct)}>
            <button
              type="button"
              aria-label={`${openPinId === pin.id ? 'Close' : 'Open'} note by ${pin.author}`}
              aria-expanded={openPinId === pin.id}
              style={markerStyle(PRESET_COLOR)}
              onClick={(e) => {
                e.stopPropagation();
                togglePin(pin.id);
              }}
            />
            {openPinId === pin.id && (
              <div style={noteStyle} onClick={(e) => e.stopPropagation()}>
                <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{pin.author}</p>
                <p>{pin.body}</p>
              </div>
            )}
          </div>
        ))}

        {comments.map((pin) => (
          <div key={pin.id} style={pinWrapperStyle(pin.x_pct, pin.y_pct)}>
            <button
              type="button"
              aria-label={`${openPinId === pin.id ? 'Close' : 'Open'} comment by ${pin.author || 'Anonymous'}`}
              aria-expanded={openPinId === pin.id}
              style={markerStyle(VISITOR_COLOR)}
              onClick={(e) => {
                e.stopPropagation();
                togglePin(pin.id);
              }}
            />
            {openPinId === pin.id && (
              <div style={noteStyle} onClick={(e) => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{pin.author || 'Anonymous'}</p>
                  {isOwner && (
                    <button
                      type="button"
                      aria-label="Delete comment"
                      onClick={() => handleDeleteComment(pin.id)}
                      style={deleteButtonStyle}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                <p>{pin.body}</p>
              </div>
            )}
          </div>
        ))}

        {Object.entries(cursors).map(([id, cursor]) =>
          cursor.x_pct != null && cursor.y_pct != null ? (
            <div key={id} style={cursorStyle(cursor.x_pct, cursor.y_pct, cursor.color)}>
              <MousePointer2 size={20} fill={cursor.color} fillOpacity={0.25} />
            </div>
          ) : null
        )}

        {draft && (
          <div style={pinWrapperStyle(draft.x_pct, draft.y_pct)}>
            <span style={markerStyle(VISITOR_COLOR)} />
            <div style={noteStyle} onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                placeholder="Your name (optional)"
                value={draftAuthor}
                onChange={(e) => setDraftAuthor(e.target.value)}
                style={inputStyle}
              />
              <textarea
                placeholder="Leave a comment..."
                value={draftBody}
                onChange={(e) => setDraftBody(e.target.value)}
                rows={3}
                autoFocus
                style={{ ...inputStyle, resize: 'vertical', marginBottom: '0.625rem' }}
              />
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={handleCancelDraft}
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    padding: '0.375rem 0.75rem',
                    borderRadius: '0.375rem',
                    border: '1px solid #e5e7eb',
                    backgroundColor: '#ffffff',
                    color: '#374151',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  disabled={saving || !draftBody.trim()}
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    padding: '0.375rem 0.75rem',
                    borderRadius: '0.375rem',
                    border: 'none',
                    backgroundColor: VISITOR_COLOR,
                    color: '#ffffff',
                    opacity: saving || !draftBody.trim() ? 0.6 : 1,
                  }}
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={toolbarStyle}>
        <div style={viewerBadgeStyle}>
          <span style={greenDotStyle} />
          {viewerCount} viewing
        </div>
        <div style={toolbarDividerStyle} />
        <button
          type="button"
          aria-label="Cursor mode"
          aria-pressed={mode === 'cursor'}
          style={toolbarButtonStyle(mode === 'cursor')}
          onClick={() => {
            setMode('cursor');
            handleCancelDraft();
          }}
        >
          <MousePointer2 size={18} />
        </button>
        <button
          type="button"
          aria-label="Comment mode"
          aria-pressed={mode === 'comment'}
          style={toolbarButtonStyle(mode === 'comment')}
          onClick={() => setMode('comment')}
        >
          <MessageCircle size={18} />
        </button>

        {isOwner && (
          <>
            <div style={toolbarDividerStyle} />
            <button
              type="button"
              aria-label="Sign out"
              style={toolbarButtonStyle(false)}
              onClick={handleSignOut}
            >
              <LogOut size={18} />
            </button>
          </>
        )}
      </div>

      {showLoginForm && !isOwner && (
        <div style={loginFormStyle} onClick={(e) => e.stopPropagation()}>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              style={inputStyle}
              autoFocus
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              style={{ ...inputStyle, marginBottom: loginError ? '0.5rem' : '0.625rem' }}
            />
            {loginError && (
              <p style={{ color: '#dc2626', fontSize: '0.75rem', marginBottom: '0.625rem' }}>
                {loginError}
              </p>
            )}
            <button type="submit" disabled={loggingIn} style={{ ...loginButtonStyle, opacity: loggingIn ? 0.6 : 1 }}>
              {loggingIn ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      )}
    </>,
    document.body
  );
}
