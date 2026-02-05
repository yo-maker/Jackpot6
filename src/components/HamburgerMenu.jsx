export default function HamburgerMenu({ current, onSelect }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <details>
        <summary
          style={{
            fontSize: "1.5rem",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          ☰
        </summary>

        <div style={{ marginTop: "0.5rem" }}>
          <button
            onClick={() => onSelect("jackpot6")}
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: current === "jackpot6" ? "bold" : "normal",
            }}
          >
            🎲 Jackpot 6
          </button>

          <button
            onClick={() => onSelect("italy10e")}
            style={{
              display: "block",
              fontWeight: current === "italy10e" ? "bold" : "normal",
            }}
          >
            🇮🇹 Italy 10e Lotto
          </button>
        </div>
      </details>
    </div>
  );
}
