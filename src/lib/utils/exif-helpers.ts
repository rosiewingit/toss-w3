// 간단 버전에서는 EXIF/GPS 기능을 사용하지 않습니다.
// 기존 호출부를 최소 수정하기 위해, 더미 결과를 반환하는 헬퍼만 남깁니다.

export interface ExifGps {
  lat: number;
  lng: number;
}

export interface ExifResult {
  gps: ExifGps | null;
  dateTime: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getExifFromFile(_file: File): Promise<ExifResult> {
  return { gps: null, dateTime: null };
}
