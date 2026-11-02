import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const footerLinks = [
  { href: '/hoa-don-cho-doi', label: 'Hóa đơn chờ đợi' },
  { href: '/7-phut-cho-minh', label: '7 phút cho mình' },
  { href: '/san-pham', label: 'Trà Sâm Trường Nhân' },
  { href: '/thu-thach', label: 'Thử thách cộng đồng' },
  { href: '/chien-luoc', label: 'Chiến lược marketing' },
  { href: '/lien-he', label: 'Nhóm thực hiện' },
  { href: '/chinh-sach', label: 'Chính sách dữ liệu' },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-statement">
          <p className="footer-kicker">Trà Sâm Trường Nhân</p>
          <p className="footer-quote">Sâm không đợi dịp.<br /><em>Bạn đợi gì?</em></p>
          <p>Tinh hoa từ núi Ngọc Linh. Một lời nhắc dịu dàng để chăm mình từ hôm nay.</p>
        </div>
        <div className="footer-links">
          <p>Khám phá</p>
          <ul>{footerLinks.map((link) => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul>
        </div>
        <div className="footer-contact">
          <p>Kết nối</p>
          <a href="mailto:digichamps2006@gmail.com">digichamps2006@gmail.com <ArrowUpRight size={16} aria-hidden="true" /></a>
          <Link href="/lien-he">Gặp nhóm thực hiện <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Trà Sâm Trường Nhân · Bản quyền giao diện thuộc nhóm thực hiện.</span>
        <span>Website mô phỏng chiến dịch, chưa được xác nhận là trang chính thức của thương hiệu.</span>
      </div>
    </footer>
  );
}
