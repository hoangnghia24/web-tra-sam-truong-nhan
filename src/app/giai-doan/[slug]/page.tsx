import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock3, Leaf, Mail } from 'lucide-react';
import type { z } from 'zod';
import { readJson } from '@/lib/json-store';
import { campaignSchema } from '@/lib/schemas';

export const dynamic = 'force-dynamic';

type PhaseParams = { params: Promise<{ slug: string }> };

async function getPhase(slug: string) {
  const campaign = await readJson('content/campaign.json', campaignSchema);
  return { campaign, phase: campaign.phases.find((item) => item.slug === slug) };
}

export async function generateMetadata({ params }: PhaseParams): Promise<Metadata> {
  const { phase } = await getPhase((await params).slug);
  if (!phase) return { title: 'Không tìm thấy giai đoạn' };
  return {
    title: `Giai đoạn ${phase.number}: ${phase.name}`,
    description: `${phase.message}. ${phase.intro}`,
  };
}

function PhaseVisual({ number }: { number: number }) {
  if (number === 1) return <div className="phase-visual phase-visual-receipt" aria-hidden="true">
    <div className="phase-visual-paper"><span>HÓA ĐƠN THỜI GIAN</span><strong>Hôm nay bạn đã dành thời gian cho ai?</strong><i /><i /><i /><small>DÀNH CHO MÌNH <b>?</b></small></div>
    <span className="phase-visual-mark">01</span>
  </div>;
  if (number === 2) return <div className="phase-visual phase-visual-clock" aria-hidden="true">
    <div className="phase-visual-ring"><Clock3 size={26} strokeWidth={1.2} /><strong>07:00</strong><span>MỘT KHOẢNG DỪNG</span></div>
    <span className="phase-visual-mark">02</span>
  </div>;
  return <div className="phase-visual phase-visual-letter" aria-hidden="true">
    <div className="phase-visual-note"><Mail size={29} strokeWidth={1.2} /><p>“Hôm nay, nhớ dành một chút thời gian cho mình nhé.”</p><span>MỘT LỜI NHẮC DỊU DÀNG</span></div>
    <span className="phase-visual-mark">03</span>
  </div>;
}

type WeekMedia = z.infer<typeof campaignSchema>['phases'][number]['weeklyPlan'][number]['media'][number];

function orderedWeekMedia(media: readonly WeekMedia[]) {
  return [...media].sort((a, b) => Number(b.kind === 'poster') - Number(a.kind === 'poster'));
}

function PhaseVideo({ title, src }: { title: string; src: string }) {
  return <video controls playsInline preload="metadata" aria-label={title}><source src={src} type="video/mp4" />Trình duyệt của bạn không hỗ trợ video.</video>;
}

function WeekMediaItem({ media }: { media: WeekMedia }) {
  if (media.kind === 'poster') return <figure className="phase-media-item phase-media-poster">
    <a href={media.src} target="_blank" rel="noopener noreferrer" aria-label={`Mở poster ${media.title} ở kích thước đầy đủ`}><Image src={media.src} alt={media.title} width={media.width} height={media.height} sizes="(max-width: 768px) min(90vw, 420px), (max-width: 1200px) 35vw, 410px" /></a>
    <figcaption><strong>{media.title}</strong>{media.note && <small>{media.note}</small>}</figcaption>
  </figure>;
  if (media.kind === 'video') return <figure className="phase-media-item phase-media-video">
    <PhaseVideo title={media.title} src={media.src} />
    <figcaption><strong>{media.title}</strong>{media.note && <small>{media.note}</small>}</figcaption>
  </figure>;
  return <div className="phase-media-item phase-media-series">
    <h4>{media.title} · {media.videos.length} video</h4>
    <ol>{media.videos.map((video) => <li key={video.src}><PhaseVideo title={video.title} src={video.src} /><p>{video.title}</p></li>)}</ol>
  </div>;
}

export default async function PhasePage({ params }: PhaseParams) {
  const { campaign, phase } = await getPhase((await params).slug);
  if (!phase) notFound();

  const nextPhase = campaign.phases.find((item) => item.number === phase.number + 1);
  const previousPhase = campaign.phases.find((item) => item.number === phase.number - 1);

  return <main id="main" className={`phase-page phase-page-${phase.number}`}>
    <section className="phase-hero" aria-labelledby="phase-title">
      <div className="phase-container phase-hero-grid">
        <div className="phase-hero-copy">
          <Link href="/#cac-giai-doan" className="phase-back"><ArrowLeft size={17} aria-hidden="true" /> Ba giai đoạn chiến dịch</Link>
          <p className="phase-kicker">GIAI ĐOẠN {String(phase.number).padStart(2, '0')} / 03 <span /> TUẦN {phase.weeks}</p>
          <h1 id="phase-title">{phase.name}<span>.</span></h1>
          <p className="phase-hero-message">{phase.message}</p>
          <p className="phase-hero-intro">{phase.intro}</p>
          <a href="#cau-chuyen" className="phase-hero-explore">Khám phá giai đoạn này <ArrowRight size={18} aria-hidden="true" /></a>
        </div>
        <PhaseVisual number={phase.number} />
      </div>
      <div className="phase-container phase-hero-footer"><span>01 — NHẬN RA</span><span>02 — BẮT ĐẦU</span><span>03 — LAN TỎA</span></div>
    </section>

    <nav className="phase-switcher" aria-label="Chuyển giai đoạn"><div className="phase-container phase-switcher-inner">
      {campaign.phases.map((item) => <Link key={item.number} href={`/giai-doan/${item.slug}`} aria-current={item.number === phase.number ? 'page' : undefined}><span>0{item.number} / TUẦN {item.weeks}</span><strong>{item.name}</strong><ArrowUpRight size={18} aria-hidden="true" /></Link>)}
    </div></nav>

    <section id="cau-chuyen" className="phase-story phase-section"><div className="phase-container phase-story-grid">
      <div><p className="phase-section-label"><Leaf size={17} aria-hidden="true" /> CÂU CHUYỆN GIAI ĐOẠN {phase.number}</p><h2>{phase.message}<span>.</span></h2><p>{phase.invitation}</p><Link className="button-primary" href={phase.action.href}>{phase.action.label} <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
      <div className="phase-focus"><span>ĐIỂM CHẠM DỰ KIẾN</span><ol>{phase.focus.map((item, index) => <li key={item}><b>{String(index + 1).padStart(2, '0')}</b><p>{item}</p></li>)}</ol></div>
    </div></section>

    <section className="phase-weeks phase-section" aria-labelledby="phase-weeks-title"><div className="phase-container">
      <div className="phase-section-heading"><div><p className="phase-section-label"><Clock3 size={17} aria-hidden="true" /> LỘ TRÌNH TRIỂN KHAI</p><h2 id="phase-weeks-title">Bốn tuần, <em>một chuyển động.</em></h2></div><p>Các hoạt động và mục tiêu bên dưới thuộc kế hoạch chiến dịch.</p></div>
      <div className="phase-week-grid">{phase.weeklyPlan.map((week) => <article key={week.week} className="phase-week-card">
        <div className="phase-week-top"><span>TUẦN</span><strong>{String(week.week).padStart(2, '0')}</strong></div>
        <div className="phase-week-main"><h3>Hoạt động trong tuần</h3><ul className="phase-week-activities">{week.activities.map((activity) => <li key={activity}><p>{activity}</p></li>)}</ul>
          {week.media.length > 0 && <div className="phase-week-media"><h4>Tư liệu tuần {week.week}</h4><div className="phase-week-media-items">{orderedWeekMedia(week.media).map((media) => <WeekMediaItem key={media.kind === 'series' ? media.title : media.src} media={media} />)}</div></div>}
          <div className="phase-week-goal"><strong>Mục tiêu</strong><p>{week.goal}</p></div>
        </div>
      </article>)}</div>
    </div></section>

    <section className="phase-finale"><div className="phase-container phase-finale-grid"><div><p className="phase-section-label">LỜI NHẮC DÀNH CHO BẠN</p><h2>{phase.invitation}</h2><Link className="button-primary button-on-dark" href={phase.action.href}>{phase.action.label} <ArrowUpRight size={17} aria-hidden="true" /></Link></div><div className="phase-next-links">{previousPhase && <Link href={`/giai-doan/${previousPhase.slug}`}><ArrowLeft size={18} aria-hidden="true" /><span>GIAI ĐOẠN TRƯỚC<strong>{previousPhase.name}</strong></span></Link>}{nextPhase && <Link href={`/giai-doan/${nextPhase.slug}`}><span>GIAI ĐOẠN TIẾP THEO<strong>{nextPhase.name}</strong></span><ArrowRight size={18} aria-hidden="true" /></Link>}<Link href="/#cac-giai-doan"><span>XEM TOÀN BỘ<strong>Ba giai đoạn</strong></span><ArrowUpRight size={18} aria-hidden="true" /></Link></div></div></section>
    <p className="phase-plan-note">{campaign.statusNote}</p>
  </main>;
}
