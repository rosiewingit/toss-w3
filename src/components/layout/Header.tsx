'use client';

import { usePathname } from 'next/navigation';

const titles: Record<string, string> = {
  '/feed': '냠',
  '/map': '지도',
  '/profile': '마이',
  '/profile/saved': '저장한 맛',
};

export function Header() {
  const pathname = usePathname();
  const title = titles[pathname] ?? '냠';

  return (
    <header className="sticky top-0 z-40 flex min-h-[44px] shrink-0 items-center justify-center border-b border-gray-200 bg-white px-4 py-2 safe-area-pt">
      <h1 className="text-lg font-semibold text-[#191f28]">{title}</h1>
    </header>
  );
}
