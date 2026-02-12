import { create } from 'zustand';

export interface UploadState {
  imageDataUrl: string | null;
  menuName: string;
  tasteReview: string;
  rating: 'good' | 'best';
  lat: number | null;
  lng: number | null;
  city: string | null;
  isSubmitting: boolean;
  setImage: (dataUrl: string | null) => void;
  setMenuName: (v: string) => void;
  setTasteReview: (v: string) => void;
  setRating: (v: 'good' | 'best') => void;
  setLocation: (lat: number | null, lng: number | null, city: string | null) => void;
  setSubmitting: (v: boolean) => void;
  reset: () => void;
}

const initialState = {
  imageDataUrl: null as string | null,
  menuName: '',
  tasteReview: '',
  rating: 'good' as const,
  lat: null as number | null,
  lng: null as number | null,
  city: null as string | null,
  isSubmitting: false,
};

export const useUploadStore = create<UploadState>((set) => ({
  ...initialState,
  setImage: (imageDataUrl) => set({ imageDataUrl }),
  setMenuName: (menuName) => set({ menuName }),
  setTasteReview: (tasteReview) =>
    set({ tasteReview: tasteReview.slice(0, 100) }),
  setRating: (rating) => set({ rating }),
  setLocation: (lat, lng, city) => set({ lat, lng, city }),
  setSubmitting: (isSubmitting) => set({ isSubmitting }),
  reset: () => set(initialState),
}));
