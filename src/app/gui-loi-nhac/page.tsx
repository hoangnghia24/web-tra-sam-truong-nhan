import type { Metadata } from 'next';
import { PageBanner } from '@/components/site/PageBanner';
import { ReminderCreator } from '@/components/reminder/ReminderCreator';

export const metadata: Metadata = { title: 'Gửi lời nhắc', description: 'Tạo một tấm thiệp dành cho bản thân hoặc người bạn quan tâm.' };

export default function ReminderPage() {
  return <main id="main"><PageBanner eyebrow="Gửi lời nhắc · Quan tâm từ hôm nay" title="Một lời nhắc dịu dàng" description="Đôi khi điều ta muốn nói chỉ cần bắt đầu từ một tấm thiệp nhỏ. Viết vài dòng cho mình hoặc người bạn thương." tone="light" /><ReminderCreator /></main>;
}
