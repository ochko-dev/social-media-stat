const MILESTONES = [{ date: "Mar 2020", label: "WHO declares COVID-19 a global pandemic" }];

export function Timeline() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-50">Timeline</h3>
      <p className="mb-3 text-xs text-zinc-500 dark:text-zinc-400">
        Illustrative only — no Mongolia-specific sourced event dates (TikTok launch, local regulation changes, etc.) were provided in the
        dataset. Replace with your own sourced events.
      </p>
      <ol className="flex flex-col gap-2 border-l-2 border-zinc-200 pl-4 dark:border-zinc-700">
        {MILESTONES.map((m) => (
          <li key={m.label} className="text-sm">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">{m.date}</span>{" "}
            <span className="text-zinc-500 dark:text-zinc-400">— {m.label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
