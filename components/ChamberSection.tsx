'use client';

import { useState, useEffect, useRef } from 'react';

const PLACEHOLDER_CYCLE = ['Elon Musk', 'Kanye West', 'My Ex', 'Pizza', 'Your Boss', 'Mondays', 'AI', 'Your Cat'];
const SUSPECT_EMOJIS = ['⚔️', '🏹', '🗡️', '🛡️', '🔱', '🏰', '🔮', '👁️', '🌙', '⚜️'];

interface Props {
  suspects: string[];
  onAddSuspect: (name: string) => void;
  onRemoveSuspect: (name: string) => void;
  onJudge: () => void;
}

export default function ChamberSection({ suspects, onAddSuspect, onRemoveSuspect, onJudge }: Props) {
  const [input, setInput] = useState('');
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setPlaceholderIdx(i => (i + 1) % PLACEHOLDER_CYCLE.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed || suspects.includes(trimmed) || suspects.length >= 6) return;
    onAddSuspect(trimmed);
    setInput('');
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-16"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, #1e0a3c 0%, #0d0d14 50%, #0a0a0f 100%)' }}>

      {/* Stone texture */}
      <div className="absolute inset-0 stone-texture pointer-events-none" />

      {/* Warm side glows */}
      <div className="absolute inset-y-0 left-0 w-1/4 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, rgba(180,80,0,0.08) 0%, transparent 100%)' }} />
      <div className="absolute inset-y-0 right-0 w-1/4 pointer-events-none"
        style={{ background: 'linear-gradient(270deg, rgba(180,80,0,0.08) 0%, transparent 100%)' }} />

      <div className="relative z-10 w-full max-w-xl flex flex-col items-center gap-8 animate-fade-up">

        {/* Header */}
        <div className="text-center flex flex-col items-center gap-3">
          <div className="flex items-center gap-3 text-amber-600/50 text-xs tracking-[0.4em] uppercase font-cinzel">
            <div className="w-8 h-px bg-amber-600/30" />⚜<div className="w-8 h-px bg-amber-600/30" />
          </div>
          <h2 className="font-cinzel font-black text-transparent bg-clip-text text-3xl sm:text-4xl"
            style={{ backgroundImage: 'linear-gradient(180deg, #fde68a 0%, #d97706 100%)' }}>
            Who Shall Face the King?
          </h2>
          <p className="text-stone-500 text-sm font-geist">
            Add up to 6 suspects. The king judges all.
          </p>
        </div>

        {/* Input parchment area */}
        <div className="w-full rounded-xl overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #f5e6c0 0%, #e8d09a 100%)',
            boxShadow: '0 0 0 1px rgba(212,168,83,0.4), 0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3)',
          }}>
          {/* Parchment header */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-amber-800/20">
            <span className="text-amber-900/60 text-xs font-cinzel uppercase tracking-widest">Royal Court Register</span>
            <div className="flex-1 h-px bg-amber-800/15" />
            <span className="text-amber-900/40 text-xs">📜</span>
          </div>
          {/* Input row */}
          <div className="flex items-center gap-2 px-4 py-3">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (suspects.length === 0 && !input.trim()) return;
                  if (input.trim()) { handleAdd(); }
                  else if (suspects.length > 0) { onJudge(); }
                }
              }}
              placeholder={PLACEHOLDER_CYCLE[placeholderIdx]}
              maxLength={60}
              className="flex-1 bg-transparent text-amber-900 placeholder-amber-700/50 text-base font-geist focus:outline-none"
            />
            <button
              onClick={handleAdd}
              disabled={!input.trim() || suspects.length >= 6}
              className="px-4 py-1.5 rounded-lg text-sm font-bold font-cinzel uppercase tracking-wide transition-all duration-150 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(180deg, #92400e 0%, #6b2c04 100%)',
                color: '#fde68a',
                border: '1px solid rgba(212,168,83,0.3)',
              }}
            >
              + Add
            </button>
          </div>
        </div>

        {/* Suspects grid */}
        {suspects.length > 0 && (
          <div className="w-full flex flex-col gap-3">
            <p className="text-amber-600/60 text-xs uppercase tracking-widest font-cinzel text-center">
              {suspects.length} suspect{suspects.length !== 1 ? 's' : ''} awaiting judgment
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {suspects.map((name, i) => (
                <div key={name} className="relative group rounded-xl overflow-hidden animate-fade-up"
                  style={{
                    animationDelay: `${i * 0.08}s`,
                    background: 'linear-gradient(135deg, #1a1025 0%, #110d1e 100%)',
                    border: '1px solid rgba(212,168,83,0.25)',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
                  }}>
                  {/* Corner ornaments */}
                  <div className="absolute top-1.5 left-2 text-amber-600/30 text-xs">✦</div>
                  <div className="absolute top-1.5 right-2 text-amber-600/30 text-xs">✦</div>

                  <div className="flex items-center gap-3 p-4">
                    {/* Emoji avatar */}
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                      style={{
                        background: 'radial-gradient(ellipse, #2d1b69 0%, #1a0f3c 100%)',
                        border: '1px solid rgba(212,168,83,0.3)',
                      }}>
                      {SUSPECT_EMOJIS[i % SUSPECT_EMOJIS.length]}
                    </div>
                    {/* Name */}
                    <div className="flex-1 min-w-0">
                      <p className="text-amber-100 font-cinzel font-bold text-sm truncate">{name}</p>
                      <p className="text-stone-500 text-xs font-geist mt-0.5">Awaiting royal judgment...</p>
                    </div>
                    {/* Remove */}
                    <button
                      onClick={() => onRemoveSuspect(name)}
                      className="text-stone-600 hover:text-red-400 transition-colors text-lg leading-none cursor-pointer flex-shrink-0 w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                  {i === 0 && (
                    <div className="px-4 pb-2">
                      <span className="text-xs text-amber-600/60 font-cinzel uppercase tracking-wider">
                        ← Judges first
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Judge button */}
        {suspects.length > 0 && (
          <button
            onClick={onJudge}
            className="group relative w-full max-w-sm py-5 font-cinzel font-black text-xl uppercase tracking-widest rounded-xl overflow-hidden transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer animate-gold-pulse"
          >
            <div className="absolute inset-0 rounded-xl"
              style={{ background: 'linear-gradient(180deg, #fde68a 0%, #f59e0b 25%, #d97706 55%, #b45309 80%, #d97706 95%, #fbbf24 100%)' }} />
            <div className="absolute inset-x-0 top-0 h-1/2 rounded-t-xl opacity-25"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 100%)' }} />
            <div className="absolute inset-0 rounded-xl border border-amber-200/30" />
            <span className="relative text-stone-900 font-black flex items-center justify-center gap-3">
              ⚔️ JUDGE THEM
              {suspects.length > 1 && <span className="text-stone-700 font-bold text-base">({suspects.length})</span>}
            </span>
          </button>
        )}

        {suspects.length === 0 && (
          <p className="text-stone-600 text-sm font-geist text-center">
            Add a name above to begin the judgment
          </p>
        )}
      </div>
    </div>
  );
}
