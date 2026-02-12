'use client';

import Link from 'next/link';
import { MapPin, Bookmark, ChefHat } from 'lucide-react';
import { FeedCard } from '@/components/features/FeedCard';
import { FeedSkeleton } from '@/components/features/FeedSkeleton';
import { useEffect, useState } from 'react';
import { getMyPosts } from '@/lib/db';
import type { Post } from '@/lib/db';

export function ProfileClient() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyPosts().then((list) => {
      setPosts(list);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-4">
      <section className="mb-6">
        <h2 className="mb-3 text-sm font-medium text-gray-500">메뉴</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/map"
            className="touch-target flex min-h-[44px] items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-gray-700 active:scale-95"
          >
            <MapPin className="h-5 w-5 text-primary" />
            My Map
          </Link>
          <Link
            href="/profile/saved"
            className="touch-target flex min-h-[44px] items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-gray-700 active:scale-95"
          >
            <Bookmark className="h-5 w-5 text-primary" />
            저장한 맛
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-700">
          <ChefHat className="h-4 w-4" />
          내가 올린 맛
        </h2>
        {loading ? (
          <FeedSkeleton />
        ) : posts.length === 0 ? (
          <p className="py-8 text-center text-gray-500">아직 올린 맛이 없어요.</p>
        ) : (
          <div
            style={{ columnCount: 2, columnGap: '12px' }}
            className="mt-2"
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
        )}
      </section>
    </div>
  );
}
