"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";

import { AllLoanRequestProps } from "@/types";
const useColumns = (): ColumnDef<AllLoanRequestProps>[] => {
  return [
    {
      accessorKey: "employeeName",
      header: () => <div className="">Name</div>,
      cell: ({ row }) => {
        // const data = row.getValue("employee") as EmployeeProps;
        const data = row.original.employee;
        return <div>{data?.user?.name}</div>;
      },
    },
    {
      accessorKey: "employeeId",
      header: () => <div className="">Staff ID</div>,
      cell: ({ row }) => {
        // const data = row.getValue("employee") as EmployeeProps;
        const data = row.original.employee;
        return <div>{data?.staffNumber}</div>;
      },
    },
    {
      accessorKey: "employeeType",
      header: () => <div className="">Employee Type</div>,
      cell: ({ row }) => {
        // const data = row.getValue("employee") as EmployeeProps;
        const data = row.original?.employee;
        return <div>{data?.employeeType}</div>;
      },
    },
    { accessorKey: "loanType", header: "Loan type" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;

        const getStatusStyles = (status: string) => {
          switch (status.toLowerCase()) {
            case "signed":
              return "bg-green-100 text-green-800 px-3 py-1 rounded-full";
            case "approve":
              return "bg-amber-100 text-amber-800 px-3 py-1 rounded-full";
            case "review":
              return "bg-red-100 text-red-800 px-3 py-1 rounded-full";
            case "confirm":
              return "bg-[#2DCCFF]/20 text-[#000] px-3 py-1 rounded-full";
            case "recommend":
              return "bg-blue-100 text-blue-800 px-3 py-1 rounded-full";
            case "acknowledge":
              return "bg-violet-100 text-violet-800 px-3 py-1 rounded-full";
            case "started":
              return "bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full";
            default:
              return "bg-gray-100 text-gray-800 px-3 py-1 rounded-full";
          }
        };

        return (
          <div className={`inline-block capitalize ${getStatusStyles(status)}`}>
            {status}
          </div>
        );
      },
    },
    {
      accessorKey: "comments",
      header: () => <div className="">Comments</div>,
      cell: ({ row }) => {
        // const comments = row.getValue("comments") as CommentsProps;
        const comments = row.original.comments;
        return <div>{comments?.message}</div>;
      },
    },
  ];
};

export default useColumns;
