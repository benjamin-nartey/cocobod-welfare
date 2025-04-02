import MetricCard from "@/components/MetricCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Clock } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
// import { FaBalanceScale } from "react-icons/fa";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { SlBriefcase } from "react-icons/sl";

import { RadialChartComponent } from "@/components/RadialChart";

import { cookies } from "next/headers";
import { LoansRequestProps } from "@/types";
import RecentlyApprovedLoanTable from "./recently-approved-loans";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const metadata: Metadata = {
  title: "Dashboard",
  description: "COCOBOD welfare Dashboard",
};

export default async function Dashboard() {
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
  return (
    <>
      <div className="w-full flex justify-between items-center">
        <h2 className="text-lg font-medium">Overview</h2>
        <Select>
          <SelectTrigger className="w-[180px] rounded-3xl focus-within:ring-transparent focus-visible:ring-transparent">
            <SelectValue placeholder="Select activity" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Activity</SelectLabel>
              <SelectItem value="last30Days">Last 30 days</SelectItem>
              <SelectItem value="last3Months">Last 3 months</SelectItem>
              <SelectItem value="last6Months">Last 6 months</SelectItem>
              <SelectItem value="last12Months">Last 12 months</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 place-items-center py-4 gap-4">
        <Link className="w-full" href="/pending-loans">
          <MetricCard
            color="bg-[#d399e3]"
            title="Pending loans"
            dataValue="150"
            trend="120 pending loans that needs you approval"
          >
            <LuChartNoAxesCombined size={25} className="text-white" />
          </MetricCard>
        </Link>

        <Link className="w-full" href="/approved-loans">
          <MetricCard
            color="bg-[#e79577]"
            title="Approved loans"
            dataValue="220"
            trend="220 loans approved in total"
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
