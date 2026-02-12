'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft, Bookmark } from 'lucide-react';
import { getPostById, toggleSaved, getSavedPostIds, getDefaultUserId } from '@/lib/db';
import type { Post } from '@/lib/db';
import { cn } from '@/lib/utils';

export default function DetailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [post, setPost] = useState<Post | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    getPostById(id).then((p) => {
      if (!cancelled) setPost(p);
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [id]);

  useEffect(() => {
    if (!id) return;
    getSavedPostIds(getDefaultUserId()).then((ids) => setSaved(ids.has(id)));
  }, [id]);

  const handleSave = async () => {
    if (!id) return;
    const next = await toggleSaved(id);
    setSaved(next);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <header className="flex min-h-[44px] items-center border-b border-gray-200 px-4 py-2" />
        <div className="p-4">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <header className="flex min-h-[44px] items-center border-b border-gray-200 px-4 py-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="touch-target flex items-center justify-center rounded-lg text-gray-600 active:scale-95"
            aria-label="닫기"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
        </header>
        <div className="p-4">
          <p className="text-gray-500">게시글을 찾을 수 없어요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-10 flex min-h-[44px] items-center justify-between border-b border-gray-200 bg-white px-4 py-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="touch-target flex items-center justify-center rounded-lg text-gray-600 active:scale-95"
          aria-label="닫기"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={handleSave}
          className={cn(
            'touch-target flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-medium active:scale-95',
            saved ? 'text-primary' : 'text-gray-600'
          )}
          aria-label={saved ? '저장 취소' : '저장'}
        >
          <Bookmark className={cn('h-5 w-5', saved && 'fill-current')} />
          {saved ? '저장됨' : '저장'}
        </button>
      </header>

      <div className="pb-8">
        <div className="relative aspect-[4/3] w-full bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.imageData}
            alt={post.menuName}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-900">{post.menuName}</h2>
          <p className="mt-2 text-gray-600">{post.tasteReview}</p>
          <p className="mt-2 text-sm text-gray-500">
            {post.rating === 'best' ? '🤯 Best' : '😋 Good'}
          </p>
          {post.placeName && (
            <p className="mt-2 text-sm text-gray-500">📍 {post.placeName}</p>
          )}
        </div>
      </div>
    </div>
  );
}
