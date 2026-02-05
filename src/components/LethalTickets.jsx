import { useEffect, useState } from "react";
import { getLethalTickets } from "../db/lethal";

export default function LethalTickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setTickets(await getLethalTickets());
  }

  function trend(history) {
    if (history.length < 2) return "➖";
    const a = history.at(-2).confidence;
    const b = history.at(-1).confidence;
    if (b > a) return "📈";
    if (b < a) return "📉";
    return "➖";
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      <h3>☠️ Lethal Tickets</h3>

      {tickets.map((t, i) => (
        <div key={i} style={{ marginBottom: "0.5rem" }}>
          <strong>{t.numbers.join(", ")}</strong>{" "}
          — {t.confidence}% {trend(t.history)}
        </div>
      ))}
    </div>
  );
}
