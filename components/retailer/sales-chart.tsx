"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

export function SalesChart({ data }: { data: { label: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <XAxis dataKey="label" hide />
        <Tooltip
          cursor={{ fill: "var(--color-cream-100)" }}
          contentStyle={{ borderRadius: 6, borderColor: "var(--color-cream-300)", fontSize: 12 }}
          formatter={(value) => [`₹${(Number(value) * 1000).toLocaleString("en-IN")}`, "Revenue"]}
        />
        <Bar dataKey="value" fill="var(--color-primary-600)" radius={[3, 3, 0, 0]} maxBarSize={28} />
      </BarChart>
    </ResponsiveContainer>
  );
}
