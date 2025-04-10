"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { DepartmentProps } from "@/types";
import Link from "next/link";
import { toast } from "sonner";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
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
        const handleApproveAll = async () => {
          const TokeResponse = await fetch("/api/get-cookie?name=accessToken");
          const accessToken = await TokeResponse.json();

          try {
            const response = await fetch(
              `${BASE_URL}/loans/approve/department/${id}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${accessToken?.value}`,
                },
                body: JSON.stringify({ action: "APPROVE" }),
              }
            );

            if (response.ok) {
              toast(`All loans Approved for ${row.original.name}`);
            }
          } catch (error) {
            console.log(error);
          }
        };

        return (
          <div className="flex justify-start items-center gap-2">
            <Link href={`/loans/departments/${loanType}/${id}`}>
              <Button className="bg-orangeAccent text-white hover:bg-orangeAccent/75">
                View
              </Button>
            </Link>
            <Button
              onClick={handleApproveAll}
              className="bg-green-800 text-white hover:bg-green-800/75"
            >
              Approve all
            </Button>
          </div>
        );
      },
    },
  ];
};

export default useColumns;
