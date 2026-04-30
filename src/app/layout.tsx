import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ScrollToTop } from '@/components/ScrollToTop';
import { ReadingProgress } from '@/components/ReadingProgress';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Jainam Chheda — Operations · Analytics · Strategy',
  description:
    'Portfolio of Jainam Chheda — IT engineer turned business designer, specializing in systems thinking, process optimization, and execution-driven solutions.',
  keywords: [
    'Jainam Chheda',
    'Portfolio',
    'Business Design',
    'PGDM',
    'Operations',
    'Product Management',
    'Systems Thinking',
    'Supply Chain',
    'Analytics',
  ],
  authors: [{ name: 'Jainam Chheda' }],
  openGraph: {
    title: 'Jainam Chheda — Operations · Analytics · Strategy',
    description:
      'I map operational systems, diagnose inefficiencies, and build structured solutions.',
    type: 'website',
    url: 'https://jainamchheda.com', // Replace with final URL
    siteName: 'Jainam Chheda Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jainam Chheda — Operations · Analytics · Strategy',
    description: 'Engineering precision meets business design. Operations, SCM, and Product.',
  },
};

// Inline script — runs before paint to set data-theme and prevent flash
const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('portfolio-theme');
    if (stored === 'dark' || stored === 'light') {
      document.documentElement.setAttribute('data-theme', stored);
      return;
    }
    // Default: dark mode on all devices
    document.documentElement.setAttribute('data-theme', 'dark');
  } catch(e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} overflow-x-hidden`} suppressHydrationWarning>
      <head>
        {/* Run before render to eliminate theme flash */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden flex flex-col">
        <ThemeProvider>
          <ReadingProgress />
          {children}
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
