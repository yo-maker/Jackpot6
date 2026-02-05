import { useEffect, useState } from "react";
import Disclaimer from "./Disclaimer";
import LethalTickets from "./LethalTickets";

import { exportDrawsCSV, exportLethalCSV } from "../utils/csv";
import { getDraws } from "../db/draws";
import { getLethalTickets } from "../db/lethal";

export default function Jackpot6Panel({
  generateNumbers,
  compareTickets,
  result,
  matches,
  loading,
}) {
  const [lethal, setLethal] = useState([]);

  useEffect(() => {
    loadLethal();
  }, []);

  async function loadLethal() {
    const data = await getLethalTickets();
    setLethal(data);
  }

  return (
    <div>
      <h1>🎲 Jackpot 6</h1>

      <p style={{ opacity: 0.7 }}>
        Generate, analyze, and track lethal lottery tickets
      </p>

      {/* 🎰 Generate ticket */}
      <button
        onClick={generateNumbers}
        disabled={loading}
        style={{ marginTop: "1rem" }}
      >
        🎰 {loading ? "Running simulation…" : "Generate Numbers"}
      </button>

      {/* 🎟 Generated ticket */}
      {result.length > 0 && (
        <ul style={{ marginTop: "1rem" }}>
          {result.map((n) => (
            <li key={n.num}>
              {n.num} (score: {n.count})
            </li>
          ))}
        </ul>
      )}

      {/* 🎯 Compare */}
      <button
        onClick={compareTickets}
        style={{ marginTop: "1.5rem" }}
      >
        🎯 Compare Tickets
      </button>

      {/* 🎯 Matching tickets */}
      {matches.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <h3>🎯 Matching Tickets</h3>
          <ul>
            {matches.map((m, i) => (
              <li key={i}>
                {m.ticket.join(", ")} → {m.matchCount} match
                {m.matchCount > 1 ? "es" : ""}
              </li>
            ))}
          </ul>
        </div>
      )}

      <hr />

      {/* ☠️ Lethal tickets */}
      <LethalTickets />

      <hr />

      {/* 📁 CSV EXPORT */}
      <button
        onClick={async () => exportDrawsCSV(await getDraws())}
      >
        📁 Export Draws (CSV)
      </button>

      <button
        onClick={async () => exportLethalCSV(await getLethalTickets())}
        style={{ marginLeft: "0.5rem" }}
      >
        📁 Export Lethal Tickets (CSV)
      </button>

      <Disclaimer />
    </div>
  );
}
