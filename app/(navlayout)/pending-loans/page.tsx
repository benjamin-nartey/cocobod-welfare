import React from "react";
import PendingLoansTable from "./pending-loans-table";
import { fetchData } from "@/lib/fetchData";
import { cookies } from "next/headers";
import { LoansRequestProps, UserProps } from "@/types";
import { checkUserPermission } from "@/lib/checkUserPermissions";
import { PERMISSIONS } from "@/lib/constants/permissions";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function PendingLoans() {
  const userUrl = `${BASE_URL}/user/me`;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const userData = (await fetchData(userUrl, accessToken)) as UserProps;

  const canGetAllLoans = checkUserPermission(userData, PERMISSIONS.GET_LOANS);

  const loanUrl = canGetAllLoans
    ? `${BASE_URL}/loans/pending-requests`
    : `${BASE_URL}/loans/requests/me`;

  const loanRequests = (await fetchData(
    loanUrl,
    accessToken
  )) as LoansRequestProps;

  return (
    <div className="w-full bg-[#f1ebe6] rounded-3xl p-2">
      <PendingLoansTable data={loanRequests.data} />
    </div>
  );
}
