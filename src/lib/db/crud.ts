import type { Post, Rating } from './types';
import { getDb, persistDb, getDefaultUserId } from './client';

function rowToPost(row: unknown[]): Post {
  return {
    id: row[0] as string,
    userId: row[1] as string,
    menuName: row[2] as string,
    tasteReview: row[3] as string,
    rating: row[4] as Rating,
    lat: (row[5] as number) ?? null,
    lng: (row[6] as number) ?? null,
    city: (row[7] as string) ?? null,
    imageData: row[8] as string,
    createdAt: row[9] as string,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const db = await getDb();
  const result = db.exec(
    'SELECT id, userId, menuName, tasteReview, rating, lat, lng, city, imageData, createdAt FROM posts ORDER BY createdAt DESC'
  );
  if (!result.length) return [];
  return result[0].values.map((row) => rowToPost(row));
}

export async function getPostById(id: string): Promise<Post | null> {
  const db = await getDb();
  const stmt = db.prepare(
    'SELECT id, userId, menuName, tasteReview, rating, lat, lng, city, imageData, createdAt FROM posts WHERE id = ?'
  );
  stmt.bind([id]);
  const row = stmt.step() ? stmt.get() : null;
  stmt.free();
  return row ? rowToPost(row) : null;
}

export async function insertPost(insert: {
  menuName: string;
  tasteReview: string;
  rating: Rating;
  lat: number | null;
  lng: number | null;
  city: string | null;
  imageData: string;
}): Promise<Post> {
  const db = await getDb();
  const userId = getDefaultUserId();
  const id = `post-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const createdAt = new Date().toISOString();
  db.run(
    `INSERT INTO posts (id, userId, menuName, tasteReview, rating, lat, lng, city, imageData, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      userId,
      insert.menuName,
      insert.tasteReview,
      insert.rating,
      insert.lat,
      insert.lng,
      insert.city,
      insert.imageData,
      createdAt,
    ]
  );
  await persistDb();
  return {
    id,
    userId,
    ...insert,
    createdAt,
  };
}

export async function getSavedPostIds(userId: string): Promise<Set<string>> {
  const db = await getDb();
  const stmt = db.prepare('SELECT postId FROM saved_posts WHERE userId = ?');
  stmt.bind([userId]);
  const ids: string[] = [];
  while (stmt.step()) ids.push(stmt.get()[0] as string);
  stmt.free();
  return new Set(ids);
}

export async function isSaved(userId: string, postId: string): Promise<boolean> {
  const db = await getDb();
  const stmt = db.prepare(
    'SELECT 1 FROM saved_posts WHERE userId = ? AND postId = ?'
  );
  stmt.bind([userId, postId]);
  const found = stmt.step();
  stmt.free();
  return found;
}

export async function savePost(postId: string): Promise<void> {
  const db = await getDb();
  const userId = getDefaultUserId();
  const createdAt = new Date().toISOString();
  try {
    db.run(
      'INSERT INTO saved_posts (userId, postId, createdAt) VALUES (?, ?, ?)',
      [userId, postId, createdAt]
    );
    await persistDb();
  } catch {
    // Already saved
  }
}

export async function unsavePost(postId: string): Promise<void> {
  const db = await getDb();
  const userId = getDefaultUserId();
  db.run('DELETE FROM saved_posts WHERE userId = ? AND postId = ?', [
    userId,
    postId,
  ]);
  await persistDb();
}

export async function toggleSaved(postId: string): Promise<boolean> {
  const userId = getDefaultUserId();
  const saved = await isSaved(userId, postId);
  if (saved) {
    await unsavePost(postId);
    return false;
  }
  await savePost(postId);
  return true;
}

export async function getMyPosts(): Promise<Post[]> {
  const db = await getDb();
  const userId = getDefaultUserId();
  const stmt = db.prepare(
    'SELECT id, userId, menuName, tasteReview, rating, lat, lng, city, imageData, createdAt FROM posts WHERE userId = ? ORDER BY createdAt DESC'
  );
  stmt.bind([userId]);
  const rows: Post[] = [];
  while (stmt.step()) rows.push(rowToPost(stmt.get()));
  stmt.free();
  return rows;
}

export async function getSavedPosts(): Promise<Post[]> {
  const db = await getDb();
  const userId = getDefaultUserId();
  const stmt = db.prepare(
    `SELECT p.id, p.userId, p.menuName, p.tasteReview, p.rating, p.lat, p.lng, p.city, p.imageData, p.createdAt
     FROM posts p
     INNER JOIN saved_posts s ON p.id = s.postId
     WHERE s.userId = ?
     ORDER BY s.createdAt DESC`
  );
  stmt.bind([userId]);
  const rows: Post[] = [];
  while (stmt.step()) rows.push(rowToPost(stmt.get()));
  stmt.free();
  return rows;
}

export async function getPostsWithLocation(): Promise<
  Array<Pick<Post, 'id' | 'lat' | 'lng' | 'menuName' | 'city'>>
> {
  const db = await getDb();
  const result = db.exec(
    'SELECT id, lat, lng, menuName, city FROM posts WHERE lat IS NOT NULL AND lng IS NOT NULL'
  );
  if (!result.length) return [];
  return result[0].values.map((row) => ({
    id: row[0] as string,
    lat: row[1] as number,
    lng: row[2] as number,
    menuName: row[3] as string,
    city: row[4] as string | null,
  }));
}
