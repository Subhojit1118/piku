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
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Animated Glows & Particles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Sparkles & Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 text-3xl animate-float opacity-75">✨</div>
        <div className="absolute top-40 right-16 text-4xl animate-float-slow opacity-80">💖</div>
        <div className="absolute bottom-20 left-20 text-3xl animate-float opacity-70">🌸</div>
        <div className="absolute bottom-32 right-24 text-4xl animate-float-slow opacity-80">🎉</div>
      </div>

      <div className="max-w-5xl mx-auto px-4 text-center z-10 flex flex-col items-center">
        {/* Crown Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/40 text-pink-300 text-sm font-semibold tracking-wide mb-6 shadow-inner">
          <span className="animate-bounce">👑</span>
          <span>SPECIAL BIRTHDAY CELEBRATION</span>
          <span className="animate-pulse">✨</span>
        </div>

        {/* Main Cursive Title */}
        <h1 className="text-6xl sm:text-7xl md:text-9xl font-bold font-cursive leading-tight mb-2 shimmer-text drop-shadow-lg">
          Happy Birthday Piku!
        </h1>

        <p className="text-lg sm:text-2xl text-slate-300 max-w-2xl font-light font-handwriting mb-8 tracking-wider">
          "To the sweetest, most beautiful soul — may your special day be filled with infinite smiles, magical moments & pure joy!" 🌸✨
        </p>

        {/* Spotlight Original Hero Image Frame */}
        <div className="relative my-6 group cursor-pointer" onClick={handleCelebrate}>
          {/* Neon Glow Behind Frame */}
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 via-purple-500 to-amber-400 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-glow" />

          {/* Hero Image Frame Wrapper */}
          <div className="relative w-72 h-96 sm:w-80 sm:h-[420px] rounded-3xl p-3 bg-slate-900/80 border-2 border-pink-500/40 backdrop-blur-md shadow-2xl flex items-center justify-center overflow-hidden">
            <img
              src={heroImage}
              alt="Piku Birthday Queen"
              className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105 shadow-md"
            />
            {/* Sparkle Tag */}
            <div className="absolute bottom-5 px-4 py-1.5 rounded-full bg-slate-950/85 border border-pink-400/60 text-pink-300 text-xs font-semibold backdrop-blur-md shadow-lg flex items-center gap-1.5">
              <span>💖 Birthday Queen Piku</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleCelebrate}
            className="px-8 py-4 rounded-full font-bold text-sm bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white shadow-xl glow-pink hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <span className="text-xl">🎉</span>
            <span>Pop Party Confetti!</span>
          </button>

          <a
            href="#cake"
            className="px-7 py-4 rounded-full font-semibold text-sm bg-slate-900/90 text-pink-300 border border-pink-500/30 hover:bg-pink-500/10 hover:border-pink-500/60 hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <span>🎂 Blow The Candles</span>
          </a>
        </div>
      </div>
    </section>
  );
}
