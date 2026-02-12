'use client';

import { useEffect, useRef, useState } from 'react';
import type { LatLngTuple } from 'leaflet';

export interface MapPin {
  id: string;
  lat: number;
  lng: number;
  menuName: string;
  city?: string | null;
}

interface MapViewProps {
  pins: MapPin[];
  center?: LatLngTuple;
  zoom?: number;
  single?: boolean;
  className?: string;
}

export function MapView({
  pins,
  center,
  zoom = 14,
  single = false,
  className = 'h-64 w-full',
}: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [MapComponent, setMapComponent] = useState<React.ComponentType<{
    pins: MapPin[];
    center?: LatLngTuple;
    zoom?: number;
    single?: boolean;
    className?: string;
  }> | null>(null);

  useEffect(() => {
    import('./MapViewInner').then((mod) => setMapComponent(() => mod.MapViewInner));
  }, []);

  if (!MapComponent) {
    return (
      <div
        className={`flex items-center justify-center rounded-xl bg-gray-100 text-gray-500 ${className}`}
      >
        지도 로딩 중...
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className}>
      <MapComponent
        pins={pins}
        center={center}
        zoom={zoom}
        single={single}
        className={className}
      />
    </div>
  );
}
