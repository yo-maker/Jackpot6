import { useState } from "react";
import { saveTicket } from "../db/db";

export default function UserTicketInput({ onSaved }) {
  const [input, setInput] = useState("");

  const save = async () => {
    const numbers = input
      .split(",")
      .map((n) => Number(n.trim()))
      .filter((n) => !isNaN(n));

    if (numbers.length !== 6) {
      alert("Enter exactly 6 numbers");
      return;
    }

    await saveTicket(numbers);
    setInput("");
    onSaved();
  };

  return (
    <div>
      <h3>Enter Real Ticket</h3>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g. 5,12,23,34,45,49"
        style={{ width: "100%", padding: "8px" }}
      />
      <button onClick={save} style={{ marginTop: "8px" }}>
        Save Ticket
      </button>
    </div>
  );
}
