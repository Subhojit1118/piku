import React from 'react';
import { playChimeSFX } from '../utils/audioSynth';
import { useAudio } from '../context/AudioContext';

export function Navbar({ activeSection, setActiveSection }) {
  const { isPlaying, togglePlay } = useAudio();

  const handleAudioToggle = () => {
    playChimeSFX();
    togglePlay();
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
    <nav className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-2.5 sm:py-3 glass-panel border-b border-pink-500/20 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <div
          onClick={() => {
            playChimeSFX();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group shrink-0"
        >
          <span className="text-xl sm:text-2xl animate-bounce">👑</span>
          <span className="font-cursive text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-300 to-amber-300 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
            Happy Birthday Piku
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

        {/* Music Player Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleAudioToggle}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-medium text-xs shadow-lg transition-all duration-300 ${isPlaying
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white glow-pink animate-pulse'
              : 'bg-slate-800 text-pink-300 border border-pink-500/40 hover:bg-pink-500/20'
              }`}
          >
            <span className="truncate max-w-[120px] sm:max-w-none">
              {isPlaying ? '🎵 Playing Song...' : '🎶 Play Song'}
            </span>
            {isPlaying && <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />}
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

