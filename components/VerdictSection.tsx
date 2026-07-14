'use client';

import { useEffect, useState } from 'react';
import { type DeepPartial } from 'ai';
import { Castle, Crown, Scale, Swords } from 'lucide-react';
import { type Verdict } from '@/lib/schemas';
import ShareButton from './ShareButton';

interface Props {
  name: string;
  data: DeepPartial<Verdict> | undefined;
  isStreaming: boolean;
  hasMoreSuspects: boolean;
  onJudgeNext: () => void;
  onAddMore: () => void;
  onStartOver: () => void;
}

export default function VerdictSection({ name, data, isStreaming, hasMoreSuspects, onJudgeNext, onAddMore, onStartOver }: Props) {
  const [stamped, setStamped] = useState(false);

  const isTower = data?.verdict === 'TOWER';
  const isFree = data?.verdict === 'FREE';
  const hasVerdict = !!data?.verdict;

  useEffect(() => {
    if (hasVerdict) {
      const t = setTimeout(() => setStamped(true), 100);
      return () => clearTimeout(t);
    }
  }, [hasVerdict]);

  const towerTheme = {
    bg: 'linear-gradient(160deg, rgba(20,4,4,0.92) 0%, rgba(32,8,8,0.92) 100%)',
    border: 'rgba(220,38,38,0.5)',
    glow: 'rgba(220,38,38,0.18)',
    accent: '#f87171',
    badge: 'linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)',
    badgeBorder: 'rgba(248,113,113,0.4)',
    text: '#fca5a5',
    SealIcon: Castle,
  };

  const freeTheme = {
    bg: 'linear-gradient(160deg, rgba(4,20,10,0.92) 0%, rgba(7,32,15,0.92) 100%)',
    border: 'rgba(212,168,83,0.6)',
    glow: 'rgba(212,168,83,0.14)',
    accent: '#fbbf24',
    badge: 'linear-gradient(135deg, #065f46 0%, #064e3b 100%)',
    badgeBorder: 'rgba(251,191,36,0.4)',
    text: '#6ee7b7',
    SealIcon: Crown,
  };

  const neutralTheme = {
    bg: 'linear-gradient(160deg, rgba(11,11,17,0.92) 0%, rgba(16,16,29,0.92) 100%)',
    border: 'rgba(212,168,83,0.2)',
    glow: 'rgba(124,58,237,0.08)',
    accent: '#a78bfa',
    badge: 'linear-gradient(135deg, #1e1b4b 0%, #1a1040 100%)',
    badgeBorder: 'rgba(167,139,250,0.3)',
    text: '#c4b5fd',
    SealIcon: Scale,
  };

  const theme = isTower ? towerTheme : isFree ? freeTheme : neutralTheme;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start py-10 px-4">
      <div className="relative z-10 w-full max-w-lg flex flex-col items-center gap-6 animate-blur-fade-up">

        {/* "The King has Spoken" header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-3 text-amber-400/50 text-xs tracking-[0.4em] uppercase font-cinzel">
            <div className="w-8 h-px bg-amber-400/30" />⚜<div className="w-8 h-px bg-amber-400/30" />
          </div>
          <p className="font-cinzel text-amber-300 uppercase tracking-[0.3em] text-sm animate-flicker-in" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.85)' }}>
            The King Has Spoken
          </p>
        </div>

        {/* ── THE SHAREABLE CARD ── */}
        <div
          id="judgement-card"
          className="w-full rounded-2xl overflow-hidden animate-scroll-reveal"
          style={{
            background: theme.bg,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: `2px solid ${theme.border}`,
            boxShadow: `0 8px 32px ${theme.glow}`,
          }}
        >
          {/* Card top ornamental bar */}
          <div className="h-1 w-full"
            style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }} />

          {/* Card header */}
          <div className="flex flex-col items-center gap-3 pt-7 pb-4 px-6">
            {/* Seal badge */}
            <div className="w-14 h-14 rounded-full flex items-center justify-center animate-breathe shrink-0"
              style={{
                background: theme.badge,
                border: `2px solid ${theme.badgeBorder}`,
                boxShadow: `0 0 20px ${theme.glow}`,
              }}>
              <theme.SealIcon size={24} strokeWidth={1.75} style={{ color: theme.accent }} />
            </div>

            {/* "Judgment on" */}
            <p className="text-xs uppercase tracking-widest font-cinzel text-stone-300">
              Royal Judgment on
            </p>

            {/* Name */}
            <h2 className="font-cinzel font-black text-white text-2xl sm:text-3xl text-center leading-tight">
              {name}
            </h2>

            {/* Nickname */}
            {data?.nickname ? (
              <p className="font-cinzel italic text-sm text-center" style={{ color: theme.accent }}>
                &ldquo;{data.nickname}&rdquo;
              </p>
            ) : (
              <div className="h-5 w-40 rounded bg-white/5 animate-pulse" />
            )}
          </div>

          {/* Verdict stamp */}
          <div className="px-6 py-3">
            <div className="rounded-xl py-5 flex flex-col items-center gap-1"
              style={{
                background: theme.badge,
                border: `1px solid ${theme.badgeBorder}`,
              }}>
              {hasVerdict ? (
                <div className={`flex items-center gap-3 ${stamped ? 'animate-verdict-stamp' : 'opacity-0'}`}>
                  {isTower ? <Castle size={32} style={{ color: theme.accent }} /> : <Crown size={32} style={{ color: theme.accent }} />}
                  <p className="font-cinzel-decorative font-black text-center leading-none"
                    style={{
                      fontSize: 'clamp(1.5rem, 5.5vw, 2.25rem)',
                      color: theme.accent,
                      letterSpacing: '0.06em',
                    }}>
                    {isTower ? 'INTO THE TOWER!' : 'YOU ARE FREE!'}
                  </p>
                </div>
              ) : (
                <p className="font-cinzel text-white/30 uppercase tracking-widest text-lg animate-pulse">
                  Awaiting verdict...
                </p>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="mx-6">
            <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, ${theme.border}, transparent)` }} />
          </div>

          {/* Royal decree */}
          <div className="px-6 py-4">
            {data?.royal_decree ? (
              <p className="font-cinzel font-bold text-center text-sm uppercase tracking-wider text-stone-50">
                {data.royal_decree}
              </p>
            ) : (
              <div className="h-5 w-3/4 mx-auto rounded bg-white/5 animate-pulse" />
            )}
          </div>

          {/* Reason */}
          <div className="px-6 pb-4">
            {data?.reason ? (
              <p className="text-stone-300 text-sm italic text-center font-geist leading-relaxed">
                &ldquo;{data.reason}&rdquo;
              </p>
            ) : (
              <div className="flex flex-col gap-1.5">
                <div className="h-4 rounded bg-white/5 animate-pulse" />
                <div className="h-4 w-3/4 mx-auto rounded bg-white/5 animate-pulse" />
              </div>
            )}
          </div>

          {/* Stats grid */}
          <div className="mx-6 mb-4 rounded-xl p-4 grid grid-cols-3 gap-4"
            style={{
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
            <div className="flex flex-col gap-1 items-center text-center">
              <span className="text-xs uppercase tracking-wider font-cinzel text-stone-500">Confidence</span>
              {data?.confidence ? (
                <span className="font-black text-lg font-geist" style={{ color: theme.accent }}>{data.confidence}%</span>
              ) : (
                <div className="h-6 w-12 rounded bg-white/5 animate-pulse mt-1" />
              )}
            </div>
            <div className="flex flex-col gap-1 items-center text-center border-x border-white/5">
              <span className="text-xs uppercase tracking-wider font-cinzel text-stone-500">Crime</span>
              {data?.crime ? (
                <span className="font-bold text-xs font-geist text-stone-300 leading-tight">{data.crime}</span>
              ) : (
                <div className="h-4 w-16 rounded bg-white/5 animate-pulse mt-1" />
              )}
            </div>
            <div className="flex flex-col gap-1 items-center text-center">
              <span className="text-xs uppercase tracking-wider font-cinzel text-stone-500">Opinion</span>
              {data?.kings_opinion ? (
                <span className="font-bold text-xs font-geist text-stone-300 leading-tight">{data.kings_opinion}</span>
              ) : (
                <div className="h-4 w-16 rounded bg-white/5 animate-pulse mt-1" />
              )}
            </div>
          </div>

          {/* Evidence */}
          {(data?.evidence ?? []).filter(Boolean).length > 0 && (
            <div className="mx-6 mb-5 flex flex-col gap-2">
              <p className="text-xs uppercase tracking-widest font-cinzel text-stone-400 text-center">Evidence Against</p>
              {(data!.evidence as string[]).filter(Boolean).map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm font-geist text-stone-400">
                  <span className="text-amber-600 shrink-0 mt-0.5">§</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}

          {/* Card footer */}
          <div className="px-6 pb-5">
            {!isStreaming && hasVerdict && <ShareButton />}
          </div>

          {/* Bottom ornament */}
          <div className="flex items-center gap-2 px-6 pb-5 justify-center">
            <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${theme.border})` }} />
            <p className="text-stone-500 text-xs font-cinzel uppercase tracking-widest">Tower or Free? • AI Medieval King</p>
            <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${theme.border}, transparent)` }} />
          </div>
        </div>

        {/* Action buttons (outside the shareable card) */}
        {!isStreaming && hasVerdict && (
          <div className="flex flex-col sm:flex-row gap-3 w-full animate-fade-up" style={{ animationDelay: '0.3s' }}>
            {hasMoreSuspects && (
              <button
                onClick={onJudgeNext}
                className="flex-1 py-3 rounded-xl font-cinzel font-bold uppercase tracking-wider text-sm cursor-pointer transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(180deg, #e8c887 0%, #b8863f 100%)',
                  color: '#1c1917',
                  border: '1px solid rgba(212,168,83,0.4)',
                }}
              >
                <Swords size={16} />
                Next Suspect
              </button>
            )}
            <button
              onClick={onAddMore}
              className="flex-1 py-3 rounded-xl font-cinzel font-bold uppercase tracking-wider text-sm cursor-pointer transition-all hover:scale-105 active:scale-95 backdrop-blur-xl"
              style={{
                background: 'rgba(0,0,0,0.4)',
                color: '#c4b5fd',
                border: '1px solid rgba(167,139,250,0.3)',
              }}
            >
              + Add More
            </button>
            <button
              onClick={onStartOver}
              className="flex-1 py-3 rounded-xl font-cinzel font-bold uppercase tracking-wider text-sm cursor-pointer transition-all hover:opacity-70 backdrop-blur-xl"
              style={{
                background: 'rgba(0,0,0,0.4)',
                color: '#d6d3d1',
                border: '1px solid rgba(214,211,209,0.25)',
              }}
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
