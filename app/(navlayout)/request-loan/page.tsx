"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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
            <form>
              <Select>
                <SelectTrigger className="w-[180px] rounded-3xl focus-within:ring-transparent focus-visible:ring-transparent">
                  <SelectValue placeholder="Select loan type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Loan types</SelectLabel>
                    <SelectItem value="fuelLoan">Fuel loan</SelectItem>
                    <SelectItem value="carLoan">Car loan</SelectItem>
                    <SelectItem value="studiesLoan">Studies loan</SelectItem>
                    <SelectItem value="propertyLoan">Property Loan</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <div className="grid gap-2 mt-20">
                <Textarea
                  className="bg-[#f1ebe6]"
                  rows={10}
                  placeholder="Type your message here."
                />
                <Button
                  className="mt-8 bg-orangeAccent hover:bg-orangeAccent/75"
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </form>
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
