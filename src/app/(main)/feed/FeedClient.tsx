'use client';

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
      </div>
    );
  }

  return (
    <>
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
