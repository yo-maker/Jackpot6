import { useEffect, useState } from "react";
import { getDraws } from "../db/draws";
import { italy10e } from "../games/italy10e";
import { buildItalyHeatmap } from "../utils/italyHeatmap";

export default function ItalyHeatmap() {
  const [heatmap, setHeatmap] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const draws = await getDraws();
    if (!draws.length) return;

    const map = buildItalyHeatmap(draws, italy10e.columns);
    setHeatmap(map);
  }

  if (!heatmap) {
    return <p style={{ opacity: 0.6 }}>No draw data yet</p>;
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      <h3>📊 Italy 10e Heatmap</h3>

      <div style={{ display: "grid", gap: "1rem" }}>
        {italy10e.columns.map(([min, max], colIdx) => (
          <div key={colIdx}>
            <strong>
              Column {colIdx + 1} ({min}–{max})
            </strong>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gap: "4px",
                marginTop: "0.3rem",
              }}
            >
              {Object.entries(heatmap[colIdx]).map(
                ([num, count]) => (
                  <div
                    key={num}
                    style={{
                      padding: "4px",
                      textAlign: "center",
                      background: `rgba(255, 0, 0, ${
                        count / 10
                      })`,
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                    }}
                  >
                    {num}
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
