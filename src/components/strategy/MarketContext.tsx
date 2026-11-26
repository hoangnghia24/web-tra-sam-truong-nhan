import type { z } from 'zod';
import type { strategyReportSchema } from '@/lib/schemas';

type MarketContextContent = z.infer<typeof strategyReportSchema>['marketContext'];

function splitDriver(driver: string) {
  const [title, description = ''] = driver.split(' — ');
  return { title, description };
}

export function MarketContext({ content }: { content: MarketContextContent }) {
  return <div className="market-context">
    <div className="market-truth">
      <span>Sự thật:</span>
      <blockquote>“{content.truth}”</blockquote>
    </div>

    <div className="market-pains">
      <h3>Điểm đau:</h3>
      <div className="market-pain-grid">{content.pains.map((pain, index) => <article key={pain.label}>
        <span>0{index + 1}</span>
        <h4>{pain.label}:</h4>
        <p>{pain.body}</p>
      </article>)}</div>
    </div>

    <section className="market-drivers" aria-labelledby="market-drivers-title">
      <p className="market-drivers-eyebrow">Quyết định mua</p>
      <h3 id="market-drivers-title">5 YẾU TỐ ẢNH HƯỞNG ĐẾN QUYẾT ĐỊNH MUA</h3>
      <ol className="market-driver-grid">{content.drivers.map((driver, index) => {
        const { title, description } = splitDriver(driver);
        return <li key={driver}>
          <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <div><h4>{title}</h4><p>{description}</p></div>
        </li>;
      })}</ol>
    </section>

   </div>;
}
