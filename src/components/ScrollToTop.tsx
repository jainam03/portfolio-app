'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      id="scroll-to-top"
      onClick={scrollUp}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-xl glass-strong border border-[hsl(var(--primary)/0.3)] text-[hsl(var(--primary))] shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-[0_0_24px_hsl(var(--primary)/0.4)] ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}
