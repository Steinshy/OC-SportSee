import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

import Layout from '@/components/Layout';
import { dashboardLoader } from '@/loaders/dashboardLoader';
import Dashboard from '@/pages/Dashboard';

import './index.css';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: 'dashboard/:id',
          loader: dashboardLoader,
          element: <Dashboard />,
          errorElement: <div>404 - Not Found</div>,
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
