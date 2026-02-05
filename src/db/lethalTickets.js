// src/db/lethalTickets.js

import { openDB } from "idb";

const DB_NAME = "lottery-db";
const STORE = "lethalTickets";

async function getDB() {
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

/**
 * Save lethal ticket
 */
export async function saveLethalTicket(ticket) {
  const db = await getDB();
  await db.add(STORE, {
    ...ticket,
    createdAt: Date.now(),
    game: "jackpot6",
  });
}

/**
 * Get all lethal tickets
 */
export async function getLethalTickets() {
  const db = await getDB();
  return db.getAll(STORE);
}

/**
 * Clear lethal tickets (optional utility)
 */
export async function clearLethalTickets() {
  const db = await getDB();
  const tx = db.transaction(STORE, "readwrite");
  await tx.store.clear();
  await tx.done;
}
