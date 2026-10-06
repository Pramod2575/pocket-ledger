import { useState, useMemo } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { SAMPLE_DATA } from "./utils";
import Summary from "./components/Summary";
import ExpenseForm from "./components/ExpenseForm";
import FilterBar from "./components/FilterBar";
import EntryList from "./components/EntryList";

export default function App() {
  // One array with a "kind" field ("income" | "expense") for each entry.
  const [entries, setEntries] = useLocalStorage("pocket-ledger-entries", SAMPLE_DATA);
  const [filter, setFilter] = useState("All");

  const addEntry = (entry) =>
    setEntries((prev) => [{ ...entry, id: Date.now() }, ...prev]);

  const deleteEntry = (id) =>
    setEntries((prev) => prev.filter((e) => e.id !== id));

  const renameEntry = (id, title) =>
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, title } : e)));

  const visible = useMemo(() => {
    const list = filter === "All" ? entries : entries.filter((e) => e.category === filter);
    return [...list].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);
  }, [entries, filter]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Pocket Ledger</h1>
        <p>Track what comes in and what goes out.</p>
      </header>

      <main className="layout">
        <aside className="side">
          <Summary entries={entries} />
          <ExpenseForm onAdd={addEntry} />
        </aside>

        <section className="main" aria-label="Transactions">
          <FilterBar active={filter} onChange={setFilter} />
          <EntryList entries={visible} onDelete={deleteEntry} onRename={renameEntry} />
        </section>
      </main>
    </div>
  );
}
