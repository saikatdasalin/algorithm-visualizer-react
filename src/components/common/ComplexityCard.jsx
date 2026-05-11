function ComplexityCard({ title, complexity }) {
  return (
    <div className="panel-glass rounded-2xl p-4">
      <h3 className="font-display text-base font-semibold">{title}</h3>
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-xl bg-base-200/70 p-3">
          <p className="text-xs text-base-content/60">Best</p>
          <p className="font-semibold">{complexity.best}</p>
        </div>
        <div className="rounded-xl bg-base-200/70 p-3">
          <p className="text-xs text-base-content/60">Average</p>
          <p className="font-semibold">{complexity.average}</p>
        </div>
        <div className="rounded-xl bg-base-200/70 p-3">
          <p className="text-xs text-base-content/60">Worst</p>
          <p className="font-semibold">{complexity.worst}</p>
        </div>
        <div className="rounded-xl bg-base-200/70 p-3">
          <p className="text-xs text-base-content/60">Space</p>
          <p className="font-semibold">{complexity.space}</p>
        </div>
      </div>
    </div>
  );
}

export default ComplexityCard;