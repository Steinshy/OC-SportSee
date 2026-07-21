import { LoaderFunctionArgs } from 'react-router';

import { getUser, getUserActivity, getUserAverageSessions, getUserPerformance } from '@/client/client';
import type { UserActivity, UserAverageSessions, UserMainData, UserPerformance } from '@/types/user';

export type ProfileLoaderData = {
  user: UserMainData | null;
  activity: UserActivity | null;
  avgSessions: UserAverageSessions | null;
  performance: UserPerformance | null;
};

const DEFAULT_USER_ID = '18';

export async function profileLoader({ params }: LoaderFunctionArgs): Promise<ProfileLoaderData> {
  const userId = params.id ?? DEFAULT_USER_ID;

  const results = await Promise.allSettled([getUser(userId), getUserActivity(userId), getUserAverageSessions(userId), getUserPerformance(userId)]);

  return {
    user: results[0].status === 'fulfilled' ? results[0].value : null,
    activity: results[1].status === 'fulfilled' ? results[1].value : null,
    avgSessions: results[2].status === 'fulfilled' ? results[2].value : null,
    performance: results[3].status === 'fulfilled' ? results[3].value : null,
  };
}
