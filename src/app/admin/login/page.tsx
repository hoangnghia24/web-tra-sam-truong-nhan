import type { Metadata } from 'next';
import { AdminLoginForm } from '@/components/admin/AdminWidgets';

export const metadata: Metadata = { title: 'Đăng nhập quản trị', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default function AdminLoginPage() {
  const configured = Boolean(process.env.ADMIN_PASSWORD_HASH && process.env.SESSION_SECRET && process.env.SESSION_SECRET.length >= 32);
  return <main id="main" className="admin-login-page"><div className="admin-login-card"><p className="eyebrow">Khu vực quản trị</p><h1>Chào mừng trở lại.</h1><p>Nội dung và dữ liệu riêng của website được bảo vệ bằng phiên đăng nhập máy chủ.</p><AdminLoginForm configured={configured} /></div></main>;
}
