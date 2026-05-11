function PseudoCodePanel({ lines = [], currentLine }) {
  return (
    <div className="panel-glass rounded-2xl p-4">
      <h3 className="font-display text-base font-semibold">Pseudo Code</h3>
      <div className="mt-3 space-y-1 font-mono text-xs md:text-sm">
        {lines.map((line, index) => (
          <div
            key={`${line}-${index}`}
            className={`rounded-lg px-2 py-1 transition-colors ${
              currentLine === index
                ? "bg-teal-500/25 text-teal-100"
                : "text-base-content/75"
            }`}
          >
            <span className="mr-2 text-base-content/45">{index + 1}.</span>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PseudoCodePanel;
