// Mongolia social media statistics, transcribed verbatim from the source dataset provided by the user.
// Fields left `null` mean the source did not provide that figure for that year — never backfilled or estimated.

export type PlatformId = "facebook" | "instagram" | "x" | "linkedin" | "youtube" | "tiktok";

export const AGE_BRACKETS = ["13-17", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"] as const;
export type AgeBracketRange = (typeof AGE_BRACKETS)[number];

export type AgeBracket = {
  range: AgeBracketRange;
  /** % of the platform's total audience in this age bracket (not % within bracket) */
  totalPct: number | null;
  femalePct: number | null;
  malePct: number | null;
};

export type YearRecord = {
  year: number;
  users: number | null;
  penetrationPct: number | null; // % of total population
  shareOfInternetUsersPct: number | null; // % of internet users (aka "reach vs internet users" / "adult reach")
  femalePct: number | null;
  malePct: number | null;
  /** Growth % explicitly stated in the source narrative (may differ slightly from computed YoY due to rounding/methodology) */
  statedGrowthPct: number | null;
  /** Caveats about this specific data point, surfaced in the UI rather than silently smoothed over */
  note?: string;
  /** Age x gender breakdown, from a separate age-demographics source (Facebook/Instagram only, 2020-2025) */
  ageBreakdown?: AgeBracket[];
};

export type PlatformData = {
  id: PlatformId;
  name: string;
  color: string;
  years: YearRecord[];
};

const empty = (year: number): YearRecord => ({
  year,
  users: null,
  penetrationPct: null,
  shareOfInternetUsersPct: null,
  femalePct: null,
  malePct: null,
  statedGrowthPct: null,
});

/** Age bracket helper: totalPct is the bracket's % of the whole audience (matches the printed total under each bracket in the source cards). */
const ab = (range: AgeBracketRange, totalPct: number, femalePct: number, malePct: number): AgeBracket => ({ range, totalPct, femalePct, malePct });
const naAb = (range: AgeBracketRange): AgeBracket => ({ range, totalPct: null, femalePct: null, malePct: null });

// Age x gender breakdown cards, source separate from the main platform-stats paste (Facebook/Instagram only, 2020-2025).
const FACEBOOK_AGE: Record<number, AgeBracket[]> = {
  2025: [naAb("13-17"), ab("18-24", 21.5, 11.7, 9.8), ab("25-34", 31.7, 16.4, 15.3), ab("35-44", 20.8, 10.8, 10), ab("45-54", 12.7, 6.7, 6), ab("55-64", 8.2, 4.7, 3.6), ab("65+", 5.1, 3.1, 2)],
  2024: [naAb("13-17"), ab("18-24", 25.9, 14.1, 11.8), ab("25-34", 28.8, 14.7, 14.1), ab("35-44", 20.3, 10.5, 9.8), ab("45-54", 12.3, 6.6, 5.8), ab("55-64", 8, 4.6, 3.4), ab("65+", 4.6, 2.8, 1.8)],
  2023: [ab("13-17", 0.4, 0.2, 0.2), ab("18-24", 28.3, 15.5, 12.8), ab("25-34", 27.6, 14, 13.6), ab("35-44", 19.8, 10.3, 9.5), ab("45-54", 12.1, 6.5, 5.6), ab("55-64", 7.7, 4.5, 3.2), ab("65+", 4.2, 2.5, 1.7)],
  2022: [ab("13-17", 8.5, 4.8, 3.7), ab("18-24", 24.7, 13.3, 11.4), ab("25-34", 27.1, 13.8, 13.3), ab("35-44", 18.3, 9.4, 8.9), ab("45-54", 11.2, 6.2, 5), ab("55-64", 6.9, 4.1, 2.8), ab("65+", 3.4, 2, 1.4)],
  2021: [ab("13-17", 10.2, 5.5, 4.7), ab("18-24", 26.5, 13.8, 12.7), ab("25-34", 27.9, 13.9, 14), ab("35-44", 16.4, 8.5, 7.9), ab("45-54", 10.1, 5.6, 4.6), ab("55-64", 6, 3.6, 2.4), ab("65+", 2.9, 1.7, 1.2)],
  2020: [ab("13-17", 8.8, 4.6, 4.2), ab("18-24", 25.4, 13.1, 12.3), ab("25-34", 30, 15, 15), ab("35-44", 16.9, 8.8, 8.1), ab("45-54", 10.4, 5.8, 4.6), ab("55-64", 5.8, 3.5, 2.3), ab("65+", 2.7, 1.5, 1.2)],
};

const INSTAGRAM_AGE: Record<number, AgeBracket[]> = {
  2025: [naAb("13-17"), ab("18-24", 31.7, 18.2, 13.5), ab("25-34", 39.9, 22.6, 17.4), ab("35-44", 18.7, 11.3, 7.4), ab("45-54", 6.3, 4.2, 2.1), ab("55-64", 2, 1.4, 0.6), ab("65+", 1.3, 0.8, 0.5)],
  2024: [naAb("13-17"), ab("18-24", 37.6, 22.3, 15.3), ab("25-34", 36.1, 20.7, 15.4), ab("35-44", 17.6, 10.8, 6.8), ab("45-54", 5.6, 3.8, 1.8), ab("55-64", 1.7, 1.2, 0.5), ab("65+", 1.3, 0.8, 0.5)],
  2023: [ab("13-17", 0.6, 0.4, 0.2), ab("18-24", 42.3, 25.9, 16.5), ab("25-34", 34, 19.9, 14.1), ab("35-44", 15.6, 9.8, 5.8), ab("45-54", 4.8, 3.3, 1.5), ab("55-64", 1.4, 1, 0.4), ab("65+", 1.3, 0.8, 0.5)],
  2022: [ab("13-17", 11.4, 7.3, 4.1), ab("18-24", 38.2, 22.7, 15.5), ab("25-34", 32.4, 18.9, 13.4), ab("35-44", 12.4, 7.8, 4.5), ab("45-54", 3.5, 2.4, 1), ab("55-64", 1, 0.7, 0.3), ab("65+", 1.2, 0.7, 0.5)],
  2021: [ab("13-17", 13.3, 8, 5.3), ab("18-24", 40, 22.9, 17.2), ab("25-34", 31.4, 17.9, 13.5), ab("35-44", 10.4, 6.4, 4), ab("45-54", 2.8, 1.9, 0.9), ab("55-64", 0.8, 0.6, 0.3), ab("65+", 1.2, 0.6, 0.5)],
  2020: [ab("13-17", 10.6, 6.5, 4), ab("18-24", 40.2, 23.8, 16.4), ab("25-34", 33, 19.3, 13.7), ab("35-44", 10.6, 6.8, 3.7), ab("45-54", 3.2, 2.2, 1), ab("55-64", 1, 0.7, 0.3), ab("65+", 1.5, 0.8, 0.6)],
};

export const PLATFORMS: PlatformData[] = [
  {
    id: "facebook",
    name: "Facebook",
    color: "#1877F2",
    years: [
      { year: 2025, users: 3178000, penetrationPct: 92, shareOfInternetUsersPct: 89.6, femalePct: 53.3, malePct: 46.7, statedGrowthPct: null, ageBreakdown: FACEBOOK_AGE[2025] },
      { year: 2024, users: 3010100, penetrationPct: 87.8, shareOfInternetUsersPct: 89.6, femalePct: 53.3, malePct: 46.7, statedGrowthPct: null, ageBreakdown: FACEBOOK_AGE[2024] },
      { year: 2023, users: 2905700, penetrationPct: 84.7, shareOfInternetUsersPct: 79.7, femalePct: 53.5, malePct: 46.5, statedGrowthPct: null, ageBreakdown: FACEBOOK_AGE[2023] },
      { year: 2022, users: 2702500, penetrationPct: 74.5, shareOfInternetUsersPct: 116, femalePct: 53.6, malePct: 46.4, statedGrowthPct: null, ageBreakdown: FACEBOOK_AGE[2022] },
      { year: 2021, users: 2981800, penetrationPct: 87, shareOfInternetUsersPct: 124, femalePct: 52.5, malePct: 47.5, statedGrowthPct: null, ageBreakdown: FACEBOOK_AGE[2021] },
      { year: 2020, users: 2602000, penetrationPct: 75.9, shareOfInternetUsersPct: 95.5, femalePct: 52.3, malePct: 47.7, statedGrowthPct: null, ageBreakdown: FACEBOOK_AGE[2020] },
      { year: 2019, users: 2230000, penetrationPct: 65.1, shareOfInternetUsersPct: 100, femalePct: 52.9, malePct: 47.1, statedGrowthPct: null, note: "No age-breakdown card was provided for 2019." },
    ],
  },
  {
    id: "instagram",
    name: "Instagram",
    color: "#E4405F",
    years: [
      {
        year: 2025,
        users: 1344500,
        penetrationPct: 29.6,
        shareOfInternetUsersPct: 46.8,
        femalePct: 59.4,
        malePct: 40.6,
        statedGrowthPct: null,
        ageBreakdown: INSTAGRAM_AGE[2025],
        note: "The age-breakdown card's own gender split (58.5% F / 41.5% M) differs from the main figure above by ~0.9pp — likely a different snapshot date. Main figure kept as the source of truth for gender charts; age bars use the card's own numbers so its brackets still sum correctly.",
      },
      { year: 2024, users: 1122300, penetrationPct: 32.7, shareOfInternetUsersPct: 46.8, femalePct: 59.4, malePct: 40.6, statedGrowthPct: null, ageBreakdown: INSTAGRAM_AGE[2024] },
      { year: 2023, users: 1023300, penetrationPct: 22.6, shareOfInternetUsersPct: 26.8, femalePct: 60.9, malePct: 39.1, statedGrowthPct: null, ageBreakdown: INSTAGRAM_AGE[2023] },
      {
        year: 2022,
        users: 854900,
        penetrationPct: 25.5,
        shareOfInternetUsersPct: 39.6,
        femalePct: 62.2,
        malePct: 37.8,
        statedGrowthPct: null,
        ageBreakdown: INSTAGRAM_AGE[2022],
        note: "The age-breakdown card reports a different total (866,500 users) and gender split (60.6% F / 39.4% M) than the main figures above. Main figures kept as the source of truth for users/gender charts; age bars use the card's own numbers so its brackets still sum correctly.",
      },
      { year: 2021, users: 898700, penetrationPct: 26.2, shareOfInternetUsersPct: 33.3, femalePct: 58.3, malePct: 41.7, statedGrowthPct: null, ageBreakdown: INSTAGRAM_AGE[2021] },
      { year: 2020, users: 672000, penetrationPct: 19.6, shareOfInternetUsersPct: 19.1, femalePct: 60.3, malePct: 39.7, statedGrowthPct: null, ageBreakdown: INSTAGRAM_AGE[2020] },
      { year: 2019, users: 414000, penetrationPct: 12.1, shareOfInternetUsersPct: 18.2, femalePct: 61.8, malePct: 38.2, statedGrowthPct: null, note: "No age-breakdown card was provided for 2019." },
    ],
  },
  {
    id: "x",
    name: "X (Twitter)",
    color: "#111111",
    years: [
      { year: 2025, users: 114000, penetrationPct: 3.3, shareOfInternetUsersPct: 4.8, femalePct: 33.9, malePct: 66.1, statedGrowthPct: -11.4, note: "Stated growth (-11.4%) is for 2024→2025 per source." },
      { year: 2024, users: 129000, penetrationPct: 3.3, shareOfInternetUsersPct: 4.8, femalePct: 33.9, malePct: 66.1, statedGrowthPct: -11.4, note: "Source repeats the 2024→2025 -11.4% growth line against this year too; treat as the same single data point." },
      { year: 2023, users: 151000, penetrationPct: 4.4, shareOfInternetUsersPct: 5.2, femalePct: 27.8, malePct: 72.2, statedGrowthPct: 14.8, note: "Source flags this growth figure as unstable data." },
      { year: 2022, users: 131500, penetrationPct: 3.9, shareOfInternetUsersPct: 6.1, femalePct: null, malePct: null, statedGrowthPct: null, note: "Gender split not reliable/available for this year per source." },
      { year: 2021, users: 73600, penetrationPct: 2.2, shareOfInternetUsersPct: 3.7, femalePct: 18.9, malePct: 81.1, statedGrowthPct: null, note: "Gender split extrapolated per source, subject to fluctuation." },
      { year: 2020, users: 52000, penetrationPct: 1.6, shareOfInternetUsersPct: 2.4, femalePct: 30.5, malePct: 69.5, statedGrowthPct: null },
      { year: 2019, users: 44000, penetrationPct: 1.4, shareOfInternetUsersPct: 2.0, femalePct: 21, malePct: 79, statedGrowthPct: null },
    ],
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    color: "#0A66C2",
    years: [
      { year: 2025, users: 363500, penetrationPct: 9.4, shareOfInternetUsersPct: 15.0, femalePct: 46, malePct: 54, statedGrowthPct: 13.8, note: "Stated growth (+13.8%) is for 2024→2025 per source." },
      { year: 2024, users: 327200, penetrationPct: 9.4, shareOfInternetUsersPct: 15.0, femalePct: 46, malePct: 54, statedGrowthPct: 13.8, note: "Source repeats the 2024→2025 +13.8% growth line against this year too; treat as the same single data point." },
      { year: 2023, users: 288900, penetrationPct: 7.6, shareOfInternetUsersPct: 9.0, femalePct: 45.9, malePct: 54.1, statedGrowthPct: 8.3 },
      { year: 2022, users: 258400, penetrationPct: 7.2, shareOfInternetUsersPct: 11.1, femalePct: 47.1, malePct: 52.9, statedGrowthPct: null },
      { year: 2021, users: 241300, penetrationPct: 6.7, shareOfInternetUsersPct: 10.9, femalePct: 45.2, malePct: 54.8, statedGrowthPct: null },
      { year: 2020, users: 220200, penetrationPct: 6.4, shareOfInternetUsersPct: 9.1, femalePct: 42.9, malePct: 57.1, statedGrowthPct: null },
      { year: 2019, users: 201200, penetrationPct: 5.9, shareOfInternetUsersPct: 7.7, femalePct: 43, malePct: 57, statedGrowthPct: null },
    ],
  },
  {
    id: "youtube",
    name: "YouTube",
    color: "#FF0000",
    years: [
      { year: 2025, users: 2310000, penetrationPct: 67.8, shareOfInternetUsersPct: 76.7, femalePct: null, malePct: null, statedGrowthPct: 3.1 },
      { year: 2024, users: 2240000, penetrationPct: 65.3, shareOfInternetUsersPct: 76.9, femalePct: null, malePct: null, statedGrowthPct: 3.7 },
      { year: 2023, users: 2160000, penetrationPct: 63.5, shareOfInternetUsersPct: 56.6, femalePct: null, malePct: null, statedGrowthPct: 1.9 },
      { year: 2022, users: 2120000, penetrationPct: 63.2, shareOfInternetUsersPct: 98.2, femalePct: null, malePct: null, statedGrowthPct: 5.5 },
      { year: 2021, users: 2010000, penetrationPct: 58.6, shareOfInternetUsersPct: 74.5, femalePct: null, malePct: null, statedGrowthPct: 16.9 },
      { year: 2020, users: 1720000, penetrationPct: 50.2, shareOfInternetUsersPct: 48.9, femalePct: null, malePct: null, statedGrowthPct: 8.9 },
      { year: 2019, users: 1580000, penetrationPct: 46.1, shareOfInternetUsersPct: 69.3, femalePct: null, malePct: null, statedGrowthPct: null },
    ],
  },
  {
    id: "tiktok",
    name: "TikTok",
    color: "#000000",
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019].map(empty),
  },
];

export const YEARS = [2019, 2020, 2021, 2022, 2023, 2024, 2025];

/** Mongolia country-level digital overview — only 2022 was provided in the source. */
export const COUNTRY_OVERVIEW: Record<number, { population: number; internetUsers: number; internetPenetrationPct: number; socialMediaUsers: number; socialMediaPenetrationPct: number; mobileConnections: number; mobileConnectionsPct: number }> = {
  2022: {
    population: 3350000,
    internetUsers: 2160000,
    internetPenetrationPct: 64.4,
    socialMediaUsers: 2850000,
    socialMediaPenetrationPct: 85.0,
    mobileConnections: 4620000,
    mobileConnectionsPct: 137.8,
  },
};

export function getPlatform(id: PlatformId): PlatformData {
  const p = PLATFORMS.find((p) => p.id === id);
  if (!p) throw new Error(`Unknown platform ${id}`);
  return p;
}

export function getYear(platform: PlatformData, year: number): YearRecord | undefined {
  return platform.years.find((y) => y.year === year);
}

/** Year-over-year growth %, computed directly from consecutive raw user counts (not the sparse stated-growth lines). */
export function computeYoYGrowth(platform: PlatformData, year: number): number | null {
  const curr = getYear(platform, year);
  const prev = getYear(platform, year - 1);
  if (!curr?.users || !prev?.users) return null;
  return ((curr.users - prev.users) / prev.users) * 100;
}

/** Compound annual growth rate between the earliest and latest years with real user data. */
export function computeCAGR(platform: PlatformData): number | null {
  const withUsers = platform.years.filter((y) => y.users != null).sort((a, b) => a.year - b.year);
  if (withUsers.length < 2) return null;
  const first = withUsers[0];
  const last = withUsers[withUsers.length - 1];
  const yearsSpan = last.year - first.year;
  if (yearsSpan <= 0 || !first.users || !last.users) return null;
  return (Math.pow(last.users! / first.users!, 1 / yearsSpan) - 1) * 100;
}

export function getMarketShare(year: number): { id: PlatformId; name: string; color: string; users: number }[] {
  const rows = PLATFORMS.map((p) => ({ platform: p, record: getYear(p, year) }))
    .filter((r) => r.record?.users != null);
  const total = rows.reduce((sum, r) => sum + (r.record!.users as number), 0);
  if (total === 0) return [];
  return rows.map((r) => ({ id: r.platform.id, name: r.platform.name, color: r.platform.color, users: r.record!.users as number }));
}

/** Estimated users in an age bracket, derived from the platform's canonical (dataset) user count so it stays consistent with every other chart. */
export function estimateAgeUsers(platform: PlatformData, year: number, bracket: AgeBracket): number | null {
  const users = getYear(platform, year)?.users;
  if (users == null || bracket.totalPct == null) return null;
  return Math.round(users * (bracket.totalPct / 100));
}
