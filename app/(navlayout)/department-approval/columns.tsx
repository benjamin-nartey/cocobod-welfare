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
  ];
};

export default useColumns;
