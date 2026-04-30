'use client';

import { useState, useEffect } from 'react';
import { navLinks, personalInfo } from '@/data/content';
import { useTheme } from '@/components/ThemeProvider';
import { Menu, X, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle, mounted } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Add transition class during theme toggle to smooth color changes
  const handleThemeToggle = () => {
    document.documentElement.classList.add('theme-transition');
    toggle();
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 400);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3 glass-strong' : 'py-5 bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo / Name */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-sm font-bold tracking-tight transition-opacity hover:opacity-80"
        >
          <span className="gradient-text">{personalInfo.name.split(' ')[0]}</span>
          <span className="text-muted-foreground">
            .{personalInfo.name.split(' ')[1]}
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)]'
                    : 'text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--muted))]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          {mounted && (
            <button
              id="theme-toggle"
              onClick={handleThemeToggle}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2.5 rounded-xl glass transition-all duration-200 hover:scale-110 text-muted-foreground hover:text-[hsl(var(--primary))]"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          )}

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <a href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-xs py-2 px-4"
            >
              Resume ↗
            </a>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary text-xs py-2 px-4"
            >
              Let&apos;s Talk
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg glass"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden mt-2 mx-4 rounded-2xl glass-strong p-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-left px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--muted))] transition-all"
            >
              {link.label}
            </button>
          ))}
          <div className="divider my-2" />
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-sm justify-center"
          >
            View Resume ↗
          </a>
        </div>
      )}
    </header>
  );
}
