import type { UserActivity, UserAverageSessions, UserMainData, UserPerformance } from '@/types/user';

export const MOCK_USER_MAIN_DATA: UserMainData[] = [
  {
    id: '12',
    userInfos: {
      firstName: 'Karl',
      lastName: 'Dovineau',
      age: 31,
    },
    score: 0.12,
    nutritionData: {
      calorieCount: 1930,
      proteinCount: 155,
      carbohydrateCount: 290,
      lipidCount: 50,
    },
  },
  {
    id: '18',
    userInfos: {
      firstName: 'Cecilia',
      lastName: 'Ratorez',
      age: 34,
    },
    score: 0.3,
    nutritionData: {
      calorieCount: 2500,
      proteinCount: 90,
      carbohydrateCount: 150,
      lipidCount: 120,
    },
  },
];

export const MOCK_USER_ACTIVITY: UserActivity[] = [
  {
    userId: '12',
    sessions: [
      { day: '2020-07-01', kilogram: 80, calories: 240 },
      { day: '2020-07-02', kilogram: 80, calories: 220 },
      { day: '2020-07-03', kilogram: 81, calories: 280 },
      { day: '2020-07-04', kilogram: 81, calories: 290 },
      { day: '2020-07-05', kilogram: 80, calories: 160 },
      { day: '2020-07-06', kilogram: 78, calories: 162 },
      { day: '2020-07-07', kilogram: 76, calories: 390 },
    ],
  },
  {
    userId: '18',
    sessions: [
      { day: '2020-07-01', kilogram: 70, calories: 240 },
      { day: '2020-07-02', kilogram: 69, calories: 220 },
      { day: '2020-07-03', kilogram: 70, calories: 280 },
      { day: '2020-07-04', kilogram: 70, calories: 500 },
      { day: '2020-07-05', kilogram: 69, calories: 160 },
      { day: '2020-07-06', kilogram: 69, calories: 162 },
      { day: '2020-07-07', kilogram: 69, calories: 390 },
    ],
  },
];

export const MOCK_USER_AVERAGE_SESSIONS: UserAverageSessions[] = [
  {
    userId: '12',
    sessions: [
      { day: 1, sessionLength: 30 },
      { day: 2, sessionLength: 23 },
      { day: 3, sessionLength: 45 },
      { day: 4, sessionLength: 50 },
      { day: 5, sessionLength: 0 },
      { day: 6, sessionLength: 0 },
      { day: 7, sessionLength: 60 },
    ],
  },
  {
    userId: '18',
    sessions: [
      { day: 1, sessionLength: 30 },
      { day: 2, sessionLength: 40 },
      { day: 3, sessionLength: 50 },
      { day: 4, sessionLength: 30 },
      { day: 5, sessionLength: 30 },
      { day: 6, sessionLength: 50 },
      { day: 7, sessionLength: 50 },
    ],
  },
];

export const MOCK_USER_PERFORMANCE: UserPerformance[] = [
  {
    userId: '12',
    categories: {
      1: 'cardio',
      2: 'energy',
      3: 'endurance',
      4: 'strength',
      5: 'speed',
      6: 'intensity',
    },
    data: [
      { value: 80, type: 1 },
      { value: 120, type: 2 },
      { value: 140, type: 3 },
      { value: 50, type: 4 },
      { value: 200, type: 5 },
      { value: 90, type: 6 },
    ],
  },
  {
    userId: '18',
    categories: {
      1: 'cardio',
      2: 'energy',
      3: 'endurance',
      4: 'strength',
      5: 'speed',
      6: 'intensity',
    },
    data: [
      { value: 200, type: 1 },
      { value: 240, type: 2 },
      { value: 80, type: 3 },
      { value: 80, type: 4 },
      { value: 220, type: 5 },
      { value: 110, type: 6 },
    ],
  },
];
