import { RadialBar, RadialBarChart, ResponsiveContainer } from './index';

import './ScoreRadialChart.css';

type Props = {
  score: number;
};

export default function ScoreRadialChart({ score }: Props) {
  const data = [{ value: score * 100, fill: '#E60000' }];

  return (
    <div className="chart-card chart-card--score">
      <div className="chart-card__header">
        <h3>Score</h3>
      </div>
      <div style={{ position: 'relative', width: '100%', height: 260 }}>
        <ResponsiveContainer width="100%" height={260}>
          <RadialBarChart
            data={data}
            innerRadius="72%"
            outerRadius="80%"
            startAngle={90}
            endAngle={450}
            barSize={10}
          >
            <RadialBar dataKey="value" cornerRadius={10} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="score-radial-chart__center">
          <div className="score-radial-chart__value">
            {Math.round(score * 100)}%
          </div>
          <div className="score-radial-chart__subtitle">de votre objectif</div>
        </div>
      </div>
    </div>
  );
}
