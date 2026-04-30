'use client';

import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

export function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide once user scrolls down more than 80px
      setVisible(window.scrollY < 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 text-muted-foreground pointer-events-none z-30 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      }`}
      aria-hidden="true"
    >
      <span className="text-[10px] tracking-widest uppercase">Scroll</span>
      <ArrowDown className="w-4 h-4 animate-bounce" />
    </div>
  );
}
