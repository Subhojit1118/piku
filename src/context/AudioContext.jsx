import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import dunkiSong from '../assets/Dunki_ O Maahi (Full Video) _ Shah Rukh Khan _ Taapsee Pannu _ Pritam _ Arijit Singh _ Irshad Kamil.mp3';

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.loop = true;

    const zeroClickEvents = [
      'click',
      'touchstart',
      'touchend',
      'pointerdown',
      'mousedown',
      'keydown',
      'scroll'
    ];

    const tryPlayUnmuted = () => {
      if (!audioRef.current) return;
      if (!audioRef.current.muted && !audioRef.current.paused) {
        removeListeners();
        return;
      }

      audioRef.current.muted = false;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setIsMuted(false);
        setAutoplayBlocked(false);
        removeListeners();
      }).catch(() => {
        setAutoplayBlocked(true);
        if (audioRef.current && audioRef.current.paused) {
          audioRef.current.muted = true;
          audioRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch(() => { });
        }
      });
    };

    const removeListeners = () => {
      zeroClickEvents.forEach((evt) => {
        window.removeEventListener(evt, tryPlayUnmuted);
      });
    };

    const addListeners = () => {
      zeroClickEvents.forEach((evt) => {
        window.addEventListener(evt, tryPlayUnmuted, { passive: true });
      });
    };
    audio.muted = true;
    audio.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => { });
    addListeners();

    return () => {
      removeListeners();
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && !audio.muted) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.muted = false;
      setIsMuted(false);
      audio.play().then(() => {
        setIsPlaying(true);
        setAutoplayBlocked(false);
      }).catch((err) => console.error('Play error:', err));
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextMute = !isMuted;
    audio.muted = nextMute;
    setIsMuted(nextMute);
  };

  const setVolume = (val) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVol = Math.max(0, Math.min(1, val));
    audio.volume = newVol;
    setVolumeState(newVol);
    if (newVol === 0) {
      setIsMuted(true);
      audio.muted = true;
    } else if (isMuted) {
      setIsMuted(false);
      audio.muted = false;
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isMuted,
        volume,
        autoplayBlocked,
        togglePlay,
        toggleMute,
        setVolume,
        songTitle: 'O Maahi - Dunki (Arijit Singh)',
      }}
    >
      <audio
        ref={audioRef}
        src={dunkiSong}
        loop
        autoPlay
        muted
        preload="auto"
      />
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
