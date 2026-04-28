'use client';

import { personalInfo } from '@/data/content';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[hsl(var(--border))]">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <span className="text-sm font-bold">
            <span className="gradient-text">{personalInfo.name.split(' ')[0]}</span>
            <span className="text-muted-foreground">.{personalInfo.name.split(' ')[1]}</span>
          </span>

          {/* Center copy */}
          <p className="text-xs text-muted-foreground text-center">
            Built with Next.js + Tailwind CSS &bull; Deployed on Vercel
          </p>

          {/* Right */}
          <p className="text-xs text-muted-foreground">
            &copy; {year} {personalInfo.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
