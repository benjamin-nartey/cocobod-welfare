"use client";
import { DataTable } from "@/components/data-table-custom";
import React from "react";
import useColumns from "./columns";
import { AllLoanRequestProps } from "@/types";

interface RecentlyApprovedLoanTableProps {
  data: AllLoanRequestProps[];
}

export default function RecentlyApprovedLoanTable({
  data,
}: RecentlyApprovedLoanTableProps) {
  const columns = useColumns();
  return <DataTable columns={columns} data={data} />;
}
