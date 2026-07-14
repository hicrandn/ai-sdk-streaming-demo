'use client';

import { useEffect, useState, useMemo } from 'react';
import { Scale } from 'lucide-react';

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

      <div className="cinematic-panel relative z-10 flex flex-col items-center gap-8 px-8 py-10 sm:px-12 sm:py-12 rounded-2xl text-center animate-blur-fade-up">

        {/* Royal seal animation */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full blur-3xl scale-150 opacity-40"
            style={{ background: 'radial-gradient(ellipse, #d4a853 0%, transparent 70%)' }} />
          <div className="relative w-32 h-32 rounded-full flex items-center justify-center animate-breathe"
            style={{
              background: 'radial-gradient(ellipse at 40% 30%, #2a2015 0%, #110d08 70%)',
              border: '2px solid rgba(212,168,83,0.45)',
              boxShadow: '0 0 24px rgba(212,168,83,0.25)',
            }}>
            <Scale size={52} strokeWidth={1.5} className="text-amber-300" />
          </div>
          {/* Orbiting particles */}
          {[0, 1, 2].map(i => (
            <div key={i} className="absolute w-2.5 h-2.5 rounded-full"
              style={{
                top: '50%', left: '50%',
                backgroundColor: ['#fbbf24', '#d4a853', '#fde68a'][i],
                animation: `particleFloat ${2.5 + i * 0.4}s linear ${i * 0.8}s infinite`,
                '--drift': `${(i - 1) * 30}px`,
                transform: `translate(-50%, -50%) rotate(${i * 120}deg) translateX(64px)`,
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Suspect name */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-stone-300 text-xs font-cinzel uppercase tracking-widest">Now Judging</p>
          <h2 className="font-cinzel font-black text-transparent bg-clip-text text-3xl sm:text-4xl"
            style={{ backgroundImage: 'linear-gradient(180deg, #fde68a 0%, #d97706 100%)' }}>
            {name}
          </h2>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 w-full max-w-xs">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,168,83,0.4))' }} />
          <span className="text-amber-400/60 text-sm">⚜</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(212,168,83,0.4), transparent)' }} />
        </div>

        {/* Loading message */}
        <div className="h-8 flex items-center">
          <p className="text-amber-100 text-base font-geist" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.85)' }}>
            {LOADING_MSGS[msgIdx]}{dots}
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-2 h-2 rounded-full bg-amber-400/60"
              style={{ animation: `breathe ${1.2}s ease-in-out ${i * 0.4}s infinite` }} />
          ))}
        </div>

        <p className="text-stone-300 text-xs font-geist uppercase tracking-widest">
          The King does not rush
        </p>
      </div>
    </div>
  );
}
