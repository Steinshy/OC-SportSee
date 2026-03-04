import fs from 'fs';
import path from 'path';
import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from '../src/data/data.js';

const OUTPUT_DIR = './public/api';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Generate /user/:id files
USER_MAIN_DATA.forEach((user) => {
  const userDir = path.join(OUTPUT_DIR, 'user', String(user.id));
  if (!fs.existsSync(userDir)) {
    fs.mkdirSync(userDir, { recursive: true });
  }

  // Transform keyData to nutritionData (matches API server transformation)
  const { keyData, ...rest } = user;
  const transformedData = {
    ...rest,
    nutritionData: keyData,
  };

  fs.writeFileSync(
    path.join(userDir, 'index.json'),
    JSON.stringify(transformedData, null, 2)
  );
});

// Generate /user/:id/activity files
USER_ACTIVITY.forEach((activity) => {
  const activityDir = path.join(OUTPUT_DIR, 'user', String(activity.userId), 'activity');
  if (!fs.existsSync(activityDir)) {
    fs.mkdirSync(activityDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(activityDir, 'index.json'),
    JSON.stringify(activity, null, 2)
  );
});

// Generate /user/:id/average-sessions files
USER_AVERAGE_SESSIONS.forEach((sessions) => {
  const sessionsDir = path.join(OUTPUT_DIR, 'user', String(sessions.userId), 'average-sessions');
  if (!fs.existsSync(sessionsDir)) {
    fs.mkdirSync(sessionsDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(sessionsDir, 'index.json'),
    JSON.stringify(sessions, null, 2)
  );
});

// Generate /user/:id/performance files
USER_PERFORMANCE.forEach((perf) => {
  const perfDir = path.join(OUTPUT_DIR, 'user', String(perf.userId), 'performance');
  if (!fs.existsSync(perfDir)) {
    fs.mkdirSync(perfDir, { recursive: true });
  }

  // Transform kind to type in data items, and kind to categories (matches API server transformation)
  const transformedData = {
    userId: perf.userId,
    categories: perf.kind,
    data: perf.data.map((item) => ({
      value: item.value,
      type: item.kind,
    })),
  };

  fs.writeFileSync(
    path.join(perfDir, 'index.json'),
    JSON.stringify(transformedData, null, 2)
  );
});

console.log('✓ Static API files generated in ./public/api');
