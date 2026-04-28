'use client';

import { useInView } from '@/hooks/useInView';

type AnimVariant = 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: AnimVariant;
  threshold?: number;
  as?: keyof JSX.IntrinsicElements;
}

const variantStyles: Record<AnimVariant, { hidden: string; visible: string }> = {
  'fade-up': {
    hidden: 'opacity-0 translate-y-8',
    visible: 'opacity-100 translate-y-0',
  },
  'fade-in': {
    hidden: 'opacity-0',
    visible: 'opacity-100',
  },
  'fade-left': {
    hidden: 'opacity-0 -translate-x-8',
    visible: 'opacity-100 translate-x-0',
  },
  'fade-right': {
    hidden: 'opacity-0 translate-x-8',
    visible: 'opacity-100 translate-x-0',
  },
};

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  variant = 'fade-up',
  threshold = 0.12,
  as = 'div',
}: AnimatedSectionProps) {
  const { ref, inView } = useInView({ threshold });
  const { hidden, visible } = variantStyles[variant];

  // We assert Tag as any to avoid complex union discrimination errors with generic refs
  const Tag = as as any;

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${
        inView ? visible : hidden
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

// Convenience wrapper for staggered children — wraps each child individually
export function StaggeredGroup({
  children,
  className = '',
  staggerMs = 100,
  baseDelay = 0,
  variant = 'fade-up' as AnimVariant,
}: {
  children: React.ReactNode[];
  className?: string;
  staggerMs?: number;
  baseDelay?: number;
  variant?: AnimVariant;
}) {
  return (
    <>
      {children.map((child, i) => (
        <AnimatedSection
          key={i}
          className={className}
          delay={baseDelay + i * staggerMs}
          variant={variant}
        >
          {child}
        </AnimatedSection>
      ))}
    </>
  );
}
