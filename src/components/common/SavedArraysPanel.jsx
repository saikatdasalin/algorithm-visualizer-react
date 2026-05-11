function SavedArraysPanel({ arrays, onLoad, onDelete }) {
  return (
    <div className="panel-glass rounded-2xl p-4">
      <h3 className="font-display text-base font-semibold">Saved Arrays</h3>
      <div className="mt-3 space-y-2">
        {arrays.length === 0 ? (
          <p className="text-sm text-base-content/65">No saved arrays yet.</p>
        ) : (
          arrays.map((item) => (
            <div key={item.name} className="flex items-center justify-between rounded-xl bg-base-200/70 p-2">
              <button className="btn btn-ghost btn-xs" onClick={() => onLoad(item)}>
                {item.name}
              </button>
              <button className="btn btn-error btn-xs" onClick={() => onDelete(item.name)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SavedArraysPanel;