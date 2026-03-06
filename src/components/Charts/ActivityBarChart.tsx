import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from './index';

import type { ActivitySession } from '@/types';

type Props = {
  sessions: ActivitySession[];
};

export default function ActivityBarChart({ sessions }: Props) {
  const data = sessions.map((s, i) => ({
    day: i + 1,
    kg: s.kilogram,
    kcal: s.calories,
  }));

  return (
    <div>
      <h3>Daily Activity</h3>
      <BarChart width={600} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="day" />
        <YAxis
          yAxisId="kg"
          orientation="right"
          domain={['dataMin - 2', 'dataMax + 2']}
        />
        <YAxis yAxisId="kcal" orientation="left" />
        <Tooltip />
        <Legend />
        <Bar
          yAxisId="kg"
          dataKey="kg"
          name="Weight (kg)"
          fill="#282D30"
          radius={[3, 3, 0, 0]}
        />
        <Bar
          yAxisId="kcal"
          dataKey="kcal"
          name="Calories (kCal)"
          fill="#E60000"
          radius={[3, 3, 0, 0]}
        />
      </BarChart>
    </div>
  );
}
