'use client';

import { useEffect, useState } from 'react';
import { getSavedPosts } from '@/lib/db';
import type { Post } from '@/lib/db';
import { FeedCard } from '@/components/features/FeedCard';
import { FeedSkeleton } from '@/components/features/FeedSkeleton';

export function SavedClient() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSavedPosts().then((list) => {
      setPosts(list);
      setLoading(false);
    });
  }, []);

  if (loading) return <FeedSkeleton />;
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 px-4 py-16 text-center">
        <p className="text-gray-500">저장한 맛이 없어요.</p>
        <p className="text-sm text-gray-400">피드에서 마음에 드는 맛을 저장해보세요!</p>
      </div>
    );
  }

  return (
    <div
      className="p-4"
      style={{ columnCount: 2, columnGap: '12px' }}
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
  );
}
