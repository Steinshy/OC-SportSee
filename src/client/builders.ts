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

const unwrapPayload = (value: unknown): Record<string, unknown> => {
  if (!isRecord(value)) {
    throw new Error('Invalid user data: expected an object');
  }
  if (isRecord(value.data)) {
    return value.data;
  }
  return value;
};

const ensureUserId = (value: unknown): string => {
  if (typeof value === 'number') {
    return String(value);
  }
  return ensureString(value);
};

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
