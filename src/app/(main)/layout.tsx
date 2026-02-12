import { BottomNav } from '@/components/layout/BottomNav';
import { Header } from '@/components/layout/Header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F2F4F6]">
      <Header />
      <main className="flex-1 overflow-auto pb-20">{children}</main>
      <BottomNav />
    </div>
  );
}
