import { useState } from "react";
import { CATEGORIES, INCOME_CATEGORY, todayISO } from "../utils";

export default function ExpenseForm({ onAdd }) {
  const [kind, setKind] = useState("expense");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(todayISO());
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = Number(amount);
    if (!title.trim()) return setError("Enter a name for this entry.");
    if (!value || value <= 0) return setError("Amount must be greater than 0.");

    onAdd({
      title: title.trim(),
      amount: value,
      kind,
      category: kind === "income" ? INCOME_CATEGORY : category,
      date,
    });
    setTitle("");
    setAmount("");
    setError("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>New entry</h2>

      <div className="toggle" role="group" aria-label="Entry type">
        {["expense", "income"].map((k) => (
          <button
            type="button"
            key={k}
            className={kind === k ? `on ${k}` : ""}
            aria-pressed={kind === k}
            onClick={() => setKind(k)}
          >
            {k === "expense" ? "Expense" : "Income"}
          </button>
        ))}
      </div>

      <label>
        Name
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Lunch with friends" />
      </label>

      <div className="row">
        <label>
          Amount (₹)
          <input type="number" min="0" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" />
        </label>
        <label>
          Date
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
      </div>

      {kind === "expense" && (
        <label>
          Category
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {Object.keys(CATEGORIES).map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
      )}

      {error && <p className="error" role="alert">{error}</p>}

      <button type="submit" className="primary">
        Add {kind}
      </button>
    </form>
  );
}
