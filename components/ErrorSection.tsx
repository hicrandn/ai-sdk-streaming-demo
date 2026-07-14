'use client';

import { RotateCcw, TriangleAlert } from 'lucide-react';

interface Props {
  name: string;
  message?: string;
  onRetry: () => void;
  onStartOver: () => void;
}

export default function ErrorSection({ name, message, onRetry, onStartOver }: Props) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
      <div className="cinematic-panel relative z-10 flex flex-col items-center gap-6 px-8 py-10 sm:px-12 sm:py-12 rounded-2xl text-center max-w-md animate-blur-fade-up">

        <div className="w-20 h-20 rounded-full flex items-center justify-center shrink-0"
          style={{
            background: 'radial-gradient(ellipse at 40% 30%, #2a1512 0%, #150a08 70%)',
            border: '2px solid rgba(248,113,113,0.4)',
            boxShadow: '0 0 24px rgba(220,38,38,0.2)',
          }}>
          <TriangleAlert size={36} strokeWidth={1.5} className="text-red-400" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-stone-300 text-xs font-cinzel uppercase tracking-widest">The Court Was Interrupted</p>
          <h2 className="font-cinzel font-black text-red-300 text-xl sm:text-2xl">
            The King Could Not Judge {name}
          </h2>
        </div>

        <p className="text-stone-300 text-sm font-geist" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.85)' }}>
          The royal messenger failed to return with a verdict. This is usually temporary — try again in a moment.
        </p>

        {message && (
          <p className="text-stone-500 text-xs font-geist break-words line-clamp-3">
            {message}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={onRetry}
            className="flex-1 py-3 rounded-xl font-cinzel font-bold uppercase tracking-wider text-sm cursor-pointer transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(180deg, #e8c887 0%, #b8863f 100%)',
              color: '#1c1917',
              border: '1px solid rgba(212,168,83,0.4)',
            }}
          >
            <RotateCcw size={16} />
            Try Again
          </button>
          <button
            onClick={onStartOver}
            className="flex-1 py-3 rounded-xl font-cinzel font-bold uppercase tracking-wider text-sm cursor-pointer transition-all hover:opacity-70"
            style={{
              background: 'transparent',
              color: '#a8a29e',
              border: '1px solid rgba(168,162,158,0.3)',
            }}
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
}
