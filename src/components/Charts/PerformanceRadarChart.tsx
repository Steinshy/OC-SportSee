import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Text,
} from './index';

import type { UserPerformance } from '@/types/user';

import './PerformanceRadarChart.css';

const LABELS: Record<string, string> = {
  cardio: 'Cardio',
  energy: 'Energie',
  endurance: 'Endurance',
  strength: 'Force',
  speed: 'Vitesse',
  intensity: 'Intensité',
};

type Props = {
  performance: UserPerformance;
};

function renderPolarAngleAxis({
  payload,
  x,
  y,
  cx,
  cy,
  ...rest
}: {
  payload: { value: string };
  x: number;
  y: number;
  cx: number;
  cy: number;
}) {
  return (
    <Text
      {...rest}
      verticalAnchor="middle"
      y={y + (y - cy) / 10}
      x={x + (x - cx) / 100}
      fill="#FFFFFF"
      fontSize={12}
    >
      {payload.value}
    </Text>
  );
}

export default function PerformanceRadarChart({ performance }: Props) {
  const data = [...performance.data].reverse().map((entry) => {
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
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius={90}>
          <PolarGrid radialLines={false} />
          <PolarAngleAxis
            dataKey="subject"
            tick={(props: Record<string, unknown>) =>
              renderPolarAngleAxis(
                props as Parameters<typeof renderPolarAngleAxis>[0],
              )
            }
          />
          <PolarRadiusAxis tickCount={6} tick={false} axisLine={false} />
          <Radar
            dataKey="value"
            fill="#ff0101"
            fillOpacity={0.6}
            stroke="#ff0101"
            dot={false}
            activeDot={false}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
