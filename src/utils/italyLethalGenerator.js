import { buildItalyHeatmap } from "./italyHeatmap";
import { italy10e } from "../games/italy10e";

export function generateItalyLethal(draws, anchorEnabled = true) {
  const heatmap = buildItalyHeatmap(draws, italy10e.columns);
  const tickets = [];

  for (let i = 0; i < 5; i++) {
    const nums = [];

    italy10e.columns.forEach(([min, max], colIndex) => {
      const freq = heatmap[colIndex];

      let pool = Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .map(([n]) => Number(n));

      if (colIndex === 0 && !anchorEnabled) {
        pool = pool.slice(3); // soften anchor
      }

      nums.push(pool[i % pool.length]);
    });

    const confidence = calculateItalyConfidence(nums, heatmap);

    tickets.push({
      numbers: nums.sort((a, b) => a - b),
      confidence,
    });
  }

  return tickets;
}

function calculateItalyConfidence(numbers, heatmap) {
  let score = 0;
  let max = 0;

  numbers.forEach((n) => {
    Object.values(heatmap).forEach((col) => {
      if (col[n]) {
        score += col[n];
        max += 10;
      }
    });
  });

  return Math.min(99, Math.round((score / max) * 100));
}
