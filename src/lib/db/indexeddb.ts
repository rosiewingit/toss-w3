const DB_NAME = 'nyam-db';
const STORE_NAME = 'sqlite';
const KEY = 'db';

export function loadDbFromIndexedDB(): Promise<Uint8Array | null> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.close();
        resolve(null);
        return;
      }
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const getReq = store.get(KEY);
      getReq.onerror = () => reject(getReq.error);
      getReq.onsuccess = () => resolve(getReq.result ?? null);
      tx.oncomplete = () => db.close();
    };
    request.onupgradeneeded = (e) => {
      (e.target as IDBOpenDBRequest).result.createObjectStore(STORE_NAME);
    };
  });
}

export function saveDbToIndexedDB(data: Uint8Array): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(data, KEY);
      tx.onerror = () => reject(tx.error);
      tx.oncomplete = () => {
        db.close();
        resolve();
      };
    };
    request.onupgradeneeded = (e) => {
      (e.target as IDBOpenDBRequest).result.createObjectStore(STORE_NAME);
    };
  });
}
