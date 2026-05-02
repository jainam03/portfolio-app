'use client';

import { useState } from 'react';
import { personalInfo } from '@/data/content';
import { Mail, Linkedin, Github, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL_FORM: FormData = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setState('success');
      setForm(INITIAL_FORM);
    } catch (err: unknown) {
      setState('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  const inputClass =
    'w-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[hsl(var(--primary))] focus:ring-1 focus:ring-[hsl(var(--primary)/0.3)] transition-all duration-200';

  return (
    <section id="contact" className="relative">
      <div
        className="blob w-[500px] h-[500px] left-1/2 -translate-x-1/2 top-0"
        style={{ background: 'hsl(238, 78%, 68%)' }}
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
              Let&apos;s Build Something Together 💪
            </h2>
            <p className="section-subheading mx-auto text-center">
              Open to interesting conversations about Ops, Product, or Analytics roles.
            </p>
          </div>
        </AnimatedSection>

        <div className="max-w-2xl mx-auto">
          {/* Contact Form */}
          <AnimatedSection delay={100}>
            <div className="glass-strong rounded-3xl p-8 md:p-10 relative overflow-hidden mb-8">
              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background:
                    'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))',
                }}
              />

              {/* Success State */}
              {state === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Thanks for reaching out.😀 I&apos;ll get back to you soon.😉
                  </p>
                  <button
                    onClick={() => setState('idle')}
                    className="btn-secondary text-sm"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[hsl(var(--primary)/0.1)] border border-[hsl(var(--primary)/0.2)] flex items-center justify-center shrink-0">
                      <Send className="w-4 h-4 text-[hsl(var(--primary))]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base">Send a message</h3>
                      <p className="text-muted-foreground text-xs">
                        I read every message personally.
                      </p>
                    </div>
                  </div>

                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
                        Name <span className="text-[hsl(var(--primary))]">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        value={form.name}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
                        Email <span className="text-[hsl(var(--primary))]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
                      Subject <span className="text-muted-foreground font-normal">(optional)</span>
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      placeholder="Internship opportunity, collaboration, etc."
                      value={form.subject}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
                      Message <span className="text-[hsl(var(--primary))]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell me about the opportunity, project, or just say hi..."
                      value={form.message}
                      onChange={handleChange}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {/* Error message */}
                  {state === 'error' && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    id="contact-submit"
                    type="submit"
                    disabled={state === 'loading'}
                    className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {state === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
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
