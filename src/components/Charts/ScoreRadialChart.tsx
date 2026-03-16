import { useEffect, useState } from 'react';

import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from './index';

import './ScoreRadialChart.css';

type Props = {
  score: number;
};

export default function ScoreRadialChart({ score }: Props) {
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
  const percentage = score * 100;

  return (
    <div className="chart-card chart-card--score">
      <h3 className="score-radial-chart__title">Score</h3>
      <ResponsiveContainer
        width="100%"
        height="100%"
        className="score-chart-container"
      >
        <RadialBarChart
          data={[{ score: percentage }]}
          cx="50%"
          cy="50%"
          innerRadius={
            isExtraSmallScreen ? '64%' : isMobileScreen ? '68%' : '70%'
          }
          outerRadius={isExtraSmallScreen ? '76%' : '80%'}
          startAngle={90}
          endAngle={450}
          barSize={isExtraSmallScreen ? 8 : isMobileScreen ? 9 : 10}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            dataKey="score"
            cornerRadius={100}
            fill="#e60000"
            angleAxisId={0}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="score-radial-chart__circle" />
      <div className="score-radial-chart__center">
        <span className="score-radial-chart__value">
          {Math.round(score * 100)}%
        </span>
        <span className="score-radial-chart__subtitle">
          de votre
          <br />
          objectif
        </span>
      </div>
    </div>
  );
}
