'use client';

import { useEffect, useRef } from 'react';

export default function CursorBlob() {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;

    // Check if it's a touch device; if so, disable the cursor follower
    if (window.matchMedia('(pointer: coarse)').matches) {
      blob.style.display = 'none';
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    let animationFrameId: number;

    const animate = () => {
      // Lag factor (lower is slower)
      x += (mouseX - x) * 0.08;
      y += (mouseY - y) * 0.08;
      
      // The blob is 420px wide, so we offset by 210px to center it on the cursor
      blob.style.transform = `translate(${x - 210}px, ${y - 210}px)`;
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={blobRef}
      className="fixed top-0 left-0 w-[420px] h-[420px] rounded-full pointer-events-none z-0"
      style={{
        background: 'radial-gradient(circle, rgba(123, 94, 167, 0.45), transparent 70%)',
        filter: 'blur(60px)',
        willChange: 'transform'
      }}
    />
  );
}
