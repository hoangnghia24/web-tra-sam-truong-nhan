import type { z } from 'zod';
import type { strategyReportSchema } from '@/lib/schemas';

type MarketContextContent = z.infer<typeof strategyReportSchema>['marketContext'];

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

    <div className="market-motivation">
      <div><h3>Động cơ mua hàng:</h3><p>{content.motivation}</p></div>
      <div><h4>Các yếu tố có thể thúc đẩy quyết định mua:</h4><ul>{content.drivers.map((driver) => <li key={driver}>{driver}</li>)}</ul></div>
    </div>

   </div>;
}
