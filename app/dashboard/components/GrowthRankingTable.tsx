import { PLATFORMS, PlatformId, computeYoYGrowth, getYear } from "../data";

export function GrowthRankingTable({ year, activeIds }: { year: number; activeIds: PlatformId[] }) {
  const rows = PLATFORMS.filter((p) => activeIds.includes(p.id))
    .map((p) => ({
      platform: p,
      users: getYear(p, year)?.users ?? null,
      penetration: getYear(p, year)?.penetrationPct ?? null,
      growth: computeYoYGrowth(p, year),
    }))
    .filter((r) => r.users != null)
    .sort((a, b) => (b.growth ?? -Infinity) - (a.growth ?? -Infinity));

  const maxUsers = Math.max(...rows.map((r) => r.users as number));

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50">Growth ranking — {year} vs {year - 1}</h3>
      {rows.length === 0 ? (
        <p className="py-6 text-center text-sm text-zinc-500">No data for the selected platforms/year.</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 text-left text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
              <th className="py-2 pr-2">Rank</th>
              <th className="py-2 pr-2">Platform</th>
              <th className="py-2 pr-2 text-right">Users</th>
              <th className="py-2 pr-2 text-right">Growth %</th>
              <th className="py-2 text-right">Penetration %</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const isLargest = r.users === maxUsers;
              const isDeclining = (r.growth ?? 0) < 0;
              return (
                <tr
                  key={r.platform.id}
                  className={`border-b border-zinc-100 last:border-0 dark:border-zinc-800 ${i % 2 === 1 ? "bg-zinc-50 dark:bg-zinc-800/40" : ""}`}
                >
                  <td className="py-2 pr-2 text-zinc-500">{i + 1}</td>
                  <td className="py-2 pr-2 font-medium">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: r.platform.color }} />
                      {r.platform.name}
                      {isLargest && (
                        <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                          Largest
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="py-2 pr-2 text-right tabular-nums">{(r.users as number).toLocaleString()}</td>
                  <td
                    className={`py-2 pr-2 text-right tabular-nums font-medium ${
                      r.growth == null ? "text-zinc-400" : isDeclining ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    {r.growth == null ? "—" : `${r.growth > 0 ? "+" : ""}${r.growth.toFixed(1)}%`}
                  </td>
                  <td className="py-2 text-right tabular-nums">{r.penetration != null ? `${r.penetration}%` : "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">Growth % is computed from raw user counts, not the sparse stated-growth lines in the source.</p>
    </div>
  );
}
