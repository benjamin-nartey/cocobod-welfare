import HeroImage from "@/components/HeroImage";
import LoginComponent from "@/components/LoginComponent";

import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Login",
  description: "This is the login page for COCOBOD welfare application",
};

export default function Login() {
  return (
    <div className="w-screen h-screen bg-[#f8e1d8] relative">
      <div className="w-full h-full custom-clip-path bg-[#df5d29]"></div>
      <div className="absolute w-[90%] h-4/5 bg-white left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] flex rounded-3xl shadow-md">
        <div className="flex-[0.5] h-full bg-[#f8e1d8] p-4 lg:flex md:flex hidden flex-col items-end justify-end">
          <HeroImage />
        </div>
        <div className="flex-1 h-full">
          <div className="w-full h-full flex items-center justify-center">
            <div className="p-4 lg:min-w-[35rem] md:min-w-[30rem] min-w-full">
              <h1 className="mb-8 text-4xl font-medium text-[#f39069]">
                Welcome
              </h1>
              <LoginComponent />
            </div>
          </div>
        </div>

        <div className="absolute left-4 top-4">
          <div className="flex gap-2 justify-start items-center bg-inherit">
            <Image width={50} height={50} src="/logo-cocobod.png" alt="logo" />
            <div className="text-black flex flex-col items-start justify-center">
              <span className="text-[clamp(0.5rem,0.8vw,1rem)] whitespace-nowrap">
                Ghana Cocoa Board
              </span>
              <span className="text-[clamp(0.5rem,0.8vw,1rem)] whitespace-nowrap text-black/50">
                welfare Application
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
