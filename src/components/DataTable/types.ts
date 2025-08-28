// src/components/DataTable/types.ts
export type Column<T> = {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
};

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  selectable?: boolean;
  rowsPerPage?: number;
  onRowSelect?: (selectedRows: T[]) => void;
}
