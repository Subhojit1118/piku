import React, { useState } from 'react';
import { playBlowCandlesSFX, playHappyBirthdayTune } from '../utils/audioSynth';
import { triggerConfettiBurst } from '../utils/confetti';

export function InteractiveCake() {
  const [candles, setCandles] = useState([true, true, true, true, true]);
  const [wished, setWished] = useState(false);

  const allBlown = candles.every((lit) => !lit);

  const blowCandle = (index) => {
    if (!candles[index]) return;
    playBlowCandlesSFX();

    const newCandles = [...candles];
    newCandles[index] = false;
    setCandles(newCandles);

    if (newCandles.every((lit) => !lit)) {
      handleAllBlown();
    }
  };

  const blowAllCandles = () => {
    playBlowCandlesSFX();
    setCandles([false, false, false, false, false]);
    handleAllBlown();
  };

  const handleAllBlown = () => {
    setWished(true);
    triggerConfettiBurst(150);
    playHappyBirthdayTune();
  };

  const resetCandles = () => {
    setCandles([true, true, true, true, true]);
    setWished(false);
  };

  return (
    <section id="cake" className="py-20 px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <span>🕯️ Make A Birthday Wish</span>
        </div>
        <h2 className="text-5xl sm:text-6xl font-bold font-cursive shimmer-text mb-2">
          Blow The Birthday Candles
        </h2>
        <p className="text-slate-300 text-sm max-w-md mx-auto mb-10">
          Tap on each candle flame (or click the button below) to blow out the candles, make your wish & launch the grand fireworks! 🎆
        </p>

        {/* 3D Birthday Cake Container */}
        <div className="glass-card rounded-3xl p-8 max-w-xl mx-auto border border-pink-500/30 relative flex flex-col items-center">
          {/* Wish Banner */}
          {allBlown && (
            <div className="mb-6 px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-amber-500 text-white font-bold text-base shadow-xl animate-bounce">
              ✨ 🎉 MAKE A WISH, Piku! ALL CANDLES BLOWN! 🎉 ✨
            </div>
          )}

          {/* Candle Stand */}
          <div className="flex items-end justify-center gap-6 mb-2 relative z-20">
            {candles.map((isLit, idx) => (
              <div
                key={idx}
                onClick={() => blowCandle(idx)}
                className="flex flex-col items-center cursor-pointer group"
                title={isLit ? 'Click to blow candle' : 'Candle blown out!'}
              >
                {/* Flame */}
                <div className="h-8 flex items-center justify-center relative">
                  {isLit ? (
                    <div className="relative">
                      {/* Outer Flame Glow */}
                      <div className="w-5 h-7 rounded-full bg-amber-400 blur-sm animate-flicker absolute -top-1 -left-1 opacity-70" />
                      {/* Flame Core */}
                      <div className="w-3.5 h-6 rounded-t-full bg-gradient-to-t from-red-500 via-amber-400 to-yellow-100 animate-flicker shadow-lg" />
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400 animate-pulse font-mono">
                      💨
                    </div>
                  )}
                </div>

                {/* Wick */}
                <div className="w-1 h-3 bg-slate-700" />

                {/* Candle Stick */}
                <div className="w-4 h-16 rounded-t-sm bg-gradient-to-b from-pink-300 via-purple-300 to-indigo-400 border border-white/20 shadow-md group-hover:scale-105 transition-transform" />
              </div>
            ))}
          </div>

          {/* Cake Tier 1 (Top) */}
          <div className="w-64 h-14 rounded-t-3xl bg-gradient-to-r from-pink-500 via-pink-400 to-rose-400 border-t-4 border-white/40 shadow-inner flex items-center justify-center relative z-10">
            <span className="text-white text-xs font-bold tracking-widest uppercase opacity-95">
              💖 Piku 💖
            </span>
          </div>

          {/* Cake Tier 2 (Middle) */}
          <div className="w-80 h-16 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-500 border-t-4 border-pink-300/40 shadow-lg flex items-center justify-around px-4">
            <span className="text-xl">🍓</span>
            <span className="text-xl">🍒</span>
            <span className="text-xl">🍓</span>
            <span className="text-xl">🍒</span>
          </div>

          {/* Cake Tier 3 (Bottom Base) */}
          <div className="w-96 h-20 rounded-b-3xl bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-t-4 border-purple-400/40 shadow-2xl flex items-center justify-center">
            <div className="px-6 py-1.5 rounded-full bg-slate-950/80 border border-amber-400/50 text-amber-300 text-xs font-bold">
              👑 HAPPY BIRTHDAY QUEEN 👑
            </div>
          </div>

          {/* Cake Plate */}
          <div className="w-full max-w-md h-5 rounded-full bg-gradient-to-r from-slate-700 via-slate-400 to-slate-700 shadow-2xl -mt-1" />

          {/* Action Buttons */}
          <div className="mt-8 flex items-center gap-4">
            {!allBlown ? (
              <button
                onClick={blowAllCandles}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-amber-500 text-white font-bold text-xs shadow-lg glow-pink hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center gap-2"
              >
                <span>🎂 Blow All Candles</span>
              </button>
            ) : (
              <button
                onClick={resetCandles}
                className="px-6 py-3 rounded-2xl bg-slate-800 text-pink-300 border border-pink-500/40 font-bold text-xs hover:bg-pink-500/20 transition-all duration-300 cursor-pointer"
              >
                <span>🔄 Relight Candles</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
