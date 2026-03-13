import type { ReactNode } from 'react';

import './style.css';

interface Props {
  icon?: ReactNode;
  label: string;
  value: string | number;
  unit?: string;
}

export default function MetricCard({ icon, label, value, unit }: Props) {
  return (
    <div className="metric-card">
      {icon && <span className="metric-card__icon">{icon}</span>}
      <div>
        <p className="metric-card__value">
          {value}
          {unit}
        </p>
        <p className="metric-card__label">{label}</p>
      </div>
    </div>
  );
}
