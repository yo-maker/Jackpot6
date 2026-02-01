import { useState } from "react";
import { saveTicket } from "../db";

export default function UserTicketInput() {
  const [inputs, setInputs] = useState(Array(6).fill(""));
  const [textInput, setTextInput] = useState("");
  const [message, setMessage] = useState("");

  function validate(numbers) {
    if (numbers.length !== 6) return "Must be exactly 6 numbers";
    const unique = new Set(numbers);
    if (unique.size !== 6) return "No duplicate numbers allowed";
    if (numbers.some(n => n < 1 || n > 60))
      return "Numbers must be between 1 and 60";
    return null;
  }

  async function handleSave(numbers) {
    const error = validate(numbers);
    if (error) {
      setMessage(error);
      return;
    }
    await saveTicket(numbers, "user");
    setMessage("✅ Ticket saved");
  }

  const handleInputChange = (i, value) => {
    const next = [...inputs];
    next[i] = value;
    setInputs(next);
  };

  const saveFromBoxes = () => {
    const numbers = inputs.map(n => Number(n)).filter(Boolean);
    handleSave(numbers);
  };

  const saveFromText = () => {
    const numbers = textInput
      .split(",")
      .map(n => Number(n.trim()))
      .filter(Boolean);
    handleSave(numbers);
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Your Ticket</h2>

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {inputs.map((val, i) => (
          <input
            key={i}
            type="number"
            min="1"
            max="60"
            value={val}
            onChange={(e) => handleInputChange(i, e.target.value)}
            style={{ width: "60px" }}
          />
        ))}
      </div>

      <button onClick={saveFromBoxes} style={{ marginTop: "0.5rem" }}>
        Save Ticket (Inputs)
      </button>

      <div style={{ marginTop: "1rem" }}>
        <input
          type="text"
          placeholder="e.g. 4, 12, 18, 27, 41, 60"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          style={{ width: "100%" }}
        />
        <button onClick={saveFromText} style={{ marginTop: "0.5rem" }}>
          Save Ticket (Text)
        </button>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
}
