import { PLATFORMS, PlatformId, YEARS, getYear } from "../data";

function hexToRgb(hex: string) {
  const bigint = parseInt(hex.replace("#", ""), 16);
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

export function UsersHeatmap({ activeIds }: { activeIds: PlatformId[] }) {
  const active = PLATFORMS.filter((p) => activeIds.includes(p.id));

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50">Users heatmap (color intensity normalized per platform row)</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              <th className="p-2 text-left font-medium text-zinc-500 dark:text-zinc-400">Platform</th>
              {YEARS.map((y) => (
                <th key={y} className="p-2 text-center font-medium text-zinc-500 dark:text-zinc-400">
                  {y}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {active.map((p) => {
              const values = p.years.map((y) => y.users).filter((v): v is number => v != null);
              const min = values.length ? Math.min(...values) : 0;
              const max = values.length ? Math.max(...values) : 0;
              const { r, g, b } = hexToRgb(p.color);
              return (
                <tr key={p.id}>
                  <td className="p-2 font-medium text-zinc-700 dark:text-zinc-300">{p.name}</td>
                  {YEARS.map((year) => {
                    const record = getYear(p, year);
                    const users = record?.users;
                    if (users == null) {
                      return (
                        <td key={year} className="p-2 text-center text-zinc-400">
                          <div className="mx-auto flex h-9 w-full items-center justify-center rounded-md border border-dashed border-zinc-300 dark:border-zinc-700">
                            —
                          </div>
                        </td>
                      );
                    }
                    const intensity = max === min ? 1 : (users - min) / (max - min);
                    const alpha = 0.15 + intensity * 0.75;
                    return (
                      <td key={year} className="p-2 text-center">
                        <div
                          className="mx-auto flex h-9 w-full items-center justify-center rounded-md text-[11px] font-medium"
                          style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${alpha})`, color: alpha > 0.5 ? "#fff" : "#3f3f46" }}
                          title={`${p.name} ${year}: ${users.toLocaleString()} users`}
                        >
                          {(users / 1000).toFixed(0)}K
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
