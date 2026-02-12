import { create } from 'zustand';

export interface UploadState {
  imageDataUrl: string | null;
  menuName: string;
  tasteReview: string;
  rating: 'good' | 'best';
  placeName: string;
  isSubmitting: boolean;
  setImage: (dataUrl: string | null) => void;
  setMenuName: (v: string) => void;
  setTasteReview: (v: string) => void;
  setRating: (v: 'good' | 'best') => void;
  setPlaceName: (v: string) => void;
  setSubmitting: (v: boolean) => void;
  reset: () => void;
}

const initialState = {
  imageDataUrl: null as string | null,
  menuName: '',
  tasteReview: '',
  rating: 'good' as const,
  placeName: '',
  isSubmitting: false,
};

export const useUploadStore = create<UploadState>((set) => ({
  ...initialState,
  setImage: (imageDataUrl) => set({ imageDataUrl }),
  setMenuName: (menuName) => set({ menuName }),
  setTasteReview: (tasteReview) =>
    set({ tasteReview: tasteReview.slice(0, 100) }),
  setRating: (rating) => set({ rating }),
  setPlaceName: (placeName) => set({ placeName }),
  setSubmitting: (isSubmitting) => set({ isSubmitting }),
  reset: () => set(initialState),
}));
