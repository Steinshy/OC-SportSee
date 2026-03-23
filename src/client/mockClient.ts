import {
  MOCK_USER_ACTIVITY,
  MOCK_USER_AVERAGE_SESSIONS,
  MOCK_USER_MAIN_DATA,
  MOCK_USER_PERFORMANCE,
} from '@/data/mockData';
import type { UserId } from '@/types/user';

/**
 * Fetches mock user profile data from the in-memory mock data store
 *
 * Used for development and testing when API is unavailable.
 * Returns pre-configured mock data for testing purposes.
 *
 * @param {UserId} userId - The unique identifier of the user
 * @returns {Promise<unknown>} Mock user profile data
 * @throws {Error} If user ID is not found in mock data
 * @example
 * const mockUser = await fetchUserFromMock(12);
 */
export const fetchUserFromMock = async (userId: UserId): Promise<unknown> => {
  const data = MOCK_USER_MAIN_DATA.find((user) => user.id === userId);
  if (!data) {
    throw new Error(`User not found: ${userId}`);
  }
  return data;
};

/**
 * Fetches mock user activity data from the in-memory mock data store
 *
 * Used for development and testing when API is unavailable.
 * Returns pre-configured daily activity metrics for testing.
 *
 * @param {UserId} userId - The unique identifier of the user
 * @returns {Promise<unknown>} Mock activity data with daily sessions
 * @throws {Error} If activity data is not found for the user ID
 * @example
 * const mockActivity = await fetchUserActivityFromMock(12);
 */
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

/**
 * Fetches mock user average sessions data from the in-memory mock data store
 *
 * Used for development and testing when API is unavailable.
 * Returns pre-configured weekly average session durations for testing.
 *
 * @param {UserId} userId - The unique identifier of the user
 * @returns {Promise<unknown>} Mock average sessions data
 * @throws {Error} If average sessions data is not found for the user ID
 * @example
 * const mockAvgSessions = await fetchUserAverageSessionsFromMock(12);
 */
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

/**
 * Fetches mock user performance data from the in-memory mock data store
 *
 * Used for development and testing when API is unavailable.
 * Returns pre-configured sport performance metrics for testing.
 *
 * @param {UserId} userId - The unique identifier of the user
 * @returns {Promise<unknown>} Mock performance data with sport metrics
 * @throws {Error} If performance data is not found for the user ID
 * @example
 * const mockPerformance = await fetchUserPerformanceFromMock(12);
 */
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
