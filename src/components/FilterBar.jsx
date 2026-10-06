import { CATEGORIES, INCOME_CATEGORY } from "../utils";

const OPTIONS = ["All", ...Object.keys(CATEGORIES), INCOME_CATEGORY];

export default function FilterBar({ active, onChange }) {
  return (
    <div className="filters" role="group" aria-label="Filter by category">
      {OPTIONS.map((name) => (
        <button
          key={name}
          className={active === name ? "chip active" : "chip"}
          aria-pressed={active === name}
          onClick={() => onChange(name)}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
