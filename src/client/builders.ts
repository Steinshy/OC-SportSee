import {
  ensureArray,
  ensureCategories,
  ensureExists,
  ensureNumber,
  ensureString,
  isRecord,
} from '@/helpers/validator';
import type {
  ActivitySession,
  AverageSession,
  DataType,
  UserActivity,
  UserAverageSessions,
  UserMainData,
  UserPerformance,
} from '@/types/user';

/**
 * Extracts the payload from API response, handling both nested and direct data structures
 * @param {unknown} value - The raw API response or payload object
 * @returns {Record<string, unknown>} Extracted payload data
 * @throws {Error} If value is not a valid object
 * @private
 */
const unwrapPayload = (value: unknown): Record<string, unknown> => {
  if (!isRecord(value)) {
    throw new Error('Invalid user data: expected an object');
  }
  if (isRecord(value.data)) {
    return value.data;
  }
  return value;
};

/**
 * Normalizes userId to string, converting numeric IDs if needed
 * @param {unknown} value - The user ID value (string, number, or unknown)
 * @returns {string} The user ID as a string
 * @throws {Error} If value cannot be converted to a valid string
 * @private
 */
const ensureUserId = (value: unknown): string => {
  if (typeof value === 'number') {
    return String(value);
  }
  return ensureString(value);
};

/**
 * Transforms raw API user data into a normalized UserMainData structure
 *
 * Validates and extracts:
 * - User ID (converted to string if numeric)
 * - Daily score (from 'score' or 'todayScore' field)
 * - User information (firstName, lastName, age)
 * - Nutrition data (calories, protein, carbs, lipids)
 *
 * @param {unknown} apiData - Raw user data from API or mock data
 * @param {DataType} dataType - Source of data ('api' or 'mock')
 * @returns {UserMainData} Validated user profile and nutrition information
 * @throws {Error} If any required field is missing or has invalid type
 * @example
 * const userData = buildUserMainData(rawApiData, 'api');
 * // Returns: { id: '12', score: 50, userInfos: {...}, nutritionData: {...}, dataType: 'api' }
 */
export const buildUserMainData = (
  apiData: unknown,
  dataType: DataType
): UserMainData => {
  const payload = unwrapPayload(apiData);

  const id = ensureUserId(ensureExists(payload.id));
  const score = ensureNumber(ensureExists(payload.score ?? payload.todayScore));

  const validateUserInfos = (userInfos: unknown) => {
    if (!isRecord(userInfos)) {
      throw new Error('Invalid user infos: expected an object');
    }
    const firstName = ensureString(ensureExists(userInfos.firstName));
    const lastName = ensureString(ensureExists(userInfos.lastName));
    const age = ensureNumber(ensureExists(userInfos.age));
    return { firstName, lastName, age };
  };

  const validateNutritionData = (nutritionData: unknown) => {
    if (!isRecord(nutritionData)) {
      throw new Error('Invalid nutrition data: expected an object');
    }
    const calorieCount = ensureNumber(ensureExists(nutritionData.calorieCount));
    const proteinCount = ensureNumber(ensureExists(nutritionData.proteinCount));
    const carbohydrateCount = ensureNumber(
      ensureExists(nutritionData.carbohydrateCount)
    );
    const lipidCount = ensureNumber(ensureExists(nutritionData.lipidCount));
    return { calorieCount, proteinCount, carbohydrateCount, lipidCount };
  };

  return {
    id,
    dataType,
    score,
    userInfos: validateUserInfos(payload.userInfos),
    nutritionData: validateNutritionData(
      payload.nutritionData ?? payload.keyData
    ),
  };
};

/**
 * Transforms raw API activity data into a normalized UserActivity structure
 *
 * Validates and normalizes daily activity sessions with:
 * - Date (formatted as string)
 * - Weight in kilograms
 * - Calories burned
 *
 * @param {unknown} apiData - Raw activity data from API or mock data
 * @param {DataType} dataType - Source of data ('api' or 'mock')
 * @returns {UserActivity} User activity data with validated sessions
 * @throws {Error} If sessions array is missing or contains invalid entries
 * @example
 * const activity = buildUserActivity(rawActivityData, 'api');
 * // Returns: { userId: '12', sessions: [{day: '2024-01-01', kilogram: 80, calories: 300}, ...], dataType: 'api' }
 */
export const buildUserActivity = (
  apiData: unknown,
  dataType: DataType
): UserActivity => {
  const payload = unwrapPayload(apiData);
  const userId = ensureUserId(ensureExists(payload.userId ?? payload.id));
  const validatedSessions = ensureArray<ActivitySession>(
    ensureExists(payload.sessions)
  ).map((session) => ({
    day: ensureString(ensureExists(session.day)),
    kilogram: ensureNumber(ensureExists(session.kilogram)),
    calories: ensureNumber(ensureExists(session.calories)),
  }));

  return {
    userId,
    dataType,
    sessions: validatedSessions,
  };
};

/**
 * Transforms raw API average session data into a normalized UserAverageSessions structure
 *
 * Normalizes weekly average session duration with:
 * - Day of week (0-6, where 0 is Monday for chart display)
 * - Average session length in minutes
 *
 * @param {unknown} apiData - Raw average sessions data from API or mock data
 * @param {DataType} dataType - Source of data ('api' or 'mock')
 * @returns {UserAverageSessions} User's average weekly session durations
 * @throws {Error} If sessions array is missing or contains invalid entries
 * @example
 * const avgSessions = buildUserAverageSessions(rawSessionData, 'api');
 * // Returns: { userId: '12', sessions: [{day: 1, sessionLength: 45}, ...], dataType: 'api' }
 */
export const buildUserAverageSessions = (
  apiData: unknown,
  dataType: DataType
): UserAverageSessions => {
  const payload = unwrapPayload(apiData);
  const userId = ensureUserId(ensureExists(payload.userId ?? payload.id));
  const validatedSessions = ensureArray<AverageSession>(
    ensureExists(payload.sessions)
  ).map((session) => ({
    day: ensureNumber(ensureExists(session.day)),
    sessionLength: ensureNumber(ensureExists(session.sessionLength)),
  }));
  return {
    userId,
    dataType,
    sessions: validatedSessions,
  };
};

/**
 * Transforms raw API performance data into a normalized UserPerformance structure
 *
 * Validates and normalizes sport-specific performance metrics with:
 * - Performance categories (cardio, energy, endurance, etc.)
 * - Metric values and their corresponding type indicators
 *
 * @param {unknown} apiData - Raw performance data from API or mock data
 * @param {DataType} dataType - Source of data ('api' or 'mock')
 * @returns {UserPerformance} User's sport-specific performance metrics
 * @throws {Error} If categories or data array is missing or contains invalid entries
 * @example
 * const performance = buildUserPerformance(rawPerfData, 'api');
 * // Returns: { userId: '12', categories: {0: 'Cardio', ...}, data: [{type: 1, value: 90}, ...], dataType: 'api' }
 */
export const buildUserPerformance = (
  apiData: unknown,
  dataType: DataType
): UserPerformance => {
  const payload = unwrapPayload(apiData);
  const userId = ensureUserId(ensureExists(payload.userId ?? payload.id));
  const categories = ensureCategories(
    ensureExists(payload.categories ?? payload.kind)
  );

  const validatedData = ensureArray(ensureExists(payload.data)).map((item) => {
    if (!isRecord(item)) {
      throw new Error('Invalid performance entry: expected an object');
    }
    return {
      value: ensureNumber(ensureExists(item.value)),
      type: ensureNumber(ensureExists(item.type ?? item.kind)),
    };
  });
  return {
    userId,
    dataType,
    categories,
    data: validatedData,
  };
};
