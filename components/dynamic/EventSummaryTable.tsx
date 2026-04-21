"use client";

import Link from "next/link";
import { Download, ChevronRight } from "lucide-react";
import { DataTable, type ColumnDef } from "@/components/dynamic/DataTable";

export interface EventSummaryRow {
  id: string;
  eventName: string;
  engagementScore: number;
  leadsGenerated: number | string;
  revenueGenerated: string;
  href: string;
}

const columns: ColumnDef<EventSummaryRow>[] = [
  {
    key: "eventName",
    header: "Event Name",
    render: (row) => <span className="font-normal">{row.eventName}</span>,
  },
  {
    key: "engagementScore",
    header: "Engagement Score",
    render: (row) => row.engagementScore,
  },
  {
    key: "leadsGenerated",
    header: "Leads generated",
    render: (row) => row.leadsGenerated,
  },
  {
    key: "revenueGenerated",
    header: "Revenue generated",
    render: (row) => (
      <span
        className={
          String(row.revenueGenerated).startsWith("-")
            ? "text-red-500"
            : "text-neutral-900"
        }
      >
        {row.revenueGenerated}
      </span>
    ),
  },
  {
    key: "actions",
    header: "",
    render: (row) => (
      <div className="flex items-center gap-12 justify-end">
        <button
          type="button"
          aria-label="Download"
          className="text-primary hover:text-primary-dark transition-colors"
        >
          <Download className="h-5 w-5" strokeWidth={1.5} />
        </button>
        <Link
          href={row.href}
          aria-label="View event"
          className="border border-primary rounded-lg p-1.5 text-primary hover:bg-primary hover:text-white transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    ),
  },
];

interface EventSummaryTableProps {
  rows: EventSummaryRow[];
}

export function EventSummaryTable({ rows }: EventSummaryTableProps) {
  return <DataTable columns={columns} rows={rows} />;
}
