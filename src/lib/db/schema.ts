export const SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT,
  createdAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  menuName TEXT NOT NULL,
  tasteReview TEXT NOT NULL,
  rating TEXT NOT NULL CHECK (rating IN ('good', 'best')),
  lat REAL,
  lng REAL,
  city TEXT,
  imageData TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS saved_posts (
  userId TEXT NOT NULL,
  postId TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  PRIMARY KEY (userId, postId),
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (postId) REFERENCES posts(id)
);

CREATE INDEX IF NOT EXISTS idx_posts_createdAt ON posts(createdAt DESC);
CREATE INDEX IF NOT EXISTS idx_saved_posts_userId ON saved_posts(userId);
`;
