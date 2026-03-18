import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

import Layout from '@/components/Layout';
import { profileLoader } from '@/loaders/profileLoader';
import Home from '@/pages/Home';
import Profile from '@/pages/Profile';

import './index.css';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'profile/:id',
          loader: profileLoader,
          element: <Profile />,
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
