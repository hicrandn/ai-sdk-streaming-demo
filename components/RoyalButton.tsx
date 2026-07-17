'use client';

import { type ButtonHTMLAttributes } from 'react';

const VARIANTS = {
  primary: {
    background: 'linear-gradient(180deg, #e8c887 0%, #b8863f 100%)',
    color: '#1c1917',
    border: '1px solid rgba(212,168,83,0.4)',
  },
  ghost: {
    background: 'rgba(0,0,0,0.4)',
    color: '#e8c887',
    border: '1px solid rgba(212,168,83,0.3)',
  },
  muted: {
    background: 'rgba(0,0,0,0.4)',
    color: '#d6d3d1',
    border: '1px solid rgba(214,211,209,0.25)',
  },
} as const;

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof VARIANTS;
}

export default function RoyalButton({ variant = 'primary', className = '', style, children, ...rest }: Props) {
  return (
    <button
      className={`font-cinzel uppercase cursor-pointer transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 backdrop-blur-xl disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 ${className}`}
      style={{ ...VARIANTS[variant], ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}
