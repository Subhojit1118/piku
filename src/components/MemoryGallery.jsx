import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { playPopSFX } from '../utils/audioSynth';
import { imagesMap as defaultImagesMap } from '../utils/images';

export function MemoryGallery({ imagesMap }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const activeImagesMap = imagesMap || defaultImagesMap;

  const memories = [
    { key: 'img7', title: 'Heartwarming Smiles', date: 'Special Moments', caption: 'Your smile lights up every single room!', badge: '💖 Cutest Smile' },
    { key: 'img8', title: 'Warm Embrace', date: 'Precious Memories', caption: 'Holding hands & creating beautiful memories.', badge: '🌸 Pure Love' },
    { key: 'img9', title: 'Outing & Laughter', date: 'Sunny Day Out', caption: 'Laughing together under the bright open sky.', badge: '✨ Brightest Vibe' },
    { key: 'img10', title: 'Yellow Saree Royalty', date: 'Festive Magic', caption: 'Looking extraordinarily elegant, royal and graceful.', badge: '👑 Birthday Queen' },
    { key: 'img11', title: 'Travel Diaries', date: 'Journey of Love', caption: 'Every trip is unforgettable when I am with you.', badge: '🚉 Best Partner' },
    { key: 'img12', title: 'Unfiltered Joy', date: 'Happy Days', caption: 'Cherishing all the sweet little moments in life.', badge: '🌟 Endless Joy' },
  ];

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  const openLightbox = (item) => {
    playPopSFX();
    const resolvedSrc = activeImagesMap[item.key] || defaultImagesMap[item.key];
    setSelectedImage({
      ...item,
      src: resolvedSrc,
    });
  };

  return (
    <section id="memories" className="py-12 sm:py-20 px-3 sm:px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>📸 Scrapbook Memories</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold font-cursive shimmer-text px-2">
            Piku's Polaroid Memory Wall
          </h2>
          <p className="text-slate-300 max-w-lg mx-auto text-xs sm:text-sm mt-2 px-4">
            A romantic collection of original cherished photos presented in vintage polaroid memory cards.
          </p>
        </div>

        {/* Polaroid Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {memories.map((mem) => {
            const imgSrc = activeImagesMap[mem.key] || defaultImagesMap[mem.key];

            return (
              <div
                key={mem.key}
                className="bg-slate-900/90 rounded-3xl p-3.5 sm:p-4 border border-pink-500/20 shadow-xl hover:shadow-2xl hover:border-pink-500/60 transition-all duration-300 hover:-translate-y-2 flex flex-col group cursor-pointer"
                onClick={() => openLightbox(mem)}
              >
                {/* Polaroid Header */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="text-xs font-semibold text-pink-300 bg-pink-500/10 px-2.5 py-0.5 rounded-full border border-pink-500/20">
                    {mem.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Original</span>
                </div>

                {/* Photo Display Frame */}
                <div className="relative w-full h-64 sm:h-80 rounded-2xl bg-slate-950 p-2 border border-slate-800 flex items-center justify-center overflow-hidden group-hover:border-pink-500/40 transition-colors">
                  <img
                    src={imgSrc}
                    alt={mem.title}
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105 shadow-md select-none"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-pink-500 text-white text-xs font-bold shadow-lg">
                      🔍 Tap to Zoom
                    </span>
                  </div>
                </div>

                {/* Caption & Title */}
                <div className="pt-3.5 px-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-cursive text-pink-300 mb-1">
                      {mem.title}
                    </h3>
                    <p className="text-xs text-slate-300 font-light leading-relaxed">
                      "{mem.caption}"
                    </p>
                  </div>
                  <div className="mt-3 text-[10px] text-slate-500 font-mono tracking-wider uppercase text-right">
                    {mem.date}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Portal Modal */}
      {selectedImage && createPortal(
        <div
          onClick={() => setSelectedImage(null)}
          style={{ backgroundColor: '#090d16', zIndex: 99999 }}
          className="fixed inset-0 flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: '#0f172a', zIndex: 100000 }}
            className="relative max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto rounded-3xl p-4 sm:p-6 border border-pink-500/50 shadow-2xl flex flex-col items-center"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white hover:text-pink-300 text-lg font-bold px-3 py-1 bg-slate-800/90 hover:bg-pink-600 rounded-full border border-pink-500/40 cursor-pointer z-20 shadow-lg"
            >
              ✕
            </button>

            <h3 className="text-2xl sm:text-3xl font-bold font-cursive text-pink-300 mb-3 text-center pr-8">
              {selectedImage.title}
            </h3>

            <div
              style={{ backgroundColor: '#020617' }}
              className="w-full max-h-[58vh] flex items-center justify-center rounded-2xl p-2 border border-slate-800 mb-3 overflow-hidden shadow-inner min-h-[250px]"
            >
              <img
                src={selectedImage.src || activeImagesMap[selectedImage.key] || defaultImagesMap[selectedImage.key]}
                alt={selectedImage.title}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className="max-h-[52vh] w-auto object-contain rounded-xl shadow-2xl select-none"
              />
            </div>

            <p className="text-slate-200 font-handwriting text-center text-lg sm:text-xl">
              "{selectedImage.caption}"
            </p>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
