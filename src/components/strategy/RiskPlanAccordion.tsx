type RiskPlan = {
  title: string;
  action: string;
  fallback: string;
};

export function RiskPlanAccordion({ items }: { items: RiskPlan[] }) {
  return (
    <div className="risk-list">
      {items.map((item) => (
        <details key={item.title}>
          <summary>{item.title}</summary>
          <p>{item.action} <em>Dự phòng:</em> {item.fallback}</p>
        </details>
      ))}
    </div>
  );
}
