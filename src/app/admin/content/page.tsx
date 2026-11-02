import type { Metadata } from 'next';
import { AdminFrame } from '@/components/admin/AdminFrame';
import { AdminJsonEditor } from '@/components/admin/AdminWidgets';
import { adminPageGuard } from '@/lib/admin-page';
import { readJson } from '@/lib/json-store';
import { campaignSchema, productSchema, teamSchema } from '@/lib/schemas';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Quản lý nội dung', robots: { index: false, follow: false } };

export default async function AdminContentPage() {
  await adminPageGuard();
  const [product, team, campaign] = await Promise.all([readJson('content/product.json', productSchema), readJson('content/team.json', teamSchema), readJson('content/campaign.json', campaignSchema)]);
  return <AdminFrame title="Nội dung" description="Cập nhật thông tin sản phẩm, nhóm thực hiện và giai đoạn chiến dịch sau khi đối chiếu nguồn chính thức."><div className="admin-editor-grid"><AdminJsonEditor title="Sản phẩm" endpoint="/api/admin/product" data={product} /><AdminJsonEditor title="Nhóm thực hiện" endpoint="/api/admin/team" data={team} /><AdminJsonEditor title="Chiến dịch" endpoint="/api/admin/campaign" data={campaign} /></div></AdminFrame>;
}
