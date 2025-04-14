import MetricCard from "@/components/MetricCard";

import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { SlBriefcase } from "react-icons/sl";

import { RadialChartComponent } from "@/components/RadialChart";

import { cookies } from "next/headers";
import { LoansRequestProps, UserProps } from "@/types";
import RecentlyApprovedLoanTable from "./recently-approved-loans";
import { fetchData } from "@/lib/fetchData";
import { PERMISSIONS } from "@/lib/constants/permissions";
import { canGetAllLoans } from "@/lib/canGetAllLoans";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const metadata: Metadata = {
  title: "Dashboard",
  description: "COCOBOD welfare Dashboard",
};

export default async function Dashboard() {
  const userUrl = `${BASE_URL}/user/me`;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const params = new URLSearchParams();
  params.append("status", "SIGNED");

  const pendingParams = new URLSearchParams();
  pendingParams.append("status", "STARTED");

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

  const pendingLoanUrl = canGetAllLoans(userData, PERMISSIONS.GET_LOANS)
    ? `${BASE_URL}/loans/pending-requests`
    : `${BASE_URL}/loans/requests/me?${pendingParams}`;

  const pendingLoanRequests = (await fetchData(
    pendingLoanUrl,
    accessToken
  )) as LoansRequestProps;

  const loanRequests = (await response.json()) as LoansRequestProps;

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <h2 className="text-lg font-medium">Overview</h2>
      </div>
      <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 place-items-center py-4 gap-4">
        <Link className="w-full" href="/pending-loans">
          <MetricCard
            color="bg-[#d399e3]"
            title="Pending loans"
            dataValue={`${pendingLoanRequests.data.length}`}
            trend={`${pendingLoanRequests.data.length} pending loans that needs to be approve`}
          >
            <LuChartNoAxesCombined size={25} className="text-white" />
          </MetricCard>
        </Link>

        <Link className="w-full" href="/approved-loans">
          <MetricCard
            color="bg-[#e79577]"
            title="Approved loans"
            dataValue={String(loanRequests.data.length)}
            trend={`${String(
              loanRequests.data.length
            )} loans approved in total`}
          >
            <SlBriefcase size={25} className="text-white" />
          </MetricCard>
        </Link>
      </div>

      <div className="w-full mt-4 flex lg:flex-row md:flex-col flex-col justify-between items-start gap-4">
        <div className="lg:w-[60%] md:w-full w-full">
          <div className="p-4 bg-[#f1ebe6] rounded-2xl">
            <div className="flex justify-between mb-2">
              <span className="font-bold">Recently approved loans</span>
            </div>
            <RecentlyApprovedLoanTable data={loanRequests.data} />
          </div>
        </div>
        <div className="lg:w-[37%] md:w-full w-full bg-[#f1ebe6] rounded-2xl p-2">
          <RadialChartComponent />
        </div>
      </div>
    </>
  );
}
