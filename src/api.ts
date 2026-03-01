import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '',
});

export const getUser = (id: number) =>
  api.get<{ data: unknown }>(`/user/${id}`).then((res) => res.data);

export const getUserActivity = (id: number) =>
  api.get<{ data: unknown }>(`/user/${id}/activity`).then((res) => res.data);

export const getUserAverageSessions = (id: number) =>
  api
    .get<{ data: unknown }>(`/user/${id}/average-sessions`)
    .then((res) => res.data);

export const getUserPerformance = (id: number) =>
  api.get<{ data: unknown }>(`/user/${id}/performance`).then((res) => res.data);
