import type { z } from 'zod';
import type { strategyReportSchema } from '@/lib/schemas';

type PositioningContent = z.infer<typeof strategyReportSchema>['positioningDraft'];

export function PositioningDraft({ content }: { content: PositioningContent }) {
  return <section className="positioning-draft" aria-labelledby="positioning-title">
    <div className="positioning-heading">
      <p className="positioning-eyebrow">NỘI DUNG ĐỊNH VỊ ĐỀ XUẤT</p>
      <h3 id="positioning-title">{content.title}</h3>
      <p className="positioning-disclosure">Phần dưới đây giữ nguyên nội dung định vị do nhóm cung cấp. Các câu về công dụng sức khỏe và mức giá là đề xuất truyền thông, chưa phải thông tin sản phẩm đã được xác nhận.</p>
    </div>

    <div className="positioning-usp">
      <p className="positioning-label">{content.uspHeading}</p>
      <h4>{content.uspStatement}</h4>
      <p><em>{content.uspExplanation}</em></p>
    </div>

    <div className="positioning-pillars">
      <h4>{content.pillarsHeading}</h4>
      <ol>{content.pillars.map((item, index) => <li key={item.label}><span>0{index + 1}</span><p><strong>{item.label}</strong> {item.body}</p></li>)}</ol>
    </div>

    <div className="positioning-roles">
      <h4>{content.brandRoleHeading}</h4>
      <div>{content.roles.map((item) => <article key={item.label}><strong>{item.label}</strong><p>{item.body}</p></article>)}</div>
    </div>

    <aside className="positioning-highlight" aria-label="Thông điệp nổi bật">
      <p>{content.highlight.map((line) => <strong key={line}>{line}</strong>)}</p>
    </aside>
  </section>;
}
