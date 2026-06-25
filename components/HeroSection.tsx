'use client';

import { useEffect, useState, useMemo } from 'react';

interface Props {
  onEnter: () => void;
}

function Particles() {
  const particles = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left: `${4 + (i * 4) % 92}%`,
      delay: `${(i * 0.38) % 6}s`,
      duration: `${4 + (i * 0.6) % 5}s`,
      size: `${2 + (i % 4)}px`,
      color: ['#ffd700', '#c084fc', '#60a5fa', '#f97316', '#86efac', '#fb7185'][i % 6],
      drift: `${((i % 9) - 4) * 18}px`,
    })),
  []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            bottom: '-8px',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animation: `particleFloat ${p.duration} linear ${p.delay} infinite`,
            '--drift': p.drift,
            opacity: 0.7,
            filter: 'blur(0.5px)',
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

function Torch({ side }: { side: 'left' | 'right' }) {
  return (
    <div className={`absolute top-1/4 ${side === 'left' ? 'left-4 sm:left-10 lg:left-20' : 'right-4 sm:right-10 lg:right-20'} flex flex-col items-center z-10 select-none`}>
      {/* Flame glow halo */}
      <div className={`absolute -top-4 w-16 h-20 rounded-full blur-2xl animate-torch ${side === 'left' ? '' : ''}`}
        style={{ background: 'radial-gradient(ellipse, rgba(251,146,60,0.45) 0%, transparent 70%)' }}
      />
      {/* Flame core */}
      <div className="relative animate-torch" style={{ animationDelay: side === 'left' ? '0s' : '0.7s' }}>
        <div className="text-3xl leading-none">🔥</div>
      </div>
      {/* Torch body */}
      <div className="w-3 h-14 rounded-b-sm mt-0.5"
        style={{ background: 'linear-gradient(180deg, #92400e 0%, #44403c 100%)' }}
      />
      <div className="w-6 h-2 rounded-sm" style={{ background: '#292524' }} />
    </div>
  );
}

export default function HeroSection({ onEnter }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden select-none"
      style={{ background: 'radial-gradient(ellipse at 50% 30%, #1e0a3c 0%, #0d0d14 55%, #0a0a0f 100%)' }}>

      {/* Stone texture overlay */}
      <div className="absolute inset-0 stone-texture" />

      {/* Warm torch glow sides */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-y-0 left-0 w-1/3 animate-torch"
          style={{ background: 'linear-gradient(90deg, rgba(180,80,0,0.12) 0%, transparent 100%)', animationDelay: '0.3s' }} />
        <div className="absolute inset-y-0 right-0 w-1/3 animate-torch"
          style={{ background: 'linear-gradient(270deg, rgba(180,80,0,0.12) 0%, transparent 100%)', animationDelay: '1.1s' }} />
      </div>

      {/* Floating particles */}
      <Particles />

      {/* Torches */}
      <Torch side="left" />
      <Torch side="right" />

      {/* Main content */}
      <div className={`relative z-10 flex flex-col items-center gap-6 px-6 text-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

        {/* Top ornament */}
        <div className="flex items-center gap-3 text-amber-600/60 text-sm tracking-[0.4em] uppercase font-cinzel">
          <div className="w-12 h-px bg-amber-600/40" />
          ✦ ⚜ ✦
          <div className="w-12 h-px bg-amber-600/40" />
        </div>

        {/* King emblem */}
        <div className="relative mt-2 mb-2">
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full blur-3xl scale-150 opacity-40"
            style={{ background: 'radial-gradient(ellipse, #7c3aed 0%, transparent 70%)' }} />
          {/* Gold ring border */}
          <div className="relative w-40 h-40 rounded-full flex items-center justify-center animate-breathe"
            style={{
              background: 'radial-gradient(ellipse at 40% 35%, #2d1b69 0%, #1a0f3c 60%, #0d0820 100%)',
              border: '2px solid rgba(212,168,83,0.5)',
              boxShadow: '0 0 0 1px rgba(212,168,83,0.2), 0 0 40px rgba(124,58,237,0.3), inset 0 0 30px rgba(0,0,0,0.5)',
            }}>
            {/* Crown */}
            <div className="animate-crown-float text-7xl leading-none" style={{ filter: 'drop-shadow(0 0 12px rgba(212,168,83,0.8))' }}>
              👑
            </div>
          </div>
          {/* Crystal */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-4xl leading-none animate-crystal">
            🔮
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col items-center gap-1 mt-4">
          <h1 className="font-cinzel-decorative font-bold text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              backgroundImage: 'linear-gradient(180deg, #fde68a 0%, #fbbf24 30%, #d97706 60%, #92400e 100%)',
              lineHeight: 1.1,
              letterSpacing: '0.03em',
              textShadow: 'none',
            }}>
            Tower or Free?
          </h1>
          <p className="font-cinzel text-amber-400/75 tracking-[0.25em] uppercase text-sm sm:text-base mt-1">
            The AI Medieval King Judges All
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 w-full max-w-sm">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,168,83,0.5), transparent)' }} />
          <span className="text-amber-600 text-base">⚜</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,168,83,0.5), transparent)' }} />
        </div>

        {/* Subtitle */}
        <p className="text-stone-400 text-base sm:text-lg max-w-xs leading-relaxed font-geist">
          Bring your suspects. The King has no mercy.
        </p>

        {/* CTA Button */}
        <button
          onClick={onEnter}
          className="group relative mt-2 px-10 py-4 font-cinzel font-bold text-lg uppercase tracking-widest overflow-hidden rounded-lg transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          style={{ outline: 'none' }}
        >
          {/* Metallic gold background */}
          <div className="absolute inset-0 rounded-lg"
            style={{
              background: 'linear-gradient(180deg, #fde68a 0%, #f59e0b 25%, #d97706 50%, #b45309 75%, #d97706 90%, #fbbf24 100%)',
            }} />
          {/* Top shine */}
          <div className="absolute inset-x-0 top-0 h-1/2 rounded-t-lg opacity-30"
            style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)' }} />
          {/* Border */}
          <div className="absolute inset-0 rounded-lg border border-amber-200/40" />
          {/* Hover glow */}
          <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gold-pulse" />
          {/* Text */}
          <span className="relative text-stone-900 font-black flex items-center gap-2">
            ⚔️ ENTER THE COURT
          </span>
        </button>

        {/* Tagline */}
        <p className="text-stone-600 text-xs tracking-widest uppercase font-geist mt-1">
          AI-powered • No mercy • Share your fate
        </p>
      </div>

      {/* Bottom vignette */}
      <div className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(0deg, rgba(13,13,20,1) 0%, transparent 100%)' }} />
    </div>
  );
}
