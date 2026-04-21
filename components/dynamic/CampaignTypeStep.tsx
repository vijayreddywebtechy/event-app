"use client";

import * as React from "react";
import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export type CampaignType = "email" | "sms";

const OPTIONS: { type: CampaignType; title: string; description: string }[] = [
  { type: "email", title: "Email", description: "Send detailed announcements straight to Inbox" },
  { type: "sms", title: "SMS", description: "Send quick text updates directly to your guests" },
];

interface CampaignTypeStepProps {
  selected: CampaignType;
  onChange: (t: CampaignType) => void;
}

export function CampaignTypeStep({ selected, onChange }: CampaignTypeStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-neutral-950">Type of Communication</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {OPTIONS.map(({ type, title, description }) => {
          const isSelected = selected === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => onChange(type)}
              className={cn(
                "relative flex flex-col items-start gap-1 rounded-xl border-2 px-5 py-5 text-left transition-colors",
                isSelected
                  ? "border-primary bg-white"
                  : "border-neutral-200 bg-white hover:border-neutral-300",
              )}
            >
              <span className="absolute right-4 top-4">
                {isSelected ? (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                    <Check className="h-3 w-3" />
                  </span>
                ) : (
                  <Circle className="h-5 w-5 text-primary" />
                )}
              </span>
              <span className="text-base font-medium text-neutral-950 pr-7">{title}</span>
              <span className="text-sm text-neutral-600">{description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
