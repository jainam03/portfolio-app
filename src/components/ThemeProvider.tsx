'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggle: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggle: () => {},
  mounted: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Read from localStorage first
    const stored = localStorage.getItem('portfolio-theme') as Theme | null;
    if (stored === 'dark' || stored === 'light') {
      applyTheme(stored);
      setTheme(stored);
      return;
    }
    // Default: light on mobile (<768px), dark on desktop
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const defaultTheme: Theme = isMobile ? 'light' : 'dark';
    applyTheme(defaultTheme);
    setTheme(defaultTheme);
  }, []);

  const applyTheme = (t: Theme) => {
    document.documentElement.setAttribute('data-theme', t);
  };

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('portfolio-theme', next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
