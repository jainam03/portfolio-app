'use client';

import { about, education } from '@/data/content';
import { GraduationCap, Lightbulb, BookOpen, Trophy, FolderOpen } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';

const stats = [
  { label: 'Projects', value: '5', icon: FolderOpen },
  { label: 'Publications', value: '2', icon: BookOpen },
  { label: 'PGDM GPA', value: '8.22', icon: Trophy },
];

export default function About() {
  return (
    <section id="about" className="relative">
      <div className="section-container">
        {/* Section header */}
        <AnimatedSection>
          <div className="mb-16">
            <p className="section-tag">
              <span className="glow-dot" />
              About
            </p>
            <h2 className="section-heading">{about.headline}</h2>
            <p className="section-subheading">The mindset behind the work.</p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left — Bio */}
          <AnimatedSection variant="fade-left" delay={100}>
            <div className="space-y-5">
              {about.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed"
                  style={{
                    color:
                      i === 0
                        ? 'hsl(var(--foreground))'
                        : 'hsl(var(--muted-foreground))',
                  }}
                >
                  {para}
                </p>
              ))}

              {/* Trait chips */}
              <div className="flex flex-wrap gap-2 pt-3">
                {about.traits.map((trait) => (
                  <span key={trait} className="chip">
                    {trait}
                  </span>
                ))}
              </div>

              {/* Quick stats strip */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {stats.map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="glass rounded-xl p-4 text-center"
                  >
                    <Icon className="w-4 h-4 text-[hsl(var(--primary))] mx-auto mb-1.5" />
                    <p className="text-lg font-bold gradient-text leading-none">{value}</p>
                    <p className="text-[10px] text-muted-foreground mt-1 tracking-wide">{label}</p>
                  </div>
                ))}
              </div>

              {/* The Edge callout */}
              <div className="rounded-2xl p-5 mt-2 relative overflow-hidden"
                style={{
                  background: 'hsl(var(--primary) / 0.06)',
                  border: '1px solid hsl(var(--primary) / 0.2)',
                }}>
                <div className="absolute top-0 left-0 w-full h-[2px]"
                  style={{ background: 'linear-gradient(90deg, hsl(var(--primary)), transparent)' }}
                />
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-[hsl(var(--primary))] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold mb-1">The Edge</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      I connect process flows, stakeholder maps, and root-cause analysis to practical business decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right — Education timeline */}
          <div className="space-y-4">
            <AnimatedSection variant="fade-right" delay={100}>
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-6">
                Education
              </p>
            </AnimatedSection>
            {education.map((edu, i) => (
              <AnimatedSection key={i} variant="fade-right" delay={180 + i * 120}>
                <div className="glass rounded-2xl p-6 card-hover relative overflow-hidden">
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{
                      background:
                        i === 0
                          ? 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))'
                          : 'linear-gradient(90deg, hsl(var(--accent)), transparent)',
                    }}
                  />

                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-[hsl(var(--primary)/0.1)] shrink-0">
                      <GraduationCap className="w-5 h-5 text-[hsl(var(--primary))]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <h3 className="font-semibold text-sm leading-snug">
                            {edu.degree}
                          </h3>
                          <p className="text-muted-foreground text-sm mt-0.5">
                            {edu.institution}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <span className="chip-muted text-[10px]">{edu.period}</span>
                          <span className="chip text-[10px]">{edu.grade}</span>
                        </div>
                      </div>

                      {edu.highlights.length > 0 && (
                        <ul className="mt-3 space-y-1">
                          {edu.highlights.map((h, j) => (
                            <li
                              key={j}
                              className="text-xs text-muted-foreground flex items-start gap-2"
                            >
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-[hsl(var(--primary)/0.6)] shrink-0" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

