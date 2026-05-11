function CodeEditorPanel({ code, onChange, onRun }) {
  return (
    <div className="panel-glass rounded-2xl p-4">
      <h3 className="font-display text-base font-semibold">Code Editor Panel</h3>
      <textarea
        value={code}
        onChange={(event) => onChange(event.target.value)}
        className="textarea textarea-bordered mt-3 h-44 w-full font-mono text-xs"
        spellCheck={false}
      />
      <button className="btn btn-primary btn-sm mt-3" onClick={onRun}>
        Apply Draft Logic
      </button>
      <p className="mt-2 text-xs text-base-content/60">
        This sandbox editor is educational and does not execute arbitrary code.
      </p>
    </div>
  );
}

export default CodeEditorPanel;