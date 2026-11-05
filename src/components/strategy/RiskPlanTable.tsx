type RiskPlan = {
  title: string;
  signal: string;
  signalTarget?: string;
  action: string;
  target?: string;
  fallback?: string;
};

export function RiskPlanTable({ items }: { items: RiskPlan[] }) {
  return (
    <div className="risk-table-scroll">
      <table className="risk-table">
        <thead>
          <tr>
            <th scope="col">Tình huống rủi ro</th>
            <th scope="col">Dấu hiệu (Trigger)</th>
            <th scope="col">Kịch bản ứng phó ngay (Action Plan B)</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.title}>
              <th scope="row">
                {index + 1}. {item.title}{' '}
                {item.target && <em>{item.target}</em>}
              </th>
              <td>{item.signal} {item.signalTarget && <em>{item.signalTarget}</em>}</td>
              <td>
                {item.action}{' '}
                {item.fallback && <em>{item.fallback}</em>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
