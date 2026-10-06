import { useState } from "react";
import { CATEGORIES, formatMoney, formatDate } from "../utils";

export default function EntryItem({ entry, onDelete, onRename }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(entry.title);
  const isIncome = entry.kind === "income";

  const save = () => {
    const next = draft.trim();
    if (next && next !== entry.title) onRename(entry.id, next);
    else setDraft(entry.title);
    setEditing(false);
  };

  return (
    <li className="item">
      <span className="swatch" style={{ background: isIncome ? "var(--income)" : CATEGORIES[entry.category] }} />

      <div className="item-text">
        {editing ? (
          <input
            className="edit"
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={save}
            onKeyDown={(e) => {
              if (e.key === "Enter") save();
              if (e.key === "Escape") { setDraft(entry.title); setEditing(false); }
            }}
          />
        ) : (
          <button className="title" onClick={() => setEditing(true)} title="Click to rename">
            {entry.title}
          </button>
        )}
        <span className="meta">{entry.category}, {formatDate(entry.date)}</span>
      </div>

      <span className={`amount ${isIncome ? "in" : ""}`}>
        {isIncome ? "+" : "-"}{formatMoney(entry.amount)}
      </span>

      <button className="delete" onClick={() => onDelete(entry.id)} aria-label={`Delete ${entry.title}`}>
        ×
      </button>
    </li>
  );
}
