import { Line, LineChart, Tooltip, XAxis } from './index';

import type { AverageSession } from '@/types';

const DAY_LABELS: Record<number, string> = {
  1: 'L',
  2: 'M',
  3: 'M',
  4: 'J',
  5: 'V',
  6: 'S',
  7: 'D',
};

interface Props {
  sessions: AverageSession[];
}

export default function SessionLineChart({ sessions }: Props) {
  const data = sessions.map((s) => ({
    day: DAY_LABELS[s.day],
    length: s.sessionLength,
  }));

  return (
    <div>
      <h3>Average Sessions</h3>
      <LineChart width={300} height={200} data={data}>
        <XAxis dataKey="day" />
        <Tooltip formatter={(v) => [`${v} min`, 'Duration']} />
        <Line type="monotone" dataKey="length" stroke="#fff" dot={false} />
      </LineChart>
    </div>
  );
}
