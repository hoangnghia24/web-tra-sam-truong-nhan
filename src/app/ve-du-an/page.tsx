import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageBanner } from '@/components/site/PageBanner';
import { readJson } from '@/lib/json-store';
import { brandSchema, companySchema, teamSchema } from '@/lib/schemas';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Về Trường Sinh Group', description: 'Tổng quan Trường Sinh Group và mối liên hệ với Trường Nhân Pharma theo tài liệu nhóm cung cấp.' };

export default async function AboutPage() {
  const [brand, company, team] = await Promise.all([
    readJson('content/brand.json', brandSchema),
    readJson('content/company.json', companySchema),
    readJson('content/team.json', teamSchema),
  ]);

  return <main id="main">
    <PageBanner eyebrow="Về công ty" title={company.name} description="Tìm hiểu nền tảng nghiên cứu, vùng nguyên liệu và mối liên hệ với Trường Nhân Pharma qua thông tin nhóm cung cấp." tone="forest" />
    <section className="about-story-section"><div className="product-container about-story-layout"><div><p className="section-index"><span /> 01 · Tổng quan</p><h2 className="section-title">Một hành trình <em>từ dược liệu thiên nhiên.</em></h2></div><div><p className="about-pullquote">Tổng quan Trường Sinh Group</p><p>{company.overview}</p><p>{company.verificationNote}</p><p>{brand.simulationNotice}</p></div></div></section>
    <section className="about-phases-section"><div className="product-container"><p className="section-index light"><span /> 02 · Nền tảng doanh nghiệp</p><h2 className="section-title">Từ vùng nguyên liệu <em>đến sản phẩm.</em></h2><div className="phase-track">{company.facts.map((fact, index) => <article key={fact.label}><span>0{index + 1} · {company.name.toUpperCase()}</span><h3>{fact.label}</h3><p>{fact.detail}</p></article>)}</div><p>{company.connection}</p><Link href="/san-pham">Tìm hiểu Trà Sâm Trường Nhân <ArrowUpRight size={16} aria-hidden="true" /></Link></div></section>
    <section className="about-team-section"><div className="product-container"><p className="section-index"><span /> 03 · Nhóm thực hiện website</p><h2 className="section-title">Những cái tên <em>đằng sau dự án.</em></h2><ul>{team.members.map((member) => <li key={member.id}>{member.name}</li>)}</ul><Link className="button-primary" href="/lien-he">Kết nối cùng nhóm <ArrowUpRight size={17} aria-hidden="true" /></Link></div></section>
  </main>;
}
