import { useState } from "react";
import { italy10e } from "../games/italy10e";
import { getDraws } from "../db/draws";
import { generateItaly10eLethal } from "../utils/italy10eLethal";

export default function Italy10ePanel() {
  const [lethal, setLethal] = useState([]);

  const generate = async () => {
    const draws = await getDraws();
    if (!draws.length) {
      alert("No real-world draws saved");
      return;
    }

    setLethal(generateItaly10eLethal(draws, italy10e));
  };

  return (
    <div>
      <h2>🇮🇹 Italy 10e Lotto</h2>
      <p style={{ opacity: 0.7 }}>
        Always 8 numbers · Column-based · Anchor 1–11
      </p>

      <button onClick={generate}>🔥 Generate Lethal Tickets</button>

      {lethal.length > 0 && (
        <ul>
          {lethal.map((t, i) => (
            <li key={i}>
              {t.numbers.join(", ")} —{" "}
              <strong>{t.confidence}%</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
