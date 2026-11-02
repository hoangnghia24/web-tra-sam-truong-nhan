import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <section className="cover-hero" aria-label="Trà Sâm Trường Nhân">
        <Image
          src="/images/truong-nhan-cover.png"
          alt="Trà Sâm Trường Nhân: hộp trà, túi lọc và tách trà bên núi Ngọc Linh"
          width={1920}
          height={1080}
          priority
          sizes="100vw"
          className="cover-image"
        />
      </section>
      <section className="intro-panel">
        <div className="intro-inner">
          <p className="eyebrow">Một lời nhắc dành cho chính mình</p>
          <h1>Bạn đã dành bao lâu cho chính mình hôm nay?</h1>
          <p>Chăm sóc bản thân không cần chờ dịp đặc biệt. Hãy bắt đầu bằng một khoảng dừng nhỏ.</p>
          <div className="intro-actions">
            <Link href="/hoa-don-cho-doi" className="button-primary">Khám phá hóa đơn của tôi <span aria-hidden="true">↗</span></Link>
            <Link href="/san-pham" className="button-text">Tìm hiểu trà sâm <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
