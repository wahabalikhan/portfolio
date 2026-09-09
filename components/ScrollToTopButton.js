'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { smoothScrollTo } from '@/utils/smoothScroll';

const SHOW_THRESHOLD = 400;

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => smoothScrollTo(0, 800)}
      className="scroll-to-top-btn"
      aria-label="Scroll to top"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.25s ease, color 0.2s ease, filter 0.2s ease',
      }}
    >
      <ChevronUp size={28} />
    </button>
  );
}
