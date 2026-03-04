import axios from 'axios';

import type { ApiUser, UserActivity, UserAverageSessions, UserPerformance } from '@/types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
});

export const getUserInfo = (id: number) =>
  api.get<{ data: ApiUser }>(`/user/${id}`);

export const getUserActivity = (id: number) =>
  api.get<{ data: UserActivity }>(`/user/${id}/activity`);

export const getUserAverageSessions = (id: number) =>
  api.get<{ data: UserAverageSessions }>(`/user/${id}/average-sessions`);

export const getUserPerformance = (id: number) =>
  api.get<{ data: UserPerformance }>(`/user/${id}/performance`);
