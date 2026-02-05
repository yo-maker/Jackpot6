// src/utils/heatmap.js

/**
 * Build anchor-based frequency matrix
 * anchors: 1–11
 * companions: 1–60
 */
export function buildAnchorHeatmap(draws, maxNumber = 60) {
  const heatmap = {};

  // Init anchors
  for (let a = 1; a <= 11; a++) {
    heatmap[a] = {};
    for (let n = 1; n <= maxNumber; n++) {
      heatmap[a][n] = 0;
    }
  }

  draws.forEach((draw) => {
    const nums = draw.numbers;

    nums.forEach((anchor) => {
      if (anchor >= 1 && anchor <= 11) {
        nums.forEach((companion) => {
          if (companion !== anchor) {
            heatmap[anchor][companion]++;
          }
        });
      }
    });
  });

  return heatmap;
}

/**
 * Normalize value for coloring
 */
export function intensity(value, max) {
  if (max === 0) return 0;
  return Math.min(value / max, 1);
}
