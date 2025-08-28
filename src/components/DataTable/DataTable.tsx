// src/components/DataTable/DataTable.tsx
import React from "react";
import type { DataTableProps} from "./types.ts";

export function DataTable<T>({
  data,
  columns,
  selectable = false,

  onRowSelect,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = React.useState<T[]>([]);

  const handleRowClick = (row: T) => {
    if (!selectable) return;

    const isSelected = selectedRows.includes(row);
    const newSelected = isSelected
      ? selectedRows.filter((r) => r !== row)
      : [...selectedRows, row];

    setSelectedRows(newSelected);
    onRowSelect?.(newSelected);
  };

  return (
    <table className="border-collapse border border-gray-300 w-full">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} className="border border-gray-300 p-2 text-left">
              {col.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr
            key={idx}
            className={`cursor-pointer ${
              selectedRows.includes(row) ? "bg-blue-100" : ""
            }`}
            onClick={() => handleRowClick(row)}
          >
            {columns.map((col) => (
              <td key={col.key} className="border border-gray-300 p-2">
                {String(row[col.dataIndex])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
