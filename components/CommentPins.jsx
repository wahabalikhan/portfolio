'use client';

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MousePointer2, MessageCircle, Trash2, LogOut, Eye, EyeOff, X, Pencil, GripHorizontal, Heart, Check } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

const VISITOR_COLORS = ['#EF4444', '#F97316', '#EAB308', '#22C55E', '#3B82F6', '#6366F1', '#8B5CF6'];
const CURSOR_COLORS = ['#F97316', '#3B82F6', '#EC4899', '#FACC15', '#14B8A6', '#8B5CF6', '#EF4444', '#06B6D4'];


// Fixed y-coordinate denominator. Must not change across tabs or screen sizes.
// scrollHeight was rejected because it varies per tab (Design: ~3678, Development: ~1975, Just for fun: ~1846),
// causing comments to jump when switching tabs. 4000 exceeds the tallest tab's height on any screen.
const Y_REFERENCE_HEIGHT = 4000;

// x is measured against a centred column at most this wide (the original 768px content
// column), so pins keep their place on screen now that page containers are wider
// (850px).
const COMMENT_COLUMN_WIDTH = 768;

// Where a comment is stored (x_pct, y_pct): relative to the page layout, so a pin stays next
// to the same thing at any window width.
//   x_pct    0 … 100   inside the text column (the container, inside its padding): a
//                      fraction of the column's width
//   x_pct    0 … -100  left of the column: a fraction of the way from the column's edge to
//                      the window's left edge (so it never slides into the content)
//   x_pct  100 … 200   right of the column: the same, towards the window's right edge
//   y_pct              page pixels over Y_REFERENCE_HEIGHT. The column is the same 770px
//                      wide at every width from 850px up, so the page lays out the same and
//                      a height stays next to the same thing.
// g = { textLeft, textRight, viewW } (page pixels; the page never scrolls sideways).
const toPagePx = (x_pct, y_pct, g) => {
  const x = Math.max(-100, Math.min(200, x_pct));
  let left;
  if (x < 0) left = g.textLeft * (1 + x / 100);
  else if (x > 100) left = g.textRight + ((x - 100) / 100) * (g.viewW - g.textRight);
  else left = g.textLeft + (x / 100) * (g.textRight - g.textLeft);
  return { left, top: (y_pct / 100) * Y_REFERENCE_HEIGHT };
};
const fromPagePx = (left, top, g) => {
  let x_pct;
  if (left < g.textLeft) x_pct = g.textLeft > 0 ? -100 * (g.textLeft - left) / g.textLeft : 0;
  else if (left > g.textRight) x_pct = g.viewW > g.textRight ? 100 + 100 * (left - g.textRight) / (g.viewW - g.textRight) : 100;
  else x_pct = 100 * (left - g.textLeft) / Math.max(1, g.textRight - g.textLeft);
  return { x_pct, y_pct: (top / Y_REFERENCE_HEIGHT) * 100 };
};

const randomId = () =>
  (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : Math.random().toString(36).slice(2);

const isTouchDevice = () =>
  typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

const visitorColor = (id) => {
  const hash = String(id).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return VISITOR_COLORS[hash % VISITOR_COLORS.length];
};

const ROTATIONS = [0, 2, -3, 0, 3, -2, 4, 0, -4, 2, -3, 3];
const cardRotation = (id) => {
  const hash = String(id).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return ROTATIONS[hash % ROTATIONS.length];
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

// The database stores only a SHA-256 hash of a visitor's token (see lib/supabaseClient.js
// and supabase/comment-moderation.sql), so "is this my comment?" compares hashes.
const hashToken = async (token) => {
  try {
    if (!token || !crypto?.subtle) return null;
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
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
const overlayStyle = (mode, height, finePointer) => ({
  position: 'absolute',
  top: 0, left: 0,
  width: '100%',
  height: height > 0 ? `${height}px` : '100%',
  zIndex: 30,
  pointerEvents: mode === 'comment' ? 'auto' : 'none',
  cursor: mode === 'comment' ? (finePointer ? "url('/cursors/add.svg') 5 3, copy" : 'copy') : 'inherit',  // anywhere on the page
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

// ── Keeping pins on the page and clear of controls ──────────────────────────────
const NAV_HEIGHT = 64;   // the fixed top nav bar (4rem)
// Controls a card must never cover. Big block links (whole case-study, repo and blog
// cards) are left out: pins may sit over those, just not over buttons and inline links.
const CONTROL_SELECTOR = 'button, a, input, textarea, select, [role="button"], .hero-accent-word';
const MAX_LINK_AREA = 40000; // px²; anything larger is a block link, not a control

// Collapsed comments are small round pins (like Figma's), opened one at a time.
const PIN_SIZE = 26;                 // the round pin
const PIN_BOX = { w: 34, h: 34 };    // the room it needs, with its reply-count badge
const PIN_GAP = 6;                   // space between pins stacked at the end of the page
const OPEN_CARD_W = 248;             // an open card's width, for choosing the side it opens on
const PREVIEW_W = 240;               // the hover preview's widest

// White or near-black initials, whichever reads better on the pin's colour.
const pinTextColor = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  const L = 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
  return (1.05 / (L + 0.05)) >= ((L + 0.05) / 0.0617) ? '#ffffff' : '#111827';
};

// Page-coordinate rectangles of every visible control on the page (at the current
// layout). Controls in the fixed nav count where they sit at the top of the page; other
// fixed things (comment toolbar, scroll-to-top) float over everything, so they're skipped.
const measureBlockers = () => {
  const root = document.querySelector('.app-root');
  if (!root) return [];
  const out = [];
  root.querySelectorAll(CONTROL_SELECTOR).forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    if (el.tagName === 'A' && r.width * r.height > MAX_LINK_AREA) return;
    const inNav = !!el.closest('.top-nav-bar');
    if (!inNav) {
      for (let p = el; p && p !== root; p = p.parentElement) {
        if (getComputedStyle(p).position === 'fixed') return;
      }
    }
    const top = inNav ? r.top : r.top + window.scrollY;
    out.push({ left: r.left, top, right: r.right, bottom: top + r.height });
  });
  return out;
};

// Pins go anywhere on the page except on buttons and links: a pin dropped on one moves to
// the nearest clear spot, in any direction, just clear of it. bounds keeps it on the page.
const PIN_HIT = 30;      // a pin with its white ring
const PIN_CLEAR = 4;     // the gap kept from a button or link
const pinFree = (x, y, blockers, bounds) =>
  x >= bounds.minX && x <= bounds.maxX && y >= bounds.minY && y <= bounds.maxY &&
  !blockers.some((b) => x - PIN_HIT / 2 < b.right + PIN_CLEAR && x + PIN_HIT / 2 > b.left - PIN_CLEAR &&
    y - PIN_HIT / 2 < b.bottom + PIN_CLEAR && y + PIN_HIT / 2 > b.top - PIN_CLEAR);
const RING = [0, 180, 90, 270, 45, 135, 225, 315, 22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5]
  .map((d) => [Math.cos(d * Math.PI / 180), Math.sin(d * Math.PI / 180)]);
const nearestFreeSpot = (x, y, blockers, bounds) => {
  const cx = Math.max(bounds.minX, Math.min(bounds.maxX, x));
  const cy = Math.max(bounds.minY, Math.min(bounds.maxY, y));
  if (pinFree(cx, cy, blockers, bounds)) return { left: cx, top: cy };
  for (let r = 2; r <= 600; r += 2) {
    for (const [dx, dy] of RING) {
      const px = cx + r * dx, py = cy + r * dy;
      if (pinFree(px, py, blockers, bounds)) return { left: px, top: py };
    }
  }
  return { left: cx, top: cy };
};

// Tells BobbyBuilds HQ how many comments are waiting for approval (comments_waiting).
// The Pages Function counts them and sends the number with the HQ secret key; this only
// nudges it. Fire and forget: it never blocks or breaks commenting.
const pingCommentsWaiting = () => {
  try { fetch('/api/comments-waiting', { method: 'POST', keepalive: true }).catch(() => {}); } catch {}
};

const toolbarStyle = {
  position: 'fixed',
  bottom: '2rem',
  left: 0,
  right: 0,
  margin: '0 auto',
  width: 'fit-content',
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

function ReplyCarousel({ replies, centredIndex, onCycle, likes, onLike, editingId, editBody, onEditBodyChange, onStartEdit, onSaveEdit, onCancelEdit, onDelete, onApprove, isOwner, ownToken }) {
  const containerRef = useRef(null);
  const onCycleRef = useRef(onCycle);
  onCycleRef.current = onCycle;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let lastFire = 0;
    const handler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const now = Date.now();
      if (now - lastFire < 180) return;
      lastFire = now;
      const dir = (e.deltaY || e.deltaX) > 0 ? 1 : -1;
      onCycleRef.current(dir);
    };
    el.addEventListener('wheel', handler, { passive: false });
    return () => el.removeEventListener('wheel', handler);
  }, []);

  return (
    <div
      ref={containerRef}
      className="cc-carousel"
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {replies.map((reply, i) => {
        const offset = i - centredIndex;
        const abs = Math.abs(offset);
        if (abs > 2) return null;

        const absPxMap = [0, 38, 65];
        const offsetPx = offset >= 0 ? absPxMap[abs] : -absPxMap[abs];
        const rotateX = -offset * 28;
        const scale = abs === 0 ? 1 : abs === 1 ? 0.72 : 0.5;
        const opacity = abs === 0 ? 1 : abs === 1 ? 0.7 : 0.35;
        const zIndex = 10 - abs * 2;
        const isCenter = abs === 0;
        const isOwnReply = !!reply.session_token && !!ownToken && reply.session_token === ownToken;
        const canEdit   = isCenter && (isOwner || isOwnReply);
        const canDelete = isCenter && (isOwner || isOwnReply);
        const isEditing = isCenter && editingId === reply.id;
        const replyLikes = likes?.[reply.id] || { count: 0, liked: false };
        const isPending = reply.approved === false;

        return (
          <div
            key={reply.id}
            className={`cc-carousel-item${isCenter ? ' cc-carousel-item-centre' : ''}`}
            style={{ transform: `translateY(${offsetPx}px)`, opacity, zIndex }}
            onClick={isCenter ? undefined : (e) => { e.stopPropagation(); onCycleRef.current(offset > 0 ? 1 : -1); }}
          >
            <div
              className={`cc-carousel-card${isPending ? ' cc-pending' : ''}`}
              style={{ transform: `perspective(600px) rotateX(${rotateX}deg) scale(${scale})` }}
            >
              <div className="cc-carousel-header">
                <span className="cc-dot" style={{ backgroundColor: visitorColor(reply.id) }} />
                <span className="cc-author">{reply.author || 'Anonymous'}</span>
                {isCenter && (
                  <div className="cc-like-row">
                    <span className="cc-like-count">{replyLikes.count || 0}</span>
                    <button
                      type="button"
                      className={`cc-like-btn${replyLikes.liked ? ' cc-like-active' : ''}`}
                      onClick={(e) => onLike(e, reply.id)}
                      aria-label={replyLikes.liked ? 'Unlike' : 'Like'}
                    >
                      <Heart size={12} strokeWidth={2} fill={replyLikes.liked ? 'currentColor' : 'none'} />
                    </button>
                    {!isEditing && canEdit && (
                      <button
                        type="button"
                        className="cc-edit-btn"
                        onClick={(e) => { e.stopPropagation(); onStartEdit(reply.id, reply.body); }}
                        aria-label="Edit reply"
                      >
                        <Pencil size={12} />
                      </button>
                    )}
                    {!isEditing && canDelete && (
                      <button
                        type="button"
                        className="cc-delete"
                        onClick={(e) => { e.stopPropagation(); onDelete(reply.id, reply.session_token); }}
                        aria-label="Delete reply"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                )}
              </div>
              {isEditing ? (
                <div className="cc-edit-form">
                  <textarea
                    value={editBody}
                    onChange={(e) => onEditBodyChange(e.target.value)}
                    rows={3}
                    autoFocus
                    style={{ ...inputStyle, resize: 'vertical', marginBottom: '0.375rem' }}
                  />
                  <div style={{ display: 'flex', gap: '0.375rem', justifyContent: 'flex-end' }}>
                    <button type="button" className="cc-btn-cancel" onClick={(e) => { e.stopPropagation(); onCancelEdit(); }}>Cancel</button>
                    <button
                      type="button"
                      className="cc-btn-save"
                      onClick={(e) => { e.stopPropagation(); onSaveEdit(reply.id, editBody); }}
                      disabled={!editBody.trim()}
                      style={{ opacity: !editBody.trim() ? 0.6 : 1 }}
                    >Save</button>
                  </div>
                </div>
              ) : (
                <p className={`cc-carousel-body${isCenter ? ' cc-carousel-body-full' : ''}`}>{reply.body}</p>
              )}
              {isPending && isCenter && isOwner && !isEditing && (
                <div className="cc-pending-bar">
                  <span className="cc-pending-label">Waiting for approval</span>
                  <button type="button" className="cc-approve-btn" onClick={(e) => { e.stopPropagation(); onApprove(reply.id); }}>
                    <Check size={12} /> Approve
                  </button>
                  <button type="button" className="cc-reject-btn" onClick={(e) => { e.stopPropagation(); onDelete(reply.id, reply.session_token); }}>
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function CommentPins({ page, activeTab }) {
  // contentAnchorRef — zero-height div inside the content container.
  // Its getBoundingClientRect() tells us the content column's left, width,
  // and absolute top position, used for all coordinate conversions.
  const contentAnchorRef   = useRef(null);
  const overlayRef         = useRef(null);
  const channelRef         = useRef(null);
  const modeRef            = useRef('cursor');
  const isOwnerRef         = useRef(false);
  const isFinePointerRef   = useRef(false);
  const activeTabRef       = useRef(activeTab);

  // Drag refs
  const dragMetaRef     = useRef(null);
  const dragPosRef      = useRef(null);
  const dragStartRef    = useRef(null);
  const justDraggedRef  = useRef(false);
  const preDragPosRef   = useRef(null);
  const dbWriteTimerRef = useRef(null);
  const likeInFlight   = useRef({});
  // Page geometry for the drag and click handlers (set each render): stored ⇄ page pixels,
  // and the nearest spot a pin may sit.
  const geoRef         = useRef(null);


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
  // textLeft/textRight: the container's inner edges (inside its padding), in page pixels:
  // where the text column ends and the margins, which hold the pins, begin.
  const [contentMetrics, setContentMetrics] = useState({ left: 0, width: 768, absTop: 0, height: 0, textLeft: 0, textRight: 0 });
  const contentMetricsRef = useRef({ left: 0, width: 768, absTop: 0, height: 0, textLeft: 0, textRight: 0 });

  // Portal root: a div appended to document.body that hosts the full-page overlay.
  const [portalRoot, setPortalRoot] = useState(null);
  const [mode, setMode]           = useState('cursor');
  const [comments, setComments]   = useState([]);
  const [draft, setDraft]         = useState(null);
  const [draftAuthor, setDraftAuthor] = useState('');
  const [draftBody, setDraftBody] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [saving, setSaving]       = useState(false);
  // Read from localStorage after mounting, so the server and the browser's first render
  // agree (reading it during render caused a hydration mismatch).
  const [hidden, setHidden]       = useState(false);
  const [overlayHeight, setOverlayHeight] = useState(() =>
    typeof window !== 'undefined' ? document.documentElement.scrollHeight : 0
  );
  const [cursors, setCursors]     = useState({});
  const [viewerCount, setViewerCount] = useState(0);
  // null until mounted: the server can't know the screen width, so the first render
  // matches the server's (desktop markup) and a layout effect settles it before paint.
  // Nothing loads or connects until it's known to be false.
  const [isMobile, setIsMobile]   = useState(null);
  // "Thanks, it'll show once approved" note after a visitor posts or edits.
  const [notice, setNotice]       = useState(null);
  const noticeTimerRef            = useRef(null);
  // Page height and control rectangles, for keeping pins on the page and off controls.
  const [pageHeight, setPageHeight] = useState(0);
  const [blockers, setBlockers]     = useState([]);
  // True only for the one owner account (the database's is_comments_owner(), by user ID);
  // any other signed-in account is treated as a visitor.
  const [isOwner, setIsOwner]         = useState(false);
  // Hash of this browser's comment token: matches session_token on its own comments.
  const [ownTokenHash, setOwnTokenHash] = useState(null);
  const [likes, setLikes]             = useState({});
  const [replyingToId, setReplyingToId] = useState(null);
  const [openCarouselId, setOpenCarouselId] = useState(null);
  const [centredReplyIndex, setCentredReplyIndex] = useState(0);
  const [replyAuthor, setReplyAuthor]   = useState('');
  const [replyBody, setReplyBody]       = useState('');
  const [replySaving, setReplySaving]   = useState(false);
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

  const [mobileToastVisible, setMobileToastVisible] = useState(false);
  const [mobileToastFading,  setMobileToastFading]  = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editBody,  setEditBody]  = useState('');


  const displayNameRef = useRef(''); // synced to getDisplayName(isOwner) on every render

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

  // Create the portal root div and append it to body.
  useEffect(() => {
    const div = document.createElement('div');
    div.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:0;overflow:visible;pointer-events:none;';
    document.body.appendChild(div);
    setPortalRoot(div);
    return () => { document.body.removeChild(div); };
  }, []);

  // Scroll-sync: translateY on the overlay keeps visitor comments page-anchored.
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
    const el = contentAnchorRef.current?.parentElement;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    const newWidth  = Math.min(rect.width, COMMENT_COLUMN_WIDTH);
    const newAbsTop = contentAnchorRef.current.getBoundingClientRect().top + window.scrollY;
    const newHeight = rect.height;
    // Derive contentLeft from window.innerWidth instead of rect.left.
    // getBoundingClientRect().left differs between browsers (Chrome vs Safari) due to
    // scrollbar-width handling. For a centred max-width container this is always correct.
    const newLeft = (window.innerWidth - newWidth) / 2;
    const cs = getComputedStyle(el);
    const textLeft  = rect.left + parseFloat(cs.paddingLeft);
    const textRight = rect.right - parseFloat(cs.paddingRight);
    const r = Math.round;
    setContentMetrics(prev => {
      if (r(prev.left) === r(newLeft) && r(prev.width) === r(newWidth) && r(prev.absTop) === r(newAbsTop) && r(prev.height) === r(newHeight)
        && r(prev.textLeft) === r(textLeft) && r(prev.textRight) === r(textRight)) return prev;
      return { left: newLeft, width: newWidth, absTop: newAbsTop, height: newHeight, textLeft, textRight };
    });
    contentMetricsRef.current = { left: newLeft, width: newWidth, absTop: newAbsTop, height: newHeight, textLeft, textRight };
    measureLayout();
  };

  // Page height and control rectangles (see nearestFreeSpot). Only updates state when
  // something actually moved, so it's safe to call on every resize.
  const measureLayout = () => {
    const h = document.documentElement.scrollHeight;
    setPageHeight(prev => (Math.abs(prev - h) < 1 ? prev : h));
    const next = measureBlockers();
    setBlockers(prev => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next));
  };

  useLayoutEffect(() => { updateContentMetrics(); }, []);

  // Re-measure after a tab switch, and again once the fade-in animations have settled
  // (they move things by a few pixels while they run).
  useEffect(() => {
    if (isMobile !== false) return;
    const timers = [0, 900, 2500].map(ms => setTimeout(measureLayout, ms));
    return () => timers.forEach(clearTimeout);
  }, [activeTab, isMobile]);

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

  useLayoutEffect(() => {
    setIsMobile(window.innerWidth <= 767);
    try { setHidden(localStorage.getItem('wahab_comments_hidden') === 'true'); } catch {}
    const onResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // An unsaved draft or open reply closes when the tab changes: the page under it changes.
  useEffect(() => {
    setDraft(null); setDraftAuthor(''); setDraftBody('');
    setReplyingToId(null); setOpenCarouselId(null); setExpandedId(null);
  }, [activeTab]);

  useEffect(() => {
    hashToken(localSessionToken.current).then(setOwnTokenHash);
  }, []);

  // Makes this browser's comment token if it hasn't one yet (it's sent with every request
  // from then on), and keeps its hash current.
  const ensureToken = () => {
    const token = getOrCreateSessionToken();
    if (token && token !== localSessionToken.current) {
      localSessionToken.current = token;
      hashToken(token).then(setOwnTokenHash);
    }
    return token;
  };

  const showNotice = (text) => {
    clearTimeout(noticeTimerRef.current);
    setNotice(text);
    noticeTimerRef.current = setTimeout(() => setNotice(null), 5000);
  };
  useEffect(() => () => clearTimeout(noticeTimerRef.current), []);

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
    isFinePointerRef.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  }, []);

  useEffect(() => {
    // Signed in isn't enough: ask the database whether this account is the owner.
    let current = 0;
    const check = (session) => {
      const run = ++current;
      if (!session) { setIsOwner(false); return; }
      supabase.rpc('is_comments_owner').then(({ data, error }) => {
        if (run === current) setIsOwner(!error && data === true);
      });
    };
    supabase.auth.getSession().then(({ data: { session } }) => check(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => check(session));
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

  useEffect(() => {
    if (isMobile !== false) return;
    supabase.from('comments').select('*').eq('page', page).order('created_at', { ascending: true }).then(({ data, error }) => {
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
        if (data.length > 0) {
          const ids = data.map(c => c.id);
          supabase.from('comment_likes').select('comment_id, session_token').in('comment_id', ids).then(({ data: likesData }) => {
            if (!likesData) return;
            const token = localSessionToken.current;
            const map = {};
            likesData.forEach(({ comment_id, session_token }) => {
              if (!map[comment_id]) map[comment_id] = { count: 0, liked: false };
              map[comment_id].count++;
              if (session_token === token) map[comment_id].liked = true;
            });
            setLikes(map);
          });
        }
      }
    });
  }, [page, isMobile, isOwner]);

  useEffect(() => {
    if (isMobile !== false) return;
    const channel = supabase.channel(`room:${page}`, { config: { broadcast: { self: false }, presence: { key: sessionId } } });
    channel
      .on('broadcast', { event: 'cursor' }, ({ payload }) => {
        if (payload.id === sessionId) return;
        setCursors(prev => ({ ...prev, [payload.id]: payload }));
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
          // Row-level security already keeps unapproved comments from visitors; this is a
          // second guard in case a pending row ever arrives.
          if (row.approved === false && !isOwnerRef.current) return;
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
          // Back in the queue (a visitor edited it): gone for everyone but the owner.
          if (row.approved === false && !isOwnerRef.current) {
            setComments(prev => prev.filter(c => c.id !== row.id));
            return;
          }
          // Just approved: visitors haven't got it yet, so it's added rather than updated.
          setComments(prev => prev.some(c => c.id === row.id)
            ? prev.map(c => c.id === row.id
              ? { ...c, x_pct: row.x_pct, y_pct: row.y_pct, body: row.body, author: row.author, approved: row.approved, tab: row.tab } : c)
            : [...prev, row]);
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
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'comment_likes' }, ({ new: row }) => {
        if (row.session_token === localSessionToken.current) return;
        setLikes(prev => {
          const cur = prev[row.comment_id] || { count: 0, liked: false };
          return { ...prev, [row.comment_id]: { count: cur.count + 1, liked: cur.liked } };
        });
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'comment_likes' }, ({ old: row }) => {
        if (row.session_token === localSessionToken.current) return;
        setLikes(prev => {
          const cur = prev[row.comment_id];
          if (!cur) return prev;
          return { ...prev, [row.comment_id]: { count: Math.max(0, cur.count - 1), liked: cur.liked } };
        });
      })
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
    if (isMobile !== false) return;
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
    if (isMobile !== false) return;
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
        y_pct: (e.pageY / Y_REFERENCE_HEIGHT) * 100,
        color: cursorColor,
        name: displayNameRef.current,
      }});
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [sessionId, cursorColor, isMobile]);

  // An open card closes on a click anywhere else, or on Escape (focus goes back to its pin).
  useEffect(() => {
    if (!expandedId) return;
    const close = (e) => {
      if (e.target.closest?.('[data-pin-id]')) return;
      setExpandedId(null); setReplyingToId(null); setOpenCarouselId(null); setEditingId(null);
    };
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      const id = expandedId;
      setExpandedId(null); setReplyingToId(null); setOpenCarouselId(null); setEditingId(null);
      document.querySelector(`[data-pin-id="${id}"] .cc-pin`)?.focus();
    };
    document.addEventListener('click', close);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('click', close); document.removeEventListener('keydown', onKey); };
  }, [expandedId]);

  useEffect(() => {
    if (!openCarouselId) return;
    const closeCarousel = (e) => {
      if (e.target.closest('.cc-locked-active')) return;
      setOpenCarouselId(null);
    };
    const timer = setTimeout(() => document.addEventListener('click', closeCarousel), 0);
    return () => { clearTimeout(timer); document.removeEventListener('click', closeCarousel); };
  }, [openCarouselId]);

  // Main drag effect.
  // Uses contentMetricsRef for fresh content position values without stale closures.
  useEffect(() => {
    if (!draggingId) return;
    document.body.style.userSelect = 'none';

    let lastUpdate = 0;
    let frame = 0;

    const getXY = (e) => {
      if (e.changedTouches && e.changedTouches.length > 0) {
        return { clientX: e.changedTouches[0].clientX, clientY: e.changedTouches[0].clientY, pageY: e.changedTouches[0].pageY };
      }
      return { clientX: e.clientX, clientY: e.clientY, pageY: e.pageY };
    };

    const onMove = (e) => {
      const meta = dragMetaRef.current;
      if (!meta) return;
      const { clientX, clientY, pageY } = getXY(e);

      const geo = geoRef.current;
      if (!geo) return;
      // The pin goes where the pointer takes it; on a button or link it shows, as it moves,
      // just clear of it. What's shown while dragging is exactly what's saved on drop.
      const spot = geo.place(clientX - meta.offsetX_px, pageY - meta.offsetY_px);
      const { x_pct, y_pct } = geo.fromPx(spot.left, spot.top);
      dragPosRef.current = { x_pct, y_pct };
      // Drawn every frame from the latest position, so the pin on screen is always exactly
      // the spot that will be saved (no throttled frame left behind).
      if (!frame) frame = requestAnimationFrame(() => { frame = 0; if (dragPosRef.current) setDragPos({ ...dragPosRef.current }); });

      const now = performance.now();
      if (now - lastUpdate >= 33) {
        lastUpdate = now;
        if (!meta.isDraft && channelRef.current?.state === 'joined') {
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
        // Where it lands: exactly the spot shown while dragging.
        const landed = pos;
        if (meta.isDraft) {
          setDraft(prev => prev ? { ...prev, x_pct: landed.x_pct, y_pct: landed.y_pct } : null);
          justDraggedRef.current = true;
        } else {
          const finalX = landed.x_pct;
          const finalY = landed.y_pct;
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
            dbWriteTimerRef.current = setTimeout(async () => {
              // The database decides whether this browser may move it (owner, or its author).
              const { error, count } = await supabase.from('comments')
                .update({ x_pct: finalX, y_pct: finalY }, { count: 'exact' }).eq('id', capturedId);
              if ((error || count === 0) && capturedPre) {
                setComments(prev => prev.map(c => c.id === capturedId
                  ? { ...c, x_pct: capturedPre.x_pct, y_pct: capturedPre.y_pct } : c));
                setCardErrors(prev => ({ ...prev, [capturedId]: true }));
                setTimeout(() => setCardErrors(prev => {
                  const n = { ...prev }; delete n[capturedId]; return n;
                }), 3000);
              }
            }, 100);

            justDraggedRef.current = true;
            setExpandedId(prev => (prev === meta.id ? null : prev));
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
      if (meta && !meta.isDraft && preDrag) {
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
      if (frame) cancelAnimationFrame(frame);
      document.body.style.userSelect = '';
    };
  }, [draggingId]);

  // Cancel owner-initiated drag if they log out mid-drag.
  useEffect(() => {
    if (isOwner || !draggingId || draggingId === '__draft__') return;
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

  const startDraftDrag = (e) => {
    if (!draft) return;
    e.stopPropagation();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    const pageY   = e.pageY ?? e.touches?.[0]?.pageY ?? (clientY + window.scrollY);
    const at = geoRef.current.toPx(draft.x_pct, draft.y_pct);
    dragMetaRef.current = {
      id: '__draft__',
      isDraft: true,
      sessionToken: null,
      offsetX_px: clientX - at.left,
      offsetY_px: pageY - at.top,
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
    setEditingId(null);
    // An edited comment goes back to the queue (the database marks it unapproved), so it
    // leaves the page until it's approved again. No broadcast: others shouldn't see it.
    // Through edit_my_comment(): the database checks this browser's token and re-queues it.
    const { data: changed, error } = await supabase.rpc('edit_my_comment', { comment_id: id, new_body: trimmed });
    if (error || changed !== true) { showNotice('Couldn’t save that edit. Please try again in a moment.'); return; }
    setComments(prev => prev.filter(c => c.id !== id && c.parent_id !== id));
    showNotice('Thanks! Your edit will show once Wahab approves it.');
    pingCommentsWaiting();
  };

  const handleToggleLike = async (e, id) => {
    e.stopPropagation();
    if (likeInFlight.current[id]) return;
    const token = ensureToken();
    if (!token) return;
    likeInFlight.current[id] = true;
    const current = likes[id] || { count: 0, liked: false };
    const isLiked = current.liked;
    setLikes(prev => ({
      ...prev,
      [id]: { count: Math.max(0, (prev[id]?.count || 0) + (isLiked ? -1 : 1)), liked: !isLiked },
    }));
    try {
      const { error } = isLiked
        ? await supabase.from('comment_likes').delete().eq('comment_id', id).eq('session_token', token)
        : await supabase.from('comment_likes').insert({ comment_id: id, session_token: token });
      if (error) {
        console.error('[likes] DB error:', error);
        setLikes(prev => ({ ...prev, [id]: current }));
      }
    } finally {
      likeInFlight.current[id] = false;
    }
  };

  const openReply = (e, id) => {
    e.stopPropagation();
    setOpenCarouselId(null);
    setReplyingToId(id);
    setReplyAuthor(getDisplayName(isOwner));
    setReplyBody('');
  };

  // Saves a new comment or reply. New ones are unapproved (the database decides: only the
  // signed-in owner's are approved straight away), so the row isn't read back: a visitor
  // isn't allowed to see it yet. The id is made here so the owner's copy can be shown at once.
  const insertComment = async (fields) => {
    ensureToken(); // the database records its hash as the author's token
    const id = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : undefined;
    const row = { ...(id ? { id } : {}), page, ...fields };
    const { error } = await supabase.from('comments').insert(row);
    if (error) {
      showNotice('Couldn’t save that. Please try again in a moment.');
      return { ok: false };
    }
    if (isOwner) {
      if (id) setComments(prev => prev.some(c => c.id === id) ? prev : [...prev, { ...row, session_token: ownTokenHash, approved: true, created_at: new Date().toISOString() }]);
    } else {
      showNotice(fields.parent_id ? 'Thanks! Your reply will show once Wahab approves it.' : 'Thanks! Your comment will show once Wahab approves it.');
      pingCommentsWaiting();
    }
    return { ok: true, row };
  };

  // Owner only: makes a waiting comment or reply visible to everyone.
  const handleApprove = async (id) => {
    const { error } = await supabase.from('comments').update({ approved: true }).eq('id', id);
    if (error) { showNotice('Couldn’t approve that. Please try again.'); return; }
    setComments(prev => prev.map(c => c.id === id ? { ...c, approved: true } : c));
    pingCommentsWaiting();
  };

  const saveReply = async () => {
    if (!replyBody.trim() || !replyingToId) return;
    setReplySaving(true);
    const enteredName = replyAuthor.trim();
    const parent = comments.find(c => c.id === replyingToId);
    const { ok } = await insertComment({
      x_pct: parent?.x_pct ?? 50,
      y_pct: parent?.y_pct ?? 50,
      author: enteredName || 'Anonymous',
      body: replyBody.trim(),
      parent_id: replyingToId,
      tab: parent?.tab ?? (page === 'home' ? activeTab : null),
    });
    setReplySaving(false);
    if (ok) {
      if (enteredName && enteredName !== 'Anonymous') {
        try { localStorage.setItem('wahab_visitor_name', enteredName); } catch {}
      }
      setReplyingToId(null);
      setReplyAuthor('');
      setReplyBody('');
      setExpandedId(null);
    }
  };

  const startDrag = (e, id, x_pct, y_pct) => {
    if (!isOwner && !localSessionToken.current) return;
    if (e.stopPropagation) e.stopPropagation();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    const pageY   = e.pageY   ?? e.touches?.[0]?.pageY   ?? (clientY + window.scrollY);
    dragStartRef.current  = { x: clientX, y: clientY };
    preDragPosRef.current = { x_pct, y_pct };
    const at = geoRef.current.toPx(x_pct, y_pct);
    dragMetaRef.current = {
      id,
      sessionToken: isOwner ? null : localSessionToken.current,
      offsetX_px: clientX - at.left,
      offsetY_px: pageY - at.top,
    };
    dragPosRef.current = { x_pct, y_pct };
    setDraggingId(id);
  };

  const handleOverlayClick = (e) => {
    if (justDraggedRef.current) { justDraggedRef.current = false; return; }
    closeCard();
    if (mode !== 'comment' || draft) return;
    const geo = geoRef.current;
    if (!geo) return;
    // Anywhere on the page; on a button or link, just clear of it.
    const spot = geo.place(e.clientX, e.pageY);
    setDraft(geo.fromPx(spot.left, spot.top));
    const savedRealName = isOwner ? 'Wahab' : (() => { try { return localStorage.getItem('wahab_visitor_name') || ''; } catch { return ''; } })();
    setDraftAuthor(savedRealName); setDraftBody('');
  };

  const cancelDraft = () => { setDraft(null); setDraftAuthor(''); setDraftBody(''); };

  const saveDraft = async () => {
    if (!draftBody.trim() || !draft) return;
    setSaving(true);
    const enteredName = draftAuthor.trim();
    const { ok, row } = await insertComment({
      x_pct: draft.x_pct, y_pct: draft.y_pct,
      author: enteredName || 'Anonymous', body: draftBody.trim(),
      // The home-page tab it was left on, recorded for reference (not used to hide it).
      tab: page === 'home' ? activeTab : null,
    });
    setSaving(false);
    if (ok) {
      if (row.id) setCommentPosCache(prev => {
        if (prev[row.id]) return prev;
        const n = { ...prev, [row.id]: { x_pct: row.x_pct, y_pct: row.y_pct } };
        try { localStorage.setItem(`cc-pos-${page}`, JSON.stringify(n)); } catch {}
        return n;
      });
      if (enteredName && enteredName !== 'Anonymous') {
        try { localStorage.setItem('wahab_visitor_name', enteredName); } catch {}
      }
      // The new comment opens as a full card straight away. (Only the owner's shows at
      // once: a visitor's waits for approval, and they see a note saying so.)
      if (isOwner && row.id) setExpandedId(row.id);
    }
    cancelDraft();
  };

  const handleDelete = async (id) => {
    console.log('[DEL:admin] 1. start — id:', id);
    const card = comments.find(c => c.id === id);
    const savedPos = commentPosCache[id];
    console.log('[DEL:admin] 2. card found:', !!card, '| savedPos:', savedPos);
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
    console.log('[DEL:admin] 3. sending supabase DELETE — table: comments, filter: id =', id);
    const response = await supabase.from('comments').delete().eq('id', id).select();
    console.log('[DEL:admin] 4. raw supabase response:', JSON.stringify(response));
    const { data, error } = response;
    const deleted = !error && data && data.length > 0;
    console.log('[DEL:admin] 5. deleted?', deleted, '| error:', error, '| data:', data);
    if (!deleted) {
      console.error('[DEL:admin] 6. ROLLBACK branch — error:', error ?? 'no rows deleted');
      if (card) setComments(prev => {
        const next = prev.some(c => c.id === id) ? prev : [...prev, card];
        console.log('[DEL:admin] 7. comments after rollback (count):', next.length);
        return next;
      });
      if (savedPos) setCommentPosCache(prev => {
        const n = { ...prev, [id]: savedPos };
        try { localStorage.setItem(`cc-pos-${page}`, JSON.stringify(n)); } catch {}
        console.log('[DEL:admin] 8. commentPosCache after rollback — restored id:', id);
        return n;
      });
    } else {
      console.log('[DEL:admin] 6. SUCCESS branch — broadcasting card_delete');
      if (ch?.state === 'joined') ch.send({ type: 'broadcast', event: 'card_delete', payload: { id } });
      if (card?.approved === false) pingCommentsWaiting();
      console.log('[DEL:admin] 7. comments remaining (count):', comments.filter(c => c.id !== id).length);
    }
  };

  const handleVisitorDelete = async (id) => {
    console.log('[DEL:visitor] 1. start — id:', id);
    const card = comments.find(c => c.id === id);
    if (!card) { console.warn('[DEL:visitor] card not found in state, aborting'); return; }
    const savedPos = commentPosCache[id];
    console.log('[DEL:visitor] 2. card found:', !!card, '| savedPos:', savedPos);
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
    console.log('[DEL:visitor] 3. sending supabase DELETE — table: comments, filter: id =', id);
    // The database only lets the author's browser (by its token) delete it.
    const response = await supabase.from('comments').delete().eq('id', id).select();
    console.log('[DEL:visitor] 4. raw supabase response:', JSON.stringify(response));
    const { data, error } = response;
    const deleted = !error && data && data.length > 0;
    console.log('[DEL:visitor] 5. deleted?', deleted, '| error:', error, '| data:', data);
    if (!deleted) {
      console.error('[DEL:visitor] 6. ROLLBACK branch — error:', error ?? 'no rows deleted');
      setComments(prev => {
        const next = prev.some(c => c.id === id) ? prev : [...prev, card];
        console.log('[DEL:visitor] 7. comments after rollback (count):', next.length);
        return next;
      });
      if (savedPos) setCommentPosCache(prev => {
        const n = { ...prev, [id]: savedPos };
        try { localStorage.setItem(`cc-pos-${page}`, JSON.stringify(n)); } catch {}
        console.log('[DEL:visitor] 8. commentPosCache after rollback — restored id:', id);
        return n;
      });
      setCardErrors(prev => ({ ...prev, [id]: true }));
      setTimeout(() => setCardErrors(prev => { const n = { ...prev }; delete n[id]; return n; }), 3000);
    } else {
      console.log('[DEL:visitor] 6. SUCCESS branch — broadcasting card_delete');
      if (ch?.state === 'joined') ch.send({ type: 'broadcast', event: 'card_delete', payload: { id } });
      console.log('[DEL:visitor] 7. comments remaining (count):', comments.filter(c => c.id !== id).length);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPw });
    if (error) { setLoginError(error.message); }
    else { setShowLogin(false); setLoginError(''); setLoginEmail(''); setLoginPw(''); }
  };

  // Opening and closing a comment. Only one card is open at a time; closing it also closes
  // its reply form, reply list and edit form.
  const closeCard = () => {
    setExpandedId(null); setReplyingToId(null); setOpenCarouselId(null); setEditingId(null);
  };
  const onPinClick = (e, id) => {
    e.stopPropagation();
    // A drag that moved isn't a click. (Enter or Space on the pin is: e.detail is 0.)
    const start = dragStartRef.current;
    dragStartRef.current = null;
    if (start && e.detail > 0 && (Math.abs(e.clientX - start.x) > 5 || Math.abs(e.clientY - start.y) > 5)) return;
    if (expandedId === id) { closeCard(); return; }
    setReplyingToId(null); setOpenCarouselId(null); setEditingId(null);
    setExpandedId(id);
  };

  const { left: cLeft, width: cWidth, absTop: cAbsTop, height: cHeight, textLeft, textRight } = contentMetrics;

  // Which pins show: every comment on the page, whichever home-page tab is open (each pin
  // is kept on the page and off controls, so a shorter tab can't hide one); unapproved ones
  // only for the owner. The tab a comment was left on is stored but not used to hide it.
  const isVisibleTo = (c) => c.approved !== false || isOwner;

  // Where each pin is drawn: exactly at its stored spot (see toPagePx), anywhere on the
  // page, inside or outside the container, over text and images. The only exceptions:
  //  - on a button or link (the layout moved one under it): just clear of it;
  //  - stored past the end of the page (left on a longer tab): at the end, and if several
  //    are, stacked upwards so they don't sit on each other.
  // Stored spots are never rewritten by this, so a pin moves back if the layout frees up.
  const viewW = typeof document !== 'undefined' ? document.documentElement.clientWidth : 0;
  const geo = { textLeft, textRight, viewW };
  const pinBounds = {
    minX: PIN_SIZE / 2 + 4, maxX: Math.max(PIN_SIZE / 2 + 4, viewW - PIN_SIZE / 2 - 4),
    minY: NAV_HEIGHT + PIN_SIZE / 2 + 4, maxY: Math.max(NAV_HEIGHT + PIN_SIZE / 2 + 4, pageHeight - PIN_SIZE / 2 - 4),
  };
  const ready = pageHeight > 0 && textRight > textLeft && viewW > 0;
  const toPx = (x_pct, y_pct) => toPagePx(x_pct, y_pct, geo);
  const fromPx = (left, top) => fromPagePx(left, top, geo);
  const place = (left, top) => nearestFreeSpot(left, top, blockers, pinBounds);
  const sideOf = (left) => (left < textLeft ? 'left' : left > textRight ? 'right' : null);
  geoRef.current = ready ? { toPx, fromPx, place } : null;

  const pinLayout = {};
  if (ready && !hidden) {
    const want = comments.filter(c => !c.parent_id && isVisibleTo(c)).map((c) => {
      const cached = commentPosCache[c.id];
      return { id: c.id, ...toPx(cached ? cached.x_pct : c.x_pct, cached ? cached.y_pct : c.y_pct) };
    });
    const pastEnd = want.filter((p) => p.top > pinBounds.maxY).sort((p, q) => p.top - q.top);
    pastEnd.forEach((p, i) => { p.top = pinBounds.maxY - (pastEnd.length - 1 - i) * (PIN_BOX.h + PIN_GAP); });
    want.forEach((p) => {
      const spot = place(p.left, p.top);
      pinLayout[p.id] = { ...spot, side: sideOf(spot.left) };
    });
  }

  // Which side a pin's preview or open card goes: outwards, into the margin, when it fits
  // there; otherwise towards the text (it only covers it while it's open).
  const sideFor = (pos, width) => {
    const half = PIN_SIZE / 2 + 10;
    const fitsLeft = pos.left - half >= width + 8;
    const fitsRight = viewW - pos.left - half >= width + 8;
    if (pos.side === 'left') return fitsLeft ? 'left' : 'right';
    if (pos.side === 'right') return fitsRight ? 'right' : 'left';
    return fitsRight ? 'right' : 'left';
  };

  const renderCard = (id, author, body, color, x_pct, y_pct, isDragging, sessionToken, isPending) => {
    const remoteMove = remoteCardMoves[id];
    const isRemotelyMoving = !isDragging && !!remoteMove;
    const isExpanded     = expandedId === id;   // its full card is open
    const isLockedActive = id === replyingToId || id === openCarouselId;
    const isOwnCard  = !!sessionToken && !!ownTokenHash && sessionToken === ownTokenHash;
    const canDrag    = isOwner || isOwnCard;
    const canDelete  = isOwner || isOwnCard;
    const canEdit    = isOwner || isOwnCard;

    // While it's dragged here, the pin is drawn where it will land (dragPos is already the
    // allowed spot); moved by the owner elsewhere, it follows their position. Otherwise
    // it's at its laid-out place, and a drag starts from there.
    const here = pinLayout[id] || { ...toPx(x_pct, y_pct), side: null };
    const drawn = fromPx(here.left, here.top);
    const moving = (isDragging && dragPos) ? dragPos : (isRemotelyMoving ? remoteMove : null);
    const movingPx = moving && toPx(moving.x_pct, moving.y_pct);
    const pos = moving ? { ...movingPx, side: sideOf(movingPx.left) } : here;
    const showCard = isExpanded && !moving;
    const cardSide = sideFor(pos, OPEN_CARD_W);
    const previewSide = sideFor(pos, PREVIEW_W);
    // Near the end of the page an open card grows upwards, so it can always be read.
    const opensUp = pageHeight > 0 && pos.top > pageHeight - 280;

    const replies = comments
      .filter(c => c.parent_id === id && isVisibleTo(c))
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    const replyCount = replies.length;
    const initial = (author.trim()[0] || 'A').toUpperCase();
    const pinLabel = `Comment by ${author}: ${truncate(body, 12)}`
      + (replyCount ? `, ${replyCount === 1 ? '1 reply' : `${replyCount} replies`}` : '')
      + (isPending ? ', waiting for approval' : '');

    const wrapperStyle = {
      position: 'absolute',
      left: `${pos.left}px`,
      top: `${pos.top}px`,
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'auto',
      zIndex: showCard ? 1001 : 31,
      ...(isDragging ? { willChange: 'left, top' } : {}),
      ...(isRemotelyMoving ? { transition: 'left 0.05s linear, top 0.05s linear' } : {}),
    };
    const grabCursor = canDrag
      ? (isDragging ? (isFinePointerRef.current ? "url('/cursors/grab.svg') 32 26, grabbing" : 'grabbing') : (isFinePointerRef.current ? "url('/cursors/hover.svg') 32 18, grab" : 'grab'))
      : 'pointer';

    const cardClass = ['cc-card', 'cc-card-expanded', isPending ? 'cc-pending' : ''].filter(Boolean).join(' ');

    return (
      <div
        key={id}
        data-pin-id={id}
        className={`cc-pin-wrap cc-pin-side-${pos.side || 'none'}${showCard ? ' cc-pin-open' : ''}${isLockedActive ? ' cc-locked-active' : ''}${canDrag ? ' cc-can-drag' : ''}`}
        style={wrapperStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={`cc-pin${isPending ? ' cc-pin-pending' : ''}${isRemotelyMoving ? ' cc-pin-remote-moving' : ''}`}
          style={{ backgroundColor: color, color: pinTextColor(color), cursor: grabCursor }}
          aria-label={pinLabel}
          aria-expanded={showCard}
          onMouseDown={canDrag ? (e) => { if (e.button === 0) startDrag(e, id, drawn.x_pct, drawn.y_pct); } : undefined}
          onTouchStart={canDrag ? (e) => startDrag(e, id, drawn.x_pct, drawn.y_pct) : undefined}
          onClick={(e) => onPinClick(e, id)}
        >
          <span aria-hidden="true">{initial}</span>
          {replyCount > 0 && <span className="cc-pin-count" aria-hidden="true">{replyCount}</span>}
        </button>
        {!showCard && !moving && (
          <span className={`cc-pin-preview cc-pin-preview-${previewSide}`} aria-hidden="true">
            <span className="cc-pin-preview-author">{author}</span> {truncate(body, 9)}
          </span>
        )}
        {showCard && (
          <div className={`cc-pin-card cc-pin-card-${cardSide}${opensUp ? ' cc-pin-card-up' : ''}`}>
            <div className={cardClass}>
          <div className="cc-header">
            <span className="cc-dot" style={{ backgroundColor: color }} />
            <span className="cc-author">{author}</span>
            <span className={`cc-preview${isExpanded ? ' cc-preview-hidden' : ''}`}>{truncate(body)}</span>
            <div className="cc-like-row">
              <span className="cc-like-count">{likes[id]?.count || 0}</span>
              <button
                type="button"
                className={`cc-like-btn${likes[id]?.liked ? ' cc-like-active' : ''}`}
                onClick={(e) => handleToggleLike(e, id)}
                aria-label={likes[id]?.liked ? 'Unlike' : 'Like'}
              >
                <Heart size={12} strokeWidth={2} fill={likes[id]?.liked ? 'currentColor' : 'none'} />
              </button>
              {editingId !== id && canEdit && isExpanded && (
                <button
                  type="button"
                  className="cc-edit-btn"
                  onClick={(e) => { e.stopPropagation(); setEditBody(body); setEditingId(id); }}
                  aria-label="Edit comment"
                >
                  <Pencil size={12} />
                </button>
              )}
              {editingId !== id && canDelete && isExpanded && (
                <button
                  type="button"
                  className="cc-delete"
                  onClick={(e) => { e.stopPropagation(); isOwner ? handleDelete(id) : handleVisitorDelete(id); }}
                  aria-label="Delete comment"
                >
                  <Trash2 size={12} />
                </button>
              )}
              {editingId !== id && isExpanded && (
                <button
                  type="button"
                  className="cc-reply-btn"
                  onClick={(e) => openReply(e, id)}
                  aria-label="Reply"
                >
                  <MessageCircle size={12} />
                </button>
              )}
            </div>
          </div>
          {editingId === id ? (
            <div className="cc-edit-form">
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
        {isPending && isOwner && editingId !== id && (
          <div className="cc-pending-bar" onClick={(e) => e.stopPropagation()}>
            <span className="cc-pending-label">Waiting for approval</span>
            <button type="button" className="cc-approve-btn" onClick={(e) => { e.stopPropagation(); handleApprove(id); }}>
              <Check size={12} /> Approve
            </button>
            <button type="button" className="cc-reject-btn" onClick={(e) => { e.stopPropagation(); handleDelete(id); }}>
              <Trash2 size={12} /> Delete
            </button>
          </div>
        )}
        {id === replyingToId && (
          <div
            style={{ position: 'absolute', top: '100%', left: 0, marginTop: '26px', width: '100%', zIndex: 1 }}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cc-card cc-draft" style={{ width: '100%', minWidth: 0, maxWidth: 'none', boxSizing: 'border-box' }}>
              <input
                type="text"
                placeholder="Your name (or leave anonymous)"
                value={replyAuthor}
                onChange={(e) => setReplyAuthor(e.target.value)}
                style={inputStyle}
              />
              <textarea
                placeholder="Write a reply…"
                value={replyBody}
                onChange={(e) => setReplyBody(e.target.value)}
                rows={3}
                autoFocus
                style={{ ...inputStyle, resize: 'vertical', marginBottom: '0.625rem' }}
              />
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                <button type="button" className="cc-btn-cancel" onClick={(e) => { e.stopPropagation(); setReplyingToId(null); setExpandedId(null); }}>Cancel</button>
                <button
                  type="button"
                  className="cc-btn-save"
                  onClick={(e) => { e.stopPropagation(); saveReply(); }}
                  disabled={replySaving || !replyBody.trim()}
                  style={{ opacity: replySaving || !replyBody.trim() ? 0.6 : 1 }}
                >{replySaving ? 'Saving…' : 'Reply'}</button>
              </div>
            </div>
          </div>
        )}
        {(() => {
          const replies = comments
            .filter(c => c.parent_id === id && isVisibleTo(c))
            .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
          if (replies.length === 0) return null;
          const isOpen = openCarouselId === id;
          const safeIndex = Math.min(centredReplyIndex, replies.length - 1);
          return (
            <>
              <button
                type="button"
                className={`cc-reply-count${isOpen ? ' cc-reply-count-open' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (replyingToId === id) return;
                  if (isOpen) {
                    setOpenCarouselId(null);
                  } else {
                    setOpenCarouselId(id);
                    setCentredReplyIndex(0);
                    setExpandedId(id);
                  }
                }}
              >
                {replies.length === 1 ? '1 reply' : `${replies.length} replies`}
                {(() => {
                  const waiting = replies.filter(r => r.approved === false).length;
                  return waiting > 0 ? <span className="cc-pending-count"> · {waiting} waiting</span> : null;
                })()}
              </button>
              {isOpen && (
                <ReplyCarousel
                  replies={replies}
                  centredIndex={safeIndex}
                  onCycle={(dir) => setCentredReplyIndex(prev => Math.max(0, Math.min(prev + dir, replies.length - 1)))}
                  likes={likes}
                  onLike={handleToggleLike}
                  editingId={editingId}
                  editBody={editBody}
                  onEditBodyChange={setEditBody}
                  onStartEdit={(rid, body) => { setEditBody(body); setEditingId(rid); }}
                  onSaveEdit={(rid) => isOwner ? handleEdit(rid, editBody) : handleVisitorEdit(rid, editBody)}
                  onCancelEdit={() => setEditingId(null)}
                  onDelete={(rid) => isOwner ? handleDelete(rid) : handleVisitorDelete(rid)}
                  onApprove={handleApprove}
                  isOwner={isOwner}
                  ownToken={ownTokenHash}
                />
              )}
            </>
          );
        })()}
            </div>
          </div>
        )}
      </div>
    );
  };

  const overlay = (
    <div
      ref={overlayRef}
      style={overlayStyle(mode, overlayHeight, isFinePointerRef.current)}
      onClick={handleOverlayClick}
      data-locked={!!replyingToId || undefined}
    >
      {!hidden && comments.filter(c => !c.parent_id && isVisibleTo(c)).map((pin, i) => {
        const cached = commentPosCache[pin.id];
        const x = cached ? cached.x_pct : pin.x_pct;
        const y = cached ? cached.y_pct : pin.y_pct;
        return renderCard(pin.id, pin.author || 'Anonymous', pin.body, visitorColor(pin.id), x, y, pin.id === draggingId, pin.session_token, pin.approved === false);
      })}

      {Object.entries(cursors).map(([id, c]) => (
        <div key={id} style={cursorStyle(c.x_pct, c.y_pct, c.color, cLeft, cWidth, 0, Y_REFERENCE_HEIGHT)}>
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

      {draft && !hidden && ready && (() => {
        // A new comment: a pin where it will be saved, with the form beside it (like an
        // open comment). Its handle moves it, with the same rules as dragging a pin.
        const at = (draggingId === '__draft__' && dragPos) ? dragPos : draft;
        const px = toPx(at.x_pct, at.y_pct);
        const dpos = { ...px, side: sideOf(px.left) };
        return (
        <div
          className={`cc-pin-wrap cc-pin-open cc-pin-side-${dpos.side || 'none'}`}
          data-draft-pin=""
          style={{ position: 'absolute', left: `${px.left}px`, top: `${px.top}px`, transform: 'translate(-50%, -50%)', pointerEvents: 'auto', zIndex: 1002 }}
          onClick={(e) => e.stopPropagation()}
        >
          <span className="cc-pin cc-pin-draft" aria-hidden="true">+</span>
          <div className={`cc-pin-card cc-pin-card-${sideFor(dpos, OPEN_CARD_W)}${pageHeight > 0 && px.top > pageHeight - 280 ? ' cc-pin-card-up' : ''}`}>
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
        </div>
        );
      })()}

    </div>
  );

  const dismissToast = () => {
    setMobileToastFading(true);
    setTimeout(() => { setMobileToastFading(false); setMobileToastVisible(false); }, 200);
  };

  if (isMobile === true) {
    return mobileToastVisible ? (
      <div className={`mobile-toast${mobileToastFading ? ' mobile-toast-out' : ''}`}>
        <span>✨ More fun on desktop: drop comments and see who else is here.</span>
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

      {/* After a visitor posts or edits: it's waiting for approval. */}
      <div className="cc-notice-region" role="status" aria-live="polite">
        {notice && <div className="cc-notice">{notice}</div>}
      </div>

      {/* Toolbar */}
      <div style={toolbarStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0 0.625rem', fontSize: '0.75rem', fontWeight: 500, color: '#374151', whiteSpace: 'nowrap' }}>
          <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', backgroundColor: '#22c55e' }} />
          {viewerCount} viewing
        </div>
        {isOwner && (() => {
          // Waiting comments on this page (they show in place on every tab).
          const waiting = comments.filter(c => c.approved === false);
          if (waiting.length === 0) return null;
          return (
            <>
              <div style={toolbarDivider} />
              <div className="ftip-wrap">
                <span className="cc-toolbar-waiting">{waiting.length} waiting</span>
                <div className="ftip">Waiting for approval</div>
              </div>
            </>
          );
        })()}
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
              window.dispatchEvent(new CustomEvent('wahab:comments:hidden:change', { detail: next }));
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
            position: 'fixed', bottom: '5rem', left: 0, right: 0, margin: '0 auto',
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
