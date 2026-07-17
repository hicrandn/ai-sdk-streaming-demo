'use client';

import { useEffect, useState, useMemo } from 'react';
import { Scale } from 'lucide-react';
import {
  INK, INK_BODY, INK_FADED, INK_LINE,
  PARCHMENT_BG, PARCHMENT_BORDER, PARCHMENT_SHADOW,
  WAX_SHADOW, WAX_NEUTRAL,
} from '@/lib/parchment';

const LOADING_MSGS = [
  'The King ponders your fate...',
  'Consulting the royal seers...',
  'Checking dungeon availability...',
  'Reviewing the ancient scrolls...',
  'Weighing your sins on the royal scales...',
  'Summoning the court jester for context...',
  'The King raises his magical crystal...',
];

interface Props {
  name: string;
  isShaking: boolean;
}

function LoadingParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 16 }, (_, i) => ({
      id: i,
      left: `${3 + (i * 6) % 94}%`,
      delay: `${(i * 0.22) % 4}s`,
      duration: `${2.5 + (i * 0.4) % 3}s`,
      size: `${3 + (i % 3)}px`,
      color: ['#fbbf24', '#d4a853', '#fde68a', '#f59e0b'][i % 4],
      drift: `${((i % 11) - 5) * 22}px`,
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
            bottom: '-10px',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animation: `particleFloat ${p.duration} linear ${p.delay} infinite`,
            '--drift': p.drift,
            filter: 'blur(0.5px)',
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

export default function LoadingSection({ name, isShaking }: Props) {
  const [msgIdx, setMsgIdx] = useState(0);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const id = setInterval(() => setMsgIdx(i => (i + 1) % LOADING_MSGS.length), 1600);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setDots(d => d.length >= 3 ? '' : d + '.'), 500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 ${isShaking ? 'animate-shake' : ''}`}>
      <LoadingParticles />

      {/* Parchment being written — same document language as the verdict decree */}
      <div
        className="relative z-10 w-full max-w-md animate-blur-fade-up"
        style={{
          background: PARCHMENT_BG,
          border: PARCHMENT_BORDER,
          borderRadius: 6,
          boxShadow: PARCHMENT_SHADOW,
          color: INK,
        }}
      >
        <div className="m-2.5 px-6 pt-7 pb-6 sm:px-9 flex flex-col items-center text-center" style={{ border: `1px solid ${INK_LINE}`, borderRadius: 3 }}>

          {/* Heading */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-3 text-xs font-cinzel" style={{ color: INK_FADED }}>
              <div className="h-px w-10" style={{ background: INK_LINE }} />⚜<div className="h-px w-10" style={{ background: INK_LINE }} />
            </div>
            <p className="font-cinzel-decorative font-bold uppercase text-lg tracking-[0.25em]">The Court Deliberates</p>
            <p className="font-cinzel text-[11px] uppercase tracking-[0.2em]" style={{ color: INK_FADED }}>
              By order of His Majesty the King
            </p>
          </div>

          {/* Subject */}
          <div className="mt-6 flex flex-col items-center gap-1.5">
            <p className="font-cinzel text-[11px] uppercase tracking-[0.18em]" style={{ color: INK_FADED }}>
              Judgment is being passed upon
            </p>
            <h2 className="font-cinzel-decorative font-black text-3xl sm:text-4xl leading-tight wrap-break-word max-w-full">
              {name}
            </h2>
          </div>

          {/* Wax being prepared */}
          <div
            className="mt-7 w-16 h-16 rounded-full flex items-center justify-center animate-breathe"
            style={{ background: WAX_NEUTRAL, boxShadow: WAX_SHADOW, transform: 'rotate(8deg)' }}
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ border: '1px solid rgba(255,255,255,0.3)' }}>
              <Scale size={22} strokeWidth={1.75} style={{ color: 'rgba(255,244,220,0.9)' }} />
            </div>
          </div>

          {/* Loading message */}
          <div className="mt-6 h-6 flex items-center">
            <p className="font-geist italic text-sm" style={{ color: INK_BODY }}>
              {LOADING_MSGS[msgIdx]}{dots}
            </p>
          </div>

          {/* Progress dots */}
          <div className="mt-4 flex gap-2">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full"
                style={{ background: INK_FADED, animation: `breathe 1.2s ease-in-out ${i * 0.4}s infinite` }} />
            ))}
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center gap-2 justify-center w-full">
            <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${INK_LINE})` }} />
            <p className="font-cinzel text-[10px] uppercase tracking-[0.2em]" style={{ color: INK_FADED }}>
              The King does not rush
            </p>
            <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${INK_LINE}, transparent)` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
