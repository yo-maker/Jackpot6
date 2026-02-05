import { useEffect, useState } from "react";
import { getDraws, saveDraw } from "../db/draws";
import { generateItalyLethal } from "../utils/italyLethalGenerator";
import ItalyHeatmap from "./ItalyHeatmap";

export default function Italy10ePanel() {
  const [draw, setDraw] = useState("");
  const [lethal, setLethal] = useState([]);
  const [anchor, setAnchor] = useState(true);

  async function load() {
    const draws = await getDraws();
    const lethalTickets = generateItalyLethal(draws, anchor);
    setLethal(lethalTickets);
  }

  useEffect(() => {
    load();
  }, [anchor]);

  const submitDraw = async () => {
    const nums = draw
      .split(",")
      .map((n) => Number(n.trim()))
      .filter((n) => n >= 1 && n <= 90);

    if (nums.length < 8) {
      alert("Enter at least 8 numbers");
      return;
    }

    await saveDraw(nums);
    setDraw("");
    load();
  };

  return (
    <div>
      <h2>🇮🇹 Italy 10e Lotto</h2>

      <label>
        <input
          type="checkbox"
          checked={anchor}
          onChange={(e) => setAnchor(e.target.checked)}
        />
        Use Anchor (1–11)
      </label>

      <p style={{ marginTop: "0.5rem" }}>
        Enter real draw (up to 20 numbers, comma separated)
      </p>

      <input
        value={draw}
        onChange={(e) => setDraw(e.target.value)}
        style={{ width: "100%" }}
        placeholder="e.g. 3, 8, 15, 22, 34, 45, 57, 68..."
      />

      <button
        onClick={submitDraw}
        style={{ marginTop: "0.5rem" }}
      >
        Save Draw
      </button>

      <hr />

      <h3>☠️ Lethal Tickets (8 numbers)</h3>
      {lethal.map((t, i) => (
        <div key={i}>
          {t.numbers.join(", ")} — {t.confidence}%
        </div>
      ))}

      <hr />

      <ItalyHeatmap />
    </div>
  );
}
