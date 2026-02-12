'use client';

import { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { LatLngTuple } from 'leaflet';
import type { MapPin } from './MapView';

// Fix default marker icon in Next/bundler (leaflet expects files from node_modules)
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

interface MapViewInnerProps {
  pins: MapPin[];
  center?: LatLngTuple;
  zoom?: number;
  single?: boolean;
  className?: string;
}

function FitBounds({ pins }: { pins: MapPin[] }) {
  const map = useMap();
  useMemo(() => {
    if (pins.length === 0) return;
    if (pins.length === 1) {
      map.setView([pins[0].lat, pins[0].lng], 14);
      return;
    }
    const bounds = L.latLngBounds(pins.map((p) => [p.lat, p.lng] as LatLngTuple));
    map.fitBounds(bounds, { padding: [24, 24] });
  }, [map, pins]);
  return null;
}

export function MapViewInner({
  pins,
  center,
  zoom = 14,
  single = false,
  className = 'h-64 w-full rounded-xl',
}: MapViewInnerProps) {
  const defaultCenter: LatLngTuple = center ?? [37.5665, 126.978]; // Seoul
  const firstPin = pins[0];
  const mapCenter = single && firstPin
    ? ([firstPin.lat, firstPin.lng] as LatLngTuple)
    : defaultCenter;

  if (pins.length === 0) {
    return (
      <div
        className={`flex items-center justify-center rounded-xl bg-gray-100 text-gray-500 ${className}`}
      >
        표시할 위치가 없어요
      </div>
    );
  }

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      className={className}
      style={{ height: '100%', width: '100%', minHeight: 200 }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {!single && pins.length > 1 && <FitBounds pins={pins} />}
      {pins.map((pin) => (
        <Marker key={pin.id} position={[pin.lat, pin.lng]}>
          <Popup>
            <span className="font-medium">{pin.menuName}</span>
            {pin.city && <span className="text-gray-500"> · {pin.city}</span>}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
