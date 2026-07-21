/**
 * Validates that a value is a non-empty string and trims whitespace
 * @throws {Error} If value is not a string or is empty after trimming
 */
export const ensureString = (value: unknown): string => {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value.trim();
  }
  throw new Error(`Invalid string: ${JSON.stringify(value)}`);
};

/** Type guard checking whether a value is a plain object (Record) */
export const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Validates that a value is a number
 * @throws {Error} If value is not a number
 */
export const ensureNumber = (value: unknown): number => {
  if (typeof value === 'number') {
    return value;
  }
  throw new Error(`Invalid number: ${JSON.stringify(value)}`);
};

/**
 * Validates that a value is an array, falling back to an empty array for null/undefined
 * @throws {Error} If value is neither an array, null, nor undefined
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
 * Validates that a value exists (is not null or undefined), as a guard before
 * further validation steps (e.g. `ensureNumber(ensureExists(data.id))`)
 * @throws {Error} If value is null or undefined
 */
export const ensureExists = (value: unknown): unknown => {
  if (value === null || value === undefined) {
    throw new Error(`Missing required value: ${value}`);
  }
  return value;
};

/**
 * Validates and normalizes a categories object (e.g. `{ '1': 'cardio' }`) into a
 * `Record<number, string>`, converting string keys to numeric keys
 * @throws {Error} If value is not an object or contains non-string values
 */
export const ensureCategories = (value: unknown): Record<number, string> => {
  if (!isRecord(value)) {
    throw new Error('Invalid categories: expected an object');
  }
  return Object.fromEntries(
    Object.entries(value).map(([key, val]) => {
      if (typeof val !== 'string') {
        throw new Error(`Invalid category at key ${key}: expected a string`);
      }
      return [Number(key), val];
    })
  );
};
