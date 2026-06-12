import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isRendered, setIsRendered] = useState(true);

  useEffect(() => {
    const hasShown = sessionStorage.getItem('splashShown');
    if (hasShown) {
      setIsVisible(false);
      setIsRendered(false);
      if (onComplete) onComplete();
      return;
    }

    const timer = setTimeout(() => {
      handleComplete();
    }, 6000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleComplete = () => {
    setIsVisible(false);
    sessionStorage.setItem('splashShown', 'true');
    setTimeout(() => {
      setIsRendered(false);
      if (onComplete) onComplete();
    }, 600);
  };

  if (!isRendered) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: 'radial-gradient(ellipse at center, #9C1A2E 0%, #7B0D1E 40%, #3D0610 100%)'
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Animated background particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full opacity-10"
              style={{
                width: `${150 + i * 80}px`,
                height: `${150 + i * 80}px`,
                background: 'radial-gradient(circle, #F97316, transparent)',
                top: `${10 + i * 12}%`,
                left: `${5 + i * 15}%`,
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.05, 0.15, 0.05],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.4,
              }}
            />
          ))}

          {/* Diagonal decorative lines */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute w-px h-full opacity-10"
              style={{
                background: 'linear-gradient(to bottom, transparent, #E85A1B, transparent)',
                left: '25%',
              }}
            />
            <div
              className="absolute w-px h-full opacity-10"
              style={{
                background: 'linear-gradient(to bottom, transparent, #E85A1B, transparent)',
                left: '75%',
              }}
            />
          </div>

          {/* Skip Button */}
          <button
            onClick={handleComplete}
            className="absolute top-6 right-6 font-medium text-sm transition-all duration-200 cursor-pointer px-5 py-2 rounded-full border"
            style={{
              color: 'rgba(255,255,255,0.7)',
              borderColor: 'rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(8px)',
            }}
          >
            Skip ✕
          </button>

          {/* Logo Container */}
          <div className="relative mb-8">
            {/* Outer glow ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(232,90,27,0.4) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative"
            >
              {/* Logo ring border */}
              <div
                className="p-1 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #E85A1B, #F97316, #7B0D1E, #E85A1B)',
                  padding: '3px',
                }}
              >
                <div className="bg-white rounded-full p-3">
                  <img
                    src="https://res.cloudinary.com/ddsuglolg/image/upload/v1776831808/Screenshot_2026-02-23_183159_fsmhlx.png"
                    alt="Shrradha High School Logo"
                    className="w-32 h-32 md:w-44 md:h-44 object-contain relative z-10"
                  />
                </div>
              </div>

              {/* Light sweep effect */}
              <motion.div
                className="absolute inset-0 z-20 rounded-full overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
                  initial={{ x: '-200%' }}
                  animate={{ x: '200%' }}
                  transition={{ delay: 1, duration: 1.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2 }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* School Name */}
          <div className="relative overflow-hidden mb-3 px-6 py-2">
            <motion.h1
              className="text-4xl md:text-6xl font-black text-center tracking-widest"
              style={{
                fontFamily: "'Playfair Display', serif",
                background: 'linear-gradient(135deg, #FFFFFF 20%, #F97316 50%, #FFFFFF 80%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.9, ease: 'easeOut' }}
            >
              SHRRADHA
            </motion.h1>
            <motion.div
              className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
              initial={{ x: '-200%' }}
              animate={{ x: '200%' }}
              transition={{ delay: 1.5, duration: 1.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2.5 }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.6, ease: 'easeOut' }}
            className="h-px w-48 md:w-64 mb-3"
            style={{ background: 'linear-gradient(to right, transparent, #E85A1B, transparent)' }}
          />

          <motion.p
            className="text-base md:text-lg font-semibold tracking-[0.4em] text-center uppercase"
            style={{ color: 'rgba(255,255,255,0.85)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7, ease: 'easeOut' }}
          >
            HIGH SCHOOL
          </motion.p>

          {/* Tagline */}
          <motion.p
            className="mt-4 text-sm md:text-base font-medium tracking-widest text-center italic"
            style={{ color: '#F97316' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8, ease: 'easeOut' }}
          >
            ✦ THE FOCUS IS ON LEARNING ✦
          </motion.p>

          {/* Loading bar */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-40 h-1 rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(to right, #E85A1B, #F97316)' }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 5.5, ease: 'linear' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
