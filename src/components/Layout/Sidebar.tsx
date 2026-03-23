import './style.css';

export default function Sidebar() {
  const icons = ['yoga', 'swim', 'bike', 'fitness'];
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <aside className="sidebar" aria-label="Sport navigation">
      <div className="sidebar__icons">
        {icons.map((icon) => (
          <button
            key={icon}
            type="button"
            className="sidebar__icon-btn"
            aria-label={icon}
          >
            <img src={`${baseUrl}assets/${icon}.svg`} alt="" />
          </button>
        ))}
      </div>
      <p className="sidebar__copyright">Copyright, SportSee 2020</p>
    </aside>
  );
}
