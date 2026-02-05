const KEY = "jackpot6-data";

export function loadData() {
  return JSON.parse(localStorage.getItem(KEY) || '{"tickets":[],"generated":[]}');
}

export function saveData(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function addTicket(numbers) {
  const data = loadData();
  data.tickets.push({ numbers, date: Date.now() });
  saveData(data);
}

export function addGenerated(numbers) {
  const data = loadData();
  data.generated.push({ numbers, date: Date.now() });
  saveData(data);
}
