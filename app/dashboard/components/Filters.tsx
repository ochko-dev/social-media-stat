import { PLATFORMS, PlatformId, YEARS } from "../data";

export type GenderFocus = "both" | "female" | "male";

export function Filters({
  year,
  setYear,
  activeIds,
  togglePlatform,
  genderFocus,
  setGenderFocus,
}: {
  year: number;
  setYear: (y: number) => void;
  activeIds: PlatformId[];
  togglePlatform: (id: PlatformId) => void;
  genderFocus: GenderFocus;
  setGenderFocus: (g: GenderFocus) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center gap-2">
        <label className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Year</label>
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="rounded-lg border border-zinc-300 bg-white px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-800"
        >
          {YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Platforms</span>
        {PLATFORMS.map((p) => {
          const active = activeIds.includes(p.id);
          return (
            <button
              key={p.id}
              onClick={() => togglePlatform(p.id)}
              className="rounded-full border px-3 py-1 text-xs font-medium transition-colors"
              style={
                active
                  ? { backgroundColor: p.color, borderColor: p.color, color: "#fff" }
                  : { backgroundColor: "transparent", borderColor: "#d4d4d8", color: "#71717a" }
              }
            >
              {p.name}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <label className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Gender focus</label>
        <select
          value={genderFocus}
          onChange={(e) => setGenderFocus(e.target.value as GenderFocus)}
          className="rounded-lg border border-zinc-300 bg-white px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-800"
        >
          <option value="both">Both</option>
          <option value="female">Female share</option>
          <option value="male">Male share</option>
        </select>
      </div>
    </div>
  );
}
