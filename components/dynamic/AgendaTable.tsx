"use client";

import * as React from "react";
import { DataTable, type ColumnDef } from "@/components/dynamic/DataTable";

export interface AgendaRowData {
  id: string;
  session: string;
  description: string;
  speaker: string;
  date: string;
  time: string;
}

const COLUMNS: ColumnDef<AgendaRowData>[] = [
  { key: "session", header: "Session", render: (r) => r.session },
  { key: "description", header: "Description", render: (r) => r.description || "—" },
  { key: "speaker", header: "Speaker", render: (r) => r.speaker },
  { key: "date", header: "Date", render: (r) => r.date },
  { key: "time", header: "Time", render: (r) => r.time },
];

export function AgendaTable({ rows }: { rows: AgendaRowData[] }) {
  return <DataTable columns={COLUMNS} rows={rows} />;
}
