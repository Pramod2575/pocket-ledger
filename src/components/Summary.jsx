import { CATEGORIES, formatMoney } from "../utils";

export default function Summary({ entries }) {
  const income = entries.filter((e) => e.kind === "income").reduce((s, e) => s + e.amount, 0);
  const spent = entries.filter((e) => e.kind === "expense").reduce((s, e) => s + e.amount, 0);
  const balance = income - spent;

  const byCategory = Object.keys(CATEGORIES)
    .map((name) => ({
      name,
      total: entries.filter((e) => e.kind === "expense" && e.category === name).reduce((s, e) => s + e.amount, 0),
    }))
    .filter((c) => c.total > 0);

  return (
    <section className="summary" aria-label="Summary">
      <p className="summary-label">Balance</p>
      <p className={`balance ${balance < 0 ? "negative" : ""}`}>{formatMoney(balance)}</p>

      <div className="flow">
        <div>
          <span className="dot income" /> In <strong>{formatMoney(income)}</strong>
        </div>
        <div>
          <span className="dot spend" /> Out <strong>{formatMoney(spent)}</strong>
        </div>
      </div>

      {byCategory.length > 0 ? (
        <>
          <div className="bar" role="img" aria-label="Spending split by category">
            {byCategory.map((c) => (
              <span
                key={c.name}
                title={`${c.name}: ${formatMoney(c.total)}`}
                style={{ width: `${(c.total / spent) * 100}%`, background: CATEGORIES[c.name] }}
              />
            ))}
          </div>
          <ul className="legend">
            {byCategory.map((c) => (
              <li key={c.name}>
                <span className="dot" style={{ background: CATEGORIES[c.name] }} />
                {c.name} <em>{Math.round((c.total / spent) * 100)}%</em>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="hint">Add an expense to see where your money goes.</p>
      )}
    </section>
  );
}
