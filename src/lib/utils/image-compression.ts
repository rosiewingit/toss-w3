import Compressor from 'compressorjs';

const MAX_SIZE = 800;
const QUALITY = 0.8;

export function compressImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      maxWidth: MAX_SIZE,
      maxHeight: MAX_SIZE,
      quality: QUALITY,
      convertSize: 0,
      success(result) {
        resolve(result);
      },
      error(err) {
        reject(err);
      },
    });
  });
}

export function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}
