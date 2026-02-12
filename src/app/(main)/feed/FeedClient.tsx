 'use client';
 
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getAllPosts, getSavedPosts } from '@/lib/db';
import type { Post } from '@/lib/db';
import { FeedCard } from '@/components/features/FeedCard';
import { FeedSkeleton } from '@/components/features/FeedSkeleton';

export function FeedClient() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<'all' | 'saved'>('all');

  const load = async (nextMode: 'all' | 'saved') => {
    setLoading(true);
    const list =
      nextMode === 'all' ? await getAllPosts() : await getSavedPosts();
    setPosts(list);
    setLoading(false);
  };

  useEffect(() => {
    load('all');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleModeChange = (next: 'all' | 'saved') => {
    if (next === mode) return;
    setMode(next);
    void load(next);
  };

  if (loading) return <FeedSkeleton />;
  if (posts.length === 0) {
    return (
      <div className="px-4 py-16 text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => handleModeChange('all')}
            className={`min-w-[80px] rounded-full px-4 py-1 text-sm font-medium ${
              mode === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            전체
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('saved')}
            className={`min-w-[80px] rounded-full px-4 py-1 text-sm font-medium ${
              mode === 'saved'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            저장한 것만
          </button>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-gray-500">
            {mode === 'all'
              ? '아직 올라온 맛이 없어요.'
              : '저장한 맛이 없어요.'}
          </p>
          <p className="text-sm text-gray-400">
            {mode === 'all'
              ? '첫 맛을 올려보세요!'
              : '마음에 드는 맛을 저장해보세요!'}
          </p>
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-white active:scale-95"
          >
            <PlusCircle className="h-4 w-4" />
            맛 올리기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* 상단 모드 토글 */}
      <div className="flex items-center justify-center gap-2 px-4 pt-4">
        <button
          type="button"
          onClick={() => handleModeChange('all')}
          className={`min-w-[80px] rounded-full px-4 py-1 text-sm font-medium ${
            mode === 'all'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          전체
        </button>
        <button
          type="button"
          onClick={() => handleModeChange('saved')}
          className={`min-w-[80px] rounded-full px-4 py-1 text-sm font-medium ${
            mode === 'saved'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          저장한 것만
        </button>
      </div>
      {/* 업로드 플로팅 버튼 */}
      <Link
        href="/upload"
        className="fixed bottom-6 right-4 z-40 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-white shadow-lg active:scale-95"
      >
        <PlusCircle className="h-5 w-5" />
        올리기
      </Link>

      <div
        className="p-4"
        style={{
          columnCount: 2,
          columnGap: '12px',
        }}
      >
        {posts.map((post) => (
          <div
            key={post.id}
            className="mb-3 break-inside-avoid"
            style={{ display: 'inline-block', width: '100%' }}
          >
            <FeedCard post={post} />
          </div>
        ))}
      </div>
    </>
  );
}
