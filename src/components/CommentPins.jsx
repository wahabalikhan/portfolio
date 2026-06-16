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
];

// Rendered via a portal into <body> (which has position:relative), so the
// overlay stretches to fill the full document via top/bottom/left/right: 0.
// No explicit height needed — avoids a Safari scrollHeight feedback loop.
const overlayStyle = (mode) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
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
  backgroundColor: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '0.5rem',
  padding: '0.75rem',
  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  fontSize: '0.8125rem',
  lineHeight: 1.5,
  color: '#111827',
  zIndex: 32,
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

  const [draggingId, setDraggingId] = useState(null);
  const [dragPos, setDragPos] = useState(null);
  const dragMetaRef = useRef(null);   // { id, offsetX_px, offsetY_px }
  const dragPosRef = useRef(null);    // latest { x_pct, y_pct } during drag
  const dragStartRef = useRef(null);  // { x, y } at mousedown, for click-vs-drag
  const justDraggedRef = useRef(false);

  // Measure the overlay's own rendered height (body is the containing block).
  // Observing the overlay avoids the Safari scrollHeight feedback loop.
  useLayoutEffect(() => {
    const updateHeight = () => {
      if (overlayRef.current) setOverlayHeight(overlayRef.current.offsetHeight);
    };
    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    if (overlayRef.current) resizeObserver.observe(overlayRef.current);
    window.addEventListener('resize', updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
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
      const y_pct = overlayHeight > 0 ? (e.pageY / overlayHeight) * 100 : 0;

      channel.send({
        type: 'broadcast',
        event: 'cursor',
        payload: { id: sessionId, x_pct, y_pct, color: cursorColor },
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [sessionId, cursorColor, overlayHeight]);

  // Close the open pin note when clicking anywhere outside the pin or note
  useEffect(() => {
    if (!openPinId) return;
    const close = () => setOpenPinId(null);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [openPinId]);

  // Pin dragging — active only while draggingId is set
  useEffect(() => {
    if (!draggingId) return;

    document.body.style.userSelect = 'none';

    const onMove = (e) => {
      const meta = dragMetaRef.current;
      if (!meta) return;
      const x_pct = Math.max(0, Math.min(100, ((e.clientX - meta.offsetX_px) / window.innerWidth) * 100));
      const y_pct = Math.max(0, Math.min(100, ((e.pageY - meta.offsetY_px) / overlayHeight) * 100));
      const pos = { x_pct, y_pct };
      dragPosRef.current = pos;
      setDragPos({ ...pos });
    };

    const onUp = () => {
      const meta = dragMetaRef.current;
      const pos = dragPosRef.current;
      if (meta && pos) {
        setComments((prev) =>
          prev.map((c) => c.id === meta.id ? { ...c, x_pct: pos.x_pct, y_pct: pos.y_pct } : c)
        );
        supabase.from('comments').update({ x_pct: pos.x_pct, y_pct: pos.y_pct }).eq('id', meta.id);
        justDraggedRef.current = true;
      }
      document.body.style.userSelect = '';
      setDraggingId(null);
      setDragPos(null);
      dragMetaRef.current = null;
      dragPosRef.current = null;
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      document.body.style.userSelect = '';
    };
  }, [draggingId, overlayHeight]);

  const handlePinMouseDown = (e, pinId, x_pct, y_pct) => {
    e.stopPropagation();
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    dragMetaRef.current = {
      id: pinId,
      offsetX_px: e.clientX - (x_pct / 100) * window.innerWidth,
      offsetY_px: e.pageY - (y_pct / 100) * overlayHeight,
    };
    dragPosRef.current = { x_pct, y_pct };
    setOpenPinId(null);
    setDraggingId(pinId);
  };

  const handleOverlayClick = (e) => {
    if (justDraggedRef.current) { justDraggedRef.current = false; return; }
    setOpenPinId(null);
    if (mode !== 'comment' || draft) return;

    const rect = overlayRef.current.getBoundingClientRect();
    const x_pct = ((e.clientX - rect.left) / rect.width) * 100;
    const y_pct = ((e.clientY - rect.top) / rect.height) * 100;

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

  return createPortal(
    <>
      <div
        ref={overlayRef}
        style={overlayStyle(mode)}
        onClick={handleOverlayClick}
      >
        {PRESET_PINS.map((pin) => (
          <div key={pin.id} style={pinWrapperStyle(pin.x_pct, pin.y_pct)}>
            <button
              type="button"
              aria-label="Comment pin"
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

        {comments.map((pin) => {
          const isDragging = pin.id === draggingId;
          const pos = isDragging && dragPos ? dragPos : { x_pct: pin.x_pct, y_pct: pin.y_pct };
          return (
            <div
              key={pin.id}
              style={{ ...pinWrapperStyle(pos.x_pct, pos.y_pct), cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              <button
                type="button"
                aria-label="Comment pin"
                style={{ ...markerStyle(VISITOR_COLOR), cursor: isDragging ? 'grabbing' : 'grab' }}
                onMouseDown={(e) => handlePinMouseDown(e, pin.id, pin.x_pct, pin.y_pct)}
                onClick={(e) => {
                  e.stopPropagation();
                  const start = dragStartRef.current;
                  const moved = start && (Math.abs(e.clientX - start.x) > 5 || Math.abs(e.clientY - start.y) > 5);
                  if (!moved) togglePin(pin.id);
                }}
              />
              {openPinId === pin.id && !isDragging && (
                <div style={noteStyle} onClick={(e) => e.stopPropagation()}>
                  <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{pin.author || 'Anonymous'}</p>
                  <p>{pin.body}</p>
                </div>
              )}
            </div>
          );
        })}

        {Object.entries(cursors).map(([id, cursor]) => (
          <div key={id} style={cursorStyle(cursor.x_pct, cursor.y_pct, cursor.color)}>
            <MousePointer2 size={20} fill={cursor.color} fillOpacity={0.25} />
          </div>
        ))}

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
          style={toolbarButtonStyle(mode === 'comment')}
          onClick={() => setMode('comment')}
        >
          <MessageCircle size={18} />
        </button>
      </div>
    </>,
    document.body
  );
}
