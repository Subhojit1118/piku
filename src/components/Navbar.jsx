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
    { id: 'bg-studio', label: '✨ AI BG Remover' },
    { id: 'cake', label: '🎂 Blow Candle' },
    { id: 'memories', label: '📸 Memories' },
    { id: 'gifts', label: '🎁 Surprise Gifts' },
    { id: 'card-builder', label: '💌 Wish Card' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3 glass-panel border-b border-pink-500/20 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => {
            playChimeSFX();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <span className="text-2xl animate-bounce">👑</span>
          <span className="font-cursive text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-300 to-amber-300 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
            Happy Birthday Piku
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-full border border-pink-500/20">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                playChimeSFX();
                const elem = document.getElementById(item.id);
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 hover:text-pink-300 hover:bg-pink-500/10 text-slate-300"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Music Player Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleAudioToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-xs shadow-lg transition-all duration-300 ${isPlaying
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white glow-pink animate-pulse'
              : 'bg-slate-800 text-pink-300 border border-pink-500/40 hover:bg-pink-500/20'
              }`}
          >
            <span>{isPlaying ? '🎵 Playing O Maahi...' : '🎶 Play O Maahi'}</span>
            {isPlaying && <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />}
          </button>
        </div>
      </div>
    </nav>
  );
}

