import UserTicketInput from "./components/UserTicketInput";
import { saveTicket } from "./db";
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
  async (data) => {
    setResult(data);
    await saveTicket(data, "generated");
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
      <UserTicketInput />

      {result.length > 0 && (
        <div style={{ marginTop: "1rem", fontSize: "1.3rem" }}>
          {result.map(n => n.num).join(" – ")}
        </div>
      )}

      <Disclaimer />
    </div>
  );
}

export default App;
