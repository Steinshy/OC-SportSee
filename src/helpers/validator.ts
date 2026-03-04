/**
 * Ensure value is a non-empty string, throw if invalid
 */
export const ensureString = (value: unknown): string => {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value.trim();
  }
  throw new Error(`Invalid string: ${JSON.stringify(value)}`);
};

/**
 * Ensure value is a number within optional min/max range
 */
export const ensureNumber = (
  value: unknown,
  min?: number,
  max?: number
): number => {
  const num = Number(value);
  if (Number.isNaN(num)) {
    throw new Error(`Invalid number: ${JSON.stringify(value)}`);
  }
  if (min !== undefined && num < min) {
    throw new Error(`Number ${num} is below minimum ${min}`);
  }
  if (max !== undefined && num > max) {
    throw new Error(`Number ${num} exceeds maximum ${max}`);
  }
  return num;
};

/**
 * Ensure value is a score between 0 and 1
 * Handles both todayScore and score fields
 */
export const ensureScore = (value: unknown): number => {
  return ensureNumber(value, 0, 1);
};

/**
 * Ensure value is an array, return empty array if falsy
 */
export const ensureArray = <T = unknown>(value: unknown): T[] => {
  if (Array.isArray(value)) {
    return value;
  }
  if (value === null || value === undefined) {
    return [];
  }
  throw new Error(`Invalid array: ${JSON.stringify(value)}`);
};

/**
 * Ensure value exists (not null/undefined)
 */
export const ensureExists = (value: unknown, fieldName: string): unknown => {
  if (value === null || value === undefined) {
    throw new Error(`Missing required field: ${fieldName}`);
  }
  return value;
};
