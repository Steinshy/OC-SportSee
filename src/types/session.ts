export interface ApiAverageSession {
  day: number;
  sessionLength: number;
}

export interface ApiUserAverageSessions {
  userId: number;
  sessions: ApiAverageSession[];
}

export type AverageSession = ApiAverageSession;

export interface UserAverageSessions {
  userId: number;
  sessions: AverageSession[];
}
