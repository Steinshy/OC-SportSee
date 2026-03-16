import { useEffect, useState } from 'react';

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

function renderPolarAngleAxis(
  {
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
  },
  fontSize: number
) {
  return (
    <Text
      {...rest}
      verticalAnchor="middle"
      y={y + (y - cy) / 10}
      x={x + (x - cx) / 100}
      fill="#FFFFFF"
      fillOpacity={1}
      fontSize={fontSize}
      fontWeight={500}
    >
      {payload.value}
    </Text>
  );
}

export default function PerformanceRadarChart({ performance }: Props) {
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
  const axisFontSize = isExtraSmallScreen ? 10 : isMobileScreen ? 11 : 12;
  const outerRadius = isExtraSmallScreen ? 62 : isMobileScreen ? 78 : 90;

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
        <RadarChart data={data} outerRadius={outerRadius}>
          <PolarGrid radialLines={false} />
          <PolarAngleAxis
            dataKey="subject"
            tick={(props: Record<string, unknown>) =>
              renderPolarAngleAxis(
                props as Parameters<typeof renderPolarAngleAxis>[0],
                axisFontSize
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
