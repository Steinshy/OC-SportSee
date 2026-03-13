import {
  MOCK_USER_ACTIVITY,
  MOCK_USER_AVERAGE_SESSIONS,
  MOCK_USER_MAIN_DATA,
  MOCK_USER_PERFORMANCE,
} from '@/data/mockData';
import type { UserId } from '@/types/user';

export const fetchUserFromMock = async (userId: UserId): Promise<unknown> => {
  const data = MOCK_USER_MAIN_DATA.find((user) => user.id === userId);
  if (!data) {
    throw new Error(`User not found: ${userId}`);
  }
  return data;
};

export const fetchUserActivityFromMock = async (
  userId: UserId
): Promise<unknown> => {
  const data = MOCK_USER_ACTIVITY.find(
    (activity) => activity.userId === userId
  );
  if (!data) {
    throw new Error(`Activity not found for user: ${userId}`);
  }
  return data;
};

export const fetchUserAverageSessionsFromMock = async (
  userId: UserId
): Promise<unknown> => {
  const data = MOCK_USER_AVERAGE_SESSIONS.find(
    (sessions) => sessions.userId === userId
  );
  if (!data) {
    throw new Error(`Average sessions not found for user: ${userId}`);
  }
  return data;
};

export const fetchUserPerformanceFromMock = async (
  userId: UserId
): Promise<unknown> => {
  const data = MOCK_USER_PERFORMANCE.find(
    (performance) => performance.userId === userId
  );
  if (!data) {
    throw new Error(`Performance not found for user: ${userId}`);
  }
  return data;
};
