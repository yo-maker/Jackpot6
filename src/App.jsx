import { useState } from "react";
import { saveTicket } from "./db";
import { useLotteryWorker } from "./hooks/useLotteryWorker";
import UserTicketInput from "./components/UserTicketInput";
import Disclaimer from "./components/Disclaimer";

function App() {
  const [result, setResult] = useState([]);
  const [userTicket, setUserTicket] = useState([]);
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
        setResult(data.map((d) => d.number));
        await saveTicket("generated", data.map((d) => d.number));
        setLoading(false);
      }
    );
  };

  const matches = userTicket.filter((n) => result.includes(n));

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Jackpot 6 🎰</h1>

      <button onClick={generateNumbers} disabled={loading}>
        {loading ? "Running simulation…" : "Generate Numbers"}
      </button>

      {result.length > 0 && (
        <>
          <h2>Generated Numbers</h2>
          <p>{result.join(", ")}</p>
        </>
      )}

      <UserTicketInput onSave={setUserTicket} />

      {userTicket.length > 0 && (
        <>
          <h2>Your Numbers</h2>
          <p>{userTicket.join(", ")}</p>

          <h3>Matches 🎯</h3>
          <p>{matches.length > 0 ? matches.join(", ") : "No matches yet"}</p>
        </>
      )}

      <Disclaimer />
    </div>
  );
}

export default App;
