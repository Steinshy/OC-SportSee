import {
  fetchUserActivityFromApi,
  fetchUserAverageSessionsFromApi,
  fetchUserFromApi,
  fetchUserPerformanceFromApi,
} from '@/client/apiClient';
import {
  buildUserActivity,
  buildUserAverageSessions,
  buildUserMainData,
  buildUserPerformance,
} from '@/client/builders';
import {
  fetchUserActivityFromMock,
  fetchUserAverageSessionsFromMock,
  fetchUserFromMock,
  fetchUserPerformanceFromMock,
} from '@/client/mockClient';
import type {
  DataType,
  UserActivity,
  UserAverageSessions,
  UserMainData,
  UserPerformance,
  UserId,
} from '@/types/user';

const USE_API = import.meta.env.VITE_USE_API === 'true';
type SourceResult = {
  dataType: DataType;
  data: unknown;
};

const fetchUser = async (userId: UserId): Promise<SourceResult> => {
  if (USE_API) {
    return { dataType: 'api', data: await fetchUserFromApi(userId) };
  }
  return { dataType: 'mock', data: await fetchUserFromMock(userId) };
};

const fetchUserActivity = async (userId: UserId): Promise<SourceResult> => {
  if (USE_API) {
    return { dataType: 'api', data: await fetchUserActivityFromApi(userId) };
  }
  return { dataType: 'mock', data: await fetchUserActivityFromMock(userId) };
};

const fetchUserAverageSessions = async (
  userId: UserId
): Promise<SourceResult> => {
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

const fetchUserPerformance = async (userId: UserId): Promise<SourceResult> => {
  if (USE_API) {
    return {
      dataType: 'api',
      data: await fetchUserPerformanceFromApi(userId),
    };
  }
  return { dataType: 'mock', data: await fetchUserPerformanceFromMock(userId) };
};

// Client Side - Fetch and transform in one call
export const getUser = async (userId: UserId): Promise<UserMainData> => {
  const { data, dataType } = await fetchUser(userId);
  return buildUserMainData(data, dataType);
};

export const getUserActivity = async (
  userId: UserId
): Promise<UserActivity> => {
  const { data, dataType } = await fetchUserActivity(userId);
  return buildUserActivity(data, dataType);
};

export const getUserAverageSessions = async (
  userId: UserId
): Promise<UserAverageSessions> => {
  const { data, dataType } = await fetchUserAverageSessions(userId);
  return buildUserAverageSessions(data, dataType);
};

export const getUserPerformance = async (
  userId: UserId
): Promise<UserPerformance> => {
  const { data, dataType } = await fetchUserPerformance(userId);
  return buildUserPerformance(data, dataType);
};
