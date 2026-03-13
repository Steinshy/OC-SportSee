import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from './index';

import type { UserPerformance } from '@/types/user';

import './PerformanceRadarChart.css';

type Props = {
  performance: UserPerformance;
};

export default function PerformanceRadarChart({ performance }: Props) {
  const data = performance.data.map((entry) => ({
    subject:
      performance.categories[entry.type as keyof typeof performance.categories],
    value: entry.value,
  }));

  return (
    <div className="chart-card chart-card--performance">
      <ResponsiveContainer width="100%" height={260}>
        <RadarChart data={data} outerRadius="70%">
          <PolarGrid radialLines={false} />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#fff', fontSize: 12 }}
          />
          <Radar
            dataKey="value"
            fill="#e60000"
            fillOpacity={0.6}
            stroke="#e60000"
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
