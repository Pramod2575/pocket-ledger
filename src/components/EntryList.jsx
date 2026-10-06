import EntryItem from "./EntryItem";

export default function EntryList({ entries, onDelete, onRename }) {
  if (entries.length === 0) {
    return <p className="empty">Nothing here yet. Add an entry or pick a different filter.</p>;
  }
  return (
    <ul className="list">
      {entries.map((entry) => (
        <EntryItem key={entry.id} entry={entry} onDelete={onDelete} onRename={onRename} />
      ))}
    </ul>
  );
}
