import type { Database } from 'sql.js'; // types in src/types/sql.js.d.ts
import { loadDbFromIndexedDB, saveDbToIndexedDB } from './indexeddb';
import { SCHEMA } from './schema';

const DEFAULT_USER_ID = 'local-user';

let dbInstance: Database | null = null;

async function loadSqlJs() {
  const initSqlJs = (await import('sql.js')).default;
  return initSqlJs({
    locateFile: (file: string) => `/${file}`,
  });
}

function runSchema(db: Database) {
  db.run(SCHEMA);
  // Ensure default user exists
  try {
    db.run(
      `INSERT INTO users (id, name, createdAt) VALUES (?, ?, ?)`,
      [DEFAULT_USER_ID, null, new Date().toISOString()]
    );
  } catch {
    // User already exists
  }
}

export async function getDb(): Promise<Database> {
  if (dbInstance) return dbInstance;

  const SQL = await loadSqlJs();
  const saved = await loadDbFromIndexedDB();

  if (saved && saved.length > 0) {
    dbInstance = new SQL.Database(saved);
  } else {
    dbInstance = new SQL.Database();
    runSchema(dbInstance);
    await persistDb();
  }

  return dbInstance;
}

export async function persistDb(): Promise<void> {
  if (!dbInstance) return;
  const data = dbInstance.export();
  await saveDbToIndexedDB(data);
}

export function getDefaultUserId(): string {
  return DEFAULT_USER_ID;
}
