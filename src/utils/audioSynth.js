/**
 * Web Audio API synthesizer for Happy Birthday tune and sound effects.
 * Requires no external mp3 files.
 */

let audioCtx = null;
let currentSongOscillators = [];
let isPlayingSong = false;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Note frequency map (in Hz)
const NOTES = {
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, Bb4: 466.16
};

// Happy Birthday melody sequence: [note, duration in seconds]
const BIRTHDAY_MELODY = [
  ['G4', 0.3], ['G4', 0.3], ['A4', 0.6], ['G4', 0.6], ['C5', 0.6], ['B4', 1.2],
  ['G4', 0.3], ['G4', 0.3], ['A4', 0.6], ['G4', 0.6], ['D5', 0.6], ['C5', 1.2],
  ['G4', 0.3], ['G4', 0.3], ['G5', 0.6], ['E5', 0.6], ['C5', 0.6], ['B4', 0.6], ['A4', 1.2],
  ['F5', 0.3], ['F5', 0.3], ['E5', 0.6], ['C5', 0.6], ['D5', 0.6], ['C5', 1.4]
];

export function playHappyBirthdayTune(onEnded = () => {}) {
  const ctx = getAudioContext();
  stopHappyBirthdayTune();

  isPlayingSong = true;
  let currentTime = ctx.currentTime + 0.1;

  BIRTHDAY_MELODY.forEach(([note, duration]) => {
    if (!isPlayingSong) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(NOTES[note] || 440, currentTime);

    // Warm bell envelope
    gain.gain.setValueAtTime(0.001, currentTime);
    gain.gain.exponentialRampToValueAtTime(0.25, currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, currentTime + duration - 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(currentTime);
    osc.stop(currentTime + duration);

    currentSongOscillators.push(osc);
    currentTime += duration + 0.05;
  });

  const totalDuration = currentTime - ctx.currentTime;
  setTimeout(() => {
    isPlayingSong = false;
    onEnded();
  }, totalDuration * 1000);

  return isPlayingSong;
}

export function stopHappyBirthdayTune() {
  currentSongOscillators.forEach((osc) => {
    try { osc.stop(); } catch (_) {}
  });
  currentSongOscillators = [];
  isPlayingSong = false;
}

export function isSongPlaying() {
  return isPlayingSong;
}

export function playPopSFX() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  } catch (_) {}
}

export function playBlowCandlesSFX() {
  try {
    const ctx = getAudioContext();
    const bufferSize = ctx.sampleRate * 0.8;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.8);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    whiteNoise.start();
  } catch (_) {}
}

export function playChimeSFX() {
  try {
    const ctx = getAudioContext();
    const freqs = [523.25, 659.25, 783.99, 1046.50];
    const now = ctx.currentTime;

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = now + idx * 0.06;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  } catch (_) {}
}

/**
 * Synthesizes a realistic Pataka (Firecracker) / Rocket burst sound effect.
 */
export function playPatakaSFX() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // 1. Whistle sound (Rocket launch)
    const whistleOsc = ctx.createOscillator();
    const whistleGain = ctx.createGain();
    whistleOsc.type = 'sawtooth';
    whistleOsc.frequency.setValueAtTime(300, now);
    whistleOsc.frequency.exponentialRampToValueAtTime(1400, now + 0.18);
    whistleGain.gain.setValueAtTime(0.1, now);
    whistleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    whistleOsc.connect(whistleGain);
    whistleGain.connect(ctx.destination);
    whistleOsc.start(now);
    whistleOsc.stop(now + 0.18);

    // 2. Main Explosion Boom
    const boomTime = now + 0.15;
    const boomOsc = ctx.createOscillator();
    const boomGain = ctx.createGain();
    boomOsc.type = 'sine';
    boomOsc.frequency.setValueAtTime(160, boomTime);
    boomOsc.frequency.exponentialRampToValueAtTime(35, boomTime + 0.35);

    boomGain.gain.setValueAtTime(0.4, boomTime);
    boomGain.gain.exponentialRampToValueAtTime(0.001, boomTime + 0.35);

    boomOsc.connect(boomGain);
    boomGain.connect(ctx.destination);
    boomOsc.start(boomTime);
    boomOsc.stop(boomTime + 0.35);

    // 3. Crackling Pataka pops (Multiple rapid noise pops)
    const popCount = 6;
    for (let i = 0; i < popCount; i++) {
      const popTime = boomTime + 0.05 + Math.random() * 0.25;
      const popOsc = ctx.createOscillator();
      const popGain = ctx.createGain();
      popOsc.type = 'square';
      popOsc.frequency.setValueAtTime(600 + Math.random() * 800, popTime);
      popOsc.frequency.exponentialRampToValueAtTime(100, popTime + 0.04);

      popGain.gain.setValueAtTime(0.15, popTime);
      popGain.gain.exponentialRampToValueAtTime(0.001, popTime + 0.04);

      popOsc.connect(popGain);
      popGain.connect(ctx.destination);
      popOsc.start(popTime);
      popOsc.stop(popTime + 0.04);
    }
  } catch (_) {}
}

