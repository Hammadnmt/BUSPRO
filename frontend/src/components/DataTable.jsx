import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useGetBusesQuery } from "../features/bus/busSlice";

export default function NewTable() {
  const { data, isLoading } = useGetBusesQuery();
  const columns = [
    { header: "Bus number", key: "bus_no" },
    { header: "Total Seats", key: "total_seats" },
  ];
  console.log(data);
  return (
    <div className="card">
      <DataTable
        value={data}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        // paginatorLeft={paginatorLeft}
        // paginatorRight={paginatorRight}
      >
        {columns.map((column, index) => (
          <Column
            key={index}
            field={column.key}
            header={column.header}
            style={{ width: "25%" }}
          ></Column>
        ))}
      </DataTable>
    </div>
  );
}
