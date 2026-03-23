/**
 * Validates that a value is a non-empty string and trims whitespace
 * @param {unknown} value - The value to validate
 * @returns {string} The trimmed string value
 * @throws {Error} If value is not a string or is empty after trimming
 * @example
 * const name = ensureString('John Doe');
 * // Returns: 'John Doe'
 */
export const ensureString = (value: unknown): string => {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value.trim();
  }
  throw new Error(`Invalid string: ${JSON.stringify(value)}`);
};

/**
 * Type guard to check if a value is a plain object (Record)
 * @param {unknown} value - The value to check
 * @returns {boolean} True if value is a plain object, false otherwise
 * @example
 * if (isRecord(data)) {
 *   const id = data.id; // TypeScript knows data is Record<string, unknown>
 * }
 */
export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Validates that a value is a number
 * @param {unknown} value - The value to validate
 * @returns {number} The validated number
 * @throws {Error} If value is not a valid number type
 * @example
 * const age = ensureNumber(25);
 * // Returns: 25
 */
export const ensureNumber = (value: unknown): number => {
  if (typeof value === 'number') {
    return value;
  }
  throw new Error(`Invalid number: ${JSON.stringify(value)}`);
};

/**
 * Validates that a value is an array, with graceful fallback to empty array
 *
 * @template T - The type of array elements
 * @param {unknown} value - The value to validate
 * @returns {T[]} The validated array, or an empty array if value is null/undefined
 * @throws {Error} If value is neither an array, null, nor undefined
 * @example
 * const items = ensureArray<string>(data.items);
 * // Returns: string[] (or empty array if null/undefined)
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
 * Validates that a value exists (is not null or undefined)
 *
 * Useful as a guard before further validation steps in data transformation pipelines.
 * This is typically used before ensureString, ensureNumber, etc.
 *
 * @param {unknown} value - The value to check
 * @returns {unknown} The value itself if it exists
 * @throws {Error} If value is null or undefined
 * @example
 * const id = ensureNumber(ensureExists(data.id));
 */
export const ensureExists = (value: unknown): unknown => {
  if (value === null || value === undefined) {
    throw new Error(`Missing required value: ${value}`);
  }
  return value;
};

/**
 * Validates and normalizes a categories object into a Record<number, string>
 *
 * Converts string keys to numeric keys, ensuring all values are strings.
 * Used primarily for performance chart category mapping.
 *
 * @param {unknown} value - The categories object to validate
 * @returns {Record<number, string>} A record with numeric keys and string values
 * @throws {Error} If value is not an object or contains non-string values
 * @example
 * const categories = ensureCategories({
 *   '0': 'Cardio',
 *   '1': 'Energy',
 *   '2': 'Endurance'
 * });
 * // Returns: { 0: 'Cardio', 1: 'Energy', 2: 'Endurance' }
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
