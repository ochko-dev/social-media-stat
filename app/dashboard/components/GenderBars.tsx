import { PLATFORMS, PlatformId, getYear } from "../data";
import { GenderFocus } from "./Filters";

export function GenderBars({ year, activeIds, genderFocus }: { year: number; activeIds: PlatformId[]; genderFocus: GenderFocus }) {
  const rows = PLATFORMS.filter((p) => activeIds.includes(p.id))
    .map((p) => ({ platform: p, record: getYear(p, year) }))
    .filter((r) => r.record?.femalePct != null && r.record?.malePct != null) as {
    platform: (typeof PLATFORMS)[number];
    record: NonNullable<ReturnType<typeof getYear>>;
  }[];

  const missing = PLATFORMS.filter((p) => activeIds.includes(p.id) && !rows.some((r) => r.platform.id === p.id));

  const sorted = [...rows].sort((a, b) => {
    if (genderFocus === "male") return (b.record.malePct as number) - (a.record.malePct as number);
    return (b.record.femalePct as number) - (a.record.femalePct as number);
  });

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50">Gender distribution — {year}</h3>
      {sorted.length === 0 ? (
        <p className="py-6 text-center text-sm text-zinc-500">No gender data for the selected platforms/year.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {sorted.map(({ platform, record }) => (
            <div key={platform.id}>
              <div className="mb-1 flex items-center justify-between text-xs font-medium text-zinc-700 dark:text-zinc-300">
                <span>{platform.name}</span>
                <span>
                  {record.femalePct}% F / {record.malePct}% M
                </span>
              </div>
              <div className="flex h-4 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div
                  className="h-full"
                  style={{ width: `${record.femalePct}%`, backgroundColor: platform.color, opacity: genderFocus === "male" ? 0.35 : 1 }}
                />
                <div
                  className="h-full"
                  style={{ width: `${record.malePct}%`, backgroundColor: "#a1a1aa", opacity: genderFocus === "female" ? 0.35 : 1 }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {missing.length > 0 && (
        <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
          No gender data provided for {missing.map((p) => p.name).join(", ")} in {year}.
        </p>
      )}
    </div>
  );
}
