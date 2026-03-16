import { useEffect, useState } from 'react';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
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

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { value: number }[];
}) {
  if (active && payload && payload.length >= 2) {
    return (
      <div className="activity-tooltip">
        <p>{payload[0]?.value}kg</p>
        <p>{payload[1]?.value}Kcal</p>
      </div>
    );
  }
  return null;
}

function CustomCursor({
  x,
  y,
  width,
  height,
}: {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}) {
  const w = width ?? 0;
  return (
    <Rectangle
      fill="rgba(196, 196, 196, 0.5)"
      x={(x ?? 0) - w * 0.1}
      y={y ?? 0}
      width={w * 1.2}
      height={height ?? 0}
    />
  );
}

export default function ActivityBarChart({ sessions }: Props) {
  const [screenWidth, setScreenWidth] = useState(() => {
    if (typeof window === 'undefined') {
      return 1024;
    }
    return window.innerWidth;
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobileScreen = screenWidth <= 768;
  const isExtraSmallScreen = screenWidth <= 420;

  const data = sessions.map((session, index) => ({
    day: index + 1,
    kg: session.kilogram,
    kcal: session.calories,
  }));

  return (
    <div className="chart-card chart-card--activity">
      <h3 className="activity-chart__title">Activité quotidienne</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          barGap={8}
          barSize={isExtraSmallScreen ? 5 : isMobileScreen ? 6 : 7}
          margin={
            isExtraSmallScreen
              ? { top: 18, right: 0, left: 0, bottom: 4 }
              : isMobileScreen
                ? { top: 18, right: 8, left: 8, bottom: 8 }
                : { top: 18, right: 20, left: 20, bottom: 12 }
          }
        >
          <CartesianGrid
            strokeDasharray="3"
            vertical={false}
            stroke="#dedede"
          />
          <XAxis
            dataKey="day"
            tickLine={false}
            stroke="#dedede"
            strokeWidth={2}
            tick={{ fill: '#9b9eac', fontSize: isMobileScreen ? 12 : 14 }}
            tickMargin={isMobileScreen ? 6 : 16}
          />
          <YAxis
            yAxisId="kg"
            orientation="right"
            domain={['dataMin - 2', 'dataMax + 1']}
            tickCount={3}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#9b9eac', fontSize: isMobileScreen ? 12 : 14 }}
            tickMargin={isExtraSmallScreen ? 0 : isMobileScreen ? 6 : 30}
          />
          <YAxis yAxisId="kcal" hide />
          <Tooltip
            content={<CustomTooltip />}
            cursor={<CustomCursor />}
          />
          {!isMobileScreen && (
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              iconSize={10}
              height={44}
            />
          )}
          <Bar
            name="Poids (kg)"
            yAxisId="kg"
            dataKey="kg"
            fill="#282d30"
            radius={[3, 3, 0, 0]}
          />
          <Bar
            name="Calories brûlées (kCal)"
            yAxisId="kcal"
            dataKey="kcal"
            fill="#e60000"
            radius={[3, 3, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
