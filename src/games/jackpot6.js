// src/games/jackpot6.js

export const jackpot6 = {
  id: "jackpot6",
  name: "Jackpot 6 (6/60)",

  // 🎯 Official rules
  maxNumber: 60,
  picks: 6,

  // 🔁 Optional anchor logic
  // First number can be forced from 1–11
  usesAnchor: true,
  anchorRange: [1, 11],

  // Used by generators / statistics
  description:
    "6 numbers from 1–60. Optional anchor (1–11) influences combinations.",
};
