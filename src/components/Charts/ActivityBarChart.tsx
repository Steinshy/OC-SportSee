import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from './index';

import type { ActivitySession } from '@/types/user';

import './ActivityBarChart.css';

type Props = {
  sessions: ActivitySession[];
};

export default function ActivityBarChart({ sessions }: Props) {
  const data = sessions.map((session, index) => ({
    day: index + 1,
    kg: session.kilogram,
    kcal: session.calories,
  }));

  return (
    <div className="chart-card chart-card--activity">
      <div className="chart-card__header">
        <h3>Activite quotidienne</h3>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={data}
          barGap={8}
          margin={{ top: 16, right: 24, left: 24, bottom: 20 }}
        >
          <CartesianGrid
            strokeDasharray="2 2"
            vertical={false}
            stroke="#dedede"
          />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#9b9eac' }}
          />
          <YAxis
            yAxisId="kg"
            orientation="right"
            domain={['dataMin - 2', 'dataMax + 1']}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#9b9eac' }}
          />
          <YAxis yAxisId="kcal" hide />
          <Tooltip
            cursor={{ fill: 'rgba(196, 196, 196, 0.5)' }}
            contentStyle={{ background: '#e60000', border: 'none' }}
            labelStyle={{ display: 'none' }}
            formatter={(value, name) =>
              name === 'kg' ? [`${value}kg`, ''] : [`${value}kCal`, '']
            }
          />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            iconSize={8}
            formatter={(value) =>
              value === 'kg' ? 'Poids (kg)' : 'Calories brulees (kCal)'
            }
          />
          <Bar
            yAxisId="kg"
            dataKey="kg"
            fill="#282d30"
            radius={[4, 4, 0, 0]}
            barSize={7}
          />
          <Bar
            yAxisId="kcal"
            dataKey="kcal"
            fill="#e60000"
            radius={[4, 4, 0, 0]}
            barSize={7}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
