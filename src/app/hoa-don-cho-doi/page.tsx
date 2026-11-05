import type { Metadata } from 'next';
import { PageBanner } from '@/components/site/PageBanner';
import { ReceiptExperience } from '@/components/receipt/ReceiptExperience';
import { ReceiptJourney } from '@/components/receipt/ReceiptJourney';
import { readJson } from '@/lib/json-store';
import { siteSettingsSchema } from '@/lib/schemas';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Hóa đơn chờ đợi',
  description: 'Trả lời ba câu hỏi ngắn, xem hóa đơn cá nhân và tải ảnh Story 9:16; bạn cũng có thể tạo hóa đơn chi tiết từ thời gian tự nhập.',
};

export default async function ReceiptPage() {
  const settings = await readJson('content/site-settings.json', siteSettingsSchema);
  return (
    <main id="main">
      <PageBanner eyebrow="Bấm hoãn · Trải nghiệm tương tác" title="Hóa đơn chờ đợi" description="Ba câu hỏi ngắn giúp bạn nhìn lại những lần ‘để mai tính’, nhận hóa đơn cá nhân và tạo ảnh Story để chia sẻ." tone="forest" />
      <ReceiptJourney purchaseLinks={settings.purchaseLinks} voucher15={settings.voucher15} />
      <details className="receipt-detailed" id="hoa-don-chi-tiet">
        <summary>Tạo hóa đơn chi tiết từ một ngày của bạn</summary>
        <ReceiptExperience />
      </details>
    </main>
  );
}
