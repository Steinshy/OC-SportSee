import { useEffect, useMemo, useState } from 'react';

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

const MIN_DISPLAY_POINTS = 7;

type Props = {
  sessions: ActivitySession[];
};

type ChartDataPoint = {
  day: string;
  kilogram?: number;
  calories?: number;
};

type KgAxisConfig = {
  domain: [number, number];
  ticks: [number, number, number];
};

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { value: number }[];
}) {
  if (!active || !payload || payload.length < 2) return null;

  const kg = payload[0]?.value;
  const kcal = payload[1]?.value;
  if (kg == null || kcal == null) return null;

  return (
    <div className="activity-tooltip">
      <p>{Math.round(kg)}kg</p>
      <p>{kcal}Kcal</p>
    </div>
  );
}

function HoverCursor({
  x,
  y,
  width,
  height,
  scale = 0.72,
}: {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  scale?: number;
}) {
  const slotWidth = width ?? 0;
  const cursorWidth = slotWidth * scale;
  const offset = (slotWidth - cursorWidth) / 2;

  return (
    <Rectangle
      fill="#c4c4c4"
      fillOpacity={0.5}
      height={height ?? 0}
      width={cursorWidth}
      x={(x ?? 0) + offset}
      y={y ?? 0}
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
  const [tooltipPosition, setTooltipPosition] = useState<
    { x: number; y: number } | undefined
  >(undefined);

  const chartData = useMemo<ChartDataPoint[]>(() => {
    const points: ChartDataPoint[] = sessions.map((s) => ({
      day: s.day,
      kilogram: s.kilogram,
      calories: s.calories,
    }));

    for (let i = points.length; i < MIN_DISPLAY_POINTS; i++) {
      points.push({ day: `placeholder-${i}` });
    }

    return points;
  }, [sessions]);

  const kgAxis = useMemo<KgAxisConfig>(() => {
    const kgValues = sessions.map((s) => s.kilogram);
    if (kgValues.length === 0) return { domain: [0, 2], ticks: [0, 1, 2] };

    const min = Math.floor(Math.min(...kgValues));
    const max = Math.ceil(Math.max(...kgValues));
    const tickMin = min - 2;
    let tickMax = max + 1;
    if ((tickMax - tickMin) % 2 !== 0) tickMax += 1;
    const tickMid = (tickMin + tickMax) / 2;

    return {
      domain: [tickMin, tickMax],
      ticks: [tickMin, tickMid, tickMax],
    };
  }, [sessions]);

  return (
    <div className="chart-card chart-card--activity">
      <h3 className="activity-chart__title">Activité quotidienne</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          barGap={8}
          barSize={isExtraSmallScreen ? 5 : isMobileScreen ? 6 : 7}
          onMouseMove={(state) => {
            if (!state.isTooltipActive || !state.activeCoordinate) {
              return;
            }

            setTooltipPosition({
              x: state.activeCoordinate.x + (isMobileScreen ? 10 : 50),
              y: isMobileScreen ? 18 : 24,
            });
          }}
          onMouseLeave={() => {
            setTooltipPosition(undefined);
          }}
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
            tickFormatter={(_day: string, index: number) => String(index + 1)}
          />
          <YAxis
            yAxisId="kilogram"
            orientation="right"
            domain={kgAxis.domain}
            ticks={kgAxis.ticks}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#9b9eac', fontSize: isMobileScreen ? 12 : 14 }}
            tickMargin={isExtraSmallScreen ? 0 : isMobileScreen ? 6 : 30}
          />
          <YAxis yAxisId="calories" hide />
          <Tooltip
            content={<CustomTooltip />}
            cursor={<HoverCursor scale={isMobileScreen ? 0.64 : 0.72} />}
            position={tooltipPosition}
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
            yAxisId="kilogram"
            dataKey="kilogram"
            fill="#282d30"
            radius={[3, 3, 0, 0]}
          />
          <Bar
            name="Calories brûlées (kCal)"
            yAxisId="calories"
            dataKey="calories"
            fill="#e60000"
            radius={[3, 3, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
