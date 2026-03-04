/**
 * User ID type alias for consistency across interfaces
 */
export type UserId = number;

/**
 * User main data (profile, scores, key metrics)
 */
export interface UserMainData {
  id: UserId;
  userInfos: {
    firstName: string;
    lastName: string;
    age: number;
  };
  score: number; // 0-1, normalized from todayScore or score
  nutritionData: {
    calorieCount: number;
    proteinCount: number;
    carbohydrateCount: number;
    lipidCount: number;
  };
}

/**
 * Single activity session (weight + calories)
 */
export interface ActivitySession {
  day: string; // ISO date "2020-07-01"
  kilogram: number;
  calories: number;
}

/**
 * User activity data
 */
export interface UserActivity {
  userId: UserId;
  sessions: ActivitySession[];
}

/**
 * Single average session
 */
export interface AverageSession {
  day: number; // 1-7 (Mon-Sun)
  sessionLength: number; // minutes
}

/**
 * User average sessions
 */
export interface UserAverageSessions {
  userId: UserId;
  sessions: AverageSession[];
}

/**
 * Performance data point
 */
export interface PerformanceData {
  value: number;
  type: number; // 1-6, maps to category
}

/**
 * User performance (radar chart data)
 */
export interface UserPerformance {
  userId: UserId;
  categories: {
    1: string; // 'cardio'
    2: string; // 'energy'
    3: string; // 'endurance'
    4: string; // 'strength'
    5: string; // 'speed'
    6: string; // 'intensity'
  };
  data: PerformanceData[];
}

/**
 * API response types (before transformation)
 * Some fields may be undefined or in different formats
 */
export interface ApiResponse {
  id?: UserId;
  userInfos?: {
    firstName?: string;
    lastName?: string;
    age?: number;
  };
  todayScore?: number | string;
  score?: number | string;
  nutritionData?: {
    calorieCount?: number | string;
    proteinCount?: number | string;
    carbohydrateCount?: number | string;
    lipidCount?: number | string;
  };
}
