import type { z } from 'zod';
import type { strategyReportSchema } from '@/lib/schemas';

type ChannelJourneyContent = z.infer<typeof strategyReportSchema>['channelJourney'];

export function ChannelJourney({ content }: { content: ChannelJourneyContent }) {
  return <>
    <div className="channel-journey-grid">
      {content.stages.map((stage, index) => <article key={stage.title}>
        <span className="channel-journey-number">{String(index + 1).padStart(2, '0')}</span>
        <h3>{stage.title}</h3>
        <p><strong>Kênh:</strong> {stage.channel}</p>
        <div className="channel-journey-task">
          <strong>Nhiệm vụ:</strong>
          {stage.task && <p>{stage.task}</p>}
          {stage.details && <ul>{stage.details.map((detail) => <li key={detail.label}><strong>{detail.label}</strong> {detail.body}</li>)}</ul>}
        </div>
      </article>)}
    </div>
    <div className="channel-measurement">
      <h3>ĐO LƯỜNG HIỆU QUẢ</h3>
      <div className="channel-measurement-grid">
        {content.measurement.map((route) => <article key={route.title}>
          <h4>{route.title}</h4>
          <ol aria-label={route.title}>{route.steps.map((step) => <li key={step}>{step}</li>)}</ol>
        </article>)}
      </div>
    </div>
  </>;
}
