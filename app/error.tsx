'use client';

import { useEffect } from 'react';
import { RotateCcw, TriangleAlert } from 'lucide-react';
import RoyalButton from '@/components/RoyalButton';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Unhandled error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-950 px-4">
      <div className="cinematic-panel flex flex-col items-center gap-6 px-8 py-10 sm:px-12 rounded-2xl text-center max-w-md">
        <div className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: 'radial-gradient(ellipse at 40% 30%, #2a1512 0%, #150a08 70%)',
            border: '2px solid rgba(248,113,113,0.4)',
          }}>
          <TriangleAlert size={36} strokeWidth={1.5} className="text-red-400" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-cinzel-decorative font-bold text-red-300 text-xl sm:text-2xl">
            The Kingdom Has Fallen Into Chaos
          </h2>
          <p className="text-stone-300 text-sm font-geist">
            Something went wrong in the royal court. Reload to restore order.
          </p>
        </div>
        <RoyalButton onClick={reset} className="w-full rounded-xl py-3 font-bold text-sm tracking-wider">
          <RotateCcw size={16} />
          Restore the Kingdom
        </RoyalButton>
      </div>
    </div>
  );
}
