import type { Metadata } from 'next';
import { AdminFrame } from '@/components/admin/AdminFrame';
import { AdminTrendChart } from '@/components/admin/AdminWidgets';
import { getAdminStats } from '@/lib/admin-data';
import { adminPageGuard } from '@/lib/admin-page';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Tổng quan quản trị', robots: { index: false, follow: false } };

export default async function AdminDashboardPage() {
  await adminPageGuard();
  const stats = await getAdminStats();
  const cards = [
    ['Hóa đơn đã tạo', stats.receiptsCreated], ['Hoàn thành 7 phút', stats.timerCompleted],
    ['Lượt nhấp chia sẻ', stats.shareClicks], ['Lượt nhấp sản phẩm', stats.productClicks],
    ['Lượt nhấp gian hàng', stats.shopClicks], ['Bài dự thi', stats.submissions],
    ['Bài đã duyệt', stats.submissionsApproved], ['Liên hệ', stats.contacts],
  ] as const;
  return <AdminFrame title="Tổng quan" description="Chỉ số phát sinh từ dữ liệu JSON thật của website này. Không bao gồm hiệu quả chiến dịch ngoài nền tảng."><div className="admin-stat-grid">{cards.map(([label, value]) => <article key={label}><span>{label}</span><strong>{value.toLocaleString('vi-VN')}</strong></article>)}</div><section className="admin-panel"><h2>Tương tác theo ngày</h2><AdminTrendChart data={stats.dailyInteractions} /></section><section className="admin-panel"><h2>Nguồn UTM đã ghi nhận</h2>{stats.utmSources.length === 0 ? <p className="admin-empty">Chưa có sự kiện nào mang tham số UTM.</p> : <table className="admin-utm-table"><thead><tr><th>Nguồn</th><th>Sự kiện</th></tr></thead><tbody>{stats.utmSources.map((entry) => <tr key={entry.source}><td>{entry.source}</td><td>{entry.count}</td></tr>)}</tbody></table>}</section><p className="admin-footnote">Bài chờ duyệt: {stats.submissionsPending}. KPI trong trang chiến lược là mục tiêu kế hoạch, không dùng làm kết quả thực tế.</p></AdminFrame>;
}
