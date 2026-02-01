import { useState } from "react";
import Disclaimer from "./components/Disclaimer";
import { useLotteryWorker } from "./hooks/useLotteryWorker";

function App() {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { runSimulation } = useLotteryWorker();

  const generateNumbers = () => {
    setLoading(true);

    runSimulation(
      {
        simulations: 50000,
        maxNumber: 60,
        picks: 6,
      },
      (data) => {
        setResult(data);
        setLoading(false);
      }
    );
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Jackpot 6</h1>

      <button onClick={generateNumbers} disabled={loading}>
        {loading ? "Running simulation…" : "Generate Numbers"}
      </button>

      <ul style={{ marginTop: "1rem" }}>
        {result.map((n) => (
          <li key={n.num}>
            {n.num} (score: {n.count})
          </li>
        ))}
      </ul>

      <Disclaimer />
    </div>
  );
}

export default App;
