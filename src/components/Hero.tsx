'use client';

import { personalInfo } from '@/data/content';
import { ArrowUpRight, Github, Linkedin, Mail, Zap, ArrowDown } from 'lucide-react';

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Background blobs — single indigo, very restrained */}
      <div
        className="blob w-[700px] h-[700px] -top-48 -left-48"
        style={{ background: 'hsl(238, 78%, 68%)' }}
      />
      <div
        className="blob w-[400px] h-[400px] bottom-0 -right-24"
        style={{ background: 'hsl(238, 78%, 68%)' }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          opacity: 0.3,
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)',
        }}
      />

      {/* Content — centered */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl w-full pt-24">

        {/* Badge */}
        <div
          className="flex flex-wrap items-center justify-center gap-2 mb-10 animate-fade-in glass px-4 py-2 rounded-full"
          style={{ animationFillMode: 'both' }}
        >
          <span className="glow-dot animate-pulse-slow" />
          <span className="text-xs text-muted-foreground">PGDM Business Design</span>
          <span className="text-muted-foreground/40">·</span>
          <span className="text-xs text-muted-foreground">WeSchool</span>
          <span className="text-muted-foreground/40">·</span>
          <span className="text-xs text-muted-foreground">IT Engineering</span>
          <span className="text-muted-foreground/40">·</span>
          <span className="text-xs font-semibold" style={{ color: 'hsl(var(--primary))' }}>
            {personalInfo.seekingRole}
          </span>
        </div>

        {/* Name */}
        <h1
          className="mb-6 animate-slide-up"
          style={{
            animationDelay: '0.1s',
            animationFillMode: 'both',
            fontFamily: 'var(--font-syne), sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(3rem, 10vw, 6.5rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
          }}
        >
          <span className="gradient-text">{personalInfo.name}</span>
        </h1>

        {/* Title row */}
        <div
          className="flex items-center gap-4 mb-6 animate-fade-in"
          style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
        >
          <div className="h-px w-12 bg-[hsl(var(--border))]" />
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground">
            {personalInfo.title}
          </p>
          <div className="h-px w-12 bg-[hsl(var(--border))]" />
        </div>

        {/* Tagline */}
        <p
          className="text-xl md:text-2xl font-semibold mb-4 animate-slide-up"
          style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
        >
          {personalInfo.tagline}
        </p>

        {/* Position statement */}
        <p
          className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed mb-10 animate-slide-up"
          style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
        >
          {personalInfo.positionStatement}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 mb-10 animate-slide-up"
          style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
        >
          <button onClick={scrollToProjects} className="btn-primary">
            <Zap className="w-4 h-4" />
            View My Work
          </button>
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            Download Resume
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Social links */}
        <div
          className="flex items-center gap-3 animate-fade-in"
          style={{ animationDelay: '0.6s', animationFillMode: 'both' }}
        >
          <a
            id="hero-linkedin"
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-3 rounded-xl glass transition-all duration-200 hover:scale-110 hover:border-[hsl(var(--primary)/0.4)] text-muted-foreground hover:text-[hsl(var(--primary))]"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            id="hero-github"
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-3 rounded-xl glass transition-all duration-200 hover:scale-110 hover:border-[hsl(var(--primary)/0.4)] text-muted-foreground hover:text-[hsl(var(--primary))]"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            id="hero-email"
            href={`mailto:${personalInfo.email}`}
            aria-label="Send Email"
            className="p-3 rounded-xl glass transition-all duration-200 hover:scale-110 hover:border-[hsl(var(--primary)/0.4)] text-muted-foreground hover:text-[hsl(var(--primary))]"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
