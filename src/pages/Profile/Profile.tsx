import { lazy, Suspense, useMemo } from 'react';
import { useLoaderData } from 'react-router';

import MetricCard from '@/components/MetricCard';
import type { ProfileLoaderData } from '@/loaders/profileLoader';

const ActivityBarChart = lazy(
  () => import('@/components/Charts/ActivityBarChart')
);
const PerformanceRadarChart = lazy(
  () => import('@/components/Charts/PerformanceRadarChart')
);
const ScoreRadialChart = lazy(
  () => import('@/components/Charts/ScoreRadialChart')
);
const SessionLineChart = lazy(
  () => import('@/components/Charts/SessionLineChart')
);

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
          <Suspense
            fallback={<div className="chart-skeleton chart-card--activity" />}
          >
            <ActivityBarChart sessions={activity.sessions} />
          </Suspense>
          <div className="dashboard-grid__bottom">
            <Suspense fallback={<div className="chart-skeleton chart-card" />}>
              <SessionLineChart sessions={avgSessions.sessions} />
            </Suspense>
            <Suspense fallback={<div className="chart-skeleton chart-card" />}>
              <PerformanceRadarChart performance={performance} />
            </Suspense>
            <Suspense fallback={<div className="chart-skeleton chart-card" />}>
              <ScoreRadialChart score={user.score} />
            </Suspense>
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
