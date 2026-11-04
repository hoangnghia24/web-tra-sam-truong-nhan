import type { Metadata } from 'next';
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
    <section className="challenge-page-section"><div className="product-container"><p className="section-index"><span /> 01 · Bốn bước tham gia</p><h2 className="section-title">Từ câu chuyện của bạn <em>đến một video chia sẻ.</em></h2><ol className="challenge-page-steps"><li><span>01</span><h3>Quay video</h3><p>Kể câu chuyện chăm sóc bản thân của bạn.</p></li><li><span>02</span><h3>Đăng TikTok</h3><p>Đăng video kèm hashtag theo thể lệ do nhóm cung cấp.</p></li><li><span>03</span><h3>Gửi thông tin</h3><p>Điền thông tin dự thi và liên kết video vào biểu mẫu bên dưới.</p></li><li><span>04</span><h3>Chờ kết quả</h3><p>Theo dõi kết quả và thông tin nhận quà từ ban tổ chức.</p></li></ol><p className="challenge-rules-link"><a href="https://drive.google.com/file/d/1ccnlxFdhOhbHj8bEBnMV57rCxjJL_Q4Y/view?usp=sharing" target="_blank" rel="noopener noreferrer">Xem file thể lệ do nhóm cung cấp <ArrowUpRight size={16} aria-hidden="true" /></a></p></div></section>
    <section className="challenge-submit-section" aria-labelledby="challenge-form-title"><div className="product-container challenge-submit-layout"><div><p className="section-index light"><span /> 02 · Lời kể của bạn</p><h2 id="challenge-form-title">Chia sẻ khi <em>bạn muốn.</em></h2><p>Bài gửi mới ở trạng thái chờ duyệt. Chỉ tên hiển thị, liên kết video và câu chuyện đã được duyệt mới xuất hiện công khai. Hãy bảo đảm video của bạn có quyền chia sẻ và không chứa thông tin riêng tư của người khác.</p></div><ChallengeForm /></div></section>
    <section className="challenge-stories-section" aria-labelledby="stories-title"><div className="product-container"><p className="section-index"><span /> 03 · Câu chuyện cộng đồng</p><h2 id="stories-title" className="section-title">Những lời nhắc <em>đã được chia sẻ.</em></h2>{approved.length === 0 ? <div className="challenge-empty"><span aria-hidden="true">✳</span><p>Chưa có bài dự thi nào được duyệt để hiển thị. Bạn có thể bắt đầu bằng câu chuyện của mình.</p></div> : <div className="story-card-grid">{approved.map((item) => <article key={item.id} className="story-card"><p className="eyebrow">Hóa đơn của bạn</p><h3>{item.displayName}</h3><p>{item.story}</p><a href={item.videoUrl} target="_blank" rel="noopener noreferrer">Xem video <ArrowUpRight size={15} /></a></article>)}</div>}</div></section>
  </main>;
}
