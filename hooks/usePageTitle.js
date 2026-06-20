'use client';

import { useEffect } from 'react';

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Wahab Ali Khan` : 'Wahab Ali Khan';
  }, [title]);
}
