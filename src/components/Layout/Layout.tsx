import { Outlet } from 'react-router';

import Sidebar from './Sidebar';

import './style.css';

export default function Layout() {
  return (
    <div className="app">
      <header className="navbar">
        <div className="navbar__brand">
          <img src="/logo.svg" alt="SportSee" />
        </div>
        <nav className="navbar__links" aria-label="Navigation principale">
          <a href="/">Accueil</a>
          <a href="/">Profil</a>
          <a href="/">Reglage</a>
          <a href="/">Communaute</a>
        </nav>
      </header>
      <div className="app-body">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
