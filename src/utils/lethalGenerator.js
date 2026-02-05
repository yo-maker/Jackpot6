import { buildAnchorHeatmap } from "./heatmap";

/**
 * Generate lethal Jackpot6 tickets
 * - 6 numbers
 * - anchor 1–11
 * - heatmap-weighted
 */
export function generateLethalTickets(draws) {
  const heatmap = buildAnchorHeatmap(draws, 60);
  const tickets = [];

  for (let anchor = 1; anchor <= 11; anchor++) {
    const row = heatmap[anchor];

    // Sort companions by strength
    const companions = Object.entries(row)
      .filter(([n]) => Number(n) !== anchor)
      .sort((a, b) => b[1] - a[1])
      .map(([n]) => Number(n));

    // At least 5 lethal tickets per anchor
    for (let i = 0; i < 5; i++) {
      const nums = [
        anchor,
        ...companions.slice(i, i + 5),
      ]
        .slice(0, 6)
        .sort((a, b) => a - b);

      const confidence = calculateConfidence(nums, heatmap);

      tickets.push({
        numbers: nums,
        confidence,
        anchor,
      });
    }
  }

  return tickets;
}

/**
 * Confidence scoring
 */
function calculateConfidence(numbers, heatmap) {
  let score = 0;
  let max = 0;

  numbers.forEach((a) => {
    if (a >= 1 && a <= 11) {
      numbers.forEach((b) => {
        if (a !== b) {
          score += heatmap[a][b] || 0;
          max += 10;
        }
      });
    }
  });

  return Math.min(99, Math.round((score / max) * 100));
}
