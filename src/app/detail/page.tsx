import { Suspense } from 'react';
import DetailContent from './DetailContent';

export default function DetailPage() {
  return (
    <Suspense fallback={<DetailFallback />}>
      <DetailContent />
    </Suspense>
  );
}

function DetailFallback() {
  return (
    <div className="min-h-screen bg-white">
      <header className="flex min-h-[44px] items-center border-b border-gray-200 px-4 py-2" />
      <div className="p-4">
        <p className="text-gray-600">로딩 중...</p>
      </div>
    </div>
  );
}
