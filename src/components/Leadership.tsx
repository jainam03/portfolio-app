'use client';

import { certifications, leadership, achievements, experience } from '@/data/content';
import { Award, Star, ExternalLink, Trophy, Briefcase } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';

export default function Leadership() {
  return (
    <section id="leadership" className="relative">
      <div className="section-container">
        {/* Section header */}
        <AnimatedSection>
          <div className="mb-16">
            <p className="section-tag">
              <span className="glow-dot" />
              Experience & Recognition
            </p>
            <h2 className="section-heading">Experience & recognition</h2>
            <p className="section-subheading">
              A compact view of the work, credentials, and milestones behind the portfolio.
            </p>
          </div>
        </AnimatedSection>

        <div className="mb-10">
          <AnimatedSection delay={80}>
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-5">Professional experience</p>
            {experience.map((role) => (
              <div key={`${role.organization}-${role.role}`} className="glass rounded-2xl p-5 md:p-6 card-hover relative overflow-hidden">
                <div className="absolute top-0 left-0 w-[3px] h-full rounded-full" style={{ background: 'linear-gradient(180deg, hsl(var(--primary)), transparent)' }} />
                <div className="pl-4 grid md:grid-cols-[1fr_auto] gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1"><Briefcase className="w-4 h-4 text-[hsl(var(--primary))]" /><h3 className="font-semibold text-sm">{role.role}</h3></div>
                    <p className="text-sm text-[hsl(var(--primary))]">{role.organization}</p>
                    <ul className="mt-3 space-y-1.5">{role.impact.map((item) => <li key={item} className="text-xs text-muted-foreground leading-relaxed flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-[hsl(var(--primary)/0.6)] shrink-0" />{item}</li>)}</ul>
                  </div>
                  <div className="flex md:flex-col items-start md:items-end gap-2"><span className="chip-muted text-[10px]">{role.period}</span><div className="flex flex-wrap gap-1.5">{role.tools.map((tool) => <span key={tool} className="chip text-[10px]">{tool}</span>)}</div></div>
                </div>
              </div>
            ))}
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Column 1 — Leadership */}
          <div className="lg:col-span-1 space-y-4">
            <AnimatedSection variant="fade-left" delay={100}>
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-6">
                Positions of Responsibility
              </p>
            </AnimatedSection>
            {leadership.map((role, i) => (
              <AnimatedSection key={i} variant="fade-left" delay={150 + i * 100}>
                <div
                  className="glass rounded-2xl p-5 card-hover relative overflow-hidden"
                  id={`leadership-${i}`}
                >
                  <div
                    className="absolute top-0 left-0 w-[3px] h-full rounded-full"
                    style={{
                      background:
                        'linear-gradient(180deg, hsl(var(--primary)), transparent)',
                    }}
                  />
                  <div className="pl-4">
                    <h3 className="font-semibold text-sm leading-snug mb-0.5">
                      {role.role}
                    </h3>
                    <p className="text-xs text-[hsl(var(--primary))]">
                      {role.organization}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 mb-3">
                      {role.period}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {role.impact}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Mobile column divider */}
          <div className="divider lg:hidden" />
          {/* Column 2 — Certifications */}
          <div className="lg:col-span-1 space-y-4">
            <AnimatedSection delay={100}>
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-6">
                Certifications
              </p>
            </AnimatedSection>
            {certifications.map((cert, i) => (
              <AnimatedSection key={i} delay={150 + i * 100}>
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`cert-${i}`}
                  className="flex items-start gap-4 glass rounded-2xl p-5 card-hover group"
                >
                  <div className="p-2 rounded-xl bg-[hsl(var(--accent)/0.1)] shrink-0">
                    <Award className="w-5 h-5 text-[hsl(var(--accent))]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold leading-snug">
                        {cert.title}
                      </h3>
                      {cert.credentialUrl !== '#' && (
                        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5 group-hover:text-[hsl(var(--primary))] transition-colors" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {cert.issuer}
                    </p>
                    <span className="chip-muted text-[10px] mt-2 inline-flex">
                      {cert.year}
                    </span>
                  </div>
                </a>
              </AnimatedSection>
            ))}
          </div>

          {/* Mobile column divider */}
          <div className="divider lg:hidden" />
          {/* Column 3 — Achievements */}
          <div className="lg:col-span-1">
            <AnimatedSection variant="fade-right" delay={100}>
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-6">
                Achievements
              </p>
            </AnimatedSection>
            <AnimatedSection variant="fade-right" delay={200}>
              <div className="glass rounded-2xl p-6 space-y-4">
                {achievements.map((ach, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 group"
                    id={`achievement-${i}`}
                  >
                    <div className="p-1.5 rounded-lg bg-[hsl(var(--primary)/0.1)] shrink-0 mt-0.5">
                      {i === 0 ? (
                        <Trophy className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
                      ) : (
                        <Star className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {ach}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
