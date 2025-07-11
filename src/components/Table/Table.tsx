import React from "react";

type TableProps = {
  headers: string[];
  children: React.ReactNode;
};

export const Table: React.FC<TableProps> = ({ headers, children }) => (
  <table className="table-auto w-full border-collapse">
    <thead>
      <tr className="bg-gray-100">
        {headers.map((h) => (
          <th key={h} className="border px-2 py-1 text-center">
            {h}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);
