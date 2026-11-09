'use client';

import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { z } from 'zod';
import type { strategyReportSchema } from '@/lib/schemas';
import { handleTabKey } from '@/lib/tab-keyboard';

type Report = z.infer<typeof strategyReportSchema>;

export function SwotExplorer({ items }: { items: Report['swot'] }) {
  const [selected, setSelected] = useState(0);
  const current = items[selected];
  return <div className="swot-explorer"><div className="swot-grid" role="tablist" aria-label="Ma trận SWOT">{items.map((item, index) => <button key={item.key} type="button" role="tab" id={`swot-${item.key}`} aria-controls="swot-detail" aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} onKeyDown={(event) => handleTabKey(event, index, items.length, setSelected)} onClick={() => setSelected(index)}><span>{item.key}</span><strong>{item.title}</strong></button>)}</div><div id="swot-detail" role="tabpanel" aria-labelledby={`swot-${current.key}`} className="swot-detail"><p className="eyebrow">{current.key} · {current.title}</p><ul>{current.items.map((item) => <li key={item}>{item}</li>)}</ul></div></div>;
}

export function SevenPsExplorer({ items }: { items: Report['sevenPs'] }) {
  const [selected, setSelected] = useState(0);
  const current = items[selected];
  return <div className="sevenps-explorer">
    <p className="sevenps-plan-note">Nội dung 7Ps là kế hoạch đề xuất. Giá bán, hồ sơ pháp lý, nhà máy GMP và tư liệu sản xuất cần được xác minh trước khi công bố như thông tin sản phẩm hiện hành.</p>
    <div className="sevenps-tabs" role="tablist" aria-label="Bảy yếu tố marketing">{items.map((item, index) => <button key={item.key} type="button" role="tab" id={`sevenps-${index}`} aria-controls="sevenps-panel" aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} onKeyDown={(event) => handleTabKey(event, index, items.length, setSelected)} onClick={() => setSelected(index)}>{item.key}</button>)}</div>
    <div id="sevenps-panel" role="tabpanel" aria-labelledby={`sevenps-${selected}`} className="sevenps-panel">
      <div className="sevenps-panel-head"><span>0{selected + 1} / 07</span><div><h3>{selected + 1}. {current.title}</h3><p>{current.subtitle}</p></div></div>
      <ul className="sevenps-points">{current.points.map((point) => <li key={point.label}><strong>{point.label}</strong> {point.body}</li>)}</ul>
    </div>
  </div>;
}

export function BudgetChart({ items }: { items: Report['budget'] }) {
  const chartItems = items.filter((item) => item.name !== 'Dự phòng');
  const executionTotal = chartItems.reduce((sum, item) => sum + item.millionVnd, 0);
  const reserve = items.find((item) => item.name === 'Dự phòng')?.millionVnd ?? 0;
  return <div className="budget-chart"><div className="budget-plot" role="img" aria-label="Biểu đồ ngân sách triển khai theo hạng mục, đơn vị triệu đồng, trục từ 0 đến 120"><ResponsiveContainer width="100%" height={450}><BarChart data={chartItems} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 14 }}><CartesianGrid stroke="#d8dfd1" horizontal={false} /><XAxis type="number" domain={[0, 120]} ticks={[0, 20, 40, 60, 80, 100, 120]} tick={{ fill: '#557a42', fontSize: 11 }} /><YAxis type="category" dataKey="name" width={128} tick={{ fill: '#173e29', fontSize: 11 }} /><Tooltip formatter={(value) => `${value} triệu ₫`} /><Bar dataKey="millionVnd" fill="#b98532" radius={[0, 3, 3, 0]} /></BarChart></ResponsiveContainer></div><table><caption>Ngân sách kế hoạch theo hạng mục, triệu đồng</caption><thead><tr><th>Hạng mục</th><th>Dự kiến</th></tr></thead><tbody>{items.map((item) => <tr key={item.name}><td>{item.name}</td><td>{item.millionVnd} triệu ₫</td></tr>)}</tbody><tfoot><tr><th>Tổng triển khai</th><th>{executionTotal} triệu ₫</th></tr><tr><th>Tổng ngân sách</th><th>{executionTotal + reserve} triệu ₫</th></tr></tfoot></table></div>;
}

export function BudgetPhaseTable({ data }: { data: Report['budgetByPhase'] }) {
  return <div className="strategy-table-wrap"><table className="strategy-data-table"><caption>Ngân sách triển khai theo giai đoạn, triệu đồng</caption><thead><tr><th>Hạng mục</th>{data.phaseLabels.map((label) => <th key={label}>{label}</th>)}<th>Tổng</th></tr></thead><tbody>{data.rows.map((row) => <tr key={row.name}><td>{row.name}</td><td>{row.p1}</td><td>{row.p2}</td><td>{row.p3}</td><td>{row.total}</td></tr>)}</tbody><tfoot><tr><th>Tổng</th><th>{data.totals.p1}</th><th>{data.totals.p2}</th><th>{data.totals.p3}</th><th>{data.totals.total}</th></tr></tfoot></table></div>;
}

export function KpiMilestoneTable({ items }: { items: Report['kpiMilestones'] }) {
  return <div className="strategy-table-wrap"><table className="strategy-data-table strategy-kpi-table"><caption>KPI mục tiêu theo giai đoạn</caption><thead><tr><th>Giai đoạn</th><th>Tuần</th><th>KPI</th></tr></thead><tbody>{items.map((item) => <tr key={item.phase}><td>{item.phase}</td><td>{item.weeks}</td><td>{item.metrics}</td></tr>)}</tbody></table></div>;
}
