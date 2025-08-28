import React, { useState } from "react";
import InputField from "./components/InputField/InputField";
import { DataTable } from "./components/DataTable/DataTable";
import type { Column } from "./components/DataTable/types";//ghhhjjbubgui

interface User {
  id: number;
  name: string;
  email: string;
}

const userData: User[] = [
  { id: 1, name: "Alice", email: "alice@mail.com" },
  { id: 2, name: "Bob", email: "bob@mail.com" },
  { id: 3, name: "Charlie", email: "charlie@mail.com" },
  { id: 4, name: "David", email: "david@mail.com" },
  { id: 5, name: "Eva", email: "eva@mail.com" },
  { id: 6, name: "Frank", email: "frank@mail.com" },
];

 const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email", sortable: true },
];

const App: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [inputValue, setInputValue] = useState("");
  const [selectedRows, setSelectedRows] = useState<User[]>([]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"} min-h-screen p-6`}>
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Theme Toggle */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">React UI Components Demo</h1>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition"
          >
            Toggle {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>

        {/* InputField Demo */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">InputField Component</h2>
          <InputField
            label="Email"
            placeholder="Enter your email"
            helperText="We will never share your email"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            clearable
            variant="outlined"
            size="md"
          />

          <InputField
            label="Password"
            placeholder="Enter your password"
            type="password"
            showPasswordToggle
            variant="filled"
            size="lg"
          />

          <InputField
            label="Username"
            placeholder="Enter username"
            errorMessage={inputValue.length === 0 ? "Username is required" : ""}
            invalid={inputValue.length === 0}
            variant="ghost"
            size="sm"
          />
        </section>

        {/* DataTable Demo */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">DataTable Component</h2>
          <DataTable<User>
            data={userData}
            columns={columns}
            selectable
            onRowSelect={setSelectedRows}
            rowsPerPage={3}
          />
          {selectedRows.length > 0 && (
            <div className="mt-2 text-sm text-indigo-600">
              Selected: {selectedRows.map((row) => row.name).join(", ")}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default App;
