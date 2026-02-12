import EXIF from 'exif-js';

export interface ExifGps {
  lat: number;
  lng: number;
}

export interface ExifResult {
  gps: ExifGps | null;
  dateTime: string | null;
}

function toDecimal(dms: [number, number, number]): number {
  const [d, m, s] = dms;
  return d + m / 60 + s / 3600;
}

export function getExifFromFile(file: File): Promise<ExifResult> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result;
      if (!data || typeof data !== 'string') {
        resolve({ gps: null, dateTime: null });
        return;
      }
      const img = new Image();
      img.onload = () => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- exif-js types say string but accepts image element
          EXIF.getData(img as any, function (this: HTMLImageElement) {
            let gps: ExifGps | null = null;
            let dateTime: string | null = null;
            const gpsLat = EXIF.getTag(this, 'GPSLatitude') as
              | [number, number, number]
              | undefined;
            const gpsLng = EXIF.getTag(this, 'GPSLongitude') as
              | [number, number, number]
              | undefined;
            const latRef = EXIF.getTag(this, 'GPSLatitudeRef') as
              | string
              | undefined;
            const lngRef = EXIF.getTag(this, 'GPSLongitudeRef') as
              | string
              | undefined;
            if (gpsLat && gpsLng) {
              const lat = toDecimal(gpsLat) * (latRef === 'S' ? -1 : 1);
              const lng = toDecimal(gpsLng) * (lngRef === 'W' ? -1 : 1);
              gps = { lat, lng };
            }
            const dt = EXIF.getTag(this, 'DateTime') as string | undefined;
            if (dt) dateTime = dt;
            resolve({ gps, dateTime });
          });
        } catch {
          resolve({ gps: null, dateTime: null });
        }
      };
      img.src = data;
    };
    reader.readAsDataURL(file);
  });
}
