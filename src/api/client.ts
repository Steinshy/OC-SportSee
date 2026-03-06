import axios from 'axios';

import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from '@/data/data';
import {
  ensureArray,
  ensureExists,
  ensureNumber,
  ensureScore,
  ensureString,
} from '@/helpers/validator';
import type {
  AverageSession,
  ActivitySession,
  ApiResponse,
  PerformanceData,
  UserActivity,
  UserAverageSessions,
  UserMainData,
  UserPerformance,
  UserId,
} from '@/types';

// Configuration
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

// ============================================================================
// FETCH LAYER - Get data from API
// ============================================================================

const fetchUser = async (userId: UserId): Promise<ApiResponse> => {
  if (USE_MOCK_DATA) {
    const mockData = USER_MAIN_DATA.find((user) => user.id === userId);
    if (!mockData) {
      throw new Error(`User ${userId} not found in mock data`);
    }
    // Transform keyData to nutritionData for consistency with API
    const { keyData, ...rest } = mockData;
    return {
      ...rest,
      nutritionData: keyData,
    };
  }

  try {
    const response = await apiClient.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw error;
    }
    throw new Error(`Failed to fetch user ${userId}: ${error}`);
  }
};

const fetchUserActivity = async (userId: UserId): Promise<UserActivity> => {
  if (USE_MOCK_DATA) {
    const mockData = USER_ACTIVITY.find(
      (activity) => activity.userId === userId
    );
    if (!mockData) {
      throw new Error(`Activity for user ${userId} not found in mock data`);
    }
    return mockData;
  }

  try {
    const response = await apiClient.get(`/user/${userId}/activity`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw error;
    }
    throw new Error(`Failed to fetch activity for user ${userId}: ${error}`);
  }
};

const fetchUserAverageSessions = async (
  userId: UserId
): Promise<UserAverageSessions> => {
  if (USE_MOCK_DATA) {
    const mockData = USER_AVERAGE_SESSIONS.find(
      (sessions) => sessions.userId === userId
    );
    if (!mockData) {
      throw new Error(
        `Average sessions for user ${userId} not found in mock data`
      );
    }
    return mockData;
  }

  try {
    const response = await apiClient.get(`/user/${userId}/average-sessions`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw error;
    }
    throw new Error(
      `Failed to fetch average sessions for user ${userId}: ${error}`
    );
  }
};

const fetchUserPerformance = async (
  userId: UserId
): Promise<UserPerformance> => {
  if (USE_MOCK_DATA) {
    const mockData = USER_PERFORMANCE.find((perf) => perf.userId === userId);
    if (!mockData) {
      throw new Error(`Performance for user ${userId} not found in mock data`);
    }
    return {
      userId: mockData.userId,
      categories: mockData.kind,
      data: mockData.data.map((item) => ({
        value: item.value,
        type: item.kind,
      })),
    };
  }

  try {
    const response = await apiClient.get(`/user/${userId}/performance`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw error;
    }
    throw new Error(`Failed to fetch performance for user ${userId}: ${error}`);
  }
};

// ============================================================================
// BUILD LAYER - Transform and validate API data
// ============================================================================

const buildUser = (apiUser: ApiResponse): UserMainData => {
  const userInfos = apiUser.userInfos || {};
  const nutritionData = apiUser.nutritionData || {};

  // Validate required fields
  const id = ensureNumber(ensureExists(apiUser.id, 'id'));
  const firstName = ensureString(
    ensureExists(userInfos.firstName, 'userInfos.firstName')
  );
  const lastName = ensureString(
    ensureExists(userInfos.lastName, 'userInfos.lastName')
  );
  const age = ensureNumber(
    ensureExists(userInfos.age, 'userInfos.age'),
    0,
    150
  );

  // Normalize score field (todayScore OR score)
  const scoreValue = apiUser.todayScore ?? apiUser.score;
  const score = ensureScore(ensureExists(scoreValue, 'score'));

  // Validate nutrition data
  const calorieCount = ensureNumber(
    ensureExists(nutritionData.calorieCount, 'nutritionData.calorieCount'),
    0
  );
  const proteinCount = ensureNumber(
    ensureExists(nutritionData.proteinCount, 'nutritionData.proteinCount'),
    0
  );
  const carbohydrateCount = ensureNumber(
    ensureExists(
      nutritionData.carbohydrateCount,
      'nutritionData.carbohydrateCount'
    ),
    0
  );
  const lipidCount = ensureNumber(
    ensureExists(nutritionData.lipidCount, 'nutritionData.lipidCount'),
    0
  );

  return {
    id,
    userInfos: { firstName, lastName, age },
    score,
    nutritionData: {
      calorieCount,
      proteinCount,
      carbohydrateCount,
      lipidCount,
    },
  };
};

const buildActivity = (apiActivity: UserActivity): UserActivity => {
  const sessions = ensureArray<ActivitySession>(apiActivity.sessions);

  const validatedSessions = sessions.map((session) => ({
    day: ensureString(ensureExists(session.day, 'session.day')),
    kilogram: ensureNumber(
      ensureExists(session.kilogram, 'session.kilogram'),
      0,
      500
    ),
    calories: ensureNumber(
      ensureExists(session.calories, 'session.calories'),
      0,
      5000
    ),
  }));

  return {
    userId: ensureNumber(ensureExists(apiActivity.userId, 'userId'), 0, 99999),
    sessions: validatedSessions,
  };
};

const buildAverageSessions = (
  apiData: UserAverageSessions
): UserAverageSessions => {
  const sessions = ensureArray<AverageSession>(apiData.sessions);

  const validatedSessions = sessions.map((session) => ({
    day: ensureNumber(ensureExists(session.day, 'session.day'), 1, 7),
    sessionLength: ensureNumber(
      ensureExists(session.sessionLength, 'session.sessionLength'),
      0,
      300
    ),
  }));

  return {
    userId: ensureNumber(ensureExists(apiData.userId, 'userId'), 0, 99999),
    sessions: validatedSessions,
  };
};

const buildPerformance = (apiData: UserPerformance): UserPerformance => {
  const data = ensureArray<PerformanceData>(apiData.data);

  const validatedData = data.map((item) => ({
    value: ensureNumber(ensureExists(item.value, 'data.value'), 0, 1000),
    type: ensureNumber(ensureExists(item.type, 'data.type'), 1, 6),
  }));

  return {
    userId: ensureNumber(ensureExists(apiData.userId, 'userId'), 0, 99999),
    categories: apiData.categories || {
      1: 'cardio',
      2: 'energy',
      3: 'endurance',
      4: 'strength',
      5: 'speed',
      6: 'intensity',
    },
    data: validatedData,
  };
};

// ============================================================================
// PUBLIC API - Fetch and transform in one call
// ============================================================================

export const getUser = async (userId: UserId): Promise<UserMainData> => {
  const apiUser = await fetchUser(userId);
  return buildUser(apiUser);
};

export const getUserActivity = async (
  userId: UserId
): Promise<UserActivity> => {
  const apiActivity = await fetchUserActivity(userId);
  return buildActivity(apiActivity);
};

export const getUserAverageSessions = async (
  userId: UserId
): Promise<UserAverageSessions> => {
  const apiData = await fetchUserAverageSessions(userId);
  return buildAverageSessions(apiData);
};

export const getUserPerformance = async (
  userId: UserId
): Promise<UserPerformance> => {
  const apiData = await fetchUserPerformance(userId);
  return buildPerformance(apiData);
};
