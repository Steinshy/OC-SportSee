import { MOCK_USER_ACTIVITY, MOCK_USER_AVERAGE_SESSIONS, MOCK_USER_MAIN_DATA, MOCK_USER_PERFORMANCE } from '@/data/mockData';
import type { UserId } from '@/types/user';

/**
 * Fetches mock user profile data from the in-memory mock data store
 * @param userId - The unique identifier of the user
 * @throws {Error} If the user ID is not found in mock data
 */
export const fetchUserFromMock = async (userId: UserId): Promise<unknown> => {
  const data = MOCK_USER_MAIN_DATA.find((user) => user.id === userId);
  if (!data) {
    throw new Error(`User not found: ${userId}`);
  }
  return data;
};

/**
 * Fetches mock daily activity data from the in-memory mock data store
 * @param userId - The unique identifier of the user
 * @throws {Error} If no activity data exists for the user ID
 */
export const fetchUserActivityFromMock = async (userId: UserId): Promise<unknown> => {
  const data = MOCK_USER_ACTIVITY.find((activity) => activity.userId === userId);
  if (!data) {
    throw new Error(`Activity not found for user: ${userId}`);
  }
  return data;
};

/**
 * Fetches mock average session durations from the in-memory mock data store
 * @param userId - The unique identifier of the user
 * @throws {Error} If no average sessions data exists for the user ID
 */
export const fetchUserAverageSessionsFromMock = async (userId: UserId): Promise<unknown> => {
  const data = MOCK_USER_AVERAGE_SESSIONS.find((sessions) => sessions.userId === userId);
  if (!data) {
    throw new Error(`Average sessions not found for user: ${userId}`);
  }
  return data;
};

/**
 * Fetches mock performance data from the in-memory mock data store
 * @param userId - The unique identifier of the user
 * @throws {Error} If no performance data exists for the user ID
 */
export const fetchUserPerformanceFromMock = async (userId: UserId): Promise<unknown> => {
  const data = MOCK_USER_PERFORMANCE.find((performance) => performance.userId === userId);
  if (!data) {
    throw new Error(`Performance not found for user: ${userId}`);
  }
  return data;
};
