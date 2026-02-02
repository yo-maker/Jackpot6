export default function TicketHistory({ tickets, generated }) {
  return (
    <div>
      <h3>Saved Tickets</h3>
      {tickets.map((t) => {
        const matches = t.numbers.filter((n) =>
          generated.includes(n)
        ).length;

        return (
          <div key={t.id} style={{ marginBottom: "6px" }}>
            {t.numbers.join(", ")} → Matches: {matches}
          </div>
        );
      })}
    </div>
  );
}
