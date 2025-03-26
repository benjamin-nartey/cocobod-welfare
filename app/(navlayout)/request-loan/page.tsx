"use client";
import React from "react";

import RequestLoanForm from '@/components/RequestLoanForm'

import LottieVideo from "@/components/LottieVideo";

export default function RequestLoan() {
  return (
    <div>
      <div className="w-full">
        <div className="w-full flex items-start gap-4 justify-center">
          <div className="flex-[1] h-[60vh] bg-[#f1ebe6]">
            <LottieVideo />
          </div>

          <div className="flex-1">
            <RequestLoanForm/>
          </div>
        </div>
      </div>
    </div>
  );
}

// import React from 'react';
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// const App = () => {
//   return (
//     <DotLottieReact
//       src="https://lottie.host/c328f6d5-7b55-4237-939d-2036e3637612/La07qPyjMY.lottie"
//       loop
//       autoplay
//     />
//   );
// };
