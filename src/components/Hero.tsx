'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import IntroAnimation from './IntroAnimation';

const HEADLINE_WORDS = ['Luxury', 'Performance.', 'Exceptional', 'Vehicles.'];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const HERO_VIDEO_SRC =
  'https://videos.pexels.com/video-files/30794587/13171246_1920_1080_60fps.mp4';
const HERO_IMAGE_SRC =
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2400&auto=format&fit=crop';

export default function Hero() {
  // CRITICAL FIX: showIntro MUST default to true. This forces the screen to be black
  // on load, preventing the flash of the landing page before the animation starts.
  const [showIntro, setShowIntro] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // If the user has already seen the intro this session, turn it off immediately.
    const hasSeenIntro = sessionStorage.getItem('supercar-intro');
    if (hasSeenIntro) {
      setShowIntro(false);
      setIntroComplete(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIntroComplete(true);
    sessionStorage.setItem('supercar-intro', 'true');
  };

  useEffect(() => {
    if (!introComplete) return;

    let isMounted = true;

    // Hold the static image for 1.5s after intro completes before fading video in
    const timer = setTimeout(() => {
      if (videoRef.current && isMounted) {
        videoRef.current
          .play()
          .then(() => {
            setVideoReady(true);
          })
          .catch((err) => {
            console.warn(
              'Autoplay blocked, falling back to static image.',
              err
            );
          });
      }
    }, 1500);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [introComplete]);

  return (
    <>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}

      <section className='relative h-screen min-h-[640px] w-full overflow-hidden flex items-end'>
        {/* Static Fallback Image */}
        <Image
          src={HERO_IMAGE_SRC}
          alt='A dark, sculpted supercar parked in dramatic studio lighting'
          fill
          priority
          className='object-cover object-center grayscale'
        />

        {/* Video Background */}
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload='auto'
          className={`absolute inset-0 w-full h-full object-cover object-center grayscale transition-opacity duration-[1500ms] ease-in-out ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src={HERO_VIDEO_SRC} type='video/mp4' />
        </video>

        {/* Overlays */}
        <div className='absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20' />
        <div className='absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40' />

        <div className='relative z-10 w-full px-6 sm:px-10 lg:px-16 pb-20 sm:pb-28'>
          {/* Reverted to original precise sizing: text-5xl sm:text-6xl lg:text-7xl */}
          <motion.h1
            variants={containerVariants}
            initial='hidden'
            animate={introComplete ? 'visible' : 'hidden'}
            className='font-heading font-medium text-text text-5xl sm:text-6xl lg:text-7xl leading-[1.05] max-w-4xl flex flex-wrap gap-x-4'
          >
            {HEADLINE_WORDS.map((word) => (
              <motion.span key={word} variants={wordVariants}>
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Reverted to original button sizing: px-8 py-4, text-sm */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{
              opacity: introComplete ? 1 : 0,
              y: introComplete ? 0 : 16,
            }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className='mt-10 flex flex-wrap items-center gap-4'
          >
            <Link
              href='/stock'
              className='inline-flex items-center justify-center bg-accent text-background font-body font-semibold text-sm tracking-wide uppercase px-8 py-4 hover:bg-text transition-colors duration-300'
            >
              View Stock
            </Link>
            <Link
              href='/finance'
              className='inline-flex items-center justify-center border border-text/40 text-text font-body font-medium text-sm tracking-wide uppercase px-8 py-4 hover:border-text transition-colors duration-300'
            >
              Arrange Finance
            </Link>
          </motion.div>
        </div>

        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: introComplete ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className='absolute bottom-8 right-6 sm:right-10 lg:right-16 z-10 hidden sm:flex flex-col items-center gap-3'
        >
          <span className='font-body text-[10px] tracking-[0.3em] uppercase text-text-muted [writing-mode:vertical-rl]'>
            Scroll
          </span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className='h-10 w-px bg-gradient-to-b from-accent to-transparent'
          />
        </motion.div>
      </section>
    </>
  );
}
