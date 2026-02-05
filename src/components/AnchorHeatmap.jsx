import { useEffect, useState } from "react";
import { getDraws } from "../db/draws";
import { buildAnchorHeatmap, intensity } from "../utils/heatmap";

export default function AnchorHeatmap() {
  const [map, setMap] = useState(null);
  const [max, setMax] = useState(0);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const draws = await getDraws();
    if (!draws.length) return;

    const heatmap = buildAnchorHeatmap(draws);

    let m = 0;
    Object.values(heatmap).forEach((row) =>
      Object.values(row).forEach((v) => (m = Math.max(m, v)))
    );

    setMap(heatmap);
    setMax(m);
  };

  if (!map) {
    return <p>No draw data yet for heatmap</p>;
  }

  return (
    <div style={{ overflowX: "auto", marginTop: "1rem" }}>
      <h3>📊 Anchor Heatmap (1–11)</h3>

      <table style={{ borderCollapse: "collapse", fontSize: "0.75rem" }}>
        <thead>
          <tr>
            <th>Anchor</th>
            {Array.from({ length: 60 }, (_, i) => (
              <th key={i}>{i + 1}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Object.entries(map).map(([anchor, row]) => (
            <tr key={anchor}>
              <td><strong>{anchor}</strong></td>

              {Object.entries(row).map(([num, val]) => {
                const alpha = intensity(val, max);
                return (
                  <td
                    key={num}
                    style={{
                      width: 12,
                      height: 12,
                      background: `rgba(255,0,0,${alpha})`,
                      textAlign: "center",
                    }}
                    title={`Anchor ${anchor} + ${num}: ${val}`}
                  >
                    {val > 0 ? "•" : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
