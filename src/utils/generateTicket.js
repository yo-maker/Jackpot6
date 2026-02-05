function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateItalyTicket(game, useAnchor) {
  const ticket = [];

  if (useAnchor) {
    // 1️⃣ First number from 1–11
    const [aMin, aMax] = game.columns[0];
    ticket.push(rand(aMin, aMax));

    // 2️⃣ One number from each remaining column
    for (let i = 1; i < game.picks; i++) {
      const [min, max] = game.columns[i];
      ticket.push(rand(min, max));
    }
  } else {
    // Still column-safe, but anchor not forced
    for (let i = 0; i < game.picks; i++) {
      const [min, max] = game.columns[i];
      ticket.push(rand(min, max));
    }
  }

  // 🔢 Always sorted
  return ticket.sort((a, b) => a - b);
}
