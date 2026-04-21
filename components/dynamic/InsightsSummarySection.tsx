"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Download, ChevronRight, ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import CustomSelect, { type SelectOption } from "@/components/dynamic/CustomSelect";

export interface InsightsSummaryRow {
  id: string;
  eventName: string;
  engagementScore: number;
  leadsGenerated: number | string;
  revenueGenerated: string;
  href: string;
}

const PAGE_SIZE = 5;

const SORT_OPTIONS = [
  { value: "name", label: "Event Name" },
  { value: "score", label: "Engagement Score" },
  { value: "leads", label: "Leads" },
  { value: "revenue", label: "Revenue" },
];

interface InsightsSummarySectionProps {
  rows: InsightsSummaryRow[];
}

export function InsightsSummarySection({ rows }: InsightsSummarySectionProps) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SelectOption | null>(SORT_OPTIONS[0]);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return rows.filter((r) => r.eventName.toLowerCase().includes(q));
  }, [rows, query]);

  const sorted = useMemo(() => {
    const key = sort?.value;
    return [...filtered].sort((a, b) => {
      if (key === "score") return b.engagementScore - a.engagementScore;
      if (key === "leads") return Number(b.leadsGenerated) - Number(a.leadsGenerated);
      if (key === "revenue") return b.revenueGenerated.localeCompare(a.revenueGenerated);
      return a.eventName.localeCompare(b.eventName);
    });
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const slice = sorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="space-y-4">
      {/* Search + Sort row */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Enter your search here"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            className="pr-14 border-neutral-200 placeholder:text-neutral-400"
          />
          <button
            type="button"
            className="absolute right-0 top-0 bottom-0 bg-primary rounded-r-lg px-4 text-white flex items-center justify-center"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
        <div className="shrink-0 min-w-[160px]">
          <CustomSelect
            value={sort}
            onChange={(opt) => { setSort(opt as SelectOption | null); setPage(1); }}
            options={SORT_OPTIONS}
            placeholder="Sort by"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white">
        <table className="w-full border-collapse text-sm" style={{ minWidth: "600px" }}>
          <thead>
            <tr className="bg-neutral-900 text-white">
              <th className="px-4 py-5 text-left font-normal rounded-tl-xl">Event Name</th>
              <th className="px-4 py-5 text-left font-normal">Engagement Score</th>
              <th className="px-4 py-5 text-left font-normal">Leads generated</th>
              <th className="px-4 py-5 text-left font-normal">Revenue generated</th>
              <th className="px-4 py-5 text-left font-normal rounded-tr-xl" />
            </tr>
          </thead>
          <tbody>
            {slice.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-neutral-500">
                  No events found.
                </td>
              </tr>
            ) : (
              slice.map((row, i) => (
                <tr
                  key={row.id}
                  className={i < slice.length - 1 ? "border-b border-neutral-200" : ""}
                >
                  <td className="px-4 py-4 text-neutral-900">{row.eventName}</td>
                  <td className="px-4 py-4 text-neutral-900">{row.engagementScore}</td>
                  <td className="px-4 py-4 text-neutral-900">{row.leadsGenerated}</td>
                  <td className={`px-4 py-4 ${String(row.revenueGenerated).startsWith("-") ? "text-red-500" : "text-neutral-900"}`}>
                    {row.revenueGenerated}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-12 justify-end">
                      <button type="button" aria-label="Download" className="text-primary hover:text-primary-dark transition-colors">
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
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            type="button"
            disabled={safePage === 1}
            onClick={() => setPage(safePage - 1)}
            className="h-8 w-8 rounded-xl flex items-center justify-center text-white disabled:opacity-40 hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          {pages.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              className={`h-8 w-8 rounded-xl text-sm font-medium transition-colors ${
                p === safePage
                  ? "bg-primary text-white"
                  : "bg-white text-neutral-700 hover:bg-white/90"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            disabled={safePage === totalPages}
            onClick={() => setPage(safePage + 1)}
            className="h-8 w-8 rounded-xl flex items-center justify-center text-white disabled:opacity-40 hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
}
