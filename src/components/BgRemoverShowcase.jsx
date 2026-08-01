import React, { useState } from 'react';
import { playChimeSFX, playPopSFX } from '../utils/audioSynth';
import { triggerConfettiBurst } from '../utils/confetti';

export function PhotoShowcase({ imagesMap }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const imageList = [
    { key: 'img1', name: 'Cute Selfie Together', tag: '💖 Warm Moments', desc: 'Sweet smiles and cozy memories together.' },
    { key: 'img2', name: 'Romantic Hug & Smile', tag: '🌸 Pure Affection', desc: 'Holding close and sharing genuine happiness.' },
    { key: 'img3', name: 'Outing Laughter', tag: '✨ Sunny Days', desc: 'Bright outdoor fun and playful expressions.' },
    { key: 'img4', name: 'Yellow Saree Royalty', tag: '👑 Birthday Queen', desc: 'Stunning grace and traditional elegance.' },
    { key: 'img5', name: 'Travel & Journeys', tag: '🚉 Best Partner', desc: 'Creating unforgettable memories on every trip.' },
    { key: 'img6', name: 'Cherished Smiles', tag: '🌟 Pure Joy', desc: 'Unfiltered laughter and beautiful vibes.' },
  ];

  const handleZoom = (item) => {
    playPopSFX();
    setSelectedPhoto(item);
  };

  const handleDownload = (src, filename) => {
    playChimeSFX();
    const a = document.createElement('a');
    a.href = src;
    a.download = filename;
    a.click();
    triggerConfettiBurst(30);
  };

  return (
    <section id="bg-studio" className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>📸 Special Gallery</span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-bold font-cursive shimmer-text">
            Piku's Original Photo Gallery
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto mt-2 text-sm">
            High-resolution original photos capturing sweet smiles, romantic moments, and cherished birthday memories. Tap any photo to view in full resolution!
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {imageList.map((item) => {
            const imgSrc = imagesMap[item.key];

            return (
              <div
                key={item.key}
                className="glass-card rounded-3xl p-4 border border-pink-500/20 hover:border-pink-500/60 transition-all duration-300 flex flex-col items-center group hover:-translate-y-1.5 shadow-xl"
              >
                {/* Header Tag */}
                <div className="flex items-center justify-between w-full mb-3 px-1">
                  <span className="text-xs font-semibold text-pink-300 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20">
                    {item.tag}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Original</span>
                </div>

                {/* Photo Display Frame */}
                <div
                  onClick={() => handleZoom(item)}
                  className="relative w-full h-80 rounded-2xl bg-slate-950 p-2 border border-slate-800 flex items-center justify-center overflow-hidden cursor-pointer group-hover:border-pink-500/40 transition-colors"
                >
                  <img
                    src={imgSrc}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105 shadow-md"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-pink-500 text-white text-xs font-bold shadow-lg">
                      🔍 View Full Size
                    </span>
                  </div>
                </div>

                {/* Description & Action */}
                <div className="flex items-center justify-between w-full pt-3 px-1 mt-1">
                  <div>
                    <h3 className="text-base font-bold text-pink-200">{item.name}</h3>
                    <p className="text-xs text-slate-400 font-light">{item.desc}</p>
                  </div>

                  <button
                    onClick={() => handleDownload(imgSrc, `${item.key}-original.jpeg`)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-medium transition-all flex items-center gap-1 cursor-pointer shrink-0 ml-2"
                    title="Download Photo"
                  >
                    <span>⬇️ Save</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-3xl w-full bg-slate-900 rounded-3xl p-6 border border-pink-500/40 shadow-2xl flex flex-col items-center">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold px-3.5 py-1 bg-slate-800 rounded-full border border-slate-700 cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-3xl font-bold font-cursive text-pink-300 mb-2">
              {selectedPhoto.name}
            </h3>

            <div className="w-full max-h-[70vh] flex items-center justify-center bg-slate-950 rounded-2xl p-2 border border-slate-800 mb-4 overflow-hidden">
              <img
                src={imagesMap[selectedPhoto.key]}
                alt={selectedPhoto.name}
                className="max-h-[65vh] w-auto object-contain rounded-xl shadow-2xl"
              />
            </div>

            <p className="text-sm text-slate-300 font-handwriting text-xl text-center">
              "{selectedPhoto.desc}"
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
