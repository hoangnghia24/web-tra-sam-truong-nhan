import type { Metadata } from 'next';
import { AdminFrame } from '@/components/admin/AdminFrame';
import { AdminJsonEditor } from '@/components/admin/AdminWidgets';
import { adminPageGuard } from '@/lib/admin-page';
import { readJson } from '@/lib/json-store';
import { siteSettingsSchema } from '@/lib/schemas';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Cài đặt website', robots: { index: false, follow: false } };

export default async function AdminSettingsPage() {
  await adminPageGuard();
  const settings = await readJson('content/site-settings.json', siteSettingsSchema);
  return <AdminFrame title="Cài đặt" description="Liên kết mạng xã hội và gian hàng chỉ nên điền khi đã được xác minh là kênh chính thức. URL phải dùng HTTPS."><AdminJsonEditor title="Cài đặt website" endpoint="/api/admin/settings" data={settings} /></AdminFrame>;
}
