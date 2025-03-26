"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const useColumns = (): ColumnDef<AllLoanRequestProps>[] => {
  return [
    // {
    //   accessorKey: "status",
    //   header: "Status",
    //   cell: ({ row }) => {
    //     const status = row.getValue("status") as string;

    //     const getStatusStyles = (status: string) => {
    //       switch (status.toLowerCase()) {
    //         case "success":
    //           return "bg-green-100 text-green-800 px-3 py-1 rounded-full";
    //         case "processing":
    //           return "bg-amber-100 text-amber-800 px-3 py-1 rounded-full";
    //         case "failed":
    //           return "bg-red-100 text-red-800 px-3 py-1 rounded-full";
    //         default:
    //           return "bg-gray-100 text-gray-800 px-3 py-1 rounded-full";
    //       }
    //     };

    //     return (
    //       <div className={`inline-block capitalize ${getStatusStyles(status)}`}>
    //         {status}
    //       </div>
    //     );
    //   },
    // },
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
      accessorKey: "employeeEmail",
      header: () => <div className="">Email</div>,
      cell: ({ row }) => {
        const data = row.original.employee; //row.getValue("employee") as EmployeeProps;
        return <div>{data?.user?.email}</div>;
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

    // {
    //   header: "Action",
    //   id: "actions",
    //   cell: ({ row }) => {
    //     // const id = row.original;

    //     return (
    //       <div className="flex justify-start items-center gap-2">
    //         <Button className="bg-orangeAccent text-white hover:bg-orangeAccent/75">
    //           View
    //         </Button>
    //         <Button className="bg-green-800 text-white hover:bg-green-800/75">Approve all</Button>
    //       </div>
    //     );
    //   },
    // },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const loanRequests = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => console.log(loanRequests.loanType)}
              >
                Approve
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                Reject
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};

export default useColumns;
