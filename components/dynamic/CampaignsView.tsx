"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Megaphone, Pencil, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, type ColumnDef } from "@/components/dynamic/DataTable";

// --- Types ---

interface ScheduledCampaign {
  id: string;
  name: string;
  type: string;
  targetAudience: string;
  date: string;
  time: string;
}

interface CompletedCampaign {
  id: string;
  name: string;
  engagementScore: number;
  sent: number;
  opens: number;
  clicks: number;
}

// --- Mock data ---

const SCHEDULED: ScheduledCampaign[] = [
  { id: "s1", name: "The Compound Effect Conference", type: "SMS", targetAudience: "Attendees", date: "13 March 2026", time: "10:00" },
  { id: "s2", name: "Event reminder", type: "Email", targetAudience: "Registered users", date: "13 March 2026", time: "10:00" },
  { id: "s3", name: "2 Days to go", type: "SMS", targetAudience: "Registered users", date: "13 March 2026", time: "10:00" },
  { id: "s4", name: "3 Days to go", type: "SMS", targetAudience: "Invites", date: "13 March 2026", time: "10:00" },
  { id: "s5", name: "MoneyMind Summit conference", type: "Email", targetAudience: "Attendees", date: "13 March 2026", time: "10:00" },
];

const COMPLETED: CompletedCampaign[] = [
  { id: "c1", name: "The Compound Effect Conference", engagementScore: 89, sent: 300, opens: 267, clicks: 243 },
  { id: "c2", name: "Event reminder", engagementScore: 90, sent: 300, opens: 267, clicks: 267 },
  { id: "c3", name: "2 Days to go", engagementScore: 34, sent: 300, opens: 267, clicks: 267 },
  { id: "c4", name: "3 Days to go", engagementScore: 24, sent: 300, opens: 267, clicks: 267 },
  { id: "c5", name: "MoneyMind Summit conference", engagementScore: 36, sent: 300, opens: 267, clicks: 267 },
];

// --- Column definitions ---

const SCHEDULED_COLUMNS: ColumnDef<ScheduledCampaign>[] = [
  { key: "name", header: "Campaign name", render: (r) => r.name },
  { key: "type", header: "Type", render: (r) => r.type },
  { key: "targetAudience", header: "Target Audience", render: (r) => r.targetAudience },
  { key: "date", header: "Date", render: (r) => r.date },
  { key: "time", header: "Time", render: (r) => r.time },
  {
    key: "actions",
    header: "",
    render: () => (
      <button
        type="button"
        aria-label="Edit campaign"
        className="text-primary hover:text-primary/70 transition-colors"
      >
        <Pencil className="h-4 w-4" />
      </button>
    ),
  },
];

const COMPLETED_COLUMNS: ColumnDef<CompletedCampaign>[] = [
  { key: "name", header: "Campaign name", render: (r) => r.name },
  { key: "engagementScore", header: "Engagement Score", render: (r) => r.engagementScore },
  { key: "sent", header: "Sent", render: (r) => r.sent },
  { key: "opens", header: "Opens", render: (r) => r.opens },
  { key: "clicks", header: "Clicks", render: (r) => r.clicks },
];

// --- Pagination ---

function Pagination({
  current,
  total,
  onChange,
}: {
  current: number;
  total: number;
  onChange: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-1 pt-2">
      <button
        type="button"
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
        className="flex h-8 w-8 items-center justify-center rounded text-neutral-600 hover:bg-neutral-100 disabled:opacity-30 transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onChange(page)}
          className={[
            "flex h-8 w-8 items-center justify-center rounded text-sm transition-colors",
            page === current
              ? "bg-primary text-white font-medium"
              : "text-neutral-700 hover:bg-neutral-100",
          ].join(" ")}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        disabled={current === total}
        onClick={() => onChange(current + 1)}
        className="flex h-8 w-8 items-center justify-center rounded text-neutral-600 hover:bg-neutral-100 disabled:opacity-30 transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

// --- Main view ---

export default function CampaignsView() {
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const [completedPage, setCompletedPage] = React.useState(1);

  const filteredCompleted = COMPLETED.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="page-container py-14 space-y-10">

      {/* Scheduled Campaigns */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-medium text-neutral-950">Scheduled Campaigns</h2>
          <Button variant="outline" className="gap-2 shrink-0" onClick={() => router.push("/campaigns/new")}>
            <Megaphone className="h-4 w-4" />
            CREATE A CAMPAIGN
          </Button>
        </div>
        <DataTable columns={SCHEDULED_COLUMNS} rows={SCHEDULED} minWidth="640px" />
      </section>

      {/* Completed Campaigns */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-neutral-950">Completed campaigns</h2>

        {/* Search */}
        <div className="flex overflow-hidden rounded-lg border border-neutral-300 bg-white transition-colors hover:border-primary focus-within:border-primary">
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCompletedPage(1); }}
            placeholder="Enter your search here"
            className="flex-1 bg-transparent px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-500 outline-none"
          />
          <button
            type="button"
            aria-label="Search"
            className="flex items-center justify-center bg-primary px-4 text-white hover:bg-primary/90 transition-colors"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>

        <DataTable columns={COMPLETED_COLUMNS} rows={filteredCompleted} minWidth="640px" />

        <Pagination current={completedPage} total={3} onChange={setCompletedPage} />
      </section>

    </div>
  );
}
