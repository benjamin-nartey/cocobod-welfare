import PasswordResetComponents from "@/components/PasswordResetComponents";
import { PasswordResetLottie } from "@/components/PasswordResetLottie";

import Image from "next/image";
import React from "react";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Password Reset",
  description:
    "This is the password-reset page for COCOBOD welfare application",
};

interface PasswordResetProps {
  searchParams: {
    token?: string;
  };
}

export default async function PasswordReset({
  searchParams,
}: PasswordResetProps) {
  const { token } = await searchParams;

  return (
    <div className="p-4 w-full h-screen grid place-items-center bg-[#f1ebe6] ">
      <div className="lg:min-w-[35rem] md:min-w-[30rem] min-w-full rounded-3xl shadow-lg lg:p-6 md:p-4 p-2 bg-white">
        <div className="flex flex-col items-center justify-center mb-8">
          <Image width={100} height={100} src="/logo-cocobod.png" alt="logo" />
          <h1 className="text-2xl font-bold">Ghana Cocoa Board</h1>
          <span>Welfare Application</span>
        </div>
        <div className="grid place-items-center mb-6">
          <PasswordResetLottie />
        </div>
        <PasswordResetComponents token={token as string} />
      </div>
    </div>
  );
}
