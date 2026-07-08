const NOTES = [
  "TikTok: no data of any kind was provided in the source dataset. It appears in filters/legends but every chart shows an empty state for it.",
  "Age distribution: only provided for Facebook and Instagram, 2020–2025 (no 2019, no other platform). It comes from a separate age/gender source than the main platform-stats paste, and for Instagram 2022 and 2025 that source's own totals/gender split differ slightly from the main figures (flagged inline on the chart) — the main figures remain the source of truth everywhere else on the page.",
  "YouTube has no gender split (female/male) reported for any year, and X is missing it for 2022 — gender bars show only the platforms/years with data.",
  "Growth % shown in charts/tables is computed directly from raw user counts (not the handful of stated-growth lines in the source, which sometimes repeat the same figure across two years).",
];

export function DataNotes() {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
      <h3 className="mb-2 text-sm font-semibold">Data notes</h3>
      <ul className="list-disc space-y-1 pl-4">
        {NOTES.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </div>
  );
}
