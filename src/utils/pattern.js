export function extractLuckyNumbers(tickets, picks = 6) {
  const freq = {};

  tickets.forEach((t) => {
    t.numbers.forEach((n) => {
      freq[n] = (freq[n] || 0) + 1;
    });
  });

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, picks)
    .map(([num]) => Number(num));
}
