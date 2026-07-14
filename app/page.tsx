'use client';

import { experimental_useObject as useObject } from '@ai-sdk/react';
import { useState, useEffect, useRef } from 'react';
import { verdictSchema, type Verdict } from '@/lib/schemas';
import { type DeepPartial } from 'ai';
import HeroSection from '@/components/HeroSection';
import ChamberSection from '@/components/ChamberSection';
import LoadingSection from '@/components/LoadingSection';
import VerdictSection from '@/components/VerdictSection';
import ErrorSection from '@/components/ErrorSection';
import CinematicBackground from '@/components/CinematicBackground';

type Stage = 'hero' | 'chamber' | 'loading' | 'verdict' | 'error';

const MIN_LOADING_MS = 2800;

export default function Home() {
  const [stage, setStage] = useState<Stage>('hero');
  const [suspects, setSuspects] = useState<string[]>([]);
  const [currentSuspect, setCurrentSuspect] = useState('');
  const [verdictData, setVerdictData] = useState<DeepPartial<Verdict> | undefined>(undefined);
  const [isShaking, setIsShaking] = useState(false);
  const loadingStartRef = useRef(0);

  const { object, submit, isLoading, error, stop } = useObject({
    api: '/api/judge',
    schema: verdictSchema,
  });

  // Transition from loading → verdict (success) or error (failure) once the stream settles
  useEffect(() => {
    if (stage !== 'loading') return;
    if (isLoading) return;

    if (!object?.verdict) {
      const errorTimer = setTimeout(() => setStage('error'), 0);
      return () => clearTimeout(errorTimer);
    }

    const elapsed = Date.now() - loadingStartRef.current;
    const remaining = Math.max(0, MIN_LOADING_MS - elapsed);

    const shakeAt = Math.max(0, remaining - 700);
    const shakeTimer = setTimeout(() => {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 650);
    }, shakeAt);

    const revealTimer = setTimeout(() => {
      setVerdictData(object);
      setStage('verdict');
    }, remaining);

    return () => {
      clearTimeout(shakeTimer);
      clearTimeout(revealTimer);
    };
  }, [stage, isLoading, object]);

  const judgeOne = (name: string) => {
    setCurrentSuspect(name);
    setVerdictData(undefined);
    loadingStartRef.current = Date.now();
    setStage('loading');
    submit({ name });
  };

  const handleJudgeFromChamber = () => {
    if (suspects.length === 0) return;
    judgeOne(suspects[0]);
  };

  const handleJudgeNext = () => {
    const remaining = suspects.slice(1);
    setSuspects(remaining);
    if (remaining.length > 0) {
      judgeOne(remaining[0]);
    } else {
      setStage('chamber');
    }
  };

  const handleAddSuspect = (name: string) => {
    setSuspects(prev => prev.includes(name) ? prev : [...prev, name]);
  };

  const handleRemoveSuspect = (name: string) => {
    setSuspects(prev => prev.filter(s => s !== name));
  };

  const handleRetry = () => {
    if (!currentSuspect) return;
    judgeOne(currentSuspect);
  };

  const handleStartOver = () => {
    stop();
    setSuspects([]);
    setCurrentSuspect('');
    setVerdictData(undefined);
    setStage('chamber');
  };

  return (
    <div className="relative min-h-screen bg-black">
      <CinematicBackground />

      <div className="relative z-10">
        {stage === 'hero' && (
          <HeroSection onEnter={() => setStage('chamber')} />
        )}

        {stage === 'chamber' && (
          <ChamberSection
            suspects={suspects}
            onAddSuspect={handleAddSuspect}
            onRemoveSuspect={handleRemoveSuspect}
            onJudge={handleJudgeFromChamber}
          />
        )}

        {stage === 'loading' && (
          <LoadingSection name={currentSuspect} isShaking={isShaking} />
        )}

        {stage === 'error' && (
          <ErrorSection
            name={currentSuspect}
            message={error?.message}
            onRetry={handleRetry}
            onStartOver={handleStartOver}
          />
        )}

        {stage === 'verdict' && (
          <VerdictSection
            name={currentSuspect}
            data={verdictData ?? object}
            isStreaming={isLoading}
            hasMoreSuspects={suspects.length > 1}
            onJudgeNext={handleJudgeNext}
            onAddMore={() => setStage('chamber')}
            onStartOver={handleStartOver}
          />
        )}
      </div>
    </div>
  );
}
