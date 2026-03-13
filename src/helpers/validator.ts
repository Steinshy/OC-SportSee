//  Ensure value is a non-empty string, throw if invalid
export const ensureString = (value: unknown): string => {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value.trim();
  }
  throw new Error(`Invalid string: ${JSON.stringify(value)}`);
};

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const ensureNumber = (value: unknown): number => {
  if (typeof value === 'number') {
    return value;
  }
  throw new Error(`Invalid number: ${JSON.stringify(value)}`);
};

// Ensure value is an array, return empty array if falsy
export const ensureArray = <T = unknown>(value: unknown): T[] => {
  if (Array.isArray(value)) {
    return value;
  }
  if (value === null || value === undefined) {
    return [];
  }
  throw new Error(`Invalid array: ${JSON.stringify(value)}`);
};

// Ensure value exists (not null/undefined)
export const ensureExists = (value: unknown): unknown => {
  if (value === null || value === undefined) {
    throw new Error(`Missing required value: ${value}`);
  }
  return value;
};

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
