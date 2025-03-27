import React from "react";
import PendingLoansTable from "./pending-loans-table";
import { cookies } from "next/headers";
import { LoansRequestProps } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function PendingLoansDepartments() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const params = new URLSearchParams();
  params.append("status", "SIGNED");

  const loanUrl = `${BASE_URL}/loans?${params}`;

  const response = await fetch(loanUrl as string, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const loanRequests = (await response.json()) as LoansRequestProps;

  console.log({ loanRequests });

  return (
    <div className="w-full bg-[#f1ebe6] rounded-3xl p-2">
      <PendingLoansTable data={loanRequests.data} />
    </div>
  );
}
