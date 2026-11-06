import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteHeader } from '@/components/site/SiteHeader';
import './globals.css';

const fraunces = localFont({
  src: [
    { path: '../../public/fonts/fraunces-variable.ttf', weight: '100 900', style: 'normal' },
    { path: '../../public/fonts/fraunces-italic-variable.ttf', weight: '100 900', style: 'italic' },
  ],
  variable: '--font-fraunces',
  display: 'swap',
});

const inter = localFont({
  src: '../../public/fonts/inter-variable.ttf',
  variable: '--font-inter',
  weight: '100 900',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'Trà Sâm Trường Nhân — Sâm không đợi dịp', template: '%s | Trà Sâm Trường Nhân' },
  description: 'Sâm không đợi dịp. Bạn đợi gì? Một khoảng dừng nhỏ để bắt đầu chăm sóc bản thân hôm nay.',
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
  openGraph: {
    type: 'website', locale: 'vi_VN', siteName: 'Trà Sâm Trường Nhân',
    title: 'Trà Sâm Trường Nhân — Sâm không đợi dịp',
    description: 'Một khoảng dừng nhỏ để bắt đầu chăm sóc bản thân hôm nay.',
    images: process.env.NEXT_PUBLIC_SITE_URL ? [{ url: new URL('/images/truong-nhan-cover.png', process.env.NEXT_PUBLIC_SITE_URL).toString(), width: 1920, height: 1080, alt: 'Trà Sâm Trường Nhân' }] : undefined,
  },
  robots: { index: true, follow: true },
  icons: { icon: { url: '/images/logo-truong-nhan.png', type: 'image/png' } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <a href="#main" className="skip-link">Bỏ qua điều hướng</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
