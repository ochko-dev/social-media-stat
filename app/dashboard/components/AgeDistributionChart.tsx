"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AgeBracket, getPlatform, getYear, estimateAgeUsers } from "../data";

const FEMALE_COLOR = "#DC2626";
const MALE_COLOR = "#2563EB";

type AgePlatform = "facebook" | "instagram";

export function AgeDistributionChart({ year }: { year: number }) {
  const [platformId, setPlatformId] = useState<AgePlatform>("facebook");
  const platform = getPlatform(platformId);
  const record = getYear(platform, year);
  const brackets = record?.ageBreakdown;

  const data = (brackets ?? []).map((b: AgeBracket) => ({
    range: b.range,
    female: b.femalePct,
    male: b.malePct,
    total: b.totalPct,
    femaleUsers: estimateAgeUsers(platform, year, b),
    maleUsers: b.malePct != null && record?.users != null ? Math.round((record.users * b.malePct) / 100) : null,
  }));

  const hasAnyData = data.some((d) => d.total != null);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Age distribution — {year}</h3>
        <div className="flex gap-1 rounded-lg bg-zinc-100 p-1 text-xs dark:bg-zinc-800">
          <button
            onClick={() => setPlatformId("facebook")}
            className={`rounded-md px-2 py-1 ${platformId === "facebook" ? "bg-white shadow-sm dark:bg-zinc-700" : "text-zinc-500"}`}
          >
            Facebook
          </button>
          <button
            onClick={() => setPlatformId("instagram")}
            className={`rounded-md px-2 py-1 ${platformId === "instagram" ? "bg-white shadow-sm dark:bg-zinc-700" : "text-zinc-500"}`}
          >
            Instagram
          </button>
        </div>
      </div>

      {!hasAnyData ? (
        <p className="py-10 text-center text-sm text-zinc-500">
          No age-breakdown data for {platform.name} in {year}.
        </p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} />
              <XAxis dataKey="range" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const row = payload[0]?.payload as (typeof data)[number];
                  if (row.total == null) {
                    return (
                      <div className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs shadow-md dark:border-zinc-700 dark:bg-zinc-800">
                        <div className="font-medium">{label}</div>
                        <div className="text-zinc-500">No data</div>
                      </div>
                    );
                  }
                  return (
                    <div className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs shadow-md dark:border-zinc-700 dark:bg-zinc-800">
                      <div className="mb-1 font-medium">
                        {label} · {row.total}% of audience
                      </div>
                      <div style={{ color: FEMALE_COLOR }}>
                        Female {row.female}% {row.femaleUsers != null ? `(${row.femaleUsers.toLocaleString()})` : ""}
                      </div>
                      <div style={{ color: MALE_COLOR }}>
                        Male {row.male}% {row.maleUsers != null ? `(${row.maleUsers.toLocaleString()})` : ""}
                      </div>
                    </div>
                  );
                }}
              />
              <Bar dataKey="female" stackId="gender" name="Female" fill={FEMALE_COLOR} radius={[0, 0, 0, 0]} />
              <Bar dataKey="male" stackId="gender" name="Male" fill={MALE_COLOR} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-2 flex items-center gap-4 text-xs text-zinc-600 dark:text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: FEMALE_COLOR }} /> Female
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: MALE_COLOR }} /> Male
            </span>
          </div>
          {record?.note && <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{record.note}</p>}
        </>
      )}
      <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
        Bar height = % of the platform&apos;s total audience in that age × gender group (not % within the bracket). User counts are estimated
        from each bracket&apos;s % applied to the platform&apos;s total users for {year}. Age data covers Facebook and Instagram, 2020–2025, only.
      </p>
    </div>
  );
}
