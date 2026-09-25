'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function AnimatedText({ text, className = '', delay = 0 }: AnimatedTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const chars = containerRef.current.querySelectorAll<HTMLElement>('.char');
    // Set initial state via GSAP (not inline style)
    gsap.set(chars, { yPercent: 110, opacity: 0, rotateX: -60 });
    gsap.to(chars, {
      yPercent: 0,
      opacity: 1,
      rotateX: 0,
      duration: 0.9,
      stagger: { amount: 0.5 },
      ease: 'power3.out',
      delay,
    });
  }, [delay, text]);

  return (
    <span
      ref={containerRef}
      className={`inline-block ${className}`}
      style={{ perspective: '600px' }}
    >
      {text.split(' ').map((word, wi) => (
        <span
          key={wi}
          className="inline-block whitespace-nowrap"
          style={{ marginRight: '0.28em', overflow: 'hidden', display: 'inline-block' }}
        >
          {word.split('').map((char, ci) => (
            <span
              key={ci}
              className="char"
              style={{ display: 'inline-block', willChange: 'transform, opacity' }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

// Premium line-mask reveal — as seen on Awwwards SOTD winners
interface RevealTextProps {
  lines: string[];
  className?: string;
  delay?: number;
  triggered?: boolean;
}

export function RevealText({ lines, className = '', delay = 0, triggered = false }: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (!ref.current || !triggered || hasPlayed.current) return;
    hasPlayed.current = true;
    const lineEls = ref.current.querySelectorAll<HTMLElement>('.rl-inner');
    gsap.set(lineEls, { yPercent: 105, opacity: 0 });
    gsap.to(lineEls, {
      yPercent: 0,
      opacity: 1,
      duration: 1.1,
      stagger: 0.13,
      ease: 'power4.out',
      delay,
    });
  }, [triggered, delay]);

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <div key={i} style={{ overflow: 'hidden', lineHeight: 1.05 }}>
          <div className="rl-inner" style={{ display: 'block', opacity: 0 }}>
            {line}
          </div>
        </div>
      ))}
    </div>
  );
}
