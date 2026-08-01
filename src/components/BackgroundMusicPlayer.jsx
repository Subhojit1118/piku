import React, { useState } from 'react';
import { useAudio } from '../context/AudioContext';

export function BackgroundMusicPlayer() {
  const { isPlaying, isMuted, volume, autoplayBlocked, togglePlay, toggleMute, setVolume, songTitle } = useAudio();
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  return (
    <>
      {/* Top Welcome Entry Banner if unmuted autoplay is waiting for gesture */}
      {autoplayBlocked && (
        <div 
          onClick={togglePlay}
          className="fixed top-16 sm:top-20 left-1/2 -translate-x-1/2 z-[60] animate-bounce bg-gradient-to-r from-pink-600 via-purple-600 to-amber-500 text-white text-xs sm:text-sm font-bold px-4 py-2 sm:px-6 sm:py-2.5 rounded-full shadow-2xl border-2 border-pink-300/60 flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform backdrop-blur-md max-w-[92vw] text-center"
        >
          <span className="animate-ping text-base shrink-0">🎵</span>
          <span className="truncate">Move cursor or tap anywhere to play "O Maahi" background song! 💖</span>
        </div>
      )}

      <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-50 flex flex-col items-end gap-2 max-w-[calc(100vw-24px)]">
        {/* Autoplay prompt toast if browser blocked unmuted autoplay */}
        {autoplayBlocked && (
          <div 
            onClick={togglePlay}
            className="animate-bounce bg-gradient-to-r from-pink-600 to-purple-600 text-white text-[11px] sm:text-xs font-semibold px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full shadow-lg border border-pink-300/40 flex items-center gap-1.5 sm:gap-2 cursor-pointer hover:scale-105 transition-transform max-w-full truncate"
          >
            <span className="animate-ping shrink-0">🎵</span>
            <span className="truncate">Tap anywhere to enable music!</span>
          </div>
        )}

      {/* Floating Audio Player Card */}
      <div className="glass-card rounded-2xl p-2 sm:px-4 sm:py-3 border border-pink-500/30 shadow-2xl backdrop-blur-xl flex items-center gap-2 sm:gap-3 bg-slate-950/85 hover:border-pink-500/50 transition-all duration-300 group max-w-full">
        
        {/* Spinning Album Vinyl Icon */}
        <div 
          onClick={togglePlay} 
          className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-slate-900 via-pink-950 to-purple-900 border border-pink-500/40 flex items-center justify-center cursor-pointer shadow-inner shrink-0 group-hover:scale-105 transition-transform"
          title={isPlaying ? "Pause background song" : "Play background song"}
        >
          <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-pink-400/20 flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''}`}>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-pink-500/80 border border-slate-900 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-white" />
            </div>
          </div>
          <span className="absolute text-xs sm:text-sm">🎶</span>
        </div>

        {/* Track Title & Equalizer info */}
        <div className="hidden xs:flex flex-col min-w-[110px] sm:min-w-[150px] max-w-[160px] sm:max-w-[200px]">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-100 truncate">{songTitle}</span>
            <span className="text-[9px] sm:text-[10px] px-1 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30 font-mono tracking-wider shrink-0" title="Repeating continuously">
              🔁 LOOP
            </span>
          </div>
          
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-pink-300/80 mt-0.5">
            <span>{isPlaying ? 'Playing' : 'Paused'}</span>

            {/* Equalizer animation when playing */}
            {isPlaying && (
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 bg-pink-400 rounded-full animate-equalizer-1" />
                <span className="w-0.5 bg-purple-400 rounded-full animate-equalizer-2" />
                <span className="w-0.5 bg-amber-400 rounded-full animate-equalizer-3" />
                <span className="w-0.5 bg-pink-300 rounded-full animate-equalizer-4" />
              </div>
            )}
          </div>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold shadow-md transition-all duration-300 shrink-0 ${
            isPlaying
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 glow-pink hover:scale-110'
              : 'bg-slate-800 text-pink-400 border border-pink-500/40 hover:bg-pink-500/20'
          }`}
          title={isPlaying ? "Pause Music" : "Play Music"}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>

        {/* Mute & Volume Slider Controls */}
        <div 
          className="relative flex items-center shrink-0"
          onMouseEnter={() => setShowVolumeSlider(true)}
          onMouseLeave={() => setShowVolumeSlider(false)}
        >
          <button
            onClick={toggleMute}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full text-slate-300 hover:text-pink-300 flex items-center justify-center text-xs transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
          </button>

          {/* Popover Volume Slider */}
          {showVolumeSlider && (
            <div className="absolute bottom-full right-0 mb-2 p-2 bg-slate-900/95 border border-pink-500/30 rounded-xl shadow-xl backdrop-blur-lg flex items-center gap-2 animate-fadeIn z-50">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-16 sm:w-20 accent-pink-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
              />
              <span className="text-[10px] font-mono text-pink-300 min-w-[24px] sm:min-w-[28px] text-right">
                {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
              </span>
            </div>
          )}
        </div>

      </div>
      </div>
    </>
  );
}
