type RiskPlan = {
  title: string;
  signal: string;
  severity: string;
  prevention: string;
  response: string;
};

export function RiskPlanAccordion({ items }: { items: RiskPlan[] }) {
  return (
    <div className="risk-list">
      {items.map((item) => (
        <details key={item.title}>
          <summary>{item.title} <span>{item.severity}</span></summary>
          <p><strong>Biểu hiện:</strong> {item.signal}</p>
          <p><strong>Phòng ngừa:</strong> {item.prevention}</p>
          <p><strong>Xử lý:</strong> {item.response}</p>
        </details>
      ))}
    </div>
  );
}
