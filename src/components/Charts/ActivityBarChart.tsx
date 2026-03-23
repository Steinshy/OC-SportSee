import { useMemo } from 'react';

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

import { CHART_COLORS, CHART_VALUES } from '@/constants/chartConstants';
import type { ActivitySession } from '@/types/user';

import './style/charts.css';
import './style/ActivityBarChart.css';

const MIN_DISPLAY_POINTS = CHART_VALUES.minDisplayPoints;

export type Props = {
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
  scale = CHART_VALUES.cursorScale,
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
      fill={CHART_COLORS.cursor}
      fillOpacity={0.5}
      height={height ?? 0}
      width={cursorWidth}
      x={(x ?? 0) + offset}
      y={y ?? 0}
    />
  );
}

export default function ActivityBarChart({ sessions }: Props) {
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
      <ResponsiveContainer
        width="100%"
        height="100%"
        minWidth={0}
        minHeight={0}
      >
        <BarChart
          data={chartData}
          barGap={CHART_VALUES.barGapDefault}
          barSize={7}
          onMouseMove={(state) => {
            if (!state.isTooltipActive || !state.activeCoordinate) {
              return;
            }
          }}
          margin={{ top: 18, right: 20, left: 20, bottom: 30 }}
        >
          <CartesianGrid
            strokeDasharray="3"
            vertical={false}
            stroke={CHART_COLORS.strokeGrid}
          />
          <XAxis
            dataKey="day"
            tickLine={false}
            stroke={CHART_COLORS.strokeGrid}
            strokeWidth={2}
            tick={{ fill: CHART_COLORS.tickText, fontSize: 14 }}
            tickMargin={16}
            tickFormatter={(_day: string, index: number) => String(index + 1)}
          />
          <YAxis
            yAxisId="kilogram"
            orientation="right"
            domain={kgAxis.domain}
            ticks={kgAxis.ticks}
            tickLine={false}
            axisLine={false}
            tick={{ fill: CHART_COLORS.tickText, fontSize: 14 }}
            tickMargin={30}
          />
          <YAxis yAxisId="calories" hide />
          <Tooltip content={<CustomTooltip />} cursor={<HoverCursor />} />
          <Legend
            verticalAlign="top"
            align="right"
            height={44}
            content={() => (
              <ul className="activity-legend">
                <li>
                  <svg width="10" height="10">
                    <circle cx="5" cy="5" r="5" fill={CHART_COLORS.barWeight} />
                  </svg>
                  Poids (kg)
                </li>
                <li>
                  <svg width="10" height="10">
                    <circle
                      cx="5"
                      cy="5"
                      r="5"
                      fill={CHART_COLORS.barCalories}
                    />
                  </svg>
                  Calories brûlées (kCal)
                </li>
              </ul>
            )}
          />
          <Bar
            name="Poids (kg)"
            yAxisId="kilogram"
            dataKey="kilogram"
            fill={CHART_COLORS.barWeight}
            radius={[3, 3, 0, 0]}
          />
          <Bar
            name="Calories brûlées (kCal)"
            yAxisId="calories"
            dataKey="calories"
            fill={CHART_COLORS.barCalories}
            radius={[3, 3, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
