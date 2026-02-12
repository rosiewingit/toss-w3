'use client';

import { useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useUploadStore } from '@/lib/store/useUploadStore';
import { TasteReviewInput } from '@/components/shared/TasteReviewInput';
// Dynamic import so sql.js (Node fs) is not pulled into server bundle
import { compressImage, blobToDataUrl } from '@/lib/utils/image-compression';
import { getExifFromFile } from '@/lib/utils/exif-helpers';
import { cn } from '@/lib/utils';

const RATINGS: { value: 'good' | 'best'; label: string; emoji: string }[] = [
  { value: 'good', label: 'Good', emoji: '😋' },
  { value: 'best', label: 'Best', emoji: '🤯' },
];

export function UploadForm() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    imageDataUrl,
    menuName,
    tasteReview,
    rating,
    lat,
    lng,
    city,
    isSubmitting,
    setImage,
    setMenuName,
    setTasteReview,
    setRating,
    setLocation,
    setSubmitting,
    reset,
  } = useUploadStore();

  const handleFile = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !file.type.startsWith('image/')) return;
      try {
        const blob = await compressImage(file);
        const dataUrl = await blobToDataUrl(blob);
        setImage(dataUrl);
        const exif = await getExifFromFile(file);
        if (exif.gps) {
          setLocation(exif.gps.lat, exif.gps.lng, city ?? null);
        }
      } catch {
        setImage(null);
      }
      e.target.value = '';
    },
    [city, setImage, setLocation]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!imageDataUrl || !menuName.trim() || !tasteReview.trim()) return;
      setSubmitting(true);
      try {
        const { insertPost } = await import('@/lib/db');
        await insertPost({
          menuName: menuName.trim(),
          tasteReview: tasteReview.trim(),
          rating,
          lat,
          lng,
          city,
          imageData: imageDataUrl,
        });
        reset();
        router.push('/feed');
      } finally {
        setSubmitting(false);
      }
    },
    [
      imageDataUrl,
      menuName,
      tasteReview,
      rating,
      lat,
      lng,
      city,
      reset,
      router,
      setSubmitting,
    ]
  );

  return (
    <div className="min-h-screen bg-white">
      <header className="flex min-h-[44px] items-center gap-2 border-b border-gray-200 px-4 py-2">
        <Link
          href="/feed"
          className="touch-target flex items-center justify-center rounded-lg text-gray-600 active:scale-95"
          aria-label="닫기"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-lg font-semibold">맛 올리기</h1>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            사진
          </label>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFile}
            className="hidden"
          />
          {imageDataUrl ? (
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element -- data URL preview, no static asset */}
              <img
                src={imageDataUrl}
                alt="업로드 미리보기"
                className="max-h-64 w-full rounded-xl object-cover"
              />
              <button
                type="button"
                onClick={() => setImage(null)}
                className="absolute right-2 top-2 rounded-full bg-black/50 px-2 py-1 text-sm text-white"
              >
                삭제
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex min-h-[120px] w-full touch-target items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 active:scale-[0.98]"
            >
              사진 선택 (카메라/갤러리)
            </button>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            메뉴 이름
          </label>
          <input
            type="text"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
            placeholder="예: 뼈해장국"
            maxLength={50}
            className="min-h-[44px] w-full rounded-xl border border-gray-200 px-4 py-2 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            맛 리뷰 (100자)
          </label>
          <TasteReviewInput value={tasteReview} onChange={setTasteReview} />
        </div>

        <div>
          <span className="mb-2 block text-sm font-medium text-gray-700">
            평점
          </span>
          <div className="flex gap-3">
            {RATINGS.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setRating(r.value)}
                className={cn(
                  'touch-target flex flex-1 items-center justify-center gap-2 rounded-xl border-2 py-2 text-sm font-medium transition active:scale-95',
                  rating === r.value
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-gray-200 bg-white text-gray-600'
                )}
              >
                <span>{r.emoji}</span>
                <span>{r.label}</span>
              </button>
            ))}
          </div>
        </div>

        {lat != null && lng != null && (
          <p className="text-sm text-gray-500">
            위치: {city ?? `${lat.toFixed(4)}, ${lng.toFixed(4)}`}
          </p>
        )}

        <button
          type="submit"
          disabled={
            !imageDataUrl || !menuName.trim() || !tasteReview.trim() || isSubmitting
          }
          className="touch-target min-h-[48px] rounded-xl bg-primary font-medium text-white disabled:opacity-50 active:scale-95"
        >
          {isSubmitting ? '올리는 중…' : '올리기'}
        </button>
      </form>
    </div>
  );
}
