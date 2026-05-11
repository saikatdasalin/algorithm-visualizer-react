import { motion as Motion } from "framer-motion";

function SortingBars({ array = [], activeIndices = [], foundIndex = -1 }) {
  const safeArray = Array.isArray(array) ? array : [];
  const maxValue = Math.max(...safeArray, 1);

  return (
    <div className="visual-grid panel-glass rounded-2xl p-4">
      <div className="flex h-72 items-end gap-1 md:gap-1.5">
        {safeArray.map((value, index) => {
          const isActive = activeIndices.includes(index);
          const isFound = foundIndex === index;

          return (
            <Motion.div
              layout
              key={`${index}-${value}`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className={`relative flex min-w-0 flex-1 items-end justify-center rounded-t-md transition-all ${
                isFound
                  ? "bg-success bar-highlight"
                  : isActive
                    ? "bg-warning bar-highlight"
                    : "bg-gradient-to-t from-teal-500 to-cyan-400"
              }`}
              style={{ height: `${(value / maxValue) * 100}%` }}
            >
              <span className="absolute -top-5 text-[10px] font-semibold text-base-content/80 md:text-xs">
                {value}
              </span>
            </Motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default SortingBars;
