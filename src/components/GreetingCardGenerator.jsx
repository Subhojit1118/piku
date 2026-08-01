import React, { useState } from 'react';
import { playChimeSFX, playPopSFX } from '../utils/audioSynth';
import { triggerConfettiBurst } from '../utils/confetti';

export function GreetingCardGenerator() {
  const [theme, setTheme] = useState('rose');
  const [name, setName] = useState('Ritika');
  const [customWish, setCustomWish] = useState(
    'Wishing you a day filled with laughter, love, and sweet surprises! May all your dreams come true this year!'
  );
  const [copied, setCopied] = useState(false);

  const themes = {
    rose: {
      bg: 'bg-gradient-to-br from-pink-900/90 via-slate-900 to-rose-950/90',
      border: 'border-pink-500/40',
      text: 'text-pink-300',
      accent: 'bg-pink-500',
    },
    galaxy: {
      bg: 'bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950',
      border: 'border-purple-500/40',
      text: 'text-purple-300',
      accent: 'bg-purple-500',
    },
    gold: {
      bg: 'bg-gradient-to-br from-amber-950/90 via-slate-900 to-yellow-950/90',
      border: 'border-amber-500/40',
      text: 'text-amber-300',
      accent: 'bg-amber-500',
    },
    lavender: {
      bg: 'bg-gradient-to-br from-slate-900 via-purple-900/60 to-pink-950',
      border: 'border-cyan-400/40',
      text: 'text-cyan-300',
      accent: 'bg-cyan-500',
    },
  };

  const activeTheme = themes[theme] || themes.rose;

  const handleCopy = () => {
    playPopSFX();
    navigator.clipboard.writeText(`Happy Birthday ${name}! 💖\n\n"${customWish}"`);
    setCopied(true);
    triggerConfettiBurst(40);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="card-builder" className="py-12 sm:py-20 px-3 sm:px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>💌 Personal Wish Card</span>
          </div>
          <h2 className="py-2 text-4xl sm:text-6xl font-bold font-cursive shimmer-text px-2">
            Custom Greeting Card Builder
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto mt-2 px-4">
            Create a custom birthday message card with stylish themes and instant sharing!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-stretch">
          {/* Form Controls */}
          <div className="glass-card rounded-3xl p-5 sm:p-6 border border-pink-500/30 space-y-4 sm:space-y-5">
            <div>
              <label className="block text-xs font-bold text-pink-300 uppercase mb-2">
                Card Theme Style
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'rose', name: '🌸 Rose' },
                  { id: 'galaxy', name: '🌌 Galaxy' },
                  { id: 'gold', name: '✨ Gold' },
                  { id: 'lavender', name: '🪻 Cyan' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      playChimeSFX();
                      setTheme(t.id);
                    }}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${theme === t.id
                      ? 'bg-pink-500 text-white border-pink-400 shadow-md'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-600'
                      }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-pink-300 uppercase mb-2">
                Birthday Person Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-pink-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-pink-300 uppercase mb-2">
                Custom Wish Message
              </label>
              <textarea
                rows="4"
                value={customWish}
                onChange={(e) => setCustomWish(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-pink-500 outline-none resize-none"
              />
            </div>

            <button
              onClick={handleCopy}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 font-bold text-xs text-white shadow-lg glow-pink hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{copied ? '✅ Wish Copied & Celebrated!' : '📋 Copy Wish Message & Celebrate'}</span>
            </button>
          </div>

          {/* Live Card Preview */}
          <div className={`rounded-3xl p-5 sm:p-8 border ${activeTheme.border} ${activeTheme.bg} shadow-2xl relative flex flex-col justify-between min-h-[300px] sm:min-h-[340px] overflow-hidden`}>
            {/* Top Ribbon */}
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <span className="text-xl sm:text-2xl">👑</span>
              <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/40 border border-white/10 ${activeTheme.text}`}>
                HAPPY BIRTHDAY
              </span>
              <span className="text-xl sm:text-2xl">✨</span>
            </div>

            {/* Content */}
            <div className="my-auto text-center py-4">
              <h3 className={`text-3xl sm:text-5xl font-bold font-cursive ${activeTheme.text} mb-3 sm:mb-4`}>
                Dearest {name || 'Piku'},
              </h3>
              <p className="text-slate-200 font-handwriting text-lg sm:text-2xl leading-relaxed max-w-md mx-auto px-2">
                "{customWish}"
              </p>
            </div>

            {/* Footer */}
            <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-white/10 flex justify-between items-center text-[11px] sm:text-xs text-slate-400">
              <span>💖 Made with Love</span>
              <span>🎉 Happy Birthday!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
