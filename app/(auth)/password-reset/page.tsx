import PasswordResetComponents from "@/components/PasswordResetComponents";

import Image from "next/image";
import React from "react";

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
    <div className="w-full h-screen grid place-items-center bg-[#f1ebe6] ">
      <div className="lg:min-w-[35rem] md:min-w-[30rem] min-w-full rounded-3xl shadow-lg lg:p-6 md:p-4 p-2 bg-white">
        <div className="grid place-items-center mb-6">
          <Image width={100} height={100} src="/logo-cocobod.png" alt="logo" />
        </div>
        <PasswordResetComponents token={token as string} />
      </div>
    </div>
  );
}
