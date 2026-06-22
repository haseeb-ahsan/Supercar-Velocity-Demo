'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

// Parses "2.9s", "205 mph", "819 hp", "3.5s" etc. into numeric + unit
function parseStatValue(raw: string): {
  num: number;
  unit: string;
  decimals: number;
} {
  const match = raw.match(/^(\d+(?:\.\d+)?)\s*(.*)$/);
  if (!match) return { num: 0, unit: raw, decimals: 0 };
  const num = parseFloat(match[1]);
  const unit = match[2].trim();
  const decimals = match[1].includes('.') ? match[1].split('.')[1].length : 0;
  return { num, unit, decimals };
}

// Single rotary-dial counter
function DialerCounter({
  label,
  value,
  triggerKey,
}: {
  label: string;
  value: string;
  triggerKey: number;
}) {
  const { num, unit, decimals } = parseStatValue(value);
  const [displayed, setDisplayed] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const DURATION = 1800;

  useEffect(() => {
    if (triggerKey === 0) return;

    setIsSpinning(true);
    setDisplayed(0);
    startTimeRef.current = null;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const animate = (now: number) => {
      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / DURATION, 1);

      const eased =
        progress < 0.6
          ? 1 - Math.pow(1 - progress / 0.6, 3) * 0.7
          : 0.7 + (progress - 0.6) * 0.75;

      const current = eased * num;
      setDisplayed(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayed(num);
        setIsSpinning(false);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [triggerKey, num]);

  const formatted =
    decimals > 0
      ? displayed.toFixed(decimals)
      : Math.floor(displayed).toString();

  return (
    <div className='relative flex flex-col items-center p-2'>
      <DialRing spinning={isSpinning} />
      <div className='mt-4 text-center w-full'>
        <div className='flex items-baseline justify-center gap-0.5'>
          <span
            className='font-heading tabular-nums text-2xl sm:text-3xl md:text-4xl'
            style={{
              color: '#c0c0c0',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              transition: 'color 0.2s',
            }}
          >
            {formatted}
          </span>
          {unit && (
            <span className='font-body text-[10px] sm:text-xs text-text-muted uppercase tracking-wider font-medium ml-0.5'>
              {unit}
            </span>
          )}
        </div>
        <p className='font-body mt-2 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-medium text-text-muted/70 block truncate px-1'>
          {label}
        </p>
      </div>
    </div>
  );
}

// SVG dial ring that spins while counting
function DialRing({ spinning }: { spinning: boolean }) {
  const SIZE = 76;
  const R = 32;
  const C = SIZE / 2;
  const STROKE = 1.5;
  const CIRCUMFERENCE = 2 * Math.PI * R;

  return (
    <div style={{ width: SIZE, height: SIZE, position: 'relative' }}>
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{
          transform: 'rotate(-90deg)',
          transition: spinning ? 'none' : 'transform 0.3s ease',
        }}
      >
        <circle
          cx={C}
          cy={C}
          r={R}
          fill='none'
          stroke='#121212'
          strokeWidth={STROKE + 0.5}
        />
        {Array.from({ length: 36 }).map((_, i) => {
          const angle = (i * 10 * Math.PI) / 180;
          const isMajor = i % 3 === 0;
          const inner = R - (isMajor ? 5 : 3);
          const outer = R;
          return (
            <line
              key={i}
              x1={C + inner * Math.cos(angle)}
              y1={C + inner * Math.sin(angle)}
              x2={C + outer * Math.cos(angle)}
              y2={C + outer * Math.sin(angle)}
              stroke={isMajor ? '#3a3a3a' : '#222222'}
              strokeWidth={isMajor ? 1.2 : 0.7}
            />
          );
        })}
        <circle
          cx={C}
          cy={C}
          r={R - 6}
          fill='none'
          stroke='#c0c0c0'
          strokeWidth={STROKE}
          strokeDasharray={`${CIRCUMFERENCE * 0.75} ${CIRCUMFERENCE * 0.25}`}
          strokeLinecap='round'
          style={{
            transition: spinning ? 'none' : 'stroke-dasharray 0.8s ease',
            animation: spinning ? 'sv-dial-spin 0.35s linear infinite' : 'none',
            opacity: spinning ? 0.7 : 1,
          }}
        />
        <circle
          cx={C + (R - 6) * 0.98}
          cy={C}
          r={2.5}
          fill='#c0c0c0'
          style={{
            animation: spinning ? 'sv-dial-spin 0.35s linear infinite' : 'none',
          }}
        />
      </svg>
    </div>
  );
}

export default function DialerStats({
  performance,
}: {
  performance: Record<string, string>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [triggerKey, setTriggerKey] = useState(0);

  useEffect(() => {
    if (isInView) {
      setTriggerKey((k) => k + 1);
    }
  }, [isInView]);

  const entries = Object.entries(performance);

  return (
    <>
      <style>{`
        @keyframes sv-dial-spin {
          from { transform: rotate(0deg); transform-origin: 38px 38px; }
          to { transform: rotate(360deg); transform-origin: 38px 38px; }
        }
      `}</style>

      {/* Flexbox container centers all dials dynamically */}
      <div
        ref={containerRef}
        className='flex flex-wrap justify-center items-center gap-8 sm:gap-12 md:gap-16 p-4 sm:p-6 bg-surface/40 backdrop-blur-sm border border-white/5'
      >
        {entries.map(([label, value], i) => (
          <div
            key={label}
            className='min-w-[140px] sm:min-w-[160px] flex justify-center'
          >
            <DialerCounter
              label={label}
              value={value}
              triggerKey={triggerKey === 0 ? 0 : triggerKey + i}
            />
          </div>
        ))}
      </div>
    </>
  );
}
