'use client';

import { useEffect, useRef } from 'react';

export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      bar.style.transform = `scaleX(${progress})`;
      bar.style.width = '100vw';
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div
      id="reading-progress"
      ref={barRef}
      aria-hidden="true"
      style={{ transform: 'scaleX(0)', width: '100vw' }}
    />
  );
}
