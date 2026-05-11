function OperationStatus({ status, stepsCount, activeIndices = [] }) {
  return (
    <div className="panel-glass rounded-2xl p-4">
      <h3 className="font-display text-base font-semibold">Execution Status</h3>
      <div className="mt-3 space-y-2 text-sm">
        <p className="rounded-xl bg-base-200/70 p-3">{status}</p>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-base-200/70 p-3">
            <p className="text-xs text-base-content/60">Steps</p>
            <p className="font-semibold">{stepsCount}</p>
          </div>
          <div className="rounded-xl bg-base-200/70 p-3">
            <p className="text-xs text-base-content/60">Active Indexes</p>
            <p className="font-semibold">{activeIndices.length ? activeIndices.join(", ") : "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OperationStatus;