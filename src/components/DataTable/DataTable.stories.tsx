import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { DataTable } from "./DataTable";
import type { Column, DataTableProps } from "./types";
 // ✅ fixed

// Example type
interface User {
  id: number;
  name: string;
  email: string;
}

// Columns for User
const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email", sortable: true },
];

// Sample data
const sampleData: User[] = [
  { id: 1, name: "Alice", email: "alice@mail.com" },
  { id: 2, name: "Bob", email: "bob@mail.com" },
  { id: 3, name: "Charlie", email: "charlie@mail.com" },
];

// Wrapper to handle selected rows
const UserDataTable = (args: DataTableProps<User>) => {
  const [selected, setSelected] = useState<User[]>([]);

  return (
    <div>
      <DataTable {...args} onRowSelect={setSelected} />
      <div className="mt-2 text-sm text-gray-600">
        Selected: {selected.map((s) => s.name).join(", ")}
      </div>
    </div>
  );
};

// Storybook meta
const meta: Meta<typeof UserDataTable> = {
  title: "Components/DataTable",
  component: UserDataTable,
};

export default meta;

type Story = StoryObj<typeof UserDataTable>;

// Default story
export const Default: Story = {
  render: (args) => <UserDataTable {...args} />,
  args: {
    data: sampleData,
    columns,
    selectable: true,
    rowsPerPage: 2,
  },
};
