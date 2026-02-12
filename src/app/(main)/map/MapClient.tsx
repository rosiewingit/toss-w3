'use client';

import { useEffect, useState } from 'react';

type MapClientPin = { id: string; lat: number; lng: number; menuName: string; city: string | null };
import { getPostsWithLocation } from '@/lib/db';
import { MapView } from '@/components/features/MapView';

export function MapClient() {
  const [pins, setPins] = useState<MapClientPin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPostsWithLocation().then((list) => {
      setPins(
        list
          .filter((p): p is typeof p & { lat: number; lng: number } => p.lat != null && p.lng != null)
          .map((p) => ({
            id: p.id,
            lat: p.lat,
            lng: p.lng,
            menuName: p.menuName,
            city: p.city ?? null,
          }))
      );
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-gray-500">
        로딩 중...
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-120px)] w-full p-4">
      <MapView
        pins={pins}
        className="h-full w-full rounded-xl"
      />
    </div>
  );
}
