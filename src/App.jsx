import { useEffect, useState } from "react";
import { useLotteryWorker } from "./hooks/useLotteryWorker";
import { getTickets } from "./db/db";
import UserTicketInput from "./components/UserTicketInput";
import TicketHistory from "./components/TicketHistory";
import Disclaimer from "./components/Disclaimer";

export default function App() {
  const [generated, setGenerated] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const { runSimulation } = useLotteryWorker();

  const loadTickets = async () => {
    const all = await getTickets();
    setTickets(all);
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const generate = () => {
    setLoading(true);
    runSimulation(
      { simulations: 50000, maxNumber: 60, picks: 6 },
      (data) => {
        setGenerated(data);
        setLoading(false);
      }
    );
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "480px", margin: "auto" }}>
      <h1>Jackpot 6</h1>

      <button onClick={generate} disabled={loading}>
        {loading ? "Calculating..." : "Generate Numbers"}
      </button>

      {generated.length > 0 && (
        <h2>Generated: {generated.join(", ")}</h2>
      )}

      <UserTicketInput onSaved={loadTickets} />
      <TicketHistory tickets={tickets} generated={generated} />
      <Disclaimer />
    </div>
  );
}
