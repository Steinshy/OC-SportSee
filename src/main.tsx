import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';

import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';

import './index.css';

const router = createBrowserRouter(
  [
    {
      index: true,
      element: <Navigate to="/user/12" replace />,
    },
    {
      path: 'user/:id',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
