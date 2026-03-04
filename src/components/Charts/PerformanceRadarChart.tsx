import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from './index';

import type { UserPerformance } from '@/types';

interface Props {
  performance: UserPerformance;
}

export default function PerformanceRadarChart({ performance }: Props) {
  const data = performance.data.map((entry) => ({
    subject: performance.categories[entry.type as keyof typeof performance.categories],
    value: entry.value,
  }));

  return (
    <div>
      <h3>Performance</h3>
      <RadarChart width={300} height={300} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <Radar dataKey="value" fill="#E60000" fillOpacity={0.6} />
      </RadarChart>
    </div>
  );
}
