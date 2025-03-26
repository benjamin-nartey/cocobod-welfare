"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { DepartmentProps } from "@/types";
import Link from "next/link";

const useColumns = (): ColumnDef<DepartmentProps>[] => {
  return [
    {
      accessorKey: "name",
      header: () => <div className="">Department</div>,
    },
    {
      header: "Action",
      id: "actions",
      cell: ({ row }) => {
        const id = row.original.id;
        const loanType = row.original?.loanType;

        return (
          <div className="flex justify-start items-center gap-2">
            <Link href={`/loans/departments/${loanType}/${id}`}>
              <Button className="bg-orangeAccent text-white hover:bg-orangeAccent/75">
                View
              </Button>
            </Link>
            <Button className="bg-green-800 text-white hover:bg-green-800/75">
              Approve all
            </Button>
          </div>
        );
      },
    },
    // {
    //   id: "actions",
    //   enableHiding: false,
    //   cell: ({ row }) => {
    //     const payment = row.original;

    //     return (
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button variant="ghost" className="h-8 w-8 p-0">
    //             <span className="sr-only">Open menu</span>
    //             <MoreHorizontal />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end">
    //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //           <DropdownMenuItem
    //             onClick={() => navigator.clipboard.writeText(payment.id)}
    //           >
    //             Copy payment ID
    //           </DropdownMenuItem>
    //           <DropdownMenuSeparator />
    //           <DropdownMenuItem>View customer</DropdownMenuItem>
    //           <DropdownMenuItem>View payment details</DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     );
    //   },
    // },
  ];
};

export default useColumns;
