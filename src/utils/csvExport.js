// src/utils/csvExport.js

export function exportDrawsCSV(draws) {
  if (!draws.length) return;

  const header = "date,numbers\n";
  const rows = draws
    .map((d) => `${new Date(d.date).toISOString()},"${d.numbers.join(" ")}"`)
    .join("\n");

  downloadCSV(header + rows, "lottery_draws.csv");
}

export function exportLethalCSV(tickets) {
  if (!tickets.length) return;

  const header = "anchor,numbers,confidence,date\n";
  const rows = tickets
    .map(
      (t) =>
        `${t.anchor},"${t.numbers.join(" ")}",${t.confidence},${new Date(
          t.createdAt
        ).toISOString()}`
    )
    .join("\n");

  downloadCSV(header + rows, "lethal_tickets.csv");
}

function downloadCSV(content, filename) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
