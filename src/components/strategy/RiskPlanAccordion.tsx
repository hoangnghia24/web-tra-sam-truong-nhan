type RiskPlan = {
  title: string;
  signals: string[];
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
          <div className="risk-signals">
            <strong>Nhóm chi tiết &amp; biểu hiện:</strong>
            <ul>
              {item.signals.map((signal) => <li key={signal}>{signal}</li>)}
            </ul>
          </div>
          <p><strong>Phòng ngừa:</strong> {item.prevention}</p>
          <p><strong>Xử lý:</strong> {item.response}</p>
        </details>
      ))}
    </div>
  );
}
