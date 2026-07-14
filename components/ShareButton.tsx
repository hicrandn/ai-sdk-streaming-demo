'use client';

import { Download } from 'lucide-react';

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
    <button
      onClick={handleShare}
      className="w-full py-3 rounded-xl font-cinzel font-bold uppercase tracking-widest text-sm cursor-pointer transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
      style={{
        background: 'rgba(255,255,255,0.07)',
        color: '#d4a853',
        border: '1px solid rgba(212,168,83,0.3)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <Download size={16} />
      Download & Share
    </button>
  );
}
