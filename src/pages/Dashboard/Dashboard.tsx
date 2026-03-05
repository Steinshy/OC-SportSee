import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import {
  getUser,
  getUserActivity,
  getUserAverageSessions,
  getUserPerformance,
} from '@/api/client';
import {
  ActivityBarChart,
  PerformanceRadarChart,
  ScoreRadialChart,
  SessionLineChart,
} from '@/components/Charts';
import MetricCard from '@/components/MetricCard';

import './style.css';
export default function Dashboard() {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const [content, setContent] = useState<React.ReactNode>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const [user, activity, averageSessions, performance] =
          await Promise.all([
            getUser(userId),
            getUserActivity(userId),
            getUserAverageSessions(userId),
            getUserPerformance(userId),
          ]);

        if (cancelled) return;

        const { nutritionData } = user;

        setContent(
          <div>
            <h1>Hello {user.userInfos.firstName}!</h1>

            <ActivityBarChart sessions={activity.sessions} />

            <div className="dashboard__charts">
              <SessionLineChart sessions={averageSessions.sessions} />
              <PerformanceRadarChart performance={performance} />
              <ScoreRadialChart score={user.score} />
            </div>

            <div className="dashboard__cards">
              <MetricCard
                icon="🔥"
                label="Calories"
                value={nutritionData.calorieCount}
                unit="kCal"
              />
              <MetricCard
                icon="🍗"
                label="Proteins"
                value={nutritionData.proteinCount}
                unit="g"
              />
              <MetricCard
                icon="🍎"
                label="Carbohydrates"
                value={nutritionData.carbohydrateCount}
                unit="g"
              />
              <MetricCard
                icon="🍔"
                label="Lipids"
                value={nutritionData.lipidCount}
                unit="g"
              />
            </div>
          </div>
        );
      } catch (e) {
        if (cancelled) return;
        if (axios.isAxiosError(e) && e.response?.status === 404) {
          setContent(
            <p>
              User {userId} not found. Try <a href="/user/12">user 12</a> or{' '}
              <a href="/user/18">user 18</a>.
            </p>
          );
        } else {
          setContent(<p>An unexpected error occurred.</p>);
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return <div className="dashboard">{content ?? <p>Loading…</p>}</div>;
}
