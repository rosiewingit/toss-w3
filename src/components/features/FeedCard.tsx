'use client';

import Link from 'next/link';
import type { Post } from '@/lib/db';
import { cn } from '@/lib/utils';

interface FeedCardProps {
  post: Post;
  className?: string;
}

export function FeedCard({ post, className }: FeedCardProps) {
  return (
    <Link
      href={`/detail?id=${encodeURIComponent(post.id)}`}
      className={cn(
        'block overflow-hidden rounded-xl bg-white shadow-sm transition active:scale-[0.98]',
        className
      )}
    >
      <div className="relative aspect-[4/3] w-full bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.imageData}
          alt={post.menuName}
          className="h-full w-full object-cover"
        />
        <span className="absolute bottom-2 right-2 rounded bg-black/50 px-2 py-0.5 text-xs text-white">
          {post.rating === 'best' ? '🤯' : '😋'}
        </span>
      </div>
      <div className="p-3">
        <p className="font-medium text-gray-900 line-clamp-1">{post.menuName}</p>
        <p className="text-sm text-gray-500">
          {post.city ?? (post.lat != null ? '위치 있음' : '')}
        </p>
      </div>
    </Link>
  );
}
