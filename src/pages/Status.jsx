import { useQuery } from "@tanstack/react-query";
import services from "../data/services.json";
import { useMemo } from "react";
import { useSelector } from "react-redux";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

// Simulate fetch
const fetchServices = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(services);
    }, 1000);
  });
};

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("name", {
    header: "Service Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("lastUpdated", {
    header: "Last Updated",
    cell: (info) => info.getValue(),
  }),
];

export default function Status() {
  const searchQuery = useSelector((state) => state.search.query);

  const { data, isLoading, error } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  const table = useReactTable({
    data: filteredData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <p className="p-4">Loading Services...</p>;
  if (error) return <p className="p-4 text-red-500">Error loading services</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Service Status</h2>
      <table className="table-auto w-full border border-gray-300">
        <thead className="bg-gray-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-2 border border-gray-300 text-left"
                >
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
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="p-2 border border-gray-200"
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
