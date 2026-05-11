import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function PerformanceChart({ title, data }) {
  return (
    <div className="panel-glass rounded-2xl p-4">
      <h3 className="font-display text-base font-semibold">{title}</h3>
      <div className="mt-3 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={24}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="name" tick={{ fill: "currentColor", fontSize: 12 }} />
            <YAxis tick={{ fill: "currentColor", fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="comparisons" fill="#14b8a6" radius={[6, 6, 0, 0]} />
            <Bar dataKey="swaps" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PerformanceChart;