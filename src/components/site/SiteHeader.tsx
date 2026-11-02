'use client';

import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const primaryLinks = [
  { href: '/', label: 'Trang chủ' },
  { href: '/hoa-don-cho-doi', label: 'Hóa đơn chờ đợi' },
  { href: '/7-phut-cho-minh', label: '7 phút cho mình' },
  { href: '/san-pham', label: 'Sản phẩm' },
  { href: '/chien-luoc', label: 'Chiến lược' },
  { href: '/lien-he', label: 'Liên hệ' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="site-wordmark" onClick={() => setMenuOpen(false)} aria-label="Trà Sâm Trường Nhân, về trang chủ">
          <span>TRÀ SÂM</span>
          <strong>Trường Nhân</strong>
        </Link>
        <button
          className="mobile-menu-button"
          type="button"
          aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav id="site-menu" className={`site-menu ${menuOpen ? 'is-open' : ''}`} aria-label="Điều hướng chính">
          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href} className={pathname === link.href ? 'is-current' : ''} aria-current={pathname === link.href ? 'page' : undefined} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link className="menu-feature" href="/hoa-don-cho-doi" onClick={() => setMenuOpen(false)}>
            Bắt đầu trải nghiệm <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
