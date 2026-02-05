// src/utils/drawAnalysis.js

/**
 * Detect repeated real-world lottery draws
 * @param {Array<{numbers: number[]}>} draws
 */
export function findRepeatedDraws(draws) {
  const map = {};
  const repeats = [];

  draws.forEach((draw) => {
    // Normalize draw (sort numbers)
    const key = [...draw.numbers].sort((a, b) => a - b).join(",");

    map[key] = (map[key] || 0) + 1;
  });

  Object.entries(map).forEach(([key, count]) => {
    if (count > 1) {
      repeats.push({
        numbers: key.split(",").map(Number),
        count,
      });
    }
  });

  return repeats;
}
