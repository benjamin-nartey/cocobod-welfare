import React from "react";
import PendingLoansTable from "./pending-loans-table";
import { fetchData } from "@/lib/fetchData";
import { cookies } from "next/headers";
import { AllLoanRequestProps, UserProps } from "@/types";
import { checkUserPermission } from "@/lib/checkUserPermissions";
import { PERMISSIONS } from "@/lib/constants/permissions";

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
  const userUrl = `${BASE_URL}/user/me`;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const userData = (await fetchData(userUrl, accessToken)) as UserProps;

  const canGetAllLoans = checkUserPermission(userData, PERMISSIONS.GET_LOANS);

  // const loanUrl = canGetAllLoans
  //   ? `${BASE_URL}/loans/pending-requests`
  //   : `${BASE_URL}/loans/requests/me`;

  // console.log({ canGetAllLoans });
  console.log({ id });
  console.log(typeof loanType);

  let loanUrl;
  if (canGetAllLoans) {
    loanUrl = `${BASE_URL}/loans/department/${id}`;
  }

  // const loanRequests = (await fetchData(
  //   loanUrl as string,
  //   accessToken
  // )) as LoansRequestProps;

  const response = await fetch(loanUrl as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ loanType }),
  });

  const loanRequests = (await response.json()) as AllLoanRequestProps[];

  console.log({ loanRequests });

  return (
    <div className="w-full bg-[#f1ebe6] rounded-3xl p-2">
      <PendingLoansTable data={loanRequests} />
    </div>
  );
}
