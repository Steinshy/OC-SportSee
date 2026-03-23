import axios from 'axios';

import type { UserId } from '@/types/user';

/**
 * Axios HTTP client configured for SportSee API communication
 * @type {import('axios').AxiosInstance}
 * @see {@link https://axios-http.com/}
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  validateStatus: (status) => (status >= 200 && status < 300) || status === 404,
});

/**
 * Fetches user profile data from the SportSee API
 * @param {UserId} userId - The unique identifier of the user
 * @returns {Promise<unknown>} Raw user profile data from API
 * @example
 * const userData = await fetchUserFromApi(12);
 */
export const fetchUserFromApi = async (userId: UserId): Promise<unknown> => {
  const response = await apiClient.get(`/user/${userId}`);
  return response.data;
};

/**
 * Fetches user activity data (daily calorie and exercise metrics) from the SportSee API
 * @param {UserId} userId - The unique identifier of the user
 * @returns {Promise<unknown>} Raw activity data from API
 * @example
 * const activityData = await fetchUserActivityFromApi(12);
 */
export const fetchUserActivityFromApi = async (
  userId: UserId
): Promise<unknown> => {
  const response = await apiClient.get(`/user/${userId}/activity`);
  return response.data;
};

/**
 * Fetches user average session duration data from the SportSee API
 * @param {UserId} userId - The unique identifier of the user
 * @returns {Promise<unknown>} Raw average sessions data from API
 * @example
 * const avgSessions = await fetchUserAverageSessionsFromApi(12);
 */
export const fetchUserAverageSessionsFromApi = async (
  userId: UserId
): Promise<unknown> => {
  const response = await apiClient.get(`/user/${userId}/average-sessions`);
  return response.data;
};

/**
 * Fetches user performance data (sport-specific metrics) from the SportSee API
 * @param {UserId} userId - The unique identifier of the user
 * @returns {Promise<unknown>} Raw performance data from API
 * @example
 * const performance = await fetchUserPerformanceFromApi(12);
 */
export const fetchUserPerformanceFromApi = async (
  userId: UserId
): Promise<unknown> => {
  const response = await apiClient.get(`/user/${userId}/performance`);
  return response.data;
};
