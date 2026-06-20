const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

export function smoothScrollTo(targetY, duration = 580) {
  const start = window.scrollY;
  const distance = targetY - start;
  let startTime = null;
  const step = (ts) => {
    if (!startTime) startTime = ts;
    const elapsed = Math.min((ts - startTime) / duration, 1);
    window.scrollTo(0, start + distance * ease(elapsed));
    if (elapsed < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export function smoothScrollToTop(duration = 580) {
  smoothScrollTo(0, duration);
}

export function smoothScrollToElement(id, navOffset = 80, duration = 580) {
  const el = document.getElementById(id);
  if (!el) return;
  const target = el.getBoundingClientRect().top + window.scrollY - navOffset;
  smoothScrollTo(target, duration);
}
