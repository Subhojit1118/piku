import React from 'react';
import { triggerConfettiBurst } from '../utils/confetti';
import { playPopSFX, playHappyBirthdayTune } from '../utils/audioSynth';

export function HeroSection({ heroImage }) {
  const handleCelebrate = () => {
    playPopSFX();
    triggerConfettiBurst(120);
    playHappyBirthdayTune();
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-12 sm:pt-36 sm:pb-20 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Animated Glows & Particles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-pink-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 left-1/3 w-56 h-56 sm:w-80 sm:h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-48 h-48 sm:w-72 sm:h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Sparkles & Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-4 sm:left-10 text-2xl sm:text-3xl animate-float opacity-75">✨</div>
        <div className="absolute top-36 right-6 sm:right-16 text-3xl sm:text-4xl animate-float-slow opacity-80">💖</div>
        <div className="absolute bottom-20 left-6 sm:left-20 text-2xl sm:text-3xl animate-float opacity-70">🌸</div>
        <div className="absolute bottom-28 right-8 sm:right-24 text-3xl sm:text-4xl animate-float-slow opacity-80">🎉</div>
      </div>

      <div className="max-w-5xl mx-auto px-4 text-center z-10 flex flex-col items-center">
        {/* Crown Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/40 text-pink-300 text-xs sm:text-sm font-semibold tracking-wide mb-4 sm:mb-6 shadow-inner">
          <span className="animate-bounce">👑</span>
          <span>SPECIAL CELEBRATION • 03.08.2010</span>
          <span className="animate-pulse">✨</span>
        </div>

        {/* Main Cursive Title */}
        <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-cursive leading-tight mb-2 shimmer-text drop-shadow-lg px-2">
          Happy Birthday Ritika(Piku)!
        </h1>

        <p className="text-base sm:text-xl md:text-2xl text-slate-300 max-w-2xl font-light font-handwriting mb-6 sm:mb-8 tracking-wider px-4">
          "To the sweetest, most beautiful soul — may your special day be filled with infinite smiles, magical moments & pure joy!" 🌸✨
        </p>

        {/* Spotlight Original Hero Image Frame */}
        <div className="relative my-4 sm:my-6 group cursor-pointer" onClick={handleCelebrate}>
          {/* Neon Glow Behind Frame */}
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 via-purple-500 to-amber-400 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-glow" />

          {/* Hero Image Frame Wrapper */}
          <div className="relative w-64 h-80 sm:w-80 sm:h-[420px] max-w-[88vw] rounded-3xl p-2.5 sm:p-3 bg-slate-900/80 border-2 border-pink-500/40 backdrop-blur-md shadow-2xl flex items-center justify-center overflow-hidden">
            <img
              src={heroImage}
              alt="Piku Birthday Queen"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105 shadow-md select-none"
            />
            {/* Sparkle Tag */}
            <div className="absolute bottom-4 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-slate-950/85 border border-pink-400/60 text-pink-300 text-[11px] sm:text-xs font-semibold backdrop-blur-md shadow-lg flex items-center gap-1.5">
              <span>💖 Ritika (Piku) • 03.08.2010</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full px-4 sm:w-auto">
          <button
            onClick={handleCelebrate}
            className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-bold text-xs sm:text-sm bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white shadow-xl glow-pink hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="text-lg sm:text-xl">🎉</span>
            <span>Pop Party Confetti!</span>
          </button>

          <a
            href="#cake"
            className="w-full sm:w-auto px-6 py-3.5 sm:px-7 sm:py-4 rounded-full font-semibold text-xs sm:text-sm bg-slate-900/90 text-pink-300 border border-pink-500/30 hover:bg-pink-500/10 hover:border-pink-500/60 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>🎂 Blow The Candles</span>
          </a>
        </div>
      </div>
    </section>
  );
}
