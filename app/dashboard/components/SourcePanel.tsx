import { PLATFORMS, PlatformId } from "../data";

export function SourcePanel({ activeIds }: { activeIds: PlatformId[] }) {
  const active = PLATFORMS.filter((p) => activeIds.includes(p.id));
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50">Sources</h3>
      <ul className="flex flex-col gap-1 text-xs text-zinc-600 dark:text-zinc-400">
        {active.map((p) => (
          <li key={p.id}>
            <span className="font-medium" style={{ color: p.color }}>
              {p.name}:
            </span>{" "}
            {p.years.some((y) => y.users != null) ? "Not specified in provided data" : "No data provided"}
          </li>
        ))}
      </ul>
    </div>
  );
}
