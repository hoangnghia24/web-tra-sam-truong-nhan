import type { Metadata } from 'next';
import { AdminFrame } from '@/components/admin/AdminFrame';
import { AdminSubmissionList, DownloadJsonButton } from '@/components/admin/AdminWidgets';
import { adminPageGuard } from '@/lib/admin-page';
import { readJson } from '@/lib/json-store';
import { ugcRecordSchema } from '@/lib/schemas';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Bài dự thi', robots: { index: false, follow: false } };

export default async function AdminSubmissionsPage() {
  await adminPageGuard();
  const items = await readJson('runtime/ugc-submissions.json', ugcRecordSchema.array());
  return <AdminFrame title="Bài dự thi" description="Duyệt câu chuyện trước khi hiển thị công khai. Chỉ nội dung được chấp thuận xuất hiện ở trang thử thách."><div className="admin-toolbar"><span>{items.length} bài đã gửi</span><DownloadJsonButton data={items} name="truong-nhan-submissions.json" /></div><AdminSubmissionList initial={items} /></AdminFrame>;
}
