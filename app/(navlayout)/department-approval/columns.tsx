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

const useColumns = (): ColumnDef<DepartmentProps>[] => {
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
      accessorKey: "name",
      header: () => <div className="">Department</div>,
    },
    {
      header: "Action",
      id: "actions",
      cell: ({ row }) => {
        // const id = row.original;

        return (
          <div className="flex justify-start items-center gap-2">
            <Button className="bg-orangeAccent text-white hover:bg-orangeAccent/75">
              View
            </Button>
            <Button className="bg-green-800 text-white hover:bg-green-800/75">Approve all</Button>
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
