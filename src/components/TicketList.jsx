export default function TicketList({ tickets }) {
  return (
    <div>
      <h3>Saved Tickets</h3>
      {tickets.map((t) => (
        <div key={t.id}>
          [{t.source}] {t.numbers.join(", ")}
        </div>
      ))}
    </div>
  );
}
