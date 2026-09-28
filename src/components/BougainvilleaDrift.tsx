'use client';

import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  opacity: number;
}

export default function BougainvilleaDrift() {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    // Generate gentle drifting petals
    const items: Petal[] = Array.from({ length: 9 }).map((_, i) => ({
      id: i,
      x: 5 + (i * 11) % 90,
      size: 14 + (i % 4) * 5,
      duration: 16 + (i % 5) * 4,
      delay: (i * 2.5) % 12,
      rotation: (i * 45) % 360,
      opacity: 0.25 + (i % 3) * 0.15,
    }));
    setPetals(items);
  }, []);

  if (reducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            top: '-40px',
            animation: `drift ${petal.duration}s linear infinite`,
            animationDelay: `${petal.delay}s`,
            opacity: petal.opacity,
          }}
        >
          {/* Bougainvillea Petal SVG */}
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 30 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: `rotate(${petal.rotation}deg)`,
              filter: 'drop-shadow(0 2px 8px rgba(197, 60, 112, 0.2))',
            }}
          >
            <path
              d="M15 0C8 12 0 22 5 34C10 42 20 42 25 34C30 22 22 12 15 0Z"
              fill="url(#bougainvilleaGradient)"
            />
            {/* Delicate vein */}
            <path d="M15 8V35" stroke="rgba(255,255,255,0.3)" strokeWidth="0.75" strokeLinecap="round" />
            <defs>
              <linearGradient id="bougainvilleaGradient" x1="15" y1="0" x2="15" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#D9386A" />
                <stop offset="0.6" stopColor="#B82550" />
                <stop offset="1" stopColor="#7A1231" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}

      <style jsx global>{`
        @keyframes drift {
          0% {
            transform: translateY(-5vh) translateX(0) rotate(0deg);
          }
          50% {
            transform: translateY(55vh) translateX(30px) rotate(180deg);
          }
          100% {
            transform: translateY(115vh) translateX(-20px) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
