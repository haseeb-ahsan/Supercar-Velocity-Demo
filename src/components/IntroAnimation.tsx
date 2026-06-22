'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const NAME = 'SUPERCAR VELOCITY';
const LETTERS = NAME.split('');

// Premium luxury ease-out curve (easeOutExpo)
// It handles the structural movement perfectly without jerking
const LUXURY_EASE = [0.16, 1, 0.3, 1];

export default function IntroAnimation({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<
    'letters-in' | 'converge' | 'logo-in' | 'fly-out' | 'done'
  >('letters-in');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('converge'), 1000);
    const t2 = setTimeout(() => setPhase('logo-in'), 2200);
    const t3 = setTimeout(() => setPhase('fly-out'), 3500);
    const t4 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 5100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  const logoVisible = phase === 'logo-in' || phase === 'fly-out';
  const flying = phase === 'fly-out';

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <div className='fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden'>
          {/* Black backdrop fading independently */}
          <motion.div
            className='absolute inset-0 bg-background pointer-events-auto'
            initial={{ opacity: 1 }}
            animate={{ opacity: flying ? 0 : 1 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />

          {/* Morphing layout wrapper — Handled ONLY by Framer Motion to prevent movement jerk */}
          <motion.div
            layout
            className={
              flying
                ? 'fixed top-0 left-0 right-0 w-full mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 flex h-20 items-center justify-start'
                : 'absolute inset-0 flex items-center justify-center w-full'
            }
            transition={{ duration: 1.6, ease: LUXURY_EASE }}
          >
            <motion.div
              layout
              className={`flex items-center justify-center ${
                flying ? 'flex-row gap-3' : 'flex-col gap-4 sm:gap-6'
              }`}
              transition={{ duration: 1.6, ease: LUXURY_EASE }}
            >
              {/* The Logo Icon — Dimensions handled by Framer Motion Layout */}
              <motion.div
                layout
                initial={{ opacity: 0, y: -20 }}
                animate={{
                  opacity: logoVisible ? 1 : 0,
                  y: logoVisible ? 0 : -20,
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`relative flex-shrink-0 ${
                  flying ? 'w-[42px] h-[46px]' : 'w-20 h-20 sm:w-28 sm:h-28'
                }`}
              >
                <Image
                  src='/just-logo.png'
                  alt='Supercar Velocity Logo'
                  fill
                  className='object-contain'
                  priority
                />
              </motion.div>

              {/* The Converging Text Container */}
              <motion.div
                layout
                // CRITICAL FIX: Added flex-nowrap and whitespace-nowrap to guarantee letters never wrap
                className={`flex justify-center items-center flex-nowrap whitespace-nowrap ${
                  flying ? 'space-x-0' : 'space-x-[2px] sm:space-x-1 px-4'
                }`}
                transition={{ duration: 1.6, ease: LUXURY_EASE }}
              >
                {LETTERS.map((char, i) => {
                  const isSpace = char === ' ';
                  return (
                    <motion.span
                      key={i}
                      // CRITICAL FIX: Removed JS pixels and replaced with 'vw' (Viewport Width)
                      // This perfectly scales the spread distance to any device instantly on the first frame
                      initial={{
                        opacity: 0,
                        x: `${(i - LETTERS.length / 2) * 2}vw`,
                      }}
                      animate={{
                        opacity: 1,
                        x:
                          phase === 'letters-in'
                            ? `${(i - LETTERS.length / 2) * 1.5}vw`
                            : 0,
                      }}
                      transition={{
                        duration: 0.8,
                        ease: 'easeInOut',
                        opacity: { duration: 0.8, delay: i * 0.04 },
                        x: {
                          duration: 0.8,
                          ease: 'easeInOut',
                          delay: phase !== 'letters-in' ? 0 : i * 0.04,
                        },
                      }}
                      // Added inline-block so transforms always apply reliably
                      className={`text-text uppercase transition-all duration-[1200ms] ease-in-out inline-block ${
                        flying
                          ? 'text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] font-heading font-medium text-white'
                          : 'text-sm sm:text-xl md:text-2xl tracking-[0.2em] sm:tracking-[0.3em] font-heading'
                      } ${
                        isSpace ? (flying ? 'w-1.5 sm:w-2' : 'w-2 sm:w-4') : ''
                      }`}
                    >
                      {isSpace ? '\u00A0' : char}
                    </motion.span>
                  );
                })}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
