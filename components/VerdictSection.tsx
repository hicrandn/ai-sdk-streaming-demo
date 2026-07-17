'use client';

import { useEffect, useState } from 'react';
import { type DeepPartial } from 'ai';
import { Castle, Crown, Swords } from 'lucide-react';
import { type Verdict } from '@/lib/schemas';
import ShareButton from './ShareButton';
import RoyalButton from './RoyalButton';
import {
  INK, INK_BODY, INK_FADED, INK_LINE, PLACEHOLDER,
  PARCHMENT_BG, PARCHMENT_BORDER, PARCHMENT_SHADOW,
  WAX_SHADOW, WAX_NEUTRAL, WAX_TOWER, WAX_FREE,
} from '@/lib/parchment';

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
  const hasVerdict = !!data?.verdict;

  useEffect(() => {
    if (hasVerdict) {
      const t = setTimeout(() => setStamped(true), 100);
      return () => clearTimeout(t);
    }
  }, [hasVerdict]);

  const stampColor = isTower ? '#9b1c1c' : '#166534';
  const waxGradient = isTower ? WAX_TOWER : WAX_FREE;
  const SealIcon = isTower ? Castle : Crown;

  const evidence = (data?.evidence ?? []).filter(Boolean) as string[];

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

        {/* ── THE ROYAL DECREE (shareable) ── */}
        <div
          id="judgement-card"
          className="w-full animate-scroll-reveal"
          style={{
            background: PARCHMENT_BG,
            border: PARCHMENT_BORDER,
            borderRadius: 6,
            boxShadow: PARCHMENT_SHADOW,
            color: INK,
          }}
        >
          {/* inner frame */}
          <div className="m-2.5 px-6 pt-7 pb-6 sm:px-9" style={{ border: `1px solid ${INK_LINE}`, borderRadius: 3 }}>

            {/* Decree heading */}
            <div className="flex flex-col items-center gap-1.5 text-center">
              <div className="flex items-center gap-3 text-xs font-cinzel" style={{ color: INK_FADED }}>
                <div className="h-px w-10" style={{ background: INK_LINE }} />⚜<div className="h-px w-10" style={{ background: INK_LINE }} />
              </div>
              <p className="font-cinzel-decorative font-bold uppercase text-lg tracking-[0.25em]">Royal Decree</p>
              <p className="font-cinzel text-[11px] uppercase tracking-[0.2em]" style={{ color: INK_FADED }}>
                By order of His Majesty the King
              </p>
            </div>

            {/* Subject */}
            <div className="mt-6 flex flex-col items-center gap-1.5 text-center">
              <p className="font-cinzel text-[11px] uppercase tracking-[0.18em]" style={{ color: INK_FADED }}>
                Let it be known that judgment is passed upon
              </p>
              <h2 className="font-cinzel-decorative font-black text-3xl sm:text-4xl leading-tight wrap-break-word max-w-full">
                {name}
              </h2>
              {data?.nickname ? (
                <p className="font-cinzel italic text-sm" style={{ color: INK_FADED }}>
                  &ldquo;{data.nickname}&rdquo;
                </p>
              ) : (
                <div className="h-4 w-44 rounded animate-pulse" style={{ background: PLACEHOLDER }} />
              )}
            </div>

            {/* Crime */}
            <div className="mt-6 text-center">
              <p className="font-cinzel text-[11px] uppercase tracking-[0.2em] mb-1" style={{ color: INK_FADED }}>
                For the crime of
              </p>
              {data?.crime ? (
                <p className="font-cinzel font-bold text-base uppercase tracking-wide">{data.crime}</p>
              ) : (
                <div className="h-5 w-2/3 mx-auto rounded animate-pulse" style={{ background: PLACEHOLDER }} />
              )}
            </div>

            {/* Reason */}
            <div className="mt-4 text-center">
              {data?.reason ? (
                <p className="font-geist italic text-sm leading-relaxed" style={{ color: INK_BODY }}>
                  &ldquo;{data.reason}&rdquo;
                </p>
              ) : (
                <div className="flex flex-col gap-1.5">
                  <div className="h-4 rounded animate-pulse" style={{ background: PLACEHOLDER }} />
                  <div className="h-4 w-3/4 mx-auto rounded animate-pulse" style={{ background: PLACEHOLDER }} />
                </div>
              )}
            </div>

            {/* Evidence */}
            {evidence.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="h-px flex-1" style={{ background: INK_LINE }} />
                  <p className="font-cinzel text-[11px] uppercase tracking-[0.2em]" style={{ color: INK_FADED }}>
                    The evidence presented
                  </p>
                  <div className="h-px flex-1" style={{ background: INK_LINE }} />
                </div>
                <ol className="flex flex-col gap-1.5">
                  {evidence.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm font-geist" style={{ color: INK_BODY }}>
                      <span className="font-cinzel font-bold shrink-0 mt-px" style={{ color: INK_FADED }}>
                        {['I.', 'II.', 'III.'][i] ?? `${i + 1}.`}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Royal decree proclamation */}
            <div className="mt-6 text-center">
              {data?.royal_decree ? (
                <p className="font-cinzel font-black text-sm sm:text-base uppercase tracking-[0.08em] leading-snug">
                  {data.royal_decree}
                </p>
              ) : (
                <div className="h-5 w-3/4 mx-auto rounded animate-pulse" style={{ background: PLACEHOLDER }} />
              )}
            </div>

            {/* THE STAMP */}
            <div className="mt-6 mb-2 flex justify-center">
              {hasVerdict ? (
                <div style={{ transform: 'rotate(-5deg)' }}>
                  <div
                    className={stamped ? 'animate-verdict-stamp' : 'opacity-0'}
                    style={{
                      border: `3px solid ${stampColor}`,
                      borderRadius: 8,
                      padding: '8px 22px',
                      color: stampColor,
                      boxShadow: `inset 0 0 14px ${stampColor}33`,
                      background: `${stampColor}0d`,
                    }}
                  >
                    <p
                      className="font-cinzel-decorative font-black leading-none text-center"
                      style={{ fontSize: 'clamp(1.5rem, 5.5vw, 2.1rem)', letterSpacing: '0.07em' }}
                    >
                      {isTower ? 'TO THE TOWER!' : 'SET FREE!'}
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  className="rounded-lg px-8 py-3 animate-pulse"
                  style={{ border: `2px dashed ${INK_LINE}` }}
                >
                  <p className="font-cinzel uppercase tracking-[0.2em] text-sm" style={{ color: INK_FADED }}>
                    Awaiting the royal stamp…
                  </p>
                </div>
              )}
            </div>

            {/* Signature + wax seal */}
            <div className="mt-6 flex items-end justify-between gap-4">
              <div className="flex flex-col gap-1 min-w-0">
                {data?.kings_opinion && (
                  <p className="font-geist italic text-xs leading-snug mb-1.5" style={{ color: INK_FADED }}>
                    &ldquo;{data.kings_opinion}&rdquo;
                  </p>
                )}
                <p className="font-cinzel-decorative font-bold text-base leading-none">His Royal Majesty</p>
                <div className="h-px w-36 my-1" style={{ background: INK_LINE }} />
                <p className="font-cinzel text-[10px] uppercase tracking-[0.18em]" style={{ color: INK_FADED }}>
                  {data?.confidence ? `Royal certainty · ${data.confidence}%` : 'The King of the Realm'}
                </p>
              </div>

              {/* Wax seal */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: hasVerdict ? waxGradient : WAX_NEUTRAL,
                  boxShadow: WAX_SHADOW,
                  transform: 'rotate(8deg)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ border: '1px solid rgba(255,255,255,0.3)' }}
                >
                  <SealIcon size={22} strokeWidth={1.75} style={{ color: 'rgba(255,244,220,0.9)' }} />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center gap-2 justify-center">
              <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${INK_LINE})` }} />
              <p className="font-cinzel text-[10px] uppercase tracking-[0.2em]" style={{ color: INK_FADED }}>
                Tower or Free? · AI Medieval King
              </p>
              <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${INK_LINE}, transparent)` }} />
            </div>
          </div>
        </div>

        {/* Action buttons (outside the shareable card) */}
        {!isStreaming && hasVerdict && (
          <div className="flex flex-col gap-3 w-full animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <ShareButton />
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              {hasMoreSuspects && (
                <RoyalButton onClick={onJudgeNext} className="flex-1 rounded-xl py-3 font-bold text-sm tracking-wider">
                  <Swords size={16} />
                  Next Suspect
                </RoyalButton>
              )}
              <RoyalButton variant="ghost" onClick={onAddMore} className="flex-1 rounded-xl py-3 font-bold text-sm tracking-wider">
                + Add More
              </RoyalButton>
              <RoyalButton variant="muted" onClick={onStartOver} className="flex-1 rounded-xl py-3 font-bold text-sm tracking-wider">
                Start Over
              </RoyalButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
