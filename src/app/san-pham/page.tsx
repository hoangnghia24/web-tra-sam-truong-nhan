import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Hourglass, Package } from 'lucide-react';
import { PageBanner } from '@/components/site/PageBanner';
import { IngredientExplorer } from '@/components/product/IngredientExplorer';
import { TrackedLink } from '@/components/site/TrackedLink';
import { readJson } from '@/lib/json-store';
import { faqsSchema, ingredientsSchema, productSchema, siteSettingsSchema } from '@/lib/schemas';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Giới thiệu sản phẩm',
  description: 'Khám phá Trà Sâm Trường Nhân, quy cách 15 túi lọc, bảy thành phần và cách pha từ tài liệu chiến dịch.',
};

export default async function ProductPage() {
  const [product, ingredients, faqs, settings] = await Promise.all([
    readJson('content/product.json', productSchema),
    readJson('content/ingredients.json', ingredientsSchema),
    readJson('content/faqs.json', faqsSchema),
    readJson('content/site-settings.json', siteSettingsSchema),
  ]);
  const shopUrl = settings.officialShopUrl ?? product.officialShopUrl;

  return (
    <main id="main">
      <PageBanner eyebrow="Tinh hoa từ núi Ngọc Linh" title={product.name} description="Trà túi lọc tiện pha cho một khoảng dừng 7 phút giữa ngày bận rộn. Khám phá công thức được nêu trong tài liệu chiến dịch và những thông tin còn cần xác minh." tone="forest" />

      <section className="product-page-intro" aria-labelledby="product-intro-title">
        <div className="product-page-layout">
          <div className="product-page-image"><Image src="/images/truong-nhan-cover.png" alt="Ảnh gốc Trà Sâm Trường Nhân: hộp trà, túi lọc, tách trà và cảnh núi" width={1920} height={1080} sizes="(max-width: 850px) 100vw, 55vw" priority /></div>
          <div className="product-page-copy">
            <p className="section-index"><span /> 01 · Câu chuyện sản phẩm</p>
            <h2 id="product-intro-title">Một khoảng lặng <em>được nâng niu.</em></h2>
            <p>Hình thức túi lọc giúp việc pha trà gọn hơn trong nhịp sống bận rộn. Thương hiệu gợi ý một khoảng dừng 7 phút để bạn chủ động dành thời gian cho mình. Thành phần và cách pha dưới đây được trích từ kế hoạch chiến dịch; hãy đối chiếu bao bì thật trước khi sử dụng.</p>
            <dl className="product-facts"><div><dt>Quy cách</dt><dd>{product.packCount} túi lọc × {product.gramsPerBag} g</dd></div><div><dt>Khối lượng</dt><dd>{product.netWeightGrams} g / hộp</dd></div><div><dt>Thành phần</dt><dd>{product.ingredientCount} loại thảo mộc</dd></div></dl>
          </div>
        </div>
      </section>

      <section className="product-gallery-section" aria-labelledby="product-gallery-title">
        <div className="product-container">
          <p className="section-index"><span /> 02 · Góc nhìn sản phẩm</p>
          <h2 id="product-gallery-title" className="section-title">Từ hộp trà đến <em>một tách trà ấm.</em></h2>
          <div className="product-gallery"><div className="product-gallery-art"><Image src="/images/truong-nhan-cover.png" alt="Toàn bộ ảnh bìa gốc, không cắt hoặc phủ chữ" width={1920} height={1080} sizes="(max-width: 850px) 100vw, 60vw" /></div><div className="product-gallery-notes"><div><Package size={26} strokeWidth={1.4} /><span>01</span><h3>Hộp trà</h3><p>Quy cách nêu trong tài liệu: {product.packCount} túi lọc, tổng {product.netWeightGrams} g.</p></div></div></div>
          <p className="gallery-disclosure">Hiện chỉ có một ảnh sản phẩm do nhóm cung cấp. Các góc chụp cận cảnh cần được bổ sung từ ảnh chính thức.</p>
        </div>
      </section>

      <section className="product-ingredients-section" aria-labelledby="product-ingredients-title">
        <div className="product-container">
          <p className="section-index"><span /> 03 · Khám phá thành phần</p>
          <h2 id="product-ingredients-title" className="section-title">Bảy nét thảo mộc <em>trong một công thức.</em></h2>
          <p className="product-section-lead">Chọn từng thành phần để xem tỷ lệ ghi trong file nội dung chỉnh sửa. Các tỷ lệ cần đối chiếu nhãn chính thức; tên nguyên liệu và tỷ lệ không tự động chứng minh công dụng đối với sức khỏe.</p>
          <IngredientExplorer data={ingredients} />
        </div>
      </section>

      <section className="product-brewing-section" aria-labelledby="product-brewing-title">
        <div className="product-container product-brewing-layout"><div><p className="section-index light"><span /> 04 · Một nghi thức nhỏ</p><h2 id="product-brewing-title">Pha trà. <em>Chờ mình.</em></h2><p>Gợi ý từ tài liệu chiến dịch. Ưu tiên hướng dẫn ghi trên bao bì khi có sản phẩm thực tế.</p></div><ol><li><span>01</span><strong>Chuẩn bị</strong><p>Đặt một túi trà vào tách hoặc bình.</p></li><li><span>02</span><strong>Thêm nước</strong><p>Rót khoảng {product.brewWaterMl} ml nước nóng.</p></li><li><span>03</span><strong>Chờ trà</strong><p>Đợi khoảng {product.brewMinutesMin}–{product.brewMinutesMax} phút rồi thưởng thức.</p></li></ol><Hourglass className="brewing-icon" size={120} strokeWidth={.6} aria-hidden="true" /></div>
      </section>

      <section className="product-faq-section" aria-labelledby="product-faq-title"><div className="product-container product-faq-layout"><div><p className="section-index"><span /> 05 · Minh bạch</p><h2 id="product-faq-title" className="section-title">Những điều <em>nên biết rõ.</em></h2><p>{product.note}</p></div><div className="product-faq-list">{faqs.items.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></div></section>

      <section className="product-shop-section" aria-labelledby="product-shop-title"><div className="product-container"><p className="section-index"><span /> 06 · Tiếp tục câu chuyện</p><h2 id="product-shop-title">Một lời hẹn với <em>chính mình.</em></h2><p>{shopUrl ? 'Kênh mua hàng được cấu hình cho website.' : 'Kênh mua hàng chính thức chưa được xác minh. Nhóm sẽ cập nhật liên kết sau khi đối chiếu nguồn.'}</p><div className="product-shop-actions">{shopUrl && <TrackedLink className="button-primary" href={shopUrl} type="shop_clicked" external>Đến gian hàng <ArrowUpRight size={17} /></TrackedLink>}<Link className="button-text" href="/7-phut-cho-minh">Dành 7 phút cho mình <ArrowUpRight size={16} /></Link></div><p className="shop-reference-price">Giá {product.referencePriceVndMin.toLocaleString('vi-VN')}–{product.referencePriceVndMax.toLocaleString('vi-VN')} ₫/hộp: {product.referencePriceLabel.toLowerCase()}.</p></div></section>
    </main>
  );
}
