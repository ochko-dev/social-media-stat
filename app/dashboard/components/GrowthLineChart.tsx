"use client";

import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { PLATFORMS, PlatformId, YEARS, getYear } from "../data";

export function GrowthLineChart({ activeIds }: { activeIds: PlatformId[] }) {
  const active = PLATFORMS.filter((p) => activeIds.includes(p.id));

  const data = YEARS.map((year) => {
    const row: Record<string, number | string | null> = { year };
    for (const p of active) {
      row[p.id] = getYear(p, year)?.users ?? null;
    }
    return row;
  });

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50">Users over time (2019–2025)</h3>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} />
          <XAxis dataKey="year" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => v.toLocaleString()} />
          <Tooltip formatter={(v) => (typeof v === "number" ? v.toLocaleString() : "No data")} />
          <Legend />
          {active.map((p) => (
            <Line
              key={p.id}
              type="monotone"
              dataKey={p.id}
              name={p.name}
              stroke={p.color}
              strokeWidth={2}
              dot={{ r: 3 }}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">TikTok has no line — no data was provided.</p>
    </div>
  );
}
