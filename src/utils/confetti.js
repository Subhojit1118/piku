import { playPatakaSFX } from './audioSynth';

let globalCanvas = null;
let globalCtx = null;
let activeFireworks = [];
let activeParticles = [];
let animFrameId = null;

function getCelebrationCanvas() {
  if (!globalCanvas || !document.body.contains(globalCanvas)) {
    globalCanvas = document.createElement('canvas');
    globalCanvas.id = 'celebration-canvas';
    globalCanvas.style.position = 'fixed';
    globalCanvas.style.top = '0';
    globalCanvas.style.left = '0';
    globalCanvas.style.width = '100vw';
    globalCanvas.style.height = '100vh';
    globalCanvas.style.pointerEvents = 'none';
    globalCanvas.style.zIndex = '9999';
    document.body.appendChild(globalCanvas);
  }
  globalCanvas.width = window.innerWidth;
  globalCanvas.height = window.innerHeight;
  globalCtx = globalCanvas.getContext('2d');
  return { canvas: globalCanvas, ctx: globalCtx };
}

function startGlobalLoop() {
  if (animFrameId) return;

  function loop() {
    if (!globalCtx || !globalCanvas) return;
    const width = globalCanvas.width;
    const height = globalCanvas.height;

    globalCtx.clearRect(0, 0, width, height);

    // 1. Update & draw rockets
    for (let i = activeFireworks.length - 1; i >= 0; i--) {
      const fw = activeFireworks[i];
      fw.x += fw.vx;
      fw.y += fw.vy;
      fw.vy += 0.08; // subtle gravity on rocket

      // Rocket flame / trail
      globalCtx.save();
      globalCtx.beginPath();
      globalCtx.arc(fw.x, fw.y, 3, 0, Math.PI * 2);
      globalCtx.fillStyle = '#fbbf24';
      globalCtx.shadowColor = '#f59e0b';
      globalCtx.shadowBlur = 10;
      globalCtx.fill();
      globalCtx.restore();

      // Check if rocket reached target apex height or slowed down
      if (fw.vy >= -0.5 || fw.y <= fw.targetY) {
        // EXPLODE!
        explodeFirework(fw.x, fw.y, fw.color);
        activeFireworks.splice(i, 1);
      }
    }

    // 2. Update & draw particles (confetti, sparks, emojis)
    for (let i = activeParticles.length - 1; i >= 0; i--) {
      const p = activeParticles[i];
      if (p.opacity <= 0) {
        activeParticles.splice(i, 1);
        continue;
      }

      p.vx *= p.drag;
      p.vy *= p.drag;
      p.vy += p.gravity;

      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.vRot;
      p.opacity -= p.fadeSpeed || 0.012;

      globalCtx.save();
      globalCtx.translate(p.x, p.y);
      globalCtx.rotate((p.rotation * Math.PI) / 180);
      globalCtx.globalAlpha = Math.max(0, p.opacity);

      if (p.isEmoji) {
        globalCtx.font = `${p.size}px sans-serif`;
        globalCtx.textAlign = 'center';
        globalCtx.textBaseline = 'middle';
        globalCtx.fillText(p.emoji, 0, 0);
      } else {
        globalCtx.fillStyle = p.color;
        if (p.shape === 'circle') {
          globalCtx.beginPath();
          globalCtx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          globalCtx.fill();
        } else if (p.shape === 'star') {
          drawStar(globalCtx, 0, 0, 5, p.size, p.size / 2);
        } else if (p.shape === 'heart') {
          drawHeart(globalCtx, p.size);
        } else {
          globalCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        }
      }

      globalCtx.restore();
    }

    if (activeFireworks.length > 0 || activeParticles.length > 0) {
      animFrameId = requestAnimationFrame(loop);
    } else {
      globalCtx.clearRect(0, 0, width, height);
      animFrameId = null;
    }
  }

  animFrameId = requestAnimationFrame(loop);
}

function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  let step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fill();
}

function drawHeart(ctx, size) {
  ctx.beginPath();
  const topCurveHeight = size * 0.3;
  ctx.moveTo(0, topCurveHeight);
  ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
  ctx.bezierCurveTo(-size / 2, size * 0.6, 0, size * 0.8, 0, size);
  ctx.bezierCurveTo(0, size * 0.8, size / 2, size * 0.6, size / 2, topCurveHeight);
  ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
  ctx.fill();
}

function explodeFirework(x, y, themeColor) {
  const colors = ['#f472b6', '#fbbf24', '#c084fc', '#38bdf8', '#4ade80', '#fb7185', '#ec4899', '#a855f7'];
  const shapes = ['circle', 'star', 'heart', 'square'];
  const celebrationEmojis = ['🎆', '🎇', '🥳', '💥', '✨', '🏆', '💫', '🎉', '👑', '🏏', '🌟', '💖'];

  // Play explosion sound effect
  playPatakaSFX();

  // Spawn main explosion sparks
  const sparkCount = 65;
  for (let i = 0; i < sparkCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 14 + 3;

    activeParticles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 9 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 16,
      opacity: 1,
      gravity: 0.28,
      drag: 0.95,
      fadeSpeed: Math.random() * 0.015 + 0.01,
      isEmoji: false,
    });
  }

  // Spawn celebratory emojis floating & spinning outwards
  const emojiCount = 8;
  for (let i = 0; i < emojiCount; i++) {
    const angle = (i / emojiCount) * Math.PI * 2 + Math.random() * 0.4;
    const speed = Math.random() * 8 + 4;
    const emoji = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];

    activeParticles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      size: Math.random() * 12 + 22,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 8,
      opacity: 1,
      gravity: 0.18,
      drag: 0.96,
      fadeSpeed: 0.008,
      isEmoji: true,
      emoji,
    });
  }
}

export function triggerConfettiBurst(particleCount = 100) {
  getCelebrationCanvas();
  const width = globalCanvas.width;
  const height = globalCanvas.height;
  const colors = ['#f472b6', '#fbbf24', '#c084fc', '#38bdf8', '#4ade80', '#fb7185'];
  const shapes = ['square', 'circle', 'heart', 'star'];

  for (let i = 0; i < particleCount; i++) {
    activeParticles.push({
      x: width / 2 + (Math.random() * 200 - 100),
      y: height * 0.5,
      vx: (Math.random() - 0.5) * 18,
      vy: (Math.random() - 0.8) * 22,
      size: Math.random() * 8 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 12,
      opacity: 1,
      gravity: 0.35,
      drag: 0.96,
      fadeSpeed: 0.012,
      isEmoji: false,
    });
  }

  startGlobalLoop();
}

/**
 * Triggers a Google Cricket-Win Style Pataka (Firecracker) Celebration.
 * Shoots rockets that explode into glittering fireworks, star bursts, and celebratory emojis!
 */
export function triggerPatakaCelebration() {
  getCelebrationCanvas();
  const width = globalCanvas.width;
  const height = globalCanvas.height;

  // Launch 3 to 5 firework rockets from various points at the bottom
  const rocketCount = Math.floor(Math.random() * 3) + 3;
  const colors = ['#f472b6', '#fbbf24', '#c084fc', '#38bdf8', '#4ade80', '#fb7185'];

  for (let i = 0; i < rocketCount; i++) {
    const startX = width * 0.15 + Math.random() * (width * 0.7);
    const startY = height + 10;
    const targetY = height * 0.15 + Math.random() * (height * 0.35);

    const distanceY = startY - targetY;
    const speedY = -(Math.random() * 5 + 14);

    activeFireworks.push({
      x: startX,
      y: startY,
      targetY,
      vx: (Math.random() - 0.5) * 4,
      vy: speedY,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }

  startGlobalLoop();
}
