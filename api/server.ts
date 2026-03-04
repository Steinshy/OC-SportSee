import { createServer } from 'http';
import { URL } from 'url';
import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from '../src/data/data';

const PORT = 3000;

// Helper functions to find data by user ID
const findUserData = (userId: number) => {
  return USER_MAIN_DATA.find((user) => user.id === userId);
};

const findActivityData = (userId: number) => {
  return USER_ACTIVITY.find((activity) => activity.userId === userId);
};

const findAverageSessionsData = (userId: number) => {
  return USER_AVERAGE_SESSIONS.find((sessions) => sessions.userId === userId);
};

const findPerformanceData = (userId: number) => {
  return USER_PERFORMANCE.find((perf) => perf.userId === userId);
};

// Create HTTP server
const server = createServer((req, res) => {
  if (!req.url) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'No URL provided' }));
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = url.pathname;

  // Set CORS headers - apply to all responses
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Root path welcome message
  if (pathname === '/') {
    res.writeHead(200);
    res.end(JSON.stringify({ message: 'welcome to api' }));
    return;
  }

  // Match /user/:id
  const userMatch = pathname.match(/^\/user\/(\d+)$/);
  if (userMatch) {
    if (req.method !== 'GET') {
      res.writeHead(405, { 'Allow': 'GET' });
      res.end(JSON.stringify({ error: 'Method not allowed' }));
      return;
    }
    const userId = parseInt(userMatch[1], 10);
    const userData = findUserData(userId);
    if (!userData) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: `User ${userId} not found` }));
      return;
    }
    // Transform keyData to nutritionData
    const { keyData, ...rest } = userData;
    const transformedData = {
      ...rest,
      nutritionData: keyData,
    };
    res.writeHead(200);
    res.end(JSON.stringify(transformedData));
    return;
  }

  // Match /user/:id/activity
  const activityMatch = pathname.match(/^\/user\/(\d+)\/activity$/);
  if (activityMatch) {
    if (req.method !== 'GET') {
      res.writeHead(405, { 'Allow': 'GET' });
      res.end(JSON.stringify({ error: 'Method not allowed' }));
      return;
    }
    const userId = parseInt(activityMatch[1], 10);
    const activityData = findActivityData(userId);
    if (!activityData) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: `Activity for user ${userId} not found` }));
      return;
    }
    res.writeHead(200);
    res.end(JSON.stringify(activityData));
    return;
  }

  // Match /user/:id/average-sessions
  const avgMatch = pathname.match(/^\/user\/(\d+)\/average-sessions$/);
  if (avgMatch) {
    if (req.method !== 'GET') {
      res.writeHead(405, { 'Allow': 'GET' });
      res.end(JSON.stringify({ error: 'Method not allowed' }));
      return;
    }
    const userId = parseInt(avgMatch[1], 10);
    const avgData = findAverageSessionsData(userId);
    if (!avgData) {
      res.writeHead(404);
      res.end(
        JSON.stringify({
          error: `Average sessions for user ${userId} not found`,
        })
      );
      return;
    }
    res.writeHead(200);
    res.end(JSON.stringify(avgData));
    return;
  }

  // Match /user/:id/performance
  const perfMatch = pathname.match(/^\/user\/(\d+)\/performance$/);
  if (perfMatch) {
    if (req.method !== 'GET') {
      res.writeHead(405, { 'Allow': 'GET' });
      res.end(JSON.stringify({ error: 'Method not allowed' }));
      return;
    }
    const userId = parseInt(perfMatch[1], 10);
    const perfData = findPerformanceData(userId);
    if (!perfData) {
      res.writeHead(404);
      res.end(
        JSON.stringify({
          error: `Performance for user ${userId} not found`,
        })
      );
      return;
    }
    // Transform kind to type in data items, and kind to categories at top level
    const transformedData = {
      userId: perfData.userId,
      categories: perfData.kind,
      data: perfData.data.map((item: any) => ({
        value: item.value,
        type: item.kind,
      })),
    };
    res.writeHead(200);
    res.end(JSON.stringify(transformedData));
    return;
  }

  // 404 for unknown routes
  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Route not found' }));
});

// Start server
server.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
