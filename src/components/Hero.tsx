'use client';

import { personalInfo } from '@/data/content';
import { ArrowDown, Github, Linkedin, Mail, Zap } from 'lucide-react';

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Background gradient blobs */}
      <div
        className="blob w-[600px] h-[600px] -top-32 -left-32"
        style={{ background: 'hsl(196, 100%, 50%)' }}
      />
      <div
        className="blob w-[500px] h-[500px] bottom-0 -right-32"
        style={{ background: 'hsl(258, 89%, 66%)' }}
      />
      <div
        className="blob w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'hsl(196, 100%, 50%)', opacity: 0.06 }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          opacity: 0.3,
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Identity badge */}
        <div className="flex md:inline-flex flex-col md:flex-row items-center justify-center gap-2 md:gap-2.5 mb-8 px-5 py-3 md:py-2 rounded-2xl md:rounded-full glass text-[11px] md:text-xs font-medium animate-fade-in mx-auto w-fit max-w-[90%] md:max-w-none">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="glow-dot animate-pulse-slow shrink-0" />
            <span>PGDM Business Design</span>
            <span className="hidden md:inline">&nbsp;&middot;&nbsp;</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span style={{ color: 'hsl(var(--primary))' }}>WeSchool</span>
            <span>&middot;&nbsp;IT Engineering</span>
          </div>
          <span className="hidden md:inline h-3 w-px bg-[hsl(var(--border))]" />
          <div className="mt-1 md:mt-0 pt-2 md:pt-0 border-t border-[hsl(var(--border))] md:border-none w-full md:w-auto text-center">
            <span style={{ color: 'hsl(var(--primary))' }} className="font-semibold">
              Available Summer&nbsp;&#39;26
            </span>
          </div>
        </div>



        {/* Main heading */}
        <h1
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6 animate-slide-up"
          style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
        >
          <span className="gradient-text">{personalInfo.name}</span>
        </h1>

        {/* Title */}
        <div
          className="flex items-center justify-center gap-3 mb-5 animate-slide-up"
          style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
        >
          <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-[hsl(var(--primary)/0.5)]" />
          <p className="font-semibold text-muted-foreground uppercase text-[10px] md:text-[11px] tracking-widest text-center">
            {personalInfo.title}
          </p>
          <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-[hsl(var(--primary)/0.5)]" />
        </div>

        {/* Tagline */}
        <p
          className="text-xl md:text-2xl font-medium mb-4 animate-slide-up"
          style={{ animationDelay: '0.25s', animationFillMode: 'both' }}
        >
          {personalInfo.tagline}
        </p>

        {/* Position statement */}
        <p
          className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10 animate-slide-up px-2"
          style={{ animationDelay: '0.35s', animationFillMode: 'both' }}
        >
          {personalInfo.positionStatement}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 animate-slide-up"
          style={{ animationDelay: '0.45s', animationFillMode: 'both' }}
        >
          <button onClick={scrollToProjects} className="btn-primary w-full sm:w-auto">
            <Zap className="w-4 h-4" />
            View My Work
          </button>
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost w-full sm:w-auto"
          >
            Download Resume
          </a>
        </div>

        {/* Social links */}
        <div
          className="flex items-center justify-center gap-4 animate-fade-in"
          style={{ animationDelay: '0.55s', animationFillMode: 'both' }}
        >
          <a
            id="hero-linkedin"
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-3 rounded-xl glass transition-all duration-200 hover:scale-110 hover:border-[hsl(var(--primary)/0.4)] text-muted-foreground hover:text-[hsl(var(--primary))]"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            id="hero-github"
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-3 rounded-xl glass transition-all duration-200 hover:scale-110 hover:border-[hsl(var(--primary)/0.4)] text-muted-foreground hover:text-[hsl(var(--primary))]"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            id="hero-email"
            href={`mailto:${personalInfo.email}`}
            aria-label="Send Email"
            className="p-3 rounded-xl glass transition-all duration-200 hover:scale-110 hover:border-[hsl(var(--primary)/0.4)] text-muted-foreground hover:text-[hsl(var(--primary))]"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-float"
        style={{ animationDelay: '1s' }}
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <ArrowDown className="w-4 h-4" />
      </div>
    </section>
  );
}
