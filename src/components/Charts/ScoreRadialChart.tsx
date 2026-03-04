import { RadialBar, RadialBarChart } from './index';

import './style.css';

interface Props {
  score: number; // 0–1
}

export default function ScoreRadialChart({ score }: Props) {
  const data = [{ value: score * 100, fill: '#E60000' }];

  return (
    <div>
      <h3>Score</h3>
      <p className="score-radial-chart__value">{Math.round(score * 100)}%</p>
      <RadialBarChart
        width={200}
        height={200}
        innerRadius="60%"
        outerRadius="100%"
        data={data}
        startAngle={90}
        endAngle={90 + 360 * score}
      >
        <RadialBar dataKey="value" background />
      </RadialBarChart>
      <p className="score-radial-chart__subtitle">of your goal</p>
    </div>
  );
}
