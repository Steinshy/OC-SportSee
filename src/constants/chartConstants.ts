/**
 * Centralized design tokens for chart components
 * Update these constants instead of searching through component files
 */

export const CHART_COLORS = {
  barWeight: '#282d30',
  barCalories: '#e60000',
  strokeGrid: '#dedede',
  tickText: '#9b9eac',
  cursor: '#c4c4c4',
} as const;

export const CHART_BREAKPOINTS = {
  mobile: 768,
  extraSmall: 420,
} as const;

export const CHART_VALUES = {
  minDisplayPoints: 7,
  barGapDefault: 8,
  cursorScale: 0.72,
  cursorScaleMobile: 0.64,
} as const;
