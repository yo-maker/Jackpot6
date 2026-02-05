import { openDB } from "idb";

const DB_NAME = "jackpot-db";
const STORE = "lethal";

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

export async function saveLethalTickets(tickets, drawId) {
  const d = await db();
  const tx = d.transaction(STORE, "readwrite");
  const store = tx.objectStore(STORE);

  for (const t of tickets) {
    const existing = await findExisting(store, t.numbers);

    if (existing) {
      existing.confidence = t.confidence;
      existing.history.push({
        drawId,
        confidence: t.confidence,
        at: Date.now(),
      });
      await store.put(existing);
    } else {
      await store.add({
        numbers: t.numbers,
        anchor: t.anchor,
        confidence: t.confidence,
        history: [
          {
            drawId,
            confidence: t.confidence,
            at: Date.now(),
          },
        ],
        createdAt: Date.now(),
      });
    }
  }

  await tx.done;
}

export async function getLethalTickets() {
  const d = await db();
  return d.getAll(STORE);
}

function sameTicket(a, b) {
  return a.length === b.length && a.every((n, i) => n === b[i]);
}

async function findExisting(store, numbers) {
  const all = await store.getAll();
  return all.find((t) => sameTicket(t.numbers, numbers));
}
