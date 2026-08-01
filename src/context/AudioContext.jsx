import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import dunkiSong from '../assets/Dunki_ O Maahi (Full Video) _ Shah Rukh Khan _ Taapsee Pannu _ Pritam _ Arijit Singh _ Irshad Kamil.mp3';

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.loop = true; // Ensure endless looping back-to-back

    const attemptPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);
      } catch (err) {
        console.log('Autoplay blocked by browser. Awaiting user interaction.');
        setIsPlaying(false);
        setAutoplayBlocked(true);
      }
    };

    attemptPlay();

    // Auto-start playback on first user interaction if blocked by browser policy
    const handleFirstInteraction = () => {
      if (audio.paused) {
        audio.play().then(() => {
          setIsPlaying(true);
          setAutoplayBlocked(false);
        }).catch((e) => console.log('Playback start error on interaction:', e));
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
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
