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
    <section id="cake" className="py-12 sm:py-20 px-3 sm:px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <span>🕯️ Make A Birthday Wish</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-bold font-cursive shimmer-text mb-2 px-2">
          Blow The Birthday Candles
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto mb-8 sm:mb-10 px-4">
          Tap on each candle flame (or click the button below) to blow out the candles, make your wish & launch the grand fireworks! 🎆
        </p>

        {/* 3D Birthday Cake Container */}
        <div className="glass-card rounded-3xl p-4 sm:p-8 max-w-xl mx-auto border border-pink-500/30 relative flex flex-col items-center overflow-hidden">
          {/* Wish Banner */}
          {allBlown && (
            <div className="mb-6 px-4 py-2.5 sm:px-6 sm:py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-amber-500 text-white font-bold text-xs sm:text-base shadow-xl animate-bounce">
              ✨ 🎉 MAKE A WISH, Piku! ALL CANDLES BLOWN! 🎉 ✨
            </div>
          )}

          {/* 16th Birthday Topper Tag */}
          <div className="mb-3 px-4 py-1 sm:px-5 sm:py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-purple-500 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xl animate-pulse flex items-center gap-1.5 border border-amber-300">
            <span>🎉 Sweet 16th Birthday! 👑</span>
          </div>

          {/* Candle Stand */}
          <div className="flex items-end justify-center gap-2 xs:gap-4 sm:gap-6 mb-2 relative z-20">
            {candles.map((isLit, idx) => (
              <div
                key={idx}
                onClick={() => blowCandle(idx)}
                className="flex flex-col items-center cursor-pointer group"
                title={isLit ? 'Click to blow candle' : 'Candle blown out!'}
              >
                {/* Flame */}
                <div className="h-7 sm:h-8 flex items-center justify-center relative">
                  {isLit ? (
                    <div className="relative">
                      {/* Outer Flame Glow */}
                      <div className="w-4 sm:w-5 h-6 sm:h-7 rounded-full bg-amber-400 blur-sm animate-flicker absolute -top-1 -left-1 opacity-70" />
                      {/* Flame Core */}
                      <div className="w-3 sm:w-3.5 h-5 sm:h-6 rounded-t-full bg-gradient-to-t from-red-500 via-amber-400 to-yellow-100 animate-flicker shadow-lg" />
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400 animate-pulse font-mono">
                      💨
                    </div>
                  )}
                </div>

                {/* Wick */}
                <div className="w-0.5 sm:w-1 h-2.5 sm:h-3 bg-slate-700" />

                {/* Candle Stick */}
                <div className="w-3 sm:w-4 h-12 sm:h-16 rounded-t-sm bg-gradient-to-b from-pink-300 via-purple-300 to-indigo-400 border border-white/20 shadow-md group-hover:scale-105 transition-transform" />
              </div>
            ))}
          </div>

          {/* Cake Tier 1 (Top) */}
          <div className="w-[60vw] max-w-[16rem] sm:w-64 h-12 sm:h-14 rounded-t-3xl bg-gradient-to-r from-pink-500 via-pink-400 to-rose-400 border-t-4 border-white/40 shadow-inner flex items-center justify-center relative z-10">
            <span className="text-white text-[11px] sm:text-xs font-bold tracking-widest uppercase opacity-95">
              💖 Sweet 16 • Ritika 💖
            </span>
          </div>

          {/* Cake Tier 2 (Middle) */}
          <div className="w-[74vw] max-w-[20rem] sm:w-80 h-14 sm:h-16 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-500 border-t-4 border-pink-300/40 shadow-lg flex items-center justify-around px-3 sm:px-4">
            <span className="text-lg sm:text-xl">🍓</span>
            <span className="text-lg sm:text-xl">🍒</span>
            <span className="text-lg sm:text-xl">🍓</span>
            <span className="text-lg sm:text-xl">🍒</span>
          </div>

          {/* Cake Tier 3 (Bottom Base) */}
          <div className="w-[88vw] max-w-[24rem] sm:w-96 h-16 sm:h-20 rounded-b-3xl bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-t-4 border-purple-400/40 shadow-2xl flex items-center justify-center">
            <div className="px-4 py-1 sm:px-6 sm:py-1.5 rounded-full bg-slate-950/80 border border-amber-400/50 text-amber-300 text-[10px] sm:text-xs font-bold">
              👑 RITIKA (PIKU) • 16TH BIRTHDAY • 03.08.2010 👑
            </div>
          </div>

          {/* Cake Plate */}
          <div className="w-[92vw] max-w-md h-4 sm:h-5 rounded-full bg-gradient-to-r from-slate-700 via-slate-400 to-slate-700 shadow-2xl -mt-1" />

          {/* Action Buttons */}
          <div className="mt-6 sm:mt-8 flex items-center gap-4">
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
