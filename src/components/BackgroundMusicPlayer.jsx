import React, { useState } from 'react';
import { useAudio } from '../context/AudioContext';

export function BackgroundMusicPlayer() {
  const { isPlaying, isMuted, volume, autoplayBlocked, togglePlay, toggleMute, setVolume, songTitle } = useAudio();
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      {/* Autoplay prompt toast if browser blocked unmuted autoplay */}
      {autoplayBlocked && (
        <div 
          onClick={togglePlay}
          className="animate-bounce bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-semibold px-3.5 py-2 rounded-full shadow-lg border border-pink-300/40 flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
        >
          <span className="animate-ping">🎵</span>
          <span>Tap anywhere to enable music!</span>
        </div>
      )}

      {/* Floating Audio Player Card */}
      <div className="glass-card rounded-2xl p-2.5 sm:px-4 sm:py-3 border border-pink-500/30 shadow-2xl backdrop-blur-xl flex items-center gap-3 bg-slate-950/85 hover:border-pink-500/50 transition-all duration-300 group">
        
        {/* Spinning Album Vinyl Icon */}
        <div 
          onClick={togglePlay} 
          className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-slate-900 via-pink-950 to-purple-900 border border-pink-500/40 flex items-center justify-center cursor-pointer shadow-inner shrink-0 group-hover:scale-105 transition-transform"
          title={isPlaying ? "Pause background song" : "Play background song"}
        >
          <div className={`w-9 h-9 rounded-full border border-pink-400/20 flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''}`}>
            <div className="w-3 h-3 rounded-full bg-pink-500/80 border border-slate-900 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-white" />
            </div>
          </div>
          <span className="absolute text-sm">🎶</span>
        </div>

        {/* Track Title & Equalizer info */}
        <div className="hidden sm:flex flex-col min-w-[150px] max-w-[200px]">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-100 truncate">{songTitle}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30 font-mono tracking-wider shrink-0" title="Repeating continuously">
              🔁 LOOP
            </span>
          </div>
          
          <div className="flex items-center justify-between text-[11px] text-pink-300/80 mt-0.5">
            <span>{isPlaying ? 'Playing Background Song' : 'Paused'}</span>

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
          className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md transition-all duration-300 ${
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
          className="relative flex items-center"
          onMouseEnter={() => setShowVolumeSlider(true)}
          onMouseLeave={() => setShowVolumeSlider(false)}
        >
          <button
            onClick={toggleMute}
            className="w-8 h-8 rounded-full text-slate-300 hover:text-pink-300 flex items-center justify-center text-xs transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
          </button>

          {/* Popover Volume Slider */}
          {showVolumeSlider && (
            <div className="absolute bottom-full right-0 mb-2 p-2 bg-slate-900/95 border border-pink-500/30 rounded-xl shadow-xl backdrop-blur-lg flex items-center gap-2 animate-fadeIn">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20 accent-pink-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
              />
              <span className="text-[10px] font-mono text-pink-300 min-w-[28px] text-right">
                {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
              </span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
