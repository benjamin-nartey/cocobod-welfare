import React from "react";
import PendingLoansTable from "./pending-loans-table";
import { cookies } from "next/headers";
import { LoansRequestProps, UserProps } from "@/types";
import { fetchData } from "@/lib/fetchData";
import { PERMISSIONS } from "@/lib/constants/permissions";
import { canGetAllLoans } from "@/lib/canGetAllLoans";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Approved Loans",
  description:
    "This is the approved-loans page for COCOBOD welfare application",
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function ApprovedLoans() {
  const userUrl = `${BASE_URL}/user/me`;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const params = new URLSearchParams();
  params.append("status", "SIGNED");

  const userData = (await fetchData(userUrl, accessToken)) as UserProps;

  const loanUrl = canGetAllLoans(userData, PERMISSIONS.GET_LOANS)
    ? `${BASE_URL}/loans?${params}`
    : `${BASE_URL}/loans/requests/me?${params}`;

  const response = await fetch(loanUrl as string, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const loanRequests = (await response.json()) as LoansRequestProps;

  return (
    <div className="w-full bg-[#f1ebe6] rounded-3xl p-2">
      <PendingLoansTable data={loanRequests.data} />
    </div>
  );
}
