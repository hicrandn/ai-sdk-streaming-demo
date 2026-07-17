'use client';

import { Download } from 'lucide-react';
import RoyalButton from './RoyalButton';

export default function ShareButton() {
  const handleShare = async () => {
    const { default: html2canvas } = await import('html2canvas-pro');
    const card = document.getElementById('judgement-card');
    if (!card) return;

    // Freeze animations before capture — html2canvas clones the DOM into an
    // offscreen iframe, which restarts running CSS animations from their
    // first keyframe (e.g. the verdict stamp's oversized entry frame).
    const freeze = document.createElement('style');
    freeze.textContent = '#judgement-card, #judgement-card * { animation: none !important; transition: none !important; }';
    document.head.appendChild(freeze);

    try {
      const canvas = await html2canvas(card, {
        scale: 2,
        backgroundColor: '#0a0a0f',
        useCORS: true,
      });
      const link = document.createElement('a');
      link.download = 'tower-or-free.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      freeze.remove();
    }
  };

  return (
    <RoyalButton variant="ghost" onClick={handleShare} className="w-full rounded-xl py-3 font-bold text-sm tracking-widest">
      <Download size={16} />
      Download & Share
    </RoyalButton>
  );
}
