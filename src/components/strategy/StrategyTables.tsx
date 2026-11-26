import type { z } from 'zod';
import type { strategyReportSchema } from '@/lib/schemas';

type Report = z.infer<typeof strategyReportSchema>;

const number = (value: number) => new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 2 }).format(value);

export function PestelOverview({ pestel, legalFramework, externalFactors }: Pick<Report, 'pestel' | 'legalFramework' | 'externalFactors'>) {
  return <>
    <div className="pestel-grid">{pestel.map((item, index) => <article key={`${item.key}-${item.title}`}>
      <span>{String(index + 1).padStart(2, '0')} · {item.key}</span>
      <h3>{item.title}</h3>
      <ul>{item.items.map((entry) => <li key={entry}>{entry}</li>)}</ul>
    </article>)}</div>
    <h3 className="report-subtitle">Môi trường pháp lý và biện pháp tuân thủ</h3>
    <div className="strategy-table-wrap"><table className="strategy-data-table strategy-legal-table">
      <thead><tr><th>Văn bản</th><th>Yêu cầu và biện pháp tuân thủ</th></tr></thead>
      <tbody>{legalFramework.map((item) => <tr key={item.document}><td>{item.document}</td><td>{item.requirements}</td></tr>)}</tbody>
    </table></div>
    <h3 className="report-subtitle">Cơ hội và thách thức từ môi trường</h3>
    <div className="strategy-table-wrap"><table className="strategy-data-table strategy-factor-table">
      <thead><tr><th>Cơ hội</th><th>Thách thức</th></tr></thead>
      <tbody>{externalFactors.map((item) => <tr key={item.opportunity}><td>{item.opportunity}</td><td>{item.threat}</td></tr>)}</tbody>
    </table></div>
  </>;
}

export function FunnelKpiTable({ items }: { items: Report['funnelKpis'] }) {
  return <div className="strategy-table-wrap"><table className="strategy-data-table strategy-funnel-table">
    <thead><tr><th>Tầng phễu</th><th>KPI chính</th><th>KPI hỗ trợ</th><th>Nguồn đo</th></tr></thead>
    <tbody>{items.map((item) => <tr key={item.stage}><td>{item.stage}</td><td>{item.primary}</td><td>{item.support}</td><td>{item.source}</td></tr>)}</tbody>
  </table></div>;
}

export function SalesScenarioTable({ items }: { items: Report['salesScenarios'] }) {
  return <div className="strategy-table-wrap sales-scenario-table"><table className="strategy-data-table">
    <caption>Kịch bản doanh số giả định</caption>
    <thead><tr><th>Kịch bản</th><th>Tổng đơn</th><th>Đơn Paid</th><th>Gộp Paid</th><th>ROAS Paid</th><th>Gộp toàn chiến dịch</th><th>MER</th><th>CPO</th></tr></thead>
    <tbody>{items.map((item) => <tr key={item.scenario}><td>{item.scenario}</td><td>{number(item.orders)}</td><td>{number(item.paidOrders)}</td><td>{number(item.paidGrossMillion)} triệu ₫</td><td>{number(item.paidRoas)}×</td><td>{number(item.grossSalesMillion)} triệu ₫</td><td>{number(item.mer)}×</td><td>{number(item.cpo)} ₫</td></tr>)}</tbody>
  </table></div>;
}

export function MonitoringTable({ items }: { items: Report['monitoring'] }) {
  return <div className="strategy-table-wrap"><table className="strategy-data-table strategy-monitoring-table">
    <thead><tr><th>Nhóm</th><th>Chỉ số và mức mục tiêu</th><th>Hạn đo</th><th>Nguồn đo và lưu ý</th></tr></thead>
    <tbody>{items.map((item) => <tr key={item.title}><td>{item.title}</td><td>{item.metrics}</td><td>{item.cadence}</td><td>{item.sources}</td></tr>)}</tbody>
  </table></div>;
}
