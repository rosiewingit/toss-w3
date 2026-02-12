import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: '냠 (Nyam) - 맛 SNS',
  description: "Don't write a blog post. Just show me the food and tell me how it tastes in 100 characters.",
  manifest: '/toss-w3/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen safe-area-pb">{children}</body>
    </html>
  );
}
