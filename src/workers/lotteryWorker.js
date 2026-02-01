self.onmessage = (e) => {
  const { simulations, maxNumber, picks } = e.data;

  const frequency = Array(maxNumber + 1).fill(0);

  for (let i = 0; i < simulations; i++) {
    const draw = new Set();
    while (draw.size < picks) {
      draw.add(Math.floor(Math.random() * maxNumber) + 1);
    }
    draw.forEach(n => frequency[n]++);
  }

  const numbers = frequency
    .map((count, num) => ({ num, count }))
    .slice(1)
    .sort((a, b) => b.count - a.count);

  self.postMessage(numbers.slice(0, picks));
};
