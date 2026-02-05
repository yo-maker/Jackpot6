import { useState } from "react";
import { saveDraw } from "../db/draws";

export default function DrawInput() {
  const [value, setValue] = useState("");

  const submit = async () => {
    const numbers = value
      .split(",")
      .map((n) => parseInt(n.trim(), 10))
      .filter((n) => !isNaN(n));

    if (numbers.length !== 6) {
      alert("Enter exactly 6 numbers");
      return;
    }

    await saveDraw(numbers);
    setValue("");
    alert("Draw saved successfully ✅");
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Enter Official Draw</h3>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="e.g. 4, 12, 19, 27, 33, 45"
        style={{ width: "100%" }}
      />
      <button onClick={submit} style={{ marginTop: "0.5rem" }}>
        Save Draw
      </button>
    </div>
  );
}
