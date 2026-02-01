import { openDB } from "idb";

const DB_NAME = "jackpot6-db";
const STORE = "tickets";

export const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE)) {
      db.createObjectStore(STORE, {
        keyPath: "id",
        autoIncrement: true,
      });
    }
  },
});

export async function saveTicket(numbers, source = "generated") {
  const db = await dbPromise;
  await db.add(STORE, {
    numbers,
    source,
    createdAt: new Date(),
  });
}

export async function getTickets() {
  const db = await dbPromise;
  return db.getAll(STORE);
}
