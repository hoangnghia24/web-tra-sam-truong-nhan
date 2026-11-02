import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageBanner } from '@/components/site/PageBanner';
import { readJson } from '@/lib/json-store';
import { brandSchema, campaignSchema, teamSchema } from '@/lib/schemas';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Về dự án', description: 'Câu chuyện và nhóm thực hiện dự án Trà Sâm Trường Nhân.' };

export default async function AboutPage() {
  const [brand, campaign, team] = await Promise.all([readJson('content/brand.json', brandSchema), readJson('content/campaign.json', campaignSchema), readJson('content/team.json', teamSchema)]);
  return <main id="main"><PageBanner eyebrow="Câu chuyện dự án" title="Có những điều không nên để mai." description="Chúng tôi dùng một câu hỏi nhỏ để mở ra cuộc trò chuyện về thời gian, sự chăm sóc và những lời hẹn với chính mình." tone="forest" /><section className="about-story-section"><div className="product-container about-story-layout"><div><p className="section-index"><span /> 01 · Lý do bắt đầu</p><h2 className="section-title">Một thông điệp <em>đi từ đời sống.</em></h2></div><div><p className="about-pullquote">“{brand.campaignTitle}”</p><p>{brand.emotionalMessage} Dự án chuyển ý tưởng đó thành hóa đơn thời gian, đồng hồ bảy phút và lời nhắc dành cho người thân.</p><p>{brand.simulationNotice}</p></div></div></section><section className="about-phases-section"><div className="product-container"><p className="section-index light"><span /> 02 · Cấu trúc chiến dịch</p><h2 className="section-title">Ba giai đoạn, <em>một hành trình.</em></h2><div className="phase-track">{campaign.phases.map((phase) => <article key={phase.number}><span>0{phase.number} · TUẦN {phase.weeks}</span><h3>{phase.name}</h3><blockquote>“{phase.message}”</blockquote></article>)}</div><p>{campaign.statusNote}</p><Link href="/chien-luoc">Xem báo cáo chiến lược <ArrowUpRight size={16} /></Link></div></section><section className="about-team-section"><div className="product-container"><p className="section-index"><span /> 03 · Người thực hiện</p><h2 className="section-title">Những cái tên <em>đằng sau dự án.</em></h2><ul>{team.members.map((member) => <li key={member.id}>{member.name}</li>)}</ul><Link className="button-primary" href="/lien-he">Kết nối cùng nhóm <ArrowUpRight size={17} /></Link></div></section></main>;
}
