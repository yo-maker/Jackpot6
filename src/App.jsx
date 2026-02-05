import { useEffect, useState } from "react";

/* -----------------------------
   SIMPLE LOCAL DB (IndexedDB)
-------------------------------- */
const DB_NAME = "jackpot6-db";
const DB_VERSION = 1;

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains("lethal")) {
        db.createObjectStore("lethal", { keyPath: "id", autoIncrement: true });
      }
      if (!db.objectStoreNames.contains("draws")) {
        db.createObjectStore("draws", { keyPath: "id", autoIncrement: true });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function saveLethal(ticket) {
  const db = await openDB();
  const tx = db.transaction("lethal", "readwrite");
  tx.objectStore("lethal").add(ticket);
}

async function getLethalTickets() {
  const db = await openDB();
  const tx = db.transaction("lethal", "readonly");
  const req = tx.objectStore("lethal").getAll();
  return new Promise(res => (req.onsuccess = () => res(req.result)));
}

/* -----------------------------
   HELPERS
-------------------------------- */
const rand = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function uniqueNumbers(count, max) {
  const set = new Set();
  while (set.size < count) set.add(rand(1, max));
  return [...set].sort((a, b) => a - b);
}

/* -----------------------------
   MAIN APP
-------------------------------- */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState("jackpot6");
  const [lethal, setLethal] = useState([]);

  useEffect(() => {
    getLethalTickets().then(setLethal);
  }, []);

  /* -----------------------------
     JACKPOT 6 LOGIC
  -------------------------------- */
  function generateJackpot6() {
    const tickets = [];

    for (let anchor = 1; anchor <= 11; anchor++) {
      for (let i = 0; i < 5; i++) {
        const others = uniqueNumbers(5, 90).filter(n => n !== anchor);
        const ticket = [anchor, ...others].slice(0, 6).sort((a, b) => a - b);

        tickets.push({
          type: "Jackpot6",
          numbers: ticket,
          confidence: rand(70, 95),
          createdAt: new Date().toISOString()
        });
      }
    }

    tickets.forEach(saveLethal);
    setLethal(prev => [...tickets, ...prev]);
  }

  /* -----------------------------
     ITALY 10e LOTTO LOGIC
  -------------------------------- */
  function generate10eLotto() {
    const tickets = [];

    for (let i = 0; i < 10; i++) {
      tickets.push({
        type: "10eLotto",
        numbers: uniqueNumbers(10, 90),
        confidence: rand(60, 90),
        createdAt: new Date().toISOString()
      });
    }

    tickets.forEach(saveLethal);
    setLethal(prev => [...tickets, ...prev]);
  }

  /* -----------------------------
     CSV EXPORT
  -------------------------------- */
  function exportCSV(data, filename) {
    const rows = [
      ["Type", "Numbers", "Confidence", "Date"],
      ...data.map(t => [
        t.type,
        t.numbers.join("-"),
        t.confidence + "%",
        t.createdAt
      ])
    ];

    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  }

  /* -----------------------------
     UI
  -------------------------------- */
  return (
    <div style={{ fontFamily: "sans-serif", padding: "1rem" }}>
      {/* HEADER */}
      <header style={{ display: "flex", alignItems: "center" }}>
        <button onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        <h1 style={{ marginLeft: "1rem" }}>🎲 Jackpot6 Analyzer</h1>
      </header>

      {/* MENU */}
      {menuOpen && (
        <nav style={{ margin: "1rem 0" }}>
          <button onClick={() => setPage("jackpot6")}>🎯 Jackpot6</button>
          <button onClick={() => setPage("10elotto")}>🎰 10e Lotto</button>
        </nav>
      )}

      <hr />

      {/* PAGES */}
      {page === "jackpot6" && (
        <>
          <h2>🎯 Jackpot6</h2>
          <button onClick={generateJackpot6}>
            🎰 Generate Lethal Tickets
          </button>
        </>
      )}

      {page === "10elotto" && (
        <>
          <h2>🎰 Italy 10e Lotto</h2>
          <button onClick={generate10eLotto}>
            🎰 Generate 10e Lotto Tickets
          </button>
        </>
      )}

      <hr />

      {/* EXPORT */}
      <button onClick={() => exportCSV(lethal, "lethal_tickets.csv")}>
        📁 Export Lethal Tickets (CSV)
      </button>

      <hr />

      {/* LIST */}
      <h3>🔥 Lethal Tickets</h3>
      {lethal.map((t, i) => (
        <div
          key={i}
          style={{
            marginBottom: "0.5rem",
            padding: "0.5rem",
            border: "1px solid #ccc"
          }}
        >
          <strong>{t.type}</strong> → {t.numbers.join(", ")}  
          <br />
          🎯 Confidence: {t.confidence}%
        </div>
      ))}
    </div>
  );
}
