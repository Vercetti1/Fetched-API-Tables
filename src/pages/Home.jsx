import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import axios from "axios";
import { useSelector } from "react-redux";
import { useMemo } from "react";

export default function Home() {
  const search = useSelector((state) => state.search.query);

  const { data = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      return res.data;
    },
  });

  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    return data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.username.toLowerCase().includes(search.toLowerCase()) ||
      item.address.city.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Username",
      accessorKey: "username",
    },
    {
      header: "City",
      accessorFn: (row) => row.address.city,
      cell: (info) => info.getValue(),
    },
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Users Table</h1>
      <table className="table-auto border w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-2 text-left">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
