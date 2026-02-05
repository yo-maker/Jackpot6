import { openDB } from "idb";
import { generateLethalTickets } from "../utils/lethalGenerator";
import { saveLethalTickets } from "./lethal";

const DB_NAME = "jackpot-db";
const STORE = "draws";

async function db() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
}

export async function saveDraw(numbers) {
  const d = await db();
  const id = await d.add(STORE, {
    numbers,
    createdAt: Date.now(),
  });

  // 🔥 Update lethal confidence after each draw
  const draws = await getDraws();
  const lethal = generateLethalTickets(draws);
  await saveLethalTickets(lethal, id);

  return id;
}

export async function getDraws() {
  const d = await db();
  return d.getAll(STORE);
}
