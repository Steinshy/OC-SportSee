import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from './index';

import type { UserPerformance } from '@/types/user';

import './PerformanceRadarChart.css';

const LABELS: Record<string, string> = {
  cardio: 'Cardio',
  energy: 'Énergie',
  endurance: 'Endurance',
  strength: 'Force',
  speed: 'Vitesse',
  intensity: 'Intensité',
};

type Props = {
  performance: UserPerformance;
};

export default function PerformanceRadarChart({ performance }: Props) {
  const data = performance.data.map((entry) => {
    const categoryKey = entry.type as keyof typeof performance.categories;
    const categoryName = performance.categories[categoryKey];
    const lowerCategoryName = categoryName?.toLowerCase() ?? '';
    const subject = LABELS[lowerCategoryName] || categoryName;

    return {
      subject,
      value: entry.value,
    };
  });

  return (
    <div className="chart-card chart-card--performance">
      <ResponsiveContainer width="100%" height={260}>
        <RadarChart data={data} outerRadius="70%">
          <PolarGrid radialLines={false} stroke="rgb(255 255 255 / 30%)" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#fff', fontSize: 12 }}
          />
          <Radar
            dataKey="value"
            fill="#ff0101"
            fillOpacity={0.6}
            stroke="#ff0101"
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
