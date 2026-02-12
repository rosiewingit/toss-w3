'use client';

import { useEffect, useState } from 'react';
import { getAllPosts } from '@/lib/db';
import type { Post } from '@/lib/db';
import { FeedCard } from '@/components/features/FeedCard';
import { FeedSkeleton } from '@/components/features/FeedSkeleton';

export function FeedClient() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPosts().then((list) => {
      setPosts(list);
      setLoading(false);
    });
  }, []);

  if (loading) return <FeedSkeleton />;
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 px-4 py-16 text-center">
        <p className="text-gray-500">아직 올라온 맛이 없어요.</p>
        <p className="text-sm text-gray-400">첫 맛을 올려보세요!</p>
      </div>
    );
  }

  return (
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
  );
}
