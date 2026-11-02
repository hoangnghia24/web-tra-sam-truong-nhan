import type { Metadata } from 'next';
import { PageBanner } from '@/components/site/PageBanner';
import { SevenMinuteTimer } from '@/components/timer/SevenMinuteTimer';

export const metadata: Metadata = {
  title: '7 phút cho mình',
  description: 'Một khoảng dừng 7 phút để thở, pha trà hoặc đơn giản là có mặt cho chính mình.',
};

export default function SevenMinutesPage() {
  return (
    <main id="main">
      <PageBanner eyebrow="Làm ngay · Một khoảng dừng nhỏ" title="7 phút cho mình" description="Không cần chờ một dịp đặc biệt. Bắt đầu từ bảy phút bình yên mà bạn có thể dành cho mình hôm nay." tone="light" />
      <SevenMinuteTimer />
    </main>
  );
}
