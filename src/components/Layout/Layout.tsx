import { Link, Outlet } from 'react-router';

import Sidebar from './Sidebar';

import './style.css';

export default function Layout() {
  return (
    <div className="app">
      <div className="navbar">
        <div className="navbar__brand">
          <img className="navbar__logo" src={`${import.meta.env.BASE_URL}logo.svg`} alt="SportSee" />
          <span className="navbar__brand-name">SportSee</span>
        </div>
        <nav className="navbar__links" aria-label="Navigation principale">
          <Link to="/">Accueil</Link>
          <Link to="/profile/12">Profil</Link>
          <Link to="/">Réglage</Link>
          <Link to="/">Communauté</Link>
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
