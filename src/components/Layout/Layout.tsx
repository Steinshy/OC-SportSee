import { Link, Outlet } from 'react-router';

import Sidebar from './Sidebar';

import './style.css';

export default function Layout() {
  return (
    <div className="app">
      <div className="navbar">
        <div className="navbar__brand">
          <img className="navbar__logo" src="/logo.svg" alt="SportSee" />
        </div>
        <nav className="navbar__links" aria-label="Navigation principale">
          <Link to="/">Accueil</Link>
          <Link to="/profile/12">Profil</Link>
          <Link to="/">Reglage</Link>
          <Link to="/">Communaute</Link>
        </nav>
      </div>
      <div className="app-body">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
