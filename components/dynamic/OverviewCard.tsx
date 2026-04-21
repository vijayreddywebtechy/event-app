"use client";

import { ArrowUp, ArrowDown } from "lucide-react";

export type TrendDirection = "up" | "down";

export interface OverviewCardData {
  id: string;
  label: string;
  value: string | number;
  trend: TrendDirection;
}

interface OverviewCardProps {
  card: OverviewCardData;
}

export function OverviewCard({ card }: OverviewCardProps) {
  const isUp = card.trend === "up";

  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm px-5 py-6 flex flex-col gap-3">
      <span className="text-sm text-neutral-500 leading-tight">{card.label}</span>
      <div className="flex items-center gap-2">
        {isUp ? (
          <ArrowUp className="h-6 w-6 text-emerald-500 shrink-0" strokeWidth={2.5} />
        ) : (
          <ArrowDown className="h-6 w-6 text-red-500 shrink-0" strokeWidth={2.5} />
        )}
        <span className="text-2xl md:text-3xl text-neutral-900 leading-none">
          {card.value}
        </span>
      </div>
    </div>
  );
}
