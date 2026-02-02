self.onmessage = (e) => {
  const { simulations, maxNumber, picks } = e.data;
  const counts = Array(maxNumber + 1).fill(0);

  for (let i = 0; i < simulations; i++) {
    const nums = new Set();
    while (nums.size < picks) {
      nums.add(Math.floor(Math.random() * maxNumber) + 1);
    }
    nums.forEach((n) => counts[n]++);
  }

  const result = counts
    .map((count, number) => ({ number, count }))
    .filter((n) => n.number !== 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, picks)
    .map((n) => n.number);

  self.postMessage(result);
};
