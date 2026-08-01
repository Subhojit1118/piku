import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { playPopSFX, playChimeSFX } from '../utils/audioSynth';
import { triggerConfettiBurst } from '../utils/confetti';

export function SurpriseGifts() {
  const [openedBox, setOpenedBox] = useState(null);
  const [hugCount, setHugCount] = useState(100);

  useEffect(() => {
    if (openedBox) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [openedBox]);

  const openGift = (boxId) => {
    playPopSFX();
    triggerConfettiBurst(60);
    setOpenedBox(boxId);
  };

  const handleSendHug = () => {
    playChimeSFX();
    setHugCount((prev) => prev + 1);
    triggerConfettiBurst(20);
  };

  return (
    <section id="gifts" className="py-12 sm:py-20 px-3 sm:px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>🎁 Unbox Your Surprises</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold font-cursive shimmer-text px-2">
            Secret Birthday Gift Boxes
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto mt-2 px-4">
            Click on any gift box below to unwrap your special birthday surprises!
          </p>
        </div>

        {/* 3 Gift Boxes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Gift 1: Birthday Letter */}
          <div
            onClick={() => openGift(1)}
            className="glass-card rounded-3xl p-5 sm:p-6 border border-pink-500/30 hover:border-pink-500/70 transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col items-center group relative overflow-hidden"
          >
            <div className="text-5xl sm:text-6xl mb-4 group-hover:scale-110 transition-transform animate-bounce">
              🎁
            </div>
            <h3 className="text-2xl font-bold font-cursive text-pink-300 mb-1">
              Gift Box #1
            </h3>
            <p className="text-xs text-slate-400 font-medium">Secret Heartfelt Letter</p>
            <button className="mt-4 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs font-semibold group-hover:bg-pink-500 group-hover:text-white transition-all">
              Tap to Unwrap ✨
            </button>
          </div>

          {/* Gift 2: Birthday Vows */}
          <div
            onClick={() => openGift(2)}
            className="glass-card rounded-3xl p-5 sm:p-6 border border-purple-500/30 hover:border-purple-500/70 transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col items-center group relative overflow-hidden"
          >
            <div className="text-5xl sm:text-6xl mb-4 group-hover:scale-110 transition-transform animate-bounce">
              🎀
            </div>
            <h3 className="text-2xl font-bold font-cursive text-purple-300 mb-1">
              Gift Box #2
            </h3>
            <p className="text-xs text-slate-400 font-medium">10 Reasons You Are Special</p>
            <button className="mt-4 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-semibold group-hover:bg-purple-500 group-hover:text-white transition-all">
              Tap to Unwrap ✨
            </button>
          </div>

          {/* Gift 3: Hug Meter */}
          <div
            onClick={() => openGift(3)}
            className="glass-card rounded-3xl p-5 sm:p-6 border border-amber-500/30 hover:border-amber-500/70 transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col items-center group relative overflow-hidden"
          >
            <div className="text-5xl sm:text-6xl mb-4 group-hover:scale-110 transition-transform animate-bounce">
              💖
            </div>
            <h3 className="text-2xl font-bold font-cursive text-amber-300 mb-1">
              Gift Box #3
            </h3>
            <p className="text-xs text-slate-400 font-medium">Infinite Virtual Hug Meter</p>
            <button className="mt-4 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold group-hover:bg-amber-500 group-hover:text-white transition-all">
              Tap to Unwrap ✨
            </button>
          </div>
        </div>

        {/* Modal Unboxed Gift Portal Content */}
        {openedBox && createPortal(
          <div
            onClick={() => setOpenedBox(null)}
            style={{ backgroundColor: '#090d16', zIndex: 99999 }}
            className="fixed inset-0 flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{ backgroundColor: '#0f172a', zIndex: 100000 }}
              className="relative max-w-xl w-[95vw] max-h-[90vh] overflow-y-auto rounded-3xl p-4 sm:p-8 border border-pink-500/50 shadow-2xl"
            >
              <button
                onClick={() => setOpenedBox(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white hover:text-pink-300 text-base sm:text-lg font-bold px-3 py-1 bg-slate-800/90 hover:bg-pink-600 rounded-full border border-pink-500/40 cursor-pointer z-20 shadow-lg"
              >
                ✕
              </button>

              {openedBox === 1 && (
                <div className="text-center pt-2">
                  <div className="text-3xl sm:text-4xl mb-2">📜</div>
                  <h3 className="text-3xl sm:text-4xl font-bold font-cursive text-pink-300 mb-4">
                    Dear Piku,
                  </h3>
                  <div className="text-slate-200 font-handwriting text-lg sm:text-xl leading-relaxed space-y-3 bg-slate-950/70 p-4 sm:p-6 rounded-2xl border border-pink-500/20 text-left">
                    <p>
                      Happy Birthday to the most amazing person! Your laughter brings endless warmth, and your presence makes every single day special.
                    </p>
                    <p>
                      May this new year of your life be filled with boundless happiness, incredible adventures, sweet success, and everything your heart desires!
                    </p>
                    <p className="text-right text-pink-400 font-bold">
                      ~ Always with lots of love 💖
                    </p>
                  </div>
                </div>
              )}

              {openedBox === 2 && (
                <div className="pt-2">
                  <div className="text-center text-3xl sm:text-4xl mb-2">🌟</div>
                  <h3 className="text-3xl sm:text-4xl font-bold font-cursive text-purple-300 text-center mb-4">
                    Why You Are Extraordinary
                  </h3>
                  <ul className="text-slate-200 text-xs sm:text-sm space-y-2.5 bg-slate-950/70 p-4 sm:p-6 rounded-2xl border border-purple-500/20">
                    <li className="flex items-center gap-2">
                      <span>✨</span> Your radiant & contagious smile.
                    </li>
                    <li className="flex items-center gap-2">
                      <span>🌸</span> Your kindness towards everyone around you.
                    </li>
                    <li className="flex items-center gap-2">
                      <span>👑</span> The effortless elegance you carry.
                    </li>
                    <li className="flex items-center gap-2">
                      <span>💖</span> Your golden heart that makes life happier.
                    </li>
                    <li className="flex items-center gap-2">
                      <span>🎉</span> The unforgettable energy you bring everywhere!
                    </li>
                  </ul>
                </div>
              )}

              {openedBox === 3 && (
                <div className="text-center flex flex-col items-center pt-2">
                  <div className="text-4xl sm:text-5xl mb-2 animate-pulse">🤗</div>
                  <h3 className="text-3xl sm:text-4xl font-bold font-cursive text-amber-300 mb-2">
                    Virtual Hug Generator
                  </h3>
                  <p className="text-xs text-slate-300 mb-4 sm:mb-6">
                    Tap the button below to send warm birthday hugs to Piku!
                  </p>

                  <div className="text-3xl xs:text-4xl sm:text-6xl font-extrabold font-mono text-pink-400 mb-6 bg-slate-950 px-4 sm:px-8 py-3 sm:py-4 rounded-3xl border border-pink-500/40 glow-pink max-w-full truncate">
                    {hugCount} Hugs Sent!
                  </div>

                  <button
                    onClick={handleSendHug}
                    className="px-6 py-3.5 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-pink-500 to-amber-500 text-white font-bold text-xs sm:text-sm shadow-xl glow-pink hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>🤗 Send Another Warm Hug!</span>
                  </button>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
      </div>
    </section>
  );
}
