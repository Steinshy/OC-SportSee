import axios from 'axios';

import type { UserId } from '@/types/user';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  validateStatus: (status) => (status >= 200 && status < 300) || status === 404,
});

export const fetchUserFromApi = async (userId: UserId): Promise<unknown> => {
  const response = await apiClient.get(`/user/${userId}`);
  return response.data;
};

export const fetchUserActivityFromApi = async (
  userId: UserId
): Promise<unknown> => {
  const response = await apiClient.get(`/user/${userId}/activity`);
  return response.data;
};

export const fetchUserAverageSessionsFromApi = async (
  userId: UserId
): Promise<unknown> => {
  const response = await apiClient.get(`/user/${userId}/average-sessions`);
  return response.data;
};

export const fetchUserPerformanceFromApi = async (
  userId: UserId
): Promise<unknown> => {
  const response = await apiClient.get(`/user/${userId}/performance`);
  return response.data;
};
