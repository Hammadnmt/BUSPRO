import React from "react";

export default function TableHead() {
  return (
    <thead className="bg-indigo-600 text-white">
      <tr>
        {columns.map((col, index) => (
          <th key={index} className="px-6 py-3 text-left">
            {col.header}
          </th>
        ))}
        <th className="px-6 py-3 text-left">Action</th>
      </tr>
    </thead>
  );
}
