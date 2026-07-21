import axios from 'axios';

import { API_URL } from '@/config/env';
import type { UserId } from '@/types/user';

/**
 * Axios HTTP client configured for SportSee API communication
 * @see {@link https://axios-http.com/}
 */
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  validateStatus: (status) => (status >= 200 && status < 300) || status === 404,
});

/**
 * Fetches raw user profile data from `GET /user/:id`
 * @param userId - The unique identifier of the user
 */
export const fetchUserFromApi = async (userId: UserId): Promise<unknown> => {
  const response = await apiClient.get(`/user/${userId}`);
  return response.data;
};

/**
 * Fetches raw daily activity data from `GET /user/:id/activity`
 * @param userId - The unique identifier of the user
 */
export const fetchUserActivityFromApi = async (userId: UserId): Promise<unknown> => {
  const response = await apiClient.get(`/user/${userId}/activity`);
  return response.data;
};

/**
 * Fetches raw average session durations from `GET /user/:id/average-sessions`
 * @param userId - The unique identifier of the user
 */
export const fetchUserAverageSessionsFromApi = async (userId: UserId): Promise<unknown> => {
  const response = await apiClient.get(`/user/${userId}/average-sessions`);
  return response.data;
};

/**
 * Fetches raw performance data from `GET /user/:id/performance`
 * @param userId - The unique identifier of the user
 */
export const fetchUserPerformanceFromApi = async (userId: UserId): Promise<unknown> => {
  const response = await apiClient.get(`/user/${userId}/performance`);
  return response.data;
};
