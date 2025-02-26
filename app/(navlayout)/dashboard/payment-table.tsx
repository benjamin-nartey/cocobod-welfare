"use client";
import { DataTable } from "@/components/data-table";
import React from "react";
import useColumns from "./columns";

interface PaymentTableProps {
  data: PaymentProps[];
}

export default function PaymentTable({ data }: PaymentTableProps) {
  const columns = useColumns();
  return <DataTable columns={columns} data={data} />;
}
