import { useCallback, useState } from 'react';

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from './index';

import type { AverageSession } from '@/types/user';

import './SessionLineChart.css';

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

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { value: number }[];
}) {
  if (active && payload && payload.length > 0) {
    return (
      <div className="session-tooltip">
        <p>{payload[0]?.value} min</p>
      </div>
    );
  }
  return null;
}

export default function SessionLineChart({ sessions }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const data = sessions.map((session) => ({
    day: DAY_LABELS[session.day],
    length: session.sessionLength,
  }));

  const handleMouseMove = useCallback(
    (state: Record<string, unknown>) => {
      if (
        state?.activeTooltipIndex !== undefined &&
        typeof state.activeTooltipIndex === 'number'
      ) {
        setActiveIndex(state.activeTooltipIndex);
      }
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setActiveIndex(null);
  }, []);

  return (
    <div className="chart-card chart-card--sessions">
      <h3>
        Durée moyenne des
        <br />
        sessions
      </h3>
      {activeIndex !== null && (
        <div
          className="session-overlay"
          style={{
            width: `${100 - (activeIndex / (data.length - 1)) * 100}%`,
          }}
        />
      )}
      <ResponsiveContainer width="90%" height="75%" className="session-chart">
        <LineChart
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 20 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            <linearGradient id="sessionLine" x1="0%" y1="0" x2="100%" y2="0">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
              <stop offset="20%" stopColor="rgba(255, 255, 255, 0.4)" />
              <stop offset="40%" stopColor="rgba(255, 255, 255, 0.5)" />
              <stop offset="60%" stopColor="rgba(255, 255, 255, 0.6)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
            tickMargin={10}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis hide domain={['dataMin-10', 'dataMax+10']} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={false}
          />
          <Line
            type="natural"
            dataKey="length"
            stroke="url(#sessionLine)"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 4,
              strokeWidth: 8,
              stroke: 'rgba(255,255,255,0.2)',
              fill: '#fff',
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
