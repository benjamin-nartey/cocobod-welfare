import React from "react";
import PendingLoansTable from "./pending-loans-table";
import { cookies } from "next/headers";
import { AllLoanRequestProps } from "@/types";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: " All Pending Loans Departments",
  description:
    "This is the all-pending-loans-departments page for COCOBOD welfare application",
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type Params = {
  params: {
    id: string;
    loanType: string;
  };
};

export default async function PendingLoansDepartments(Params: Params) {
  const param = await Params.params;
  const { id, loanType } = param;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const loanUrl = `${BASE_URL}/loans/department/${id}`;

  const response = await fetch(loanUrl as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ loanType }),
  });

  const loanRequests = (await response.json()) as AllLoanRequestProps[];

  return (
    <div className="w-full bg-[#f1ebe6] rounded-3xl p-2">
      <PendingLoansTable data={loanRequests} />
    </div>
  );
}
