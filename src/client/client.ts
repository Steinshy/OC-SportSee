import { fetchUserActivityFromApi, fetchUserAverageSessionsFromApi, fetchUserFromApi, fetchUserPerformanceFromApi } from '@/client/apiClient';
import { buildUserActivity, buildUserAverageSessions, buildUserMainData, buildUserPerformance } from '@/client/builders';
import { fetchUserActivityFromMock, fetchUserAverageSessionsFromMock, fetchUserFromMock, fetchUserPerformanceFromMock } from '@/client/mockClient';
import { USE_API } from '@/config/env';
import type { DataType, UserActivity, UserAverageSessions, UserMainData, UserPerformance, UserId } from '@/types/user';

type Fetcher = (userId: UserId) => Promise<unknown>;

/** Active data source, selected once from the VITE_USE_API environment variable */
const dataType: DataType = USE_API ? 'api' : 'mock';

/** Picks the API or mock fetcher matching the active data source */
const pick = (api: Fetcher, mock: Fetcher): Fetcher => (USE_API ? api : mock);

/**
 * Retrieves and validates user profile data (score, user infos, nutrition)
 * @param userId - The unique identifier of the user
 * @throws {Error} If the request fails or data validation fails
 */
export const getUser = async (userId: UserId): Promise<UserMainData> => buildUserMainData(await pick(fetchUserFromApi, fetchUserFromMock)(userId), dataType);

/**
 * Retrieves user daily activity data (weight and calories per day)
 * @param userId - The unique identifier of the user
 * @throws {Error} If the request fails or data validation fails
 */
export const getUserActivity = async (userId: UserId): Promise<UserActivity> => buildUserActivity(await pick(fetchUserActivityFromApi, fetchUserActivityFromMock)(userId), dataType);

/**
 * Retrieves user weekly average session durations
 * @param userId - The unique identifier of the user
 * @throws {Error} If the request fails or data validation fails
 */
export const getUserAverageSessions = async (userId: UserId): Promise<UserAverageSessions> =>
  buildUserAverageSessions(await pick(fetchUserAverageSessionsFromApi, fetchUserAverageSessionsFromMock)(userId), dataType);

/**
 * Retrieves user sport-specific performance metrics (cardio, energy, endurance…)
 * @param userId - The unique identifier of the user
 * @throws {Error} If the request fails or data validation fails
 */
export const getUserPerformance = async (userId: UserId): Promise<UserPerformance> => buildUserPerformance(await pick(fetchUserPerformanceFromApi, fetchUserPerformanceFromMock)(userId), dataType);
