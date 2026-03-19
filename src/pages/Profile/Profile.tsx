import { useMemo } from 'react';
import { useLoaderData } from 'react-router';

import {
  ActivityBarChart,
  PerformanceRadarChart,
  ScoreRadialChart,
  SessionLineChart,
} from '@/components/Charts';
import MetricCard from '@/components/MetricCard';
import type { ProfileLoaderData } from '@/loaders/profileLoader';

import './style.css';

export default function Profile() {
  const { user, activity, avgSessions, performance } =
    useLoaderData<ProfileLoaderData>();
  const baseUrl = import.meta.env.BASE_URL;

  const metricCards = useMemo(() => {
    if (!user) return [];
    return [
      {
        label: 'Calories',
        value: user.nutritionData.calorieCount.toLocaleString('en-US'),
        unit: 'kCal',
        icon: `${baseUrl}assets/energy.svg`,
        className: 'metric-card__icon--red',
      },
      {
        label: 'Proteines',
        value: user.nutritionData.proteinCount,
        unit: 'g',
        icon: `${baseUrl}assets/proteines.svg`,
        className: 'metric-card__icon--blue',
      },
      {
        label: 'Glucides',
        value: user.nutritionData.carbohydrateCount,
        unit: 'g',
        icon: `${baseUrl}assets/apple.svg`,
        className: 'metric-card__icon--yellow',
      },
      {
        label: 'Lipides',
        value: user.nutritionData.lipidCount,
        unit: 'g',
        icon: `${baseUrl}assets/lipides.svg`,
        className: 'metric-card__icon--pink',
      },
    ];
  }, [baseUrl, user]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>
          Bonjour <span>{user.userInfos.firstName}</span>
        </h1>
        <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      </header>

      <section className="dashboard-grid">
        <div className="dashboard-grid__charts">
          <ActivityBarChart sessions={activity.sessions} />
          <div className="dashboard-grid__bottom">
            <SessionLineChart sessions={avgSessions.sessions} />
            <PerformanceRadarChart performance={performance} />
            <ScoreRadialChart score={user.score} />
          </div>
        </div>

        <aside className="dashboard-grid__cards">
          {metricCards.map((metric) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              unit={metric.unit}
              icon={
                <span className={`metric-icon ${metric.className}`}>
                  <img src={metric.icon} alt={metric.label} />
                </span>
              }
            />
          ))}
        </aside>
      </section>
    </div>
  );
}
