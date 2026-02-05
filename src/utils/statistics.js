// src/utils/statistics.js

/**
 * Count how often each number appears
 * @param {Array<{numbers: number[]}>} draws
 * @param {number} maxNumber
 */
export function getNumberFrequency(draws, maxNumber = 11) {
  const freq = {};

  for (let i = 1; i <= maxNumber; i++) {
    freq[i] = 0;
  }

  draws.forEach((draw) => {
    draw.numbers.forEach((n) => {
      if (freq[n] !== undefined) {
        freq[n]++;
      }
    });
  });

  return freq;
}

/**
 * Generate statistically favoured 6-number tickets
 * Each ticket starts with a frequent number
 */
export function generateLuckyTickets(draws, options = {}) {
  const {
    maxNumber = 11,
    ticketSize = 6,
    ticketsPerNumber = 3,
  } = options;

  if (!draws.length) return [];

  // 1️⃣ Frequency table
  const freq = getNumberFrequency(draws, maxNumber);

  // 2️⃣ Sort numbers by frequency (desc)
  const sortedNumbers = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .map(([n]) => Number(n));

  const tickets = [];

  // 3️⃣ For each number (1–11)
  sortedNumbers.forEach((baseNumber) => {
    // Pick the most frequent companions
    const companions = sortedNumbers
      .filter((n) => n !== baseNumber)
      .slice(0, ticketSize - 1);

    for (let i = 0; i < ticketsPerNumber; i++) {
      const ticket = [
        baseNumber,
        ...shuffleArray(companions).slice(0, ticketSize - 1),
      ]
        .sort((a, b) => a - b); // 🔢 ASCENDING ORDER

      // Avoid duplicates
      if (!tickets.some((t) => sameTicket(t, ticket))) {
        tickets.push(ticket);
      }
    }
  });

  return tickets;
}

/* ---------- helpers ---------- */

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sameTicket(a, b) {
  if (a.length !== b.length) return false;
  return a.every((n, i) => n === b[i]);
}
