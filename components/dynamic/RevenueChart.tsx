"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "January", revenue: 12 },
  { month: "February", revenue: 18 },
  { month: "March", revenue: 15 },
  { month: "April", revenue: 22 },
  { month: "May", revenue: 26 },
  { month: "June", revenue: 19 },
  { month: "July", revenue: 24 },
  { month: "August", revenue: 27 },
];

function formatY(value: number) {
  return `R${value}`;
}

export function RevenueChart() {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6">
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#86efac" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#86efac" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E3E6EA" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#697786" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatY}
            tick={{ fontSize: 12, fill: "#697786" }}
            axisLine={false}
            tickLine={false}
            width={44}
            ticks={[0, 5, 11, 16.5, 22, 27.5]}
          />
          <Tooltip
            formatter={(value) => [`R${value}`, "Revenue"]}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #E3E6EA",
              fontSize: "13px",
            }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#4ade80"
            strokeWidth={2}
            fill="url(#revenueGradient)"
            dot={false}
            activeDot={{ r: 5, fill: "#16a34a" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
