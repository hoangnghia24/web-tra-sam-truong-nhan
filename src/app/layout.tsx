import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteHeader } from '@/components/site/SiteHeader';
import './globals.css';

const spectral = localFont({
  src: [
    { path: '../../public/fonts/spectral-regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/spectral-semibold.ttf', weight: '600', style: 'normal' },
    { path: '../../public/fonts/spectral-bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-spectral',
  display: 'swap',
});

const mulish = localFont({
  src: [
    { path: '../../public/fonts/mulish-regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/mulish-semibold.ttf', weight: '600', style: 'normal' },
    { path: '../../public/fonts/mulish-bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-mulish',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'Trà Sâm Trường Nhân — Sâm không đợi dịp', template: '%s | Trà Sâm Trường Nhân' },
  description: 'Sâm không đợi dịp. Bạn đợi gì? Một khoảng dừng nhỏ để bắt đầu chăm sóc bản thân hôm nay.',
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${spectral.variable} ${mulish.variable}`}>
      <body>
        <a href="#main" className="skip-link">Bỏ qua điều hướng</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
