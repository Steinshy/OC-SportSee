import { Outlet } from 'react-router';

import Sidebar from './Sidebar';

import './style.css';

export default function Layout() {
  return (
    <div className="app">
      <header className="navbar" />
      <div className="app-body">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
