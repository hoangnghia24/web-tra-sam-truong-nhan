import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

type PhaseSummary = {
  number: number;
  name: string;
  weeks: string;
  slug: string;
};

export function StrategyPhaseCards({ phases }: { phases: PhaseSummary[] }) {
  return (
    <div className="phase-track">
      {phases.map((phase) => (
        <Link
          className="strategy-phase-card"
          href={`/giai-doan/${phase.slug}`}
          key={phase.number}
          aria-label={`Xem chi tiết giai đoạn ${phase.number}: ${phase.name}, tuần ${phase.weeks}`}
        >
          <span>GIAI ĐOẠN 0{phase.number} · TUẦN {phase.weeks}</span>
          <h3>{phase.name}</h3>
          <ArrowUpRight size={22} aria-hidden="true" />
        </Link>
      ))}
    </div>
  );
}
