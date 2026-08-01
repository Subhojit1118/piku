/**
 * Client-side dynamic background removal tool using HTML5 Canvas.
 * Analyzes corner/edge background colors, computes color distances,
 * and generates a transparent PNG Data URL cutout.
 */

export function removeBackgroundFromImage(imageSrc, threshold = 55, smoothness = 15) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const width = canvas.width;
        const height = canvas.height;

        // Sample background colors from 4 corners and top/side edges
        const samplePoints = [
          [0, 0],
          [width - 1, 0],
          [0, height - 1],
          [width - 1, height - 1],
          [Math.floor(width / 2), 0],
          [0, Math.floor(height / 2)],
          [width - 1, Math.floor(height / 2)],
          [Math.floor(width * 0.1), Math.floor(height * 0.1)],
          [Math.floor(width * 0.9), Math.floor(height * 0.1)]
        ];

        const bgSamples = samplePoints.map(([x, y]) => {
          const idx = (y * width + x) * 4;
          return [data[idx], data[idx + 1], data[idx + 2]];
        });

        // Helper: Euclidean color distance in RGB space
        const colorDistance = (r1, g1, b1, r2, g2, b2) => {
          const dr = r1 - r2;
          const dg = g1 - g2;
          const db = b1 - b2;
          return Math.sqrt(dr * dr + dg * dg + db * db);
        };

        // Minimum distance from a pixel to any background sample
        const getMinBgDistance = (r, g, b) => {
          let minDist = Infinity;
          for (let i = 0; i < bgSamples.length; i++) {
            const dist = colorDistance(r, g, b, bgSamples[i][0], bgSamples[i][1], bgSamples[i][2]);
            if (dist < minDist) minDist = dist;
          }
          return minDist;
        };

        // Process pixel alpha values
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const dist = getMinBgDistance(r, g, b);

          if (dist < threshold) {
            // Background pixel -> make transparent
            data[i + 3] = 0;
          } else if (dist < threshold + smoothness) {
            // Feathered edge for smooth transition
            const alphaFactor = (dist - threshold) / smoothness;
            data[i + 3] = Math.floor(255 * alphaFactor);
          }
        }

        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = (err) => reject(err);
    img.src = imageSrc;
  });
}
