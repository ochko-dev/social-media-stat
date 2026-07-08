"use client";

import { useState } from "react";
import { PLATFORMS, PlatformId } from "./data";
import { Filters, GenderFocus } from "./components/Filters";
import { KpiCards } from "./components/KpiCards";
import { PlatformComparisonChart } from "./components/PlatformComparisonChart";
import { GrowthLineChart } from "./components/GrowthLineChart";
import { MarketShareDonut } from "./components/MarketShareDonut";
import { GenderBars } from "./components/GenderBars";
import { UsersHeatmap } from "./components/UsersHeatmap";
import { GrowthRankingTable } from "./components/GrowthRankingTable";
import { AgeDistributionChart } from "./components/AgeDistributionChart";
import { Timeline } from "./components/Timeline";
import { SourcePanel } from "./components/SourcePanel";
import { DataNotes } from "./components/DataNotes";

export default function DashboardPage() {
  const [year, setYear] = useState(2025);
  const [activeIds, setActiveIds] = useState<PlatformId[]>(PLATFORMS.map((p) => p.id));
  const [genderFocus, setGenderFocus] = useState<GenderFocus>("both");

  const togglePlatform = (id: PlatformId) => {
    setActiveIds((curr) => (curr.includes(id) ? curr.filter((c) => c !== id) : [...curr, id]));
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 sm:px-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Mongolia Social Media Statistics</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">2019–2025 · Facebook, Instagram, YouTube, TikTok, X, LinkedIn</p>
      </div>

      <Filters
        year={year}
        setYear={setYear}
        activeIds={activeIds}
        togglePlatform={togglePlatform}
        genderFocus={genderFocus}
        setGenderFocus={setGenderFocus}
      />

      <KpiCards year={year} activeIds={activeIds} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PlatformComparisonChart year={year} activeIds={activeIds} />
        <MarketShareDonut year={year} />
      </div>

      <GrowthLineChart activeIds={activeIds} />

      <UsersHeatmap activeIds={activeIds} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <GenderBars year={year} activeIds={activeIds} genderFocus={genderFocus} />
        <GrowthRankingTable year={year} activeIds={activeIds} />
      </div>

      <AgeDistributionChart year={year} />

      {/* <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Timeline />
        <SourcePanel activeIds={activeIds} />
      </div> */}

      {/* <DataNotes /> */}
    </div>
  );
}
