function downloadCSV(filename, rows) {
  const csv = rows.map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

export function exportDrawsCSV(draws) {
  const rows = [
    ["id", "numbers", "createdAt"],
    ...draws.map((d) => [
      d.id,
      d.numbers.join(" "),
      new Date(d.createdAt).toISOString(),
    ]),
  ];

  downloadCSV("draws.csv", rows);
}

export function exportLethalCSV(lethal) {
  const rows = [
    ["numbers", "anchor", "confidence"],
    ...lethal.map((t) => [
      t.numbers.join(" "),
      t.anchor ?? "",
      t.confidence,
    ]),
  ];

  downloadCSV("lethal_tickets.csv", rows);
}
