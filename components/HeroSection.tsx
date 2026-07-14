'use client';

import { Crown } from 'lucide-react';

interface Props {
  onEnter: () => void;
}

export default function HeroSection({ onEnter }: Props) {
  return (
    <div className="flex h-screen flex-col justify-end px-4 pb-10 sm:px-6 sm:pb-14 md:px-12 md:pb-20 select-none">
      <h1
        className="animate-blur-fade-up font-cinzel-decorative font-bold text-transparent bg-clip-text mb-4 md:mb-6"
        style={{
          fontSize: 'clamp(1.5rem, 8vw, 3rem)',
          lineHeight: 1.05,
          letterSpacing: '0.01em',
          backgroundImage:
            'linear-gradient(180deg, #f0d9a3 0%, #c99a4e 100%)',
          filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.7))',
          animationDelay: '400ms',
        }}
      >
        Tower or Free?
      </h1>

      <p
        className="animate-blur-fade-up max-w-2xl font-geist text-base text-stone-200 sm:text-lg md:text-xl mb-8 md:mb-12"
        style={{ animationDelay: '500ms', textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}
      >
        Bring your suspects before the throne. The King has no mercy — only judgment, delivered live.
      </p>

      <div className="animate-blur-fade-up" style={{ animationDelay: '600ms' }}>
        <button
          onClick={onEnter}
          className="liquid-glass group inline-flex items-center gap-2 rounded-full px-6 py-2.5 sm:px-8 sm:py-3 font-cinzel font-bold text-sm sm:text-base uppercase tracking-widest text-amber-100 transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Crown size={18} className="text-amber-300" />
          Enter the Court
        </button>
      </div>
    </div>
  );
}
