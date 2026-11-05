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
  return <div className="sevenps-explorer"><div className="sevenps-tabs" role="tablist" aria-label="Bảy yếu tố marketing">{items.map((item, index) => <button key={item.key} type="button" role="tab" id={`sevenps-${index}`} aria-controls="sevenps-panel" aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} onKeyDown={(event) => handleTabKey(event, index, items.length, setSelected)} onClick={() => setSelected(index)}>{item.key}</button>)}</div><div id="sevenps-panel" role="tabpanel" aria-labelledby={`sevenps-${selected}`} className="sevenps-panel"><span>0{selected + 1} / 07</span><h3>{current.title}</h3><p>{current.body}</p></div></div>;
}

export function BudgetChart({ items }: { items: Report['budget'] }) {
  const chartItems = items.filter((item) => item.name !== 'Dự phòng');
  return <div className="budget-chart"><div className="budget-plot" role="img" aria-label="Biểu đồ ngân sách dự kiến theo hạng mục, đơn vị triệu đồng"><ResponsiveContainer width="100%" height={410}><BarChart data={chartItems} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 14 }}><CartesianGrid stroke="#d8dfd1" horizontal={false} /><XAxis type="number" tick={{ fill: '#557a42', fontSize: 11 }} /><YAxis type="category" dataKey="name" width={118} tick={{ fill: '#173e29', fontSize: 11 }} /><Tooltip formatter={(value) => `${value} triệu ₫`} /><Bar dataKey="millionVnd" fill="#b98532" radius={[0, 3, 3, 0]} /></BarChart></ResponsiveContainer></div><table><caption>Ngân sách kế hoạch theo hạng mục, triệu đồng</caption><thead><tr><th>Hạng mục</th><th>Dự kiến</th></tr></thead><tbody>{items.map((item) => <tr key={item.name}><td>{item.name}</td><td>{item.millionVnd} triệu ₫</td></tr>)}</tbody></table></div>;
}
