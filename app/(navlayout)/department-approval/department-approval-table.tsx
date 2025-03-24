"use client";

import React from "react";
import useColumns from "./columns";
import { DataTableDefault } from "@/components/table";

interface DepartmentApprovalTableProps {
  data: DepartmentProps[];
}

export default function DepartmentApprovalTable({
  data,
}: DepartmentApprovalTableProps) {
  const columns = useColumns();
  return <DataTableDefault columns={columns} data={data} />;
}
