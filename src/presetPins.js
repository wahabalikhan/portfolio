import { supabase } from './lib/supabaseClient.js'

const PRESET_COLOR = '#7F77DD'

const PRESET_PINS = [
  { id: 'preset-1', x_pct: 72, y_pct: 14, body: 'took about 3 attempts to get this headline right 😅' },
  { id: 'preset-2', x_pct: 12, y_pct: 60, body: 'built this portfolio at 2am. Claude Code did not judge me 🤝' },
  { id: 'preset-3', x_pct: 15, y_pct: 35, body: 'yes I did time it with a stopwatch 👀 36.1% is very real', tabs: ['Design'] },
  { id: 'preset-4', x_pct: 74, y_pct: 48, body: 'this one kept me up at night. in a good way 🌙', tabs: ['Design'] },
  { id: 'preset-5', x_pct: 76, y_pct: 72, body: "if you've scrolled this far... you should probably just hire me 👋", tabs: ['Design'] },
]

const DEFAULT_ANNOTATION = { x_pct: 15, y_pct: 76 }

const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi)
const clampX = (v) => clamp(v, 12, 92)
const clampY = (v) => clamp(v, 5, 92)

const toLeft = (x_pct) => `${(clampX(x_pct) / 100) * window.innerWidth}px`
const toTop  = (y_pct) => `${(clampY(y_pct) / 100) * window.innerHeight}px`

const cardRotation = (id) => {
  const hash = String(id).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return (hash % 7) - 3
}

const truncate = (text, words = 7) => {
  const parts = text.trim().split(/\s+/)
  if (parts.length <= words) return text
  return parts.slice(0, words).join(' ') + '…'
}

// Container: position:fixed so it never moves regardless of page scroll or any CSS transform
// on ancestor elements. Direct children use position:absolute within this fixed viewport frame.
const container = document.createElement('div')
container.id = 'preset-pins-container'
container.style.cssText = [
  'position:fixed',
  'top:0',
  'left:0',
  'width:100vw',
  'height:100vh',
  'pointer-events:none',
  'z-index:35',
  'overflow:visible',
].join(';')
document.body.appendChild(container)

function createPinEl(pin) {
  const deg = cardRotation(pin.id)

  const wrapper = document.createElement('div')
  wrapper.id = 'pp-' + pin.id
  wrapper.style.cssText = [
    'position:absolute',
    `left:${toLeft(pin.x_pct)}`,
    `top:${toTop(pin.y_pct)}`,
    `transform:translate(-50%,-50%) rotate(${deg}deg)`,
    'pointer-events:auto',
    'z-index:31',
    'cursor:default',
  ].join(';')

  const card = document.createElement('div')
  card.className = 'cc-card'
  card.innerHTML = `
    <div class="cc-header">
      <span class="cc-dot" style="background-color:${PRESET_COLOR}"></span>
      <span class="cc-author">Wahab</span>
      <span class="cc-preview">${truncate(pin.body)}</span>
    </div>
    <p class="cc-body">${pin.body}</p>
  `
  wrapper.appendChild(card)

  const preview = card.querySelector('.cc-preview')
  const body    = card.querySelector('.cc-body')

  wrapper.addEventListener('mouseenter', () => {
    card.classList.add('cc-card-expanded')
    preview.classList.add('cc-preview-hidden')
    body.classList.add('cc-body-visible')
  })
  wrapper.addEventListener('mouseleave', () => {
    card.classList.remove('cc-card-expanded')
    preview.classList.remove('cc-preview-hidden')
    body.classList.remove('cc-body-visible')
  })

  return wrapper
}

function createAnnotationEl() {
  const wrapper = document.createElement('div')
  wrapper.id = 'pp-annotation'
  wrapper.style.cssText = [
    'position:absolute',
    `left:${toLeft(DEFAULT_ANNOTATION.x_pct)}`,
    `top:${toTop(DEFAULT_ANNOTATION.y_pct)}`,
    'transform:translate(-50%,-50%) rotate(-2deg)',
    'pointer-events:auto',
    'z-index:31',
    'cursor:default',
    'user-select:none',
  ].join(';')

  wrapper.innerHTML = `
    <div class="floating-annotation">
      <div>got thoughts?</div>
      <div>drop a comment</div>
      <div>anywhere on the page</div>
      <svg width="52" height="38" viewBox="0 0 52 38" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-top:6px;margin-left:12px">
        <path d="M6 3 C2 14 28 18 24 34" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M19 30 L24 34 L28 29" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  `
  return wrapper
}

// Render all pins and annotation into the container
const pinEls = {}
PRESET_PINS.forEach(pin => {
  const el = createPinEl(pin)
  container.appendChild(el)
  pinEls[pin.id] = el
})

const annotationEl = createAnnotationEl()
container.appendChild(annotationEl)

// Live position store — updated by loadPositions
const positions = Object.fromEntries(PRESET_PINS.map(p => [p.id, { x_pct: p.x_pct, y_pct: p.y_pct }]))
let annPos = { ...DEFAULT_ANNOTATION }

// Resize: recalculate pixel positions from stored percentages
window.addEventListener('resize', () => {
  PRESET_PINS.forEach(pin => {
    const el  = pinEls[pin.id]
    const pos = positions[pin.id]
    if (el && pos) {
      el.style.left = toLeft(pos.x_pct)
      el.style.top  = toTop(pos.y_pct)
    }
  })
  annotationEl.style.left = toLeft(annPos.x_pct)
  annotationEl.style.top  = toTop(annPos.y_pct)
})

// Load saved positions from Supabase (page=home only)
supabase.from('pin_positions').select('*').eq('page', 'home').then(({ data }) => {
  if (!data) return
  data.forEach(row => {
    if (row.id === '__annotation__') {
      annPos = { x_pct: row.x_pct, y_pct: row.y_pct }
      annotationEl.style.left = toLeft(row.x_pct)
      annotationEl.style.top  = toTop(row.y_pct)
    } else {
      const el = pinEls[row.id]
      if (!el) return
      positions[row.id] = { x_pct: row.x_pct, y_pct: row.y_pct }
      el.style.left = toLeft(row.x_pct)
      el.style.top  = toTop(row.y_pct)
    }
  })
})

// Show/hide Design-tab-only pins when the active tab changes
export function setActiveTab(tab) {
  PRESET_PINS.forEach(pin => {
    const el = pinEls[pin.id]
    if (!el) return
    const visible = !pin.tabs || pin.tabs.includes(tab)
    el.style.opacity       = visible ? '1' : '0'
    el.style.pointerEvents = visible ? 'auto' : 'none'
    el.style.transition    = 'opacity 150ms ease'
  })
}

// Show/hide the whole container (used to hide on non-home pages)
export function setPresetPinsVisible(visible) {
  container.style.display = visible ? '' : 'none'
}
