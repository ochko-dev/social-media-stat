"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PLATFORMS, PlatformId, getYear } from "../data";

type Metric = "users" | "penetrationPct";

export function PlatformComparisonChart({ year, activeIds }: { year: number; activeIds: PlatformId[] }) {
  const [metric, setMetric] = useState<Metric>("users");

  const data = PLATFORMS.filter((p) => activeIds.includes(p.id))
    .map((p) => {
      const record = getYear(p, year);
      const value = record?.[metric];
      return { name: p.name, value: value ?? null, color: p.color };
    })
    .filter((d) => d.value != null);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Platform comparison — {year}</h3>
        <div className="flex gap-1 rounded-lg bg-zinc-100 p-1 text-xs dark:bg-zinc-800">
          <button
            onClick={() => setMetric("users")}
            className={`rounded-md px-2 py-1 ${metric === "users" ? "bg-white shadow-sm dark:bg-zinc-700" : "text-zinc-500"}`}
          >
            Users
          </button>
          <button
            onClick={() => setMetric("penetrationPct")}
            className={`rounded-md px-2 py-1 ${metric === "penetrationPct" ? "bg-white shadow-sm dark:bg-zinc-700" : "text-zinc-500"}`}
          >
            Penetration %
          </button>
        </div>
      </div>
      {data.length === 0 ? (
        <p className="py-10 text-center text-sm text-zinc-500">No data for the selected platforms/year.</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => (metric === "users" ? v.toLocaleString() : `${v}%`)} />
            <Tooltip formatter={(v) => (typeof v === "number" ? (metric === "users" ? v.toLocaleString() : `${v}%`) : v)} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {data.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
