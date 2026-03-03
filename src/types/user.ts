export interface ApiUserInfos {
  firstName: string;
  lastName: string;
  age: number;
}

export interface ApiKeyData {
  calorieCount: number;
  proteinCount: number;
  carbohydrateCount: number;
  lipidCount: number;
}

export type ApiUser = {
  id: number;
  userInfos: ApiUserInfos;
  keyData: ApiKeyData;
} & ({ todayScore: number } | { score: number });

export interface UserInfos {
  firstName: string;
  lastName: string;
  age: number;
}

export interface KeyData {
  calorieCount: number;
  proteinCount: number;
  carbohydrateCount: number;
  lipidCount: number;
}

export interface User {
  id: number;
  userInfos: UserInfos;
  score: number;
  keyData: KeyData;
}
