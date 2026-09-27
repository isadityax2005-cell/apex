export default function Marquee() {
  const items = [
    "Exclusive Off-Market Listings",
    "•",
    "Private Beachfront Access",
    "•",
    "Procedural WebGL Architecture",
    "•",
    "Award-Winning Designs",
    "•",
    "Global Reach"
  ];

  return (
    <div className="w-full overflow-hidden whitespace-nowrap bg-zinc-950 py-6 border-t border-b border-white/5 relative z-20">
      <div className="inline-flex gap-8 animate-[scroll_20s_linear_infinite] hover:[animation-play-state:paused]">
        {/* Double the items to create a seamless loop */}
        {[...items, ...items, ...items].map((item, i) => (
          <span 
            key={i} 
            className={`font-mono text-[10px] tracking-[0.2em] uppercase ${item === '•' ? 'text-white/20' : 'text-white/60'}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
