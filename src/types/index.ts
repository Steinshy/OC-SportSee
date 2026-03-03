export * from './activity';
export * from './performance';
export * from './session';
export * from './user';

import type { ApiUser } from './user';
import type { ApiUserActivity } from './activity';
import type { ApiUserAverageSessions } from './session';
import type { ApiUserPerformance } from './performance';

export type DataModule = {
  USER_MAIN_DATA: ApiUser[];
  USER_ACTIVITY: ApiUserActivity[];
  USER_AVERAGE_SESSIONS: ApiUserAverageSessions[];
  USER_PERFORMANCE: ApiUserPerformance[];
};
