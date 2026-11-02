import Link from 'next/link';
import { AdminLogoutButton } from './AdminWidgets';

const links = [
  { href: '/admin/dashboard', label: 'Tổng quan' },
  { href: '/admin/submissions', label: 'Bài dự thi' },
  { href: '/admin/contacts', label: 'Liên hệ' },
  { href: '/admin/content', label: 'Nội dung' },
  { href: '/admin/settings', label: 'Cài đặt' },
];

export function AdminFrame({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return <main id="main" className="admin-main"><div className="admin-container"><div className="admin-topline"><span>TRÀ SÂM TRƯỜNG NHÂN · QUẢN TRỊ</span><AdminLogoutButton /></div><div className="admin-heading"><h1>{title}</h1><p>{description}</p></div><nav className="admin-nav" aria-label="Điều hướng quản trị">{links.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}</nav>{children}</div></main>;
}
