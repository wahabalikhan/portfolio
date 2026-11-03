'use client';

import { useEffect } from 'react';

/**
 * Sends one `case_study_read` event to Bobby Builds (my own cookie-free analytics) when a
 * visitor has read a case study: they've scrolled at least 25% of the page AND it has been on
 * screen for 5 seconds or more. Once per case study view: arriving again (even through a
 * client-side link) is a new view. Sends nothing if t.js isn't loaded, or if the browser has
 * Global Privacy Control or Do Not Track on (t.js handles that).
 */
const SCROLL_TARGET = 0.25;
const VISIBLE_MS = 5_000;

export default function CaseStudyReadTracker({ study }) {
  useEffect(() => {
    let visibleMs = 0;
    let visibleSince = document.visibilityState === 'visible' ? Date.now() : null;
    let reachedScroll = false;
    let sent = false;

    const visibleNow = () => visibleMs + (visibleSince === null ? 0 : Date.now() - visibleSince);

    const check = () => {
      if (sent || !reachedScroll || visibleNow() < VISIBLE_MS) return;
      sent = true;
      window.bobby?.track('case_study_read', { study });
      cleanUp();
    };

    // How far through the page the visitor has scrolled (0 at the top, 1 at the bottom).
    // A page too short to scroll counts as fully scrolled.
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0 || window.scrollY / scrollable >= SCROLL_TARGET) reachedScroll = true;
      check();
    };

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        if (visibleSince !== null) visibleMs += Date.now() - visibleSince;
        visibleSince = null;
      } else {
        visibleSince = Date.now();
      }
    };

    const timer = window.setInterval(check, 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    onScroll();

    function cleanUp() {
      window.clearInterval(timer);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
    }
    return cleanUp;
  }, [study]);

  return null;
}
