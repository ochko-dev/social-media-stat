import { PLATFORMS, PlatformId, computeYoYGrowth, getYear } from "../data";

function formatUsers(n: number): string {
  return n.toLocaleString("en-US");
}

function Card({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <span className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{label}</span>
      <span className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50" style={accent ? { color: accent } : undefined}>
        {value}
      </span>
      {sub && <span className="text-xs text-zinc-500 dark:text-zinc-400">{sub}</span>}
    </div>
  );
}

export function KpiCards({ year, activeIds }: { year: number; activeIds: PlatformId[] }) {
  const active = PLATFORMS.filter((p) => activeIds.includes(p.id));

  const withUsers = active
    .map((p) => ({ platform: p, record: getYear(p, year) }))
    .filter((r) => r.record?.users != null) as { platform: (typeof PLATFORMS)[number]; record: NonNullable<ReturnType<typeof getYear>> }[];

  const totalUsers = withUsers.reduce((sum, r) => sum + (r.record.users as number), 0);

  const largest = withUsers.reduce<typeof withUsers[number] | null>((best, r) => (!best || (r.record.users as number) > (best.record.users as number) ? r : best), null);

  const growthRows = active
    .map((p) => ({ platform: p, growth: computeYoYGrowth(p, year) }))
    .filter((r): r is { platform: (typeof PLATFORMS)[number]; growth: number } => r.growth != null);

  const fastest = growthRows.reduce<typeof growthRows[number] | null>((best, r) => (!best || r.growth > best.growth ? r : best), null);
  const avgGrowth = growthRows.length ? growthRows.reduce((sum, r) => sum + r.growth, 0) / growthRows.length : null;

  const trackedCount = PLATFORMS.filter((p) => p.years.some((y) => y.users != null)).length;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      <Card label="Year selected" value={String(year)} />
      <Card label="Total users" value={totalUsers ? formatUsers(totalUsers) : "—"} sub="Across selected platforms" />
      <Card
        label="Largest platform"
        value={largest ? largest.platform.name : "—"}
        sub={largest ? `${formatUsers(largest.record.users as number)} users` : undefined}
        accent={largest?.platform.color}
      />
      <Card
        label="Fastest growing"
        value={fastest ? fastest.platform.name : "—"}
        sub={fastest ? `${fastest.growth > 0 ? "+" : ""}${fastest.growth.toFixed(1)}% YoY` : "No YoY comparison available"}
        accent={fastest?.platform.color}
      />
      <Card label="Avg annual growth" value={avgGrowth != null ? `${avgGrowth > 0 ? "+" : ""}${avgGrowth.toFixed(1)}%` : "—"} sub="Across platforms with prior-year data" />
      <Card label="Platforms tracked" value={`${trackedCount} / ${PLATFORMS.length}`} sub="TikTok has no data in source" />
    </div>
  );
}
