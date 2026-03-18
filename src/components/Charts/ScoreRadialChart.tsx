import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from './index';

import './charts.css';
import './ScoreRadialChart.css';

type Props = {
  score: number;
};

export default function ScoreRadialChart({ score }: Props) {
  const percentage = score * 100;

  return (
    <div className="chart-card chart-card--score">
      <h3 className="score-radial-chart__title">Score</h3>
      <ResponsiveContainer width="100%" height="100%" className="score-chart-container">
        <RadialBarChart
          data={[{ score: percentage }]}
          cx="50%"
          cy="50%"
          innerRadius="70%"
          outerRadius="80%"
          startAngle={210}
          endAngle={-50}
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
            fill="#e60000"
            angleAxisId={0}
            background
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
