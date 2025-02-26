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
import { Clock } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { FaBalanceScale } from "react-icons/fa";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { SlBriefcase } from "react-icons/sl";
import PaymentTable from "./payment-table";
import { RadialChartComponent } from "@/components/RadialChart";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "COCOBOD Warefare Dashboard",
};

const data: PaymentProps[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
];

export default function Dashboard() {
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
      <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 place-items-center py-4 gap-4">
        <Link className="w-full" href="/revenue">
          <MetricCard
            color="bg-[#d399e3]"
            title="Total revenue"
            dataValue="$538,000"
            trend="12% increase from last month"
          >
            <LuChartNoAxesCombined size={25} className="text-white" />
          </MetricCard>
        </Link>

        <Link className="w-full" href="/projects">
          <MetricCard
            color="bg-[#e79577]"
            title="Projects"
            dataValue="220"
            trend="12% increase from last month"
          >
            <SlBriefcase size={25} className="text-white" />
          </MetricCard>
        </Link>

        <Link className="w-full" href="/time-log">
          <MetricCard
            color="bg-[#719ddc]"
            title="Time spent"
            dataValue="122 Hrs"
            trend="12% increase from last month"
          >
            <Clock size={25} className="text-white" />
          </MetricCard>
        </Link>

        <Link className="w-full" href="/resources">
          <MetricCard
            color="bg-[#f0c075]"
            title="Resources"
            dataValue="101"
            trend="12% increase from last month"
          >
            <FaBalanceScale size={25} className="text-white" />
          </MetricCard>
        </Link>
      </div>

      <div className="w-full mt-4 flex lg:flex-row md:flex-col flex-col justify-between items-start gap-4">
        <div className="lg:w-[60%] md:w-full w-full">
          <div className="p-4 bg-[#f1ebe6] rounded-2xl">
            <div className="flex justify-between mb-2">
              <span className="font-bold">Payment summary</span>
            </div>
            <PaymentTable data={data} />
          </div>
        </div>
        <div className="lg:w-[37%] md:w-full w-full bg-[#f1ebe6] rounded-2xl p-2">
          <RadialChartComponent />
        </div>
      </div>
    </>
  );
}
