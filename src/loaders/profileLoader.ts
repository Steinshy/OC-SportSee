import { LoaderFunctionArgs } from 'react-router';

import {
  getUser,
  getUserActivity,
  getUserAverageSessions,
  getUserPerformance,
} from '@/client/client';
import type {
  UserActivity,
  UserAverageSessions,
  UserMainData,
  UserPerformance,
} from '@/types/user';

export type ProfileLoaderData = {
  user: UserMainData;
  activity: UserActivity;
  avgSessions: UserAverageSessions;
  performance: UserPerformance;
};

export async function profileLoader({
  params,
}: LoaderFunctionArgs): Promise<ProfileLoaderData> {
  const userId = params.id ?? '18';

  const [user, activity, avgSessions, performance] = await Promise.all([
    getUser(userId),
    getUserActivity(userId),
    getUserAverageSessions(userId),
    getUserPerformance(userId),
  ]);

  return { user, activity, avgSessions, performance };
}
