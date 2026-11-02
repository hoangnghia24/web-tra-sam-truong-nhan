import type { Metadata } from 'next';
import { AdminFrame } from '@/components/admin/AdminFrame';
import { DownloadJsonButton } from '@/components/admin/AdminWidgets';
import { adminPageGuard } from '@/lib/admin-page';
import { readJson } from '@/lib/json-store';
import { contactRecordSchema } from '@/lib/schemas';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Liên hệ đã nhận', robots: { index: false, follow: false } };

export default async function AdminContactsPage() {
  await adminPageGuard();
  const items = await readJson('runtime/contact-submissions.json', contactRecordSchema.array());
  return <AdminFrame title="Liên hệ" description="Lời nhắn được lưu riêng để nhóm phản hồi. Không hiển thị công khai."><div className="admin-toolbar"><span>{items.length} lời nhắn</span><DownloadJsonButton data={items} name="truong-nhan-contacts.json" /></div>{items.length === 0 ? <p className="admin-empty">Chưa có lời nhắn nào.</p> : <div className="admin-record-list">{items.map((item) => <article key={item.id}><div className="admin-record-head"><h2>{item.subject}</h2><small>{new Date(item.createdAt).toLocaleString('vi-VN')}</small></div><p>{item.message}</p><a href={`mailto:${item.email}`}>{item.name} · {item.email}</a></article>)}</div>}</AdminFrame>;
}
