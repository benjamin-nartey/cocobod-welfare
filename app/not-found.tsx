import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unauthorized",
  description:
    "This is an unauthorized page, you have no permission to view this page",
};

export default function NotFound() {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="flex justify-center items-center gap-[30px]">
        <h1 className="inline-block text-[24px] font-medium ">404</h1>
        <div className="w-[1px] h-[49px] bg-white/60"></div>
        <h2 className="text-[14px] font-normal">Not Found</h2>
      </div>
    </div>
  );
}
