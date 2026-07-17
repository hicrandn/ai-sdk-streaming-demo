'use client';

import { Crown } from 'lucide-react';
import RoyalButton from './RoyalButton';

interface Props {
  onEnter: () => void;
}

export default function HeroSection({ onEnter }: Props) {
  return (
    <div className="flex h-screen flex-col justify-end px-4 pb-10 sm:px-6 sm:pb-14 md:px-12 md:pb-20 select-none">
      <h1
        className="animate-blur-fade-up font-cinzel-decorative font-bold heading-gold mb-4 md:mb-6"
        style={{
          fontSize: 'clamp(1.5rem, 8vw, 3rem)',
          lineHeight: 1.05,
          letterSpacing: '0.01em',
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
        <RoyalButton
          onClick={onEnter}
          className="inline-flex rounded-full px-6 py-2.5 sm:px-8 sm:py-3 font-bold text-sm sm:text-base tracking-widest"
        >
          <Crown size={18} />
          Enter the Court
        </RoyalButton>
      </div>
    </div>
  );
}
