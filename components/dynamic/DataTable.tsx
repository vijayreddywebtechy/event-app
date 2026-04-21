"use client";

import * as React from "react";

export interface ColumnDef<T> {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
}

interface DataTableProps<T extends { id: string }> {
  columns: ColumnDef<T>[];
  rows: T[];
  minWidth?: string;
}

export function DataTable<T extends { id: string }>({
  columns,
  rows,
  minWidth = "600px",
}: DataTableProps<T>) {
  if (rows.length === 0) return null;

  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-200">
      <table className="w-full border-collapse text-sm" style={{ minWidth }}>
        <thead>
          <tr className="bg-neutral-900 text-white">
            {columns.map((col, i) => (
              <th
                key={col.key}
                className={[
                  "px-4 py-5 text-left text-sm font-normal",
                  i === 0 ? "rounded-tl-xl" : "",
                  i === columns.length - 1 ? "rounded-tr-xl" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.id}
              className={i < rows.length - 1 ? "border-b border-neutral-200" : ""}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-4 text-neutral-900">
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
