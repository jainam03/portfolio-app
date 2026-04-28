'use client';

import { personalInfo } from '@/data/content';
import { Mail, Linkedin, Github, MapPin, Send } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';

export default function Contact() {
  return (
    <section id="contact" className="relative">
      <div
        className="blob w-[500px] h-[500px] left-1/2 -translate-x-1/2 top-0"
        style={{ background: 'hsl(196, 100%, 50%)' }}
      />

      <div className="section-container">
        {/* Section header */}
        <AnimatedSection>
          <div className="mb-16 text-center">
            <p className="section-tag justify-center">
              <span className="glow-dot" />
              Contact
            </p>
            <h2 className="section-heading text-center">
              Let&apos;s Build Something Together
            </h2>
            <p className="section-subheading mx-auto text-center">
              Open to internships, collaborations, and conversations about Ops,
              Product, or Analytics roles.
            </p>
          </div>
        </AnimatedSection>

        <div className="max-w-2xl mx-auto">
          {/* Main CTA card */}
          <AnimatedSection delay={100}>
            <div className="glass-strong rounded-3xl p-8 md:p-10 text-center mb-8 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background:
                    'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))',
                }}
              />

              <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--primary)/0.1)] border border-[hsl(var(--primary)/0.2)] flex items-center justify-center mx-auto mb-6">
                <Send className="w-7 h-7 text-[hsl(var(--primary))]" />
              </div>

              <h3 className="text-xl font-bold mb-3">Ready to connect?</h3>
              <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                Whether you&apos;re a recruiter, a fellow student, or someone
                with an interesting problem to solve — I&apos;m all ears.
              </p>

              <a
                id="contact-email-cta"
                href={`mailto:${personalInfo.email}?subject=Portfolio Inquiry — ${personalInfo.name}`}
                className="btn-primary w-full justify-center"
              >
                <Mail className="w-4 h-4" />
                Send me an email
              </a>
            </div>
          </AnimatedSection>

          {/* Social links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                id: 'contact-linkedin',
                href: personalInfo.linkedin,
                Icon: Linkedin,
                label: 'Connect on',
                value: 'LinkedIn',
                delay: 200,
              },
              {
                id: 'contact-github',
                href: personalInfo.github,
                Icon: Github,
                label: 'Follow on',
                value: 'GitHub',
                delay: 300,
              },
            ].map(({ id, href, Icon, label, value, delay }) => (
              <AnimatedSection key={id} delay={delay} variant="fade-up">
                <a
                  id={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-2xl p-5 flex items-center gap-3 card-hover group w-full"
                >
                  <div className="p-2 rounded-xl bg-[hsl(var(--primary)/0.1)]">
                    <Icon className="w-5 h-5 text-[hsl(var(--primary))]" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-sm font-semibold group-hover:text-[hsl(var(--primary))] transition-colors">
                      {value}
                    </p>
                  </div>
                </a>
              </AnimatedSection>
            ))}

            <AnimatedSection delay={400} variant="fade-up">
              <div className="glass rounded-2xl p-5 flex items-center gap-3 w-full">
                <div className="p-2 rounded-xl bg-[hsl(var(--accent)/0.1)]">
                  <MapPin className="w-5 h-5 text-[hsl(var(--accent))]" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Based in</p>
                  <p className="text-sm font-semibold">{personalInfo.location}</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
