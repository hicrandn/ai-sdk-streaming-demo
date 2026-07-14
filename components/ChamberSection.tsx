'use client';

import { useState, useEffect, useRef } from 'react';
import { Plus, Swords, X } from 'lucide-react';

const PLACEHOLDER_CYCLE = ['Elon Musk', 'Kanye West', 'My Ex', 'Pizza', 'Your Boss', 'Mondays', 'AI', 'Your Cat'];

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
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <div className="relative z-10 w-full max-w-xl flex flex-col items-center gap-8 animate-blur-fade-up">

        {/* Header */}
        <div className="text-center flex flex-col items-center gap-3">
          <h2 className="font-cinzel font-black text-transparent bg-clip-text text-3xl sm:text-4xl"
            style={{
              backgroundImage: 'linear-gradient(180deg, #f0d9a3 0%, #c99a4e 100%)',
              filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.7))',
            }}>
            Who Shall Face the King?
          </h2>
          <p className="text-stone-200 text-sm font-geist" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.85)' }}>
            Add up to 6 suspects. The king judges all.
          </p>
        </div>

        {/* Input panel */}
        <div className="cinematic-panel w-full flex items-center gap-2 rounded-2xl px-4 py-3 transition-colors focus-within:border-amber-400/40">
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
            className="flex-1 bg-transparent text-amber-100 placeholder-stone-500 text-base font-geist focus:outline-none"
          />
          <button
            onClick={handleAdd}
            disabled={!input.trim() || suspects.length >= 6}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-bold font-cinzel uppercase tracking-wide text-amber-200 border border-amber-400/25 bg-amber-400/10 hover:bg-amber-400/15 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Plus size={14} strokeWidth={2.5} />
            Add
          </button>
        </div>

        {/* Suspects list */}
        {suspects.length > 0 && (
          <div className="w-full flex flex-col gap-3">
            <p className="text-amber-300 text-xs uppercase tracking-widest font-cinzel text-center" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.85)' }}>
              {suspects.length} suspect{suspects.length !== 1 ? 's' : ''} awaiting judgment
            </p>
            <div className="cinematic-panel w-full rounded-2xl divide-y divide-white/8 overflow-hidden">
              {suspects.map((name, i) => (
                <div key={name} className="flex items-center gap-3 px-4 py-3 animate-blur-fade-up"
                  style={{ animationDelay: `${i * 60}ms` }}>
                  {/* Order badge */}
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-cinzel text-amber-300 bg-amber-400/10 border border-amber-400/20 shrink-0">
                    {i + 1}
                  </div>
                  {/* Name */}
                  <div className="flex-1 min-w-0 flex items-center gap-2">
                    <p className="text-amber-100 font-cinzel font-bold text-sm truncate">{name}</p>
                    {i === 0 && (
                      <span className="shrink-0 text-[10px] uppercase tracking-wider font-cinzel text-amber-400/70 border border-amber-400/25 rounded-full px-2 py-0.5">
                        First
                      </span>
                    )}
                  </div>
                  {/* Remove */}
                  <button
                    onClick={() => onRemoveSuspect(name)}
                    className="text-stone-500 hover:text-red-400 transition-colors cursor-pointer shrink-0 w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/5"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Judge button */}
        {suspects.length > 0 && (
          <button
            onClick={onJudge}
            className="w-full max-w-sm py-4 font-cinzel font-black text-lg uppercase tracking-widest rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center justify-center gap-3"
            style={{
              background: 'linear-gradient(180deg, #e8c887 0%, #b8863f 100%)',
              color: '#1c1917',
              border: '1px solid rgba(212,168,83,0.4)',
            }}
          >
            <Swords size={20} />
            Judge Them
            {suspects.length > 1 && <span className="opacity-60 font-bold text-base">({suspects.length})</span>}
          </button>
        )}

        {suspects.length === 0 && (
          <p className="text-stone-200 text-sm font-geist text-center" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.85)' }}>
            Add a name above to begin the judgment
          </p>
        )}
      </div>
    </div>
  );
}
