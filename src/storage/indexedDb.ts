import { openDB } from "idb";

const DB_NAME = "password-manager";
const STORE = "vault";

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(STORE);
  },
});

export async function saveVaultCache(data: any) {
  const db = await dbPromise;
  await db.put(STORE, data, "vault");
}

export async function loadVaultCache() {
  const db = await dbPromise;
  return (await db.get(STORE, "vault")) || null;
}