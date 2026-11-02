import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Clock3, Leaf, Mail, Sparkles } from 'lucide-react';
import { readJson } from '@/lib/json-store';
import { brandSchema, campaignSchema, productSchema, teamSchema } from '@/lib/schemas';
import { TrackedLink } from '@/components/site/TrackedLink';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [brand, campaign, product, team] = await Promise.all([
    readJson('content/brand.json', brandSchema),
    readJson('content/campaign.json', campaignSchema),
    readJson('content/product.json', productSchema),
    readJson('content/team.json', teamSchema),
  ]);

  return (
    <main id="main">
      <section className="cover-hero" aria-label="Trà Sâm Trường Nhân">
        <Image src="/images/truong-nhan-cover.png" alt="Trà Sâm Trường Nhân: hộp trà, túi lọc và tách trà bên núi Ngọc Linh" width={1920} height={1080} priority sizes="100vw" className="cover-image" />
      </section>

      <section className="intro-panel" aria-labelledby="home-intro-title">
        <div className="intro-inner">
          <p className="eyebrow">Một lời nhắc dành cho chính mình</p>
          <h1 id="home-intro-title">Bạn đã dành bao lâu cho chính mình hôm nay?</h1>
          <p>{brand.emotionalMessage} Hãy bắt đầu bằng một khoảng dừng nhỏ.</p>
          <div className="intro-actions">
            <Link href="/hoa-don-cho-doi" className="button-primary">Khám phá hóa đơn của tôi <ArrowUpRight size={17} aria-hidden="true" /></Link>
            <TrackedLink href="/san-pham" type="product_clicked" className="button-text">Tìm hiểu trà sâm <ArrowUpRight size={17} aria-hidden="true" /></TrackedLink>
          </div>
          <a className="intro-scroll" href="#cau-chuyen" aria-label="Cuộn đến câu chuyện"><ArrowDown size={17} aria-hidden="true" /></a>
        </div>
      </section>

      <section className="home-story home-section" id="cau-chuyen" aria-labelledby="home-story-title">
        <div className="home-container story-layout">
          <div>
            <p className="section-index">01 <span></span> Câu chuyện</p>
            <h2 className="section-title" id="home-story-title">Cho mọi người một chút.<br /><em>Cho mình thì để mai.</em></h2>
          </div>
          <div className="story-column">
            <p className="story-quote">“Tôi biết mình cũng cần được chăm sóc, chỉ là tôi luôn nghĩ mình có thể chờ thêm một chút.”</p>
            <p>Giữa những việc cần hoàn thành, một cuộc hẹn với bản thân rất dễ bị đẩy xuống cuối ngày. Chiến dịch mời bạn nhìn lại khoảng thời gian ấy và bắt đầu bằng điều nhỏ nhất có thể làm ngay.</p>
            <Link className="editorial-link" href="/ve-du-an">Đọc câu chuyện chiến dịch <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="home-receipt home-section" aria-labelledby="home-receipt-title">
        <div className="home-container receipt-feature">
          <div className="receipt-feature-copy">
            <p className="section-index light">02 <span></span> Bấm hoãn</p>
            <h2 className="section-title" id="home-receipt-title">Nếu hôm nay có một hóa đơn cho thời gian, <em>nó sẽ kể điều gì?</em></h2>
            <p>Nhập thời gian bạn dành cho công việc, gia đình, giải trí và chính mình. Hóa đơn được tính từ câu trả lời của bạn, không áp đặt một kết quả có sẵn.</p>
            <Link className="button-primary button-on-dark" href="/hoa-don-cho-doi">Tạo hóa đơn của tôi <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
          <div className="receipt-preview" aria-label="Minh họa hóa đơn chờ đợi">
            <div className="receipt-preview-head"><span>TRƯỜNG NHÂN</span><span>✳</span></div>
            <p className="preview-label">HÓA ĐƠN CHỜ ĐỢI</p>
            <p className="preview-title">Thời gian hôm nay<br />đã đi đâu?</p>
            <div className="preview-row"><span>Công việc</span><span>________</span></div>
            <div className="preview-row"><span>Gia đình</span><span>________</span></div>
            <div className="preview-row"><span>Chăm sóc bản thân</span><span>________</span></div>
            <div className="preview-end"><span>DÀNH CHO MÌNH</span><strong>?</strong></div>
            <p className="preview-note">Minh họa · Kết quả thật được tính khi bạn nhập thời gian.</p>
          </div>
        </div>
      </section>

      <section className="home-pause home-section" aria-labelledby="home-pause-title">
        <div className="home-container pause-feature">
          <div className="pause-art" aria-hidden="true"><div className="pause-orbit orbit-one"></div><div className="pause-orbit orbit-two"></div><div className="pause-center"><Clock3 size={28} strokeWidth={1.3} /><strong>07:00</strong><span>Một khoảng dừng</span></div></div>
          <div className="pause-feature-copy">
            <p className="section-index">03 <span></span> Làm ngay</p>
            <h2 className="section-title" id="home-pause-title">Bảy phút.<br /><em>Chỉ dành cho bạn.</em></h2>
            <p>Đặt mọi thứ xuống một lúc. Pha trà, hít thở, nhìn ra cửa sổ — hoặc chỉ cần ngồi yên. Trải nghiệm này luôn mở cho bạn, không cần mua sản phẩm.</p>
            <Link className="editorial-link" href="/7-phut-cho-minh">Bắt đầu 7 phút cho mình <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="home-product home-section" aria-labelledby="home-product-title">
        <div className="home-container product-feature">
          <div className="product-feature-copy">
            <p className="section-index">04 <span></span> Tinh hoa thảo mộc</p>
            <h2 className="section-title" id="home-product-title">Một tách trà cho <em>nhịp sống hôm nay.</em></h2>
            <p>{product.name} kết hợp {product.ingredientCount} thành phần trong dạng túi lọc tiện pha. Tài liệu chiến dịch ghi nhận {product.ngocLinhLeafPercent}% lá Sâm Ngọc Linh — một tỷ lệ cần được nói rõ, không phóng đại.</p>
            <div className="product-feature-facts"><div><strong>{product.packCount} × {product.gramsPerBag}g</strong><span>Mỗi hộp</span></div><div><strong>{product.brewMinutesMin}–{product.brewMinutesMax} phút</strong><span>Thời gian pha gợi ý</span></div></div>
            <TrackedLink className="editorial-link" href="/san-pham" type="product_clicked">Khám phá sản phẩm <ArrowUpRight size={16} aria-hidden="true" /></TrackedLink>
          </div>
          <div className="product-feature-visual"><Image src="/images/truong-nhan-cover.png" alt="Trọn bộ hình ảnh sản phẩm Trà Sâm Trường Nhân" width={1920} height={1080} sizes="(max-width: 800px) 100vw, 50vw" /><span className="image-seal"><Leaf size={18} aria-hidden="true" /> Tinh hoa từ núi Ngọc Linh</span></div>
        </div>
      </section>

      <section className="home-challenge home-section" aria-labelledby="home-challenge-title">
        <div className="home-container">
          <div className="challenge-heading"><div><p className="section-index">05 <span></span> Câu chuyện cộng đồng</p><h2 className="section-title" id="home-challenge-title">Hóa đơn của bạn.<br /><em>Câu chuyện của bạn.</em></h2></div><p>Không cần một thay đổi lớn. Hãy kể về một việc bạn đã thôi trì hoãn cho bản thân; bài dự thi chỉ xuất hiện sau khi được duyệt.</p></div>
          <ol className="challenge-steps"><li><span>01</span><strong>Tạo hóa đơn</strong><p>Nhìn lại cách bạn dùng thời gian.</p></li><li><span>02</span><strong>Làm một việc nhỏ</strong><p>Chọn một bước dành cho mình.</p></li><li><span>03</span><strong>Kể câu chuyện</strong><p>Chia sẻ qua một video của bạn.</p></li><li><span>04</span><strong>Gửi liên kết</strong><p>Để câu chuyện được xem xét.</p></li></ol>
          <Link className="editorial-link" href="/thu-thach">Xem thể lệ và tham gia <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="home-reminder home-section" aria-labelledby="home-reminder-title">
        <div className="home-container reminder-feature"><div><p className="section-index light">06 <span></span> Gửi lời nhắc</p><h2 className="section-title" id="home-reminder-title">Một lời quan tâm<br /><em>cũng không nên đợi dịp.</em></h2><p>Tạo một tấm thiệp mang lời nhắn của riêng bạn cho bản thân hoặc người thương. Bạn chọn nội dung và tự quyết định khi nào chia sẻ.</p><Link className="button-primary button-on-dark" href="/gui-loi-nhac">Tạo thiệp lời nhắc <ArrowUpRight size={17} aria-hidden="true" /></Link></div><div className="reminder-art" aria-hidden="true"><Sparkles size={25} strokeWidth={1.2} /><p>“Hôm nay, hãy dành một chút thời gian cho mình nhé.”</p><span>Trường Nhân · Lời nhắc dịu dàng</span></div></div>
      </section>

      <section className="home-team home-section" aria-labelledby="home-team-title"><div className="home-container team-feature"><div><p className="section-index">07 <span></span> Nhóm thực hiện</p><h2 className="section-title" id="home-team-title">Những người đứng sau <em>câu chuyện này.</em></h2><p>Một dự án kết nối góc nhìn thương hiệu, trải nghiệm số và mong muốn chăm sóc bản thân chủ động.</p><Link className="editorial-link" href="/lien-he">Kết nối cùng chúng tôi <ArrowUpRight size={16} aria-hidden="true" /></Link></div><ul className="team-preview">{team.members.map((member, index) => <li key={member.id}><span>{String(index + 1).padStart(2, '0')}</span><strong>{member.name}</strong><Mail size={16} aria-hidden="true" /></li>)}</ul></div></section>

      <section className="home-closing" aria-label="Thông điệp chiến dịch"><div className="home-container"><p><Leaf size={17} aria-hidden="true" /> {brand.tagline}</p><h2>{campaign.title}</h2><Link href="/hoa-don-cho-doi">Bắt đầu từ hôm nay <ArrowUpRight size={18} aria-hidden="true" /></Link></div></section>
    </main>
  );
}
