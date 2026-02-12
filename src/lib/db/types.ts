export type Rating = 'good' | 'best';

export interface User {
  id: string;
  name: string | null;
  createdAt: string;
}

export interface Post {
  id: string;
  menuName: string;
  tasteReview: string;
  rating: Rating;
  lat: number | null;
  lng: number | null;
  city: string | null;
  imageData: string; // base64 data URL
  createdAt: string;
  userId: string;
}

export interface SavedPostRow {
  userId: string;
  postId: string;
  createdAt: string;
}
