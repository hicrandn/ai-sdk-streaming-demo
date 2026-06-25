'use client';

import { useEffect, useState } from 'react';
import { type DeepPartial } from 'ai';
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

function StatBadge({ label, value }: { label: string; value?: string | number }) {
  if (!value) return (
    <div className="flex flex-col gap-1">
      <span className="text-xs uppercase tracking-wider font-cinzel opacity-50">{label}</span>
      <div className="h-4 w-20 rounded bg-white/5 animate-pulse" />
    </div>
  );
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs uppercase tracking-wider font-cinzel opacity-60">{label}</span>
      <span className="font-bold text-sm font-geist">{value}</span>
    </div>
  );
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
    bg: 'linear-gradient(160deg, #1a0505 0%, #2d0a0a 50%, #1a0505 100%)',
    border: 'rgba(220,38,38,0.5)',
    glow: 'rgba(220,38,38,0.2)',
    accent: '#f87171',
    badge: 'linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)',
    badgeBorder: 'rgba(248,113,113,0.4)',
    text: '#fca5a5',
    seal: '🏰',
  };

  const freeTheme = {
    bg: 'linear-gradient(160deg, #051a0c 0%, #0a2d15 50%, #051a0c 100%)',
    border: 'rgba(212,168,83,0.6)',
    glow: 'rgba(212,168,83,0.15)',
    accent: '#fbbf24',
    badge: 'linear-gradient(135deg, #065f46 0%, #064e3b 100%)',
    badgeBorder: 'rgba(251,191,36,0.4)',
    text: '#6ee7b7',
    seal: '👑',
  };

  const neutralTheme = {
    bg: 'linear-gradient(160deg, #0d0d14 0%, #16162a 50%, #0d0d14 100%)',
    border: 'rgba(212,168,83,0.2)',
    glow: 'rgba(124,58,237,0.1)',
    accent: '#a78bfa',
    badge: 'linear-gradient(135deg, #1e1b4b 0%, #1a1040 100%)',
    badgeBorder: 'rgba(167,139,250,0.3)',
    text: '#c4b5fd',
    seal: '🔮',
  };

  const theme = isTower ? towerTheme : isFree ? freeTheme : neutralTheme;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden py-10 px-4"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, #1e0a3c 0%, #0d0d14 50%, #0a0a0f 100%)' }}>

      <div className="absolute inset-0 stone-texture pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center gap-6 animate-fade-up">

        {/* "The King has Spoken" header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-3 text-amber-600/50 text-xs tracking-[0.4em] uppercase font-cinzel">
            <div className="w-8 h-px bg-amber-600/30" />⚜<div className="w-8 h-px bg-amber-600/30" />
          </div>
          <p className="font-cinzel text-amber-400/80 uppercase tracking-[0.3em] text-sm animate-flicker-in">
            The King Has Spoken
          </p>
        </div>

        {/* ── THE SHAREABLE CARD ── */}
        <div
          id="judgement-card"
          className="w-full rounded-2xl overflow-hidden animate-scroll-reveal"
          style={{
            background: theme.bg,
            border: `2px solid ${theme.border}`,
            boxShadow: `0 0 0 1px ${theme.border.replace('0.5', '0.2').replace('0.6', '0.25')}, 0 8px 40px ${theme.glow}, 0 2px 80px ${theme.glow}`,
          }}
        >
          {/* Card top ornamental bar */}
          <div className="h-1 w-full"
            style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }} />

          {/* Card header */}
          <div className="flex flex-col items-center gap-3 pt-7 pb-4 px-6">
            {/* Seal badge */}
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-3xl animate-breathe flex-shrink-0"
              style={{
                background: theme.badge,
                border: `2px solid ${theme.badgeBorder}`,
                boxShadow: `0 0 20px ${theme.glow}`,
              }}>
              {theme.seal}
            </div>

            {/* "Judgment on" */}
            <p className="text-xs uppercase tracking-widest font-cinzel opacity-50 text-white">
              Royal Judgment on
            </p>

            {/* Name */}
            <h2 className="font-cinzel font-black text-white text-2xl sm:text-3xl text-center leading-tight">
              {name}
            </h2>

            {/* Nickname */}
            {data?.nickname ? (
              <p className="font-cinzel italic text-sm text-center" style={{ color: theme.accent, opacity: 0.85 }}>
                "{data.nickname}"
              </p>
            ) : (
              <div className="h-5 w-40 rounded bg-white/5 animate-pulse" />
            )}
          </div>

          {/* Verdict stamp */}
          <div className="px-6 py-3">
            <div className="rounded-xl py-5 flex flex-col items-center gap-1"
              style={{
                background: `linear-gradient(135deg, ${theme.badge.replace('linear-gradient(135deg, ', '').replace(')', '')})`,
                border: `1px solid ${theme.badgeBorder}`,
              }}>
              {hasVerdict ? (
                <div className={stamped ? 'animate-verdict-stamp' : 'opacity-0'}>
                  <p className="font-cinzel-decorative font-black text-center leading-none"
                    style={{
                      fontSize: 'clamp(2rem, 7vw, 3rem)',
                      color: theme.accent,
                      textShadow: `0 0 30px ${theme.accent}66`,
                      letterSpacing: '0.08em',
                    }}>
                    {isTower ? '🏰 INTO THE TOWER!' : '🕊️ YOU ARE FREE!'}
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
              <p className="font-cinzel font-bold text-center text-sm uppercase tracking-wider" style={{ color: theme.accent }}>
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
                "{data.reason}"
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
              <p className="text-xs uppercase tracking-widest font-cinzel text-stone-600 text-center">Evidence Against</p>
              {(data!.evidence as string[]).filter(Boolean).map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm font-geist text-stone-400">
                  <span className="text-amber-600 flex-shrink-0 mt-0.5">§</span>
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
            <p className="text-stone-700 text-xs font-cinzel uppercase tracking-widest">Tower or Free? • AI Medieval King</p>
            <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${theme.border}, transparent)` }} />
          </div>
        </div>

        {/* Action buttons (outside the shareable card) */}
        {!isStreaming && hasVerdict && (
          <div className="flex flex-col sm:flex-row gap-3 w-full animate-fade-up" style={{ animationDelay: '0.3s' }}>
            {hasMoreSuspects && (
              <button
                onClick={onJudgeNext}
                className="flex-1 py-3 rounded-xl font-cinzel font-bold uppercase tracking-wider text-sm cursor-pointer transition-all hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(180deg, #fde68a 0%, #f59e0b 30%, #d97706 70%, #b45309 100%)',
                  color: '#1c1917',
                  border: '1px solid rgba(251,191,36,0.4)',
                }}
              >
                ⚔️ Next Suspect
              </button>
            )}
            <button
              onClick={onAddMore}
              className="flex-1 py-3 rounded-xl font-cinzel font-bold uppercase tracking-wider text-sm cursor-pointer transition-all hover:scale-105 active:scale-95"
              style={{
                background: 'rgba(255,255,255,0.05)',
                color: '#a78bfa',
                border: '1px solid rgba(167,139,250,0.25)',
              }}
            >
              + Add More
            </button>
            <button
              onClick={onStartOver}
              className="flex-1 py-3 rounded-xl font-cinzel font-bold uppercase tracking-wider text-sm cursor-pointer transition-all hover:opacity-70"
              style={{
                background: 'transparent',
                color: '#57534e',
                border: '1px solid rgba(87,83,78,0.3)',
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
