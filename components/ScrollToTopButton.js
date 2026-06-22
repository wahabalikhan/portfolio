'use client';

import { ChevronUp } from 'lucide-react';
import { smoothScrollTo } from '@/utils/smoothScroll';

export default function ScrollToTopButton() {
  return (
    <button
      onClick={() => smoothScrollTo(0, 800)}
      className="scroll-to-top-btn"
      aria-label="Scroll to top"
    >
      <ChevronUp size={18} />
    </button>
  );
}
