import React from 'react';
import { playChimeSFX } from '../utils/audioSynth';
import { triggerConfettiBurst } from '../utils/confetti';

export function Footer() {
  const scrollToTop = () => {
    playChimeSFX();
    triggerConfettiBurst(50);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-4 border-t border-pink-500/20 glass-panel relative z-10 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
        <div className="text-4xl animate-bounce">👑</div>
        <h3 className="text-3xl sm:text-4xl font-bold font-cursive shimmer-text px-2">
          Happy Birthday Piku! 💖✨
        </h3>
        <p className="text-xs text-slate-400 max-w-sm">
          Wishing you endless happiness, smiles, and magical memories today and always!
        </p>

        <button
          onClick={scrollToTop}
          className="mt-4 px-6 py-2.5 rounded-full bg-slate-900 border border-pink-500/40 text-pink-300 text-xs font-semibold hover:bg-pink-500/20 transition-all cursor-pointer flex items-center gap-2"
        >
          <span>⬆️ Back To Top</span>
        </button>

        <div className="text-[10px] text-slate-600 mt-4">
          © {new Date().getFullYear()} Special Birthday Celebration Page
        </div>
      </div>
    </footer>
  );
}
