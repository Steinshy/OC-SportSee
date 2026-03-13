// Global userId reusable
export type UserId = string;
export type DataType = 'api' | 'mock';

// User main data
export interface UserMainData {
  id: UserId;
  dataType?: DataType;
  userInfos: {
    firstName: string;
    lastName: string;
    age: number;
  };
  score: number;
  nutritionData: {
    calorieCount: number;
    proteinCount: number;
    carbohydrateCount: number;
    lipidCount: number;
  };
}

// User Activity Data
export interface UserActivity {
  userId: UserId;
  dataType?: DataType;
  sessions: ActivitySession[];
}

// Activity Session Interface
export interface ActivitySession {
  day: string;
  kilogram: number;
  calories: number;
}

// User Average Session Data
export interface UserAverageSessions {
  userId: UserId;
  dataType?: DataType;
  sessions: AverageSession[];
}

// Average Session Interface
export interface AverageSession {
  day: number;
  sessionLength: number;
}

// User Performance Data
export interface UserPerformance {
  userId: UserId;
  dataType?: DataType;
  categories: Record<number, string>;
  data: PerformanceData[];
}

// Performance Data Interface
export interface PerformanceData {
  value: number;
  type: number;
}
