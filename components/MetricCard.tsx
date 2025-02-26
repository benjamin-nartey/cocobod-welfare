"use client";
import React from "react";

interface MetricCardProps {
  children: React.ReactNode;
  color: string;
  title: string;
  dataValue: string;
  trend: string;
}

export default function MetricCard({
  color,
  title,
  dataValue,
  trend,
  children,
}: MetricCardProps) {
  return (
    <div className="rounded-2xl w-full h-[13rem] bg-[#f1ebe6] p-4 flex flex-col items-start justify-start hover:translate-y-2 transition-all">
      <div
        className={`h-10 w-10 rounded-full ${color} flex justify-center items-center p-1 mb-8`}
      >
        {children}
      </div>
      <div className="flex flex-col justify-start items-start gap-2">
        <span className="text-sm text-gray-500">{title}</span>
        <span className="text-xl font-semibold">{dataValue}</span>
        <span className="text-gray-600 text-xs">{trend}</span>
      </div>
    </div>
  );
}
