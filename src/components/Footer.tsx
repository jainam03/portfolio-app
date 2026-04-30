import { personalInfo } from '@/data/content';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[hsl(var(--border))]">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left — brand */}
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold gradient-text">{personalInfo.name}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground text-xs">{personalInfo.title}</span>
          </div>

          {/* Right — links */}
          <div className="flex items-center gap-5 text-xs text-muted-foreground">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[hsl(var(--primary))] transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[hsl(var(--primary))] transition-colors duration-200"
            >
              GitHub
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="hover:text-[hsl(var(--primary))] transition-colors duration-200"
            >
              Email
            </a>
          </div>
        </div>

        {/* Bottom line */}
        <div className="divider my-6" />

        <p className="text-center text-[11px] text-muted-foreground">
          © {year} {personalInfo.name}. Built with Next.js &amp; Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
