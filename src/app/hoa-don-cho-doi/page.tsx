import type { Metadata } from 'next';
import { PageBanner } from '@/components/site/PageBanner';
import { ReceiptExperience } from '@/components/receipt/ReceiptExperience';

export const metadata: Metadata = {
  title: 'Hóa đơn chờ đợi',
  description: 'Nhìn lại một ngày của bạn bằng hóa đơn thời gian được tính từ dữ liệu thật bạn nhập.',
};

export default function ReceiptPage() {
  return (
    <main id="main">
      <PageBanner eyebrow="Bấm hoãn · Trải nghiệm tương tác" title="Hóa đơn chờ đợi" description="Bạn đã dành bao nhiêu thời gian cho mọi việc, và bao nhiêu phút thực sự dành cho mình? Nhập một ngày của bạn để xem câu trả lời." tone="forest" />
      <ReceiptExperience />
    </main>
  );
}
