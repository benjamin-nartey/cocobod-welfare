"use client";
import React from "react";

import RequestLoanForm from "@/components/RequestLoanForm";

import LottieVideo from "@/components/LottieVideo";

export default function RequestLoan() {
  return (
    <div>
      <div className="w-full">
        <div className="w-full flex items-start gap-4 justify-center">
          <div className="flex-[1] lg:block md:hidden hidden h-[60vh] bg-[#f1ebe6] rounded-3xl p-4">
            <LottieVideo />
          </div>

          <div className="flex-1">
            <RequestLoanForm />
          </div>
        </div>
      </div>
    </div>
  );
}


