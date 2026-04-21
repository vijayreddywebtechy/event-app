"use client";

import { useState } from "react";
import { UserCircle2, ChevronLeft, ChevronRight } from "lucide-react";

interface Attendee {
  id: string;
  name: string;
}

interface AttendeesListProps {
  attendees: Attendee[];
  pageSize?: number;
}

export function AttendeesList({
  attendees,
  pageSize = 11,
}: AttendeesListProps) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(attendees.length / pageSize);
  const slice = attendees.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        {slice.map((a) => (
          <div
            key={a.id}
            className="flex items-center gap-3 bg-white rounded-xl border border-neutral-200 p-4"
          >
            <UserCircle2
              className="h-8 w-8 text-primary shrink-0"
              strokeWidth={1.2}
            />
            <span className="text-sm md:text-base font-medium text-neutral-900">
              {a.name}
            </span>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-1 pt-2">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="p-1.5 rounded-xl text-white disabled:opacity-30 hover:bg-white/10 transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPageChange(p)}
          className={`h-8 w-8 rounded text-sm font-medium transition-colors ${
            p === page
              ? "bg-white text-primary-dark"
              : "text-white hover:bg-white/10"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="p-1.5 rounded-xl text-white disabled:opacity-30 hover:bg-white/10 transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}
