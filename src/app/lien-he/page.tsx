import type { Metadata } from 'next';
import Image from 'next/image';
import { Mail, Phone } from 'lucide-react';
import { PageBanner } from '@/components/site/PageBanner';
import { CopyEmailButton } from '@/components/contact/CopyEmailButton';
import { ContactForm } from '@/components/contact/ContactForm';
import { readJson } from '@/lib/json-store';
import { teamSchema } from '@/lib/schemas';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Liên hệ', description: 'Kết nối cùng nhóm thực hiện website Trà Sâm Trường Nhân.' };

export default async function ContactPage() {
  const team = await readJson('content/team.json', teamSchema);
  return <main id="main">
    <PageBanner eyebrow="Kết nối cùng chúng tôi" title="Mọi ý tưởng đều bắt đầu từ một cuộc trò chuyện." description="Chúng tôi là nhóm thực hiện dự án chiến dịch Trà Sâm Trường Nhân. Hãy gửi lời nhắn hoặc liên hệ trực tiếp với một thành viên." tone="light" />
    <section className="contact-team-section"><div className="product-container">
      <p className="section-index"><span /> 01 · Nhóm thực hiện</p>
      <h2 className="section-title">Bốn con người, <em>một câu chuyện chăm mình.</em></h2>
      <div className="team-card-grid">{team.members.map((member, index) => <article key={member.id} className="team-card">
        <span>0{index + 1} / 04</span>
        <div className="team-avatar">
          {member.avatar
            ? <Image src={member.avatar} alt={`Ảnh chân dung ${member.name}`} fill sizes="88px" />
            : <span aria-hidden="true">{member.name.split(' ').slice(-2).map((part) => part[0]).join('')}</span>}
        </div>
        <h3>{member.name}</h3>
        <a href={`mailto:${member.email}`}><Mail size={16} /> {member.email}</a>
        <a href={`tel:${member.phone}`}><Phone size={16} /> {member.phone}</a>
        <CopyEmailButton email={member.email} />
      </article>)}</div>
    </div></section>
    <section className="contact-form-section"><div className="product-container contact-page-layout"><div>
      <p className="section-index light"><span /> 02 · Để lại lời nhắn</p>
      <h2>Chúng tôi đang <em>lắng nghe.</em></h2>
      <p>Thông tin bạn gửi được lưu riêng trên máy chủ demo để nhóm phản hồi. Không hiển thị công khai.</p>
      <a href={`mailto:${team.teamEmail}`}><Mail size={18} /> {team.teamEmail}</a>
    </div><ContactForm /></div></section>
  </main>;
}
