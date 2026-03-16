import { Link } from 'react-router';

import './style.css';

export default function Home() {
  return (
    <div className="home">
      <h1 className="home__title">Bienvenue sur SportSee</h1>
      <p className="home__subtitle">Selectionnez un utilisateur</p>
      <div className="home__users">
        <Link to="/profile/12" className="home__user-link">
          Karl (ID 12)
        </Link>
        <Link to="/profile/18" className="home__user-link">
          Cecilia (ID 18)
        </Link>
      </div>
    </div>
  );
}
