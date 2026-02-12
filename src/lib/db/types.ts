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
  /**
   * 사용자가 입력한 장소 이름(예: '서울 합정', '부산 서면').
   * 기존 DB의 city 컬럼을 재사용한다.
   */
  placeName: string | null;
  imageData: string; // base64 data URL
  createdAt: string;
  userId: string;
}

export interface SavedPostRow {
  userId: string;
  postId: string;
  createdAt: string;
}
