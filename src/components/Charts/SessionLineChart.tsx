import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from './index';

import type { AverageSession } from '@/types/user';

import './style.css';

const DAY_LABELS: Record<number, string> = {
  1: 'L',
  2: 'M',
  3: 'M',
  4: 'J',
  5: 'V',
  6: 'S',
  7: 'D',
};

type Props = {
  sessions: AverageSession[];
};

export default function SessionLineChart({ sessions }: Props) {
  const data = sessions.map((session) => ({
    day: DAY_LABELS[session.day],
    length: session.sessionLength,
  }));

  return (
    <div className="chart-card chart-card--sessions">
      <h3>Duree moyenne des sessions</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart
          data={data}
          margin={{ top: 16, right: 12, left: 12, bottom: 12 }}
        >
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgba(255,255,255,0.6)' }}
          />
          <Tooltip
            contentStyle={{ background: '#fff', border: 'none', color: '#000' }}
            labelStyle={{ display: 'none' }}
            formatter={(value) => [`${value} min`, '']}
          />
          <Line
            type="natural"
            dataKey="length"
            stroke="#fff"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 4,
              strokeWidth: 10,
              stroke: 'rgba(255,255,255,0.2)',
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
