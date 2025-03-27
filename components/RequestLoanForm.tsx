"use client";
import React, { FormEvent, useState } from "react";
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
import { LoanProps } from "@/types";

import { LoanType } from "@/lib/constants/loanType";
import { LoanTypeEnum } from "@/lib/constants/enums";
import Spinner from "./Spinner";
import { toast } from "sonner";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function RequestLoanForm() {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrMsg("");

    try {
      const formData = new FormData(event.currentTarget);
      const payload: LoanProps = {
        loanType: formData.get("loanType") as LoanTypeEnum,
        comments: formData.get("comments") as LoanTypeEnum,
      };

      if (!payload.loanType) {
        setErrMsg("Please select loan type");
        return;
      }
      const TokeResponse = await fetch("/api/get-cookie?name=accessToken");
      const accessToken = await TokeResponse.json();

      const response = await fetch(`${BASE_URL}/loans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken?.value}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast("Loan application successful");
      }

      console.log({ response });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#f1ebe6] h-[70vh] p-4 rounded-3xl">
      <form
        className="flex flex-col justify-between h-full "
        onSubmit={handleSubmit}
      >
        <div>
          <Select required name="loanType">
            <SelectTrigger className="w-[180px] rounded-3xl focus-within:ring-transparent focus-visible:ring-transparent">
              <SelectValue placeholder="Select loan type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Loan types</SelectLabel>
                {LoanType.map((loan, id) => (
                  <SelectItem className="capitalize" key={id} value={loan}>
                    {loan.replace("_", " ").toLowerCase()}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col">
          <Textarea
            className="bg-[#fff] rounded-3xl p-4"
            rows={10}
            placeholder="Add your comments here..."
            name="comments"
          />
          <span className="text-sm text-red-500 mt-1">{errMsg}</span>
          <Button
            className="mt-8 bg-orangeAccent hover:bg-orangeAccent/75"
            type="submit"
          >
            {loading && <Spinner variant="small" />}
            {loading ? "Submiting..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}
