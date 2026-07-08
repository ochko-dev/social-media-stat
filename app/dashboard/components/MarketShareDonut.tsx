"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { getMarketShare } from "../data";

export function MarketShareDonut({ year }: { year: number }) {
  const rows = getMarketShare(year);
  const total = rows.reduce((sum, r) => sum + r.users, 0);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50">Market share — {year}</h3>
      {rows.length === 0 ? (
        <p className="py-10 text-center text-sm text-zinc-500">No comparable platform data for {year}.</p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={rows} dataKey="users" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={2}>
                {rows.map((r) => (
                  <Cell key={r.id} fill={r.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v, _n, entry) => {
                  const num = typeof v === "number" ? v : 0;
                  return [`${num.toLocaleString()} (${((num / total) * 100).toFixed(1)}%)`, entry?.payload?.name];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-600 dark:text-zinc-400">
            {rows.map((r) => (
              <li key={r.id} className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: r.color }} />
                {r.name} {((r.users / total) * 100).toFixed(1)}%
              </li>
            ))}
          </ul>
        </>
      )}
      <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">Excludes TikTok (no data provided).</p>
    </div>
  );
}
