import React from "react";

type TableRowProps = {
  cells: (string | React.ReactNode)[];
};

export const TableRow: React.FC<TableRowProps> = ({ cells }) => (
  <tr>
    {cells.map((cell, i) => (
      <td key={i} className="border px-2 py-1 text-center">
        {cell}
      </td>
    ))}
  </tr>
);
