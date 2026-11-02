import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageBanner } from '@/components/site/PageBanner';
import { ChallengeForm } from '@/components/community/ChallengeForm';
import { readJson } from '@/lib/json-store';
import { ugcRecordSchema } from '@/lib/schemas';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Hóa đơn của bạn', description: 'Thử thách kể lại một việc nhỏ bạn đã làm cho chính mình.' };

export default async function ChallengePage() {
  const submissions = await readJson('runtime/ugc-submissions.json', ugcRecordSchema.array());
  const approved = submissions.filter((item) => item.status === 'approved');
  return <main id="main">
    <PageBanner eyebrow="Cùng nhau làm ngay" title="Hóa đơn của bạn" description="Một việc nhỏ cho mình hôm nay có thể mở đầu cho nhiều ngày dịu dàng hơn. Nếu muốn, hãy kể lại câu chuyện của bạn." tone="forest" />
    <section className="challenge-page-section"><div className="product-container"><p className="section-index"><span /> 01 · Bốn bước tham gia</p><h2 className="section-title">Từ một tờ hóa đơn <em>đến một hành động thật.</em></h2><ol className="challenge-page-steps"><li><span>01</span><h3>Nhìn lại</h3><p><Link href="/hoa-don-cho-doi">Tạo hóa đơn thời gian</Link> từ một ngày của bạn.</p></li><li><span>02</span><h3>Làm ngay</h3><p>Dành một việc nhỏ cho mình: ngồi xuống, thở, pha trà hoặc điều bạn thích.</p></li><li><span>03</span><h3>Kể chuyện</h3><p>Nếu thoải mái, đăng video kể khoảnh khắc đó trên kênh của bạn.</p></li><li><span>04</span><h3>Gửi liên kết</h3><p>Điền form bên dưới để nhóm xem xét trước khi hiển thị.</p></li></ol></div></section>
    <section className="challenge-submit-section" aria-labelledby="challenge-form-title"><div className="product-container challenge-submit-layout"><div><p className="section-index light"><span /> 02 · Lời kể của bạn</p><h2 id="challenge-form-title">Chia sẻ khi <em>bạn muốn.</em></h2><p>Bài gửi mới ở trạng thái chờ duyệt. Chỉ tên hiển thị, liên kết video và câu chuyện đã được duyệt mới xuất hiện công khai. Hãy bảo đảm video của bạn có quyền chia sẻ và không chứa thông tin riêng tư của người khác.</p></div><ChallengeForm /></div></section>
    <section className="challenge-stories-section" aria-labelledby="stories-title"><div className="product-container"><p className="section-index"><span /> 03 · Câu chuyện cộng đồng</p><h2 id="stories-title" className="section-title">Những lời nhắc <em>đã được chia sẻ.</em></h2>{approved.length === 0 ? <div className="challenge-empty"><span aria-hidden="true">✳</span><p>Chưa có bài dự thi nào được duyệt để hiển thị. Bạn có thể bắt đầu bằng câu chuyện của mình.</p></div> : <div className="story-card-grid">{approved.map((item) => <article key={item.id} className="story-card"><p className="eyebrow">Hóa đơn của bạn</p><h3>{item.displayName}</h3><p>{item.story}</p><a href={item.videoUrl} target="_blank" rel="noopener noreferrer">Xem video <ArrowUpRight size={15} /></a></article>)}</div>}</div></section>
  </main>;
}
