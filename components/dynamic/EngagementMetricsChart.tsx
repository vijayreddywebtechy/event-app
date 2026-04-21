"use client";

import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Legend,
} from "recharts";

const metrics = [
  { name: "Feedback", value: 55, fill: "#0e7490" },
  { name: "Attendance", value: 65, fill: "#0891b2" },
  { name: "Registration", value: 75, fill: "#06b6d4" },
  { name: "Click-through", value: 83, fill: "#1d4ed8" },
  { name: "Email Opens", value: 92, fill: "#6d28d9" },
];

const DOT_COLORS: Record<string, string> = {
  "Email Opens": "#6d28d9",
  "Click-through": "#1d4ed8",
  Registration: "#06b6d4",
  Attendance: "#0891b2",
  Feedback: "#0e7490",
};

function CustomLegend() {
  return (
    <ul className="flex flex-col gap-2 justify-center">
      {Object.entries(DOT_COLORS).map(([label, color]) => (
        <li key={label} className="flex items-center gap-2 text-sm text-neutral-700">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
            style={{ backgroundColor: color }}
          />
          {label}
        </li>
      ))}
    </ul>
  );
}

export function EngagementMetricsChart() {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6 flex items-center gap-4 h-full min-h-[260px]">
      <div className="flex-1 min-w-0 self-stretch md:flex items-center">
        <ResponsiveContainer width="100%" height={260}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="20%"
            outerRadius="90%"
            data={metrics}
            startAngle={150}
            endAngle={-120}
          >
            <RadialBar dataKey="value" cornerRadius={8} background={{ fill: "#f1f5f9" }} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <CustomLegend />
    </div>
  );
}
