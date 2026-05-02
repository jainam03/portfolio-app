'use client';

import { skills } from '@/data/content';
import { AnimatedSection } from '@/components/AnimatedSection';

const domainColors: Record<string, string> = {
  'Analytical & Strategy': 'hsl(238, 78%, 68%)',
  'Tools & Software': 'hsl(234, 72%, 72%)',
  'Tech & Engineering': 'hsl(238, 70%, 65%)',
  'Business Design': 'hsl(234, 75%, 70%)',
};

const domainColorsDark: Record<string, string> = {
  'Analytical & Strategy': 'hsl(238, 65%, 55%)',
  'Tools & Software': 'hsl(234, 60%, 58%)',
  'Tech & Engineering': 'hsl(238, 60%, 52%)',
  'Business Design': 'hsl(234, 62%, 56%)',
};

export default function Skills() {
  return (
    <section id="skills" className="relative">
      <div
        className="blob w-[350px] h-[350px] -right-20 top-1/2 -translate-y-1/2"
        style={{ background: 'hsl(238, 78%, 68%)' }}
      />

      <div className="section-container">
        {/* Section header */}
        <AnimatedSection>
          <div className="mb-16">
            <p className="section-tag">
              <span className="glow-dot" />
              Skills
            </p>
            <h2 className="section-heading">Tools of the Trade</h2>
            <p className="section-subheading">
              A cross-disciplinary toolkit — from analytical frameworks to
              technical stacks.
            </p>
          </div>
        </AnimatedSection>

        {/* Skill grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skills.map((skillGroup, i) => {
            const colorDark = domainColors[skillGroup.category] || 'hsl(var(--primary))';
            const colorLight = domainColorsDark[skillGroup.category] || 'hsl(var(--primary))';

            return (
              <AnimatedSection key={i} delay={i * 100}>
                <div
                  id={`skill-group-${i}`}
                  className="glass rounded-2xl p-6 card-hover relative overflow-hidden group h-full"
                >
                  {/* Accent line — switches color based on theme via CSS custom prop */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(90deg, var(--skill-color, ${colorDark}), transparent)`,
                    }}
                  />

                  {/* Header */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl">{skillGroup.icon}</span>
                    <h3 className="font-semibold text-sm">{skillGroup.category}</h3>
                  </div>

                  {/* Skill chips — color adapts via CSS variable */}
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 skill-chip"
                        style={{
                          // Use CSS custom properties so light mode can override
                          '--chip-color-dark': colorDark,
                          '--chip-color-light': colorLight,
                        } as React.CSSProperties}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
