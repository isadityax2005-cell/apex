'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from '@/lib/gsap-config';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Lenis v1.x API — orientation/gestureOrientation removed
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Connect Lenis to GSAP ticker so ScrollTrigger stays in sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Tell ScrollTrigger to use Lenis's scroll position
    lenis.on('scroll', () => ScrollTrigger.update());

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
