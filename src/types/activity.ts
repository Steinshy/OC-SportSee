export interface ApiActivitySession {
  day: string;
  kilogram: number;
  calories: number;
}

export interface ApiUserActivity {
  userId: number;
  sessions: ApiActivitySession[];
}

export type ActivitySession = ApiActivitySession;

export interface UserActivity {
  userId: number;
  sessions: ActivitySession[];
}
