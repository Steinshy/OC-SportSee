import './style.css';

export interface Props {
  /** Icon image URL, rendered in a colored square when provided */
  icon?: string;
  /** Extra class for the icon container (e.g. a color modifier) */
  iconClassName?: string;
  label: string;
  value: string | number;
  unit?: string;
}

export default function MetricCard({ icon, iconClassName, label, value, unit }: Props) {
  return (
    <div className="metric-card">
      {icon && (
        <span className={`metric-card__icon${iconClassName ? ` ${iconClassName}` : ''}`}>
          <img src={icon} alt="" />
        </span>
      )}
      <div>
        <p className="metric-card__value">
          {value}
          {unit}
        </p>
        <p className="metric-card__label">{label}</p>
      </div>
    </div>
  );
}
