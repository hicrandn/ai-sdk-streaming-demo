'use client';

import ShareButton from './ShareButton';

interface Props {
  name: string;
  verdict?: 'TOWER' | 'FREE';
  reason?: string;
  royal_decree?: string;
  evidence?: string[];
  isStreaming: boolean;
}

export default function JudgementCard({
  name,
  verdict,
  reason,
  royal_decree,
  evidence,
  isStreaming,
}: Props) {
  const isTower = verdict === 'TOWER';

  const containerClasses = verdict
    ? isTower
      ? 'bg-red-950 border-red-500'
      : 'bg-green-950 border-green-500'
    : 'bg-slate-800 border-slate-600';

  const accentClasses = verdict
    ? isTower
      ? 'text-red-400'
      : 'text-green-400'
    : 'text-slate-400';

  return (
    <div
      id="judgement-card"
      className={`animate-fade-in w-full max-w-lg border-2 rounded-xl p-8 flex flex-col gap-4 ${containerClasses}`}
    >
      <p className="text-slate-400 text-sm font-medium uppercase tracking-widest text-center">
        The King&apos;s Verdict on
      </p>
      <h2 className="text-white text-3xl font-bold text-center">{name}</h2>

      {verdict ? (
        <>
          <div className={`text-4xl font-serif font-extrabold text-center ${accentClasses}`}>
            {isTower ? '🏰 INTO THE TOWER!' : '🕊️ YOU ARE FREE!'}
          </div>

          {royal_decree && (
            <p className={`text-sm font-bold tracking-wide text-center uppercase ${accentClasses}`}>
              {royal_decree}
            </p>
          )}

          {reason && (
            <p className="text-slate-300 text-base italic text-center">{reason}</p>
          )}

          {evidence && evidence.filter(Boolean).length > 0 && (
            <ul className="flex flex-col gap-1 mt-2">
              {evidence.filter(Boolean).map((item, i) => (
                <li key={i} className="text-amber-400 text-sm">
                  § {item}
                </li>
              ))}
            </ul>
          )}

          {!isStreaming && <ShareButton />}
        </>
      ) : (
        <p className="text-slate-400 text-center animate-pulse text-lg">
          Awaiting royal judgment...
        </p>
      )}
    </div>
  );
}
