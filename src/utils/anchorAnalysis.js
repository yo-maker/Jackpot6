// src/utils/anchorAnalysis.js

/**
 * Analyze real-world draws for anchor (1–11) behavior
 * @param {Array<{numbers:number[]}>} draws
 */
export function analyzeAnchors(draws) {
  const anchorStats = {};

  // Initialize anchors 1–11
  for (let i = 1; i <= 11; i++) {
    anchorStats[i] = {
      count: 0,
      companions: {},
    };
  }

  draws.forEach((draw) => {
    const nums = draw.numbers;

    nums.forEach((n) => {
      if (n >= 1 && n <= 11) {
        anchorStats[n].count++;

        nums.forEach((other) => {
          if (other !== n) {
            anchorStats[n].companions[other] =
              (anchorStats[n].companions[other] || 0) + 1;
          }
        });
      }
    });
  });

  return anchorStats;
}

/**
 * Get top companion numbers for an anchor
 */
export function getTopCompanions(anchorData, limit = 20) {
  return Object.entries(anchorData.companions)
    .sort((a, b) => b[1] - a[1])
    .map(([n]) => Number(n))
    .slice(0, limit);
}
