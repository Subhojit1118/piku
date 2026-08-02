import React, { useState } from 'react';
import { playChimeSFX } from '../utils/audioSynth';
import { useAudio } from '../context/AudioContext';
import { triggerPatakaCelebration } from '../utils/confetti';

export function Navbar({ activeSection, setActiveSection }) {
  const { isPlaying, togglePlay } = useAudio();
  const [celebrateCount, setCelebrateCount] = useState(0);
  const [isPopping, setIsPopping] = useState(false);

  const handleAudioToggle = () => {
    playChimeSFX();
    togglePlay();
  };

  const handlePatakaClick = () => {
    playChimeSFX();
    triggerPatakaCelebration();
    setCelebrateCount((prev) => prev + 1);
    setIsPopping(true);
    setTimeout(() => setIsPopping(false), 400);
  };

  const navItems = [
    { id: 'hero', label: '💖 Wishes' },
    { id: 'bg-studio', label: '📸 Gallery' },
    { id: 'cake', label: '🎂 Blow Candle' },
    { id: 'memories', label: '📸 Scrapbook' },
    { id: 'gifts', label: '🎁 Gifts' },
    { id: 'card-builder', label: '💌 Wish Card' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-2.5 sm:px-6 py-2 sm:py-3 glass-panel border-b border-pink-500/20 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-1.5 sm:gap-3">
        {/* Brand Logo */}
        <div
          onClick={() => {
            playChimeSFX();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-1 sm:gap-2 cursor-pointer group shrink min-w-0"
        >
          <span className="text-lg sm:text-2xl animate-bounce shrink-0">👑</span>
          <span className="font-cursive text-base sm:text-2xl md:text-3xl font-bold bg-linear-to-r from-pink-400 via-purple-300 to-amber-300 bg-clip-text text-transparent group-hover:scale-105 transition-transform truncate">
            Happy Birthday Ritika
          </span>
          <span className="hidden lg:inline-block text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 shrink-0">
            03.08.2010
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-full border border-pink-500/20">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                playChimeSFX();
                const elem = document.getElementById(item.id);
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 hover:text-pink-300 hover:bg-pink-500/10 text-slate-300 whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Action Buttons: Song & Mini Pataka Icon Button */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Music Player Button */}
          <button
            onClick={handleAudioToggle}
            className={`flex items-center gap-1 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full font-medium text-xs shadow-lg transition-all duration-300 ${isPlaying
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white glow-pink animate-pulse'
              : 'bg-slate-800 text-pink-300 border border-pink-500/40 hover:bg-pink-500/20'
              }`}
          >
            <span className="hidden sm:inline">
              {isPlaying ? '🎵 Playing Song...' : '🎶 Play Song'}
            </span>
            <span className="inline sm:hidden text-[11px]">
              {isPlaying ? '🎵 Playing' : '🎶 Song'}
            </span>
            {isPlaying && <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />}
          </button>

          {/* Mini Celebration Pataka Icon Button */}
          <button
            onClick={handlePatakaClick}
            title="Celebrate Pataka! 🎆"
            className={`relative group flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full text-white shadow-lg transition-all duration-300 bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 hover:from-amber-300 hover:to-pink-500 border border-amber-300/40 hover:border-amber-300 active:scale-90 cursor-pointer shrink-0 ${
              isPopping ? 'scale-125 rotate-12' : 'hover:scale-110'
            }`}
            style={{
              boxShadow: '0 0 12px rgba(245, 158, 11, 0.5)',
            }}
          >
            <span className="text-sm sm:text-base group-hover:rotate-12 transition-transform select-none">
              🎆
            </span>
            {celebrateCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 flex items-center justify-center text-[9px] font-black rounded-full bg-amber-300 text-slate-900 border border-amber-400 shadow animate-bounce">
                {celebrateCount}
              </span>
            )}
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-300"></span>
            </span>
          </button>
        </div>
      </div>



      {/* Mobile Horizontal Navigation Pills Bar */}
      <div className="flex md:hidden items-center gap-1.5 overflow-x-auto pt-2 pb-0.5 scrollbar-none no-scrollbar">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              playChimeSFX();
              const elem = document.getElementById(item.id);
              if (elem) elem.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-3 py-1 text-[11px] font-medium rounded-full bg-slate-900/90 border border-pink-500/20 text-slate-200 shrink-0 whitespace-nowrap active:scale-95 transition-all"
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

