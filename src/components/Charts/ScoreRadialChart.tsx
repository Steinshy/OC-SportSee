import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from './index';

import { CHART_COLORS } from '@/constants/chartConstants';

import './style/charts.css';
import './style/ScoreRadialChart.css';

type Props = {
  score: number;
};

export default function ScoreRadialChart({ score }: Props) {
  const percentage = score * 100;

  return (
    <div className="chart-card chart-card--score">
      <h3 className="score-radial-chart__title">Score</h3>
      <ResponsiveContainer
        width="100%"
        height="100%"
        minWidth={0}
        minHeight={0}
        className="score-chart-container"
      >
        <RadialBarChart
          data={[{ score: percentage }]}
          cx="50%"
          cy="50%"
          innerRadius="65%"
          outerRadius="85%"
          startAngle={90}
          endAngle={90 + 360}
          barSize={10}
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
            fill={CHART_COLORS.barCalories}
            angleAxisId={0}
          />
        </RadialBarChart>
      </ResponsiveContainer>
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
