import { fetchUserActivityFromApi, fetchUserAverageSessionsFromApi, fetchUserFromApi, fetchUserPerformanceFromApi } from '@/client/apiClient';
import { buildUserActivity, buildUserAverageSessions, buildUserMainData, buildUserPerformance } from '@/client/builders';
import { fetchUserActivityFromMock, fetchUserAverageSessionsFromMock, fetchUserFromMock, fetchUserPerformanceFromMock } from '@/client/mockClient';
import { USE_API } from '@/config/env';
import type { DataType, UserActivity, UserAverageSessions, UserMainData, UserPerformance, UserId } from '@/types/user';

/**
 * Internal result type for data fetching with source information
 * @typedef {Object} SourceResult
 * @property {DataType} dataType - Indicates whether data came from API or mock
 * @property {unknown} data - The raw data returned from the source
 * @private
 */
type SourceResult = {
  dataType: DataType;
  data: unknown;
};

/**
 * Fetches user profile data from either API or mock source based on environment config
 * @param {UserId} userId - The unique identifier of the user
 * @returns {Promise<SourceResult>} Promise with data and source type
 * @private
 */
const fetchUser = async (userId: UserId): Promise<SourceResult> => {
  if (USE_API) {
    return { dataType: 'api', data: await fetchUserFromApi(userId) };
  }
  return { dataType: 'mock', data: await fetchUserFromMock(userId) };
};

/**
 * Fetches user activity data from either API or mock source based on environment config
 * @param {UserId} userId - The unique identifier of the user
 * @returns {Promise<SourceResult>} Promise with activity data and source type
 * @private
 */
const fetchUserActivity = async (userId: UserId): Promise<SourceResult> => {
  if (USE_API) {
    return { dataType: 'api', data: await fetchUserActivityFromApi(userId) };
  }
  return { dataType: 'mock', data: await fetchUserActivityFromMock(userId) };
};

/**
 * Fetches user average sessions data from either API or mock source based on environment config
 * @param {UserId} userId - The unique identifier of the user
 * @returns {Promise<SourceResult>} Promise with average sessions data and source type
 * @private
 */
const fetchUserAverageSessions = async (userId: UserId): Promise<SourceResult> => {
  if (USE_API) {
    return {
      dataType: 'api',
      data: await fetchUserAverageSessionsFromApi(userId),
    };
  }
  return {
    dataType: 'mock',
    data: await fetchUserAverageSessionsFromMock(userId),
  };
};

/**
 * Fetches user performance data from either API or mock source based on environment config
 * @param {UserId} userId - The unique identifier of the user
 * @returns {Promise<SourceResult>} Promise with performance data and source type
 * @private
 */
const fetchUserPerformance = async (userId: UserId): Promise<SourceResult> => {
  if (USE_API) {
    return {
      dataType: 'api',
      data: await fetchUserPerformanceFromApi(userId),
    };
  }
  return { dataType: 'mock', data: await fetchUserPerformanceFromMock(userId) };
};

/**
 * Client-side API: Fetch and transform user data in a single call
 * Automatically handles validation, normalization, and API/mock source selection
 */
/**
 * Retrieves and validates user profile data (main dashboard data)
 *
 * Fetches from API or mock data based on VITE_USE_API environment variable.
 * Automatically validates and normalizes the response.
 *
 * @param {UserId} userId - The unique identifier of the user
 * @returns {Promise<UserMainData>} Validated user profile with score and nutrition data
 * @throws {Error} If data validation fails or API request fails
 * @example
 * const user = await getUser(12);
 * console.log(user.userInfos.firstName); // e.g., 'Karl'
 * console.log(user.score); // e.g., 50 (percentage)
 */
export const getUser = async (userId: UserId): Promise<UserMainData> => {
  const { data, dataType } = await fetchUser(userId);
  return buildUserMainData(data, dataType);
};

/**
 * Retrieves user daily activity data (weight and calorie metrics)
 *
 * Fetches from API or mock data based on VITE_USE_API environment variable.
 * Returns validated daily sessions with weight and calorie information.
 *
 * @param {UserId} userId - The unique identifier of the user
 * @returns {Promise<UserActivity>} User's daily activity sessions with metrics
 * @throws {Error} If data validation fails or API request fails
 * @example
 * const activity = await getUserActivity(12);
 * activity.sessions.forEach(session => {
 *   console.log(`${session.day}: ${session.kilogram}kg, ${session.calories} cal`);
 * });
 */
export const getUserActivity = async (userId: UserId): Promise<UserActivity> => {
  const { data, dataType } = await fetchUserActivity(userId);
  return buildUserActivity(data, dataType);
};

/**
 * Retrieves user weekly average session duration data
 *
 * Fetches from API or mock data based on VITE_USE_API environment variable.
 * Returns average session length for each day of the week.
 *
 * @param {UserId} userId - The unique identifier of the user
 * @returns {Promise<UserAverageSessions>} User's weekly average session durations
 * @throws {Error} If data validation fails or API request fails
 * @example
 * const avgSessions = await getUserAverageSessions(12);
 * avgSessions.sessions.forEach(session => {
 *   console.log(`Day ${session.day}: ${session.sessionLength} min average`);
 * });
 */
export const getUserAverageSessions = async (userId: UserId): Promise<UserAverageSessions> => {
  const { data, dataType } = await fetchUserAverageSessions(userId);
  return buildUserAverageSessions(data, dataType);
};

/**
 * Retrieves user sport-specific performance data
 *
 * Fetches from API or mock data based on VITE_USE_API environment variable.
 * Returns performance metrics for various sports categories (cardio, energy, etc.).
 *
 * @param {UserId} userId - The unique identifier of the user
 * @returns {Promise<UserPerformance>} User's performance metrics with category labels
 * @throws {Error} If data validation fails or API request fails
 * @example
 * const performance = await getUserPerformance(12);
 * console.log(performance.categories); // e.g., { 0: 'Cardio', 1: 'Energy', ... }
 * performance.data.forEach(metric => {
 *   console.log(`Type ${metric.type}: ${metric.value}`);
 * });
 */
export const getUserPerformance = async (userId: UserId): Promise<UserPerformance> => {
  const { data, dataType } = await fetchUserPerformance(userId);
  return buildUserPerformance(data, dataType);
};
