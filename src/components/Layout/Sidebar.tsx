import './style.css';

export default function Sidebar() {
  const icons = ['yoga', 'swim', 'bike', 'fitness'];

  return (
    <aside className="sidebar" aria-label="Sport navigation">
      <div className="sidebar__icons">
        {icons.map((icon) => (
          <button key={icon} type="button" className="sidebar__icon-btn">
            <img src={`/assets/${icon}.svg`} alt={icon} />
          </button>
        ))}
      </div>
      <p className="sidebar__copyright">Copyright, SportSee 2020</p>
    </aside>
  );
}
