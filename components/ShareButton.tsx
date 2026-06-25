'use client';

export default function ShareButton() {
  const handleShare = async () => {
    const { default: html2canvas } = await import('html2canvas');
    const card = document.getElementById('judgement-card');
    if (!card) return;

    const canvas = await html2canvas(card, {
      scale: 2,
      backgroundColor: null,
      useCORS: true,
    });
    const link = document.createElement('a');
    link.download = 'tower-or-free.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
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
      📸 Download & Share
    </button>
  );
}
