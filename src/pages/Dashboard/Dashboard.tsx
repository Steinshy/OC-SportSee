import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';

import {
  getUser,
  getUserActivity,
  getUserAverageSessions,
  getUserPerformance,
} from '@/client/client';
import {
  ActivityBarChart,
  PerformanceRadarChart,
  ScoreRadialChart,
  SessionLineChart,
} from '@/components/Charts';
import MetricCard from '@/components/MetricCard';
import type {
  UserActivity,
  UserAverageSessions,
  UserMainData,
  UserPerformance,
} from '@/types/user';

import './style.css';

export default function Dashboard() {
  const { id } = useParams<{ id: string }>();
  const userId = id ?? '12';
  const [user, setUser] = useState<UserMainData | null>(null);
  const [activity, setActivity] = useState<UserActivity | null>(null);
  const [avgSessions, setAvgSessions] = useState<UserAverageSessions | null>(
    null
  );
  const [performance, setPerformance] = useState<UserPerformance | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      getUser(userId),
      getUserActivity(userId),
      getUserAverageSessions(userId),
      getUserPerformance(userId),
    ])
      .then(([user, activity, avgSessions, performance]) => {
        setUser(user);
        setActivity(activity);
        setAvgSessions(avgSessions);
        setPerformance(performance);
        setError(null);
        console.log({ user, activity, avgSessions, performance });
      })
      .catch((error: unknown) => {
        setError('Impossible de charger les donnees utilisateur.');
        console.error('Dashboard data error:', error);
      });
  }, [userId]);

  const metricCards = useMemo(() => {
    if (!user) return [];
    return [
      {
        label: 'Calories',
        value: user.nutritionData.calorieCount.toLocaleString('en-US'),
        unit: 'kCal',
        icon: '/assets/energy.svg',
        className: 'metric-card__icon--red',
      },
      {
        label: 'Proteines',
        value: user.nutritionData.proteinCount,
        unit: 'g',
        icon: '/assets/proteines.svg',
        className: 'metric-card__icon--blue',
      },
      {
        label: 'Glucides',
        value: user.nutritionData.carbohydrateCount,
        unit: 'g',
        icon: '/assets/apple.svg',
        className: 'metric-card__icon--yellow',
      },
      {
        label: 'Lipides',
        value: user.nutritionData.lipidCount,
        unit: 'g',
        icon: '/assets/lipides.svg',
        className: 'metric-card__icon--pink',
      },
    ];
  }, [user]);

  if (error) {
    return <div className="dashboard dashboard--error">{error}</div>;
  }

  if (!user || !activity || !avgSessions || !performance) {
    return <div className="dashboard">Chargement...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>
          Bonjour <span>{user.userInfos.firstName}</span>
        </h1>
        <p>Felicitations ! Vous avez explose vos objectifs hier 👏</p>
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
