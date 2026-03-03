export interface ApiPerformanceEntry {
  value: number;
  kind: number;
}

export interface ApiUserPerformance {
  userId: number;
  kind: Record<number, string>;
  data: ApiPerformanceEntry[];
}

export type PerformanceEntry = ApiPerformanceEntry;

export interface UserPerformance {
  userId: number;
  kind: Record<number, string>;
  data: PerformanceEntry[];
}
