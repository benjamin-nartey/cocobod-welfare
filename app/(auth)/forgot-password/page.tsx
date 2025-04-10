import ForgotPasswordComponents from "@/components/ForgotPasswordComponents";

import Image from "next/image";

export default function ForgetPassword() {
  return (
    <div className="w-full h-screen grid place-items-center bg-[#f1ebe6] ">
      <div className="lg:min-w-[35rem] md:min-w-[30rem] min-w-full rounded-3xl shadow-lg lg:p-6 md:p-4 p-2 bg-white">
        <div className="grid place-items-center mb-6">
          <Image width={100} height={100} src="/logo-cocobod.png" alt="logo" />
        </div>
        <ForgotPasswordComponents />
      </div>
    </div>
  );
}
