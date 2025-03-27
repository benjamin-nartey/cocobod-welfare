"use client";
import React from "react";
import { DataTableDefault } from "@/components/table";
import useColumns from "./columns";
import { AllLoanRequestProps } from "@/types";

interface PendingLoansTableProps {
  data: AllLoanRequestProps[];
}

export default function PendingLoansTable({ data }: PendingLoansTableProps) {
  const columns = useColumns();
  return (
    <DataTableDefault columns={columns} data={data} withSearchFilter={true} />
  );
}
