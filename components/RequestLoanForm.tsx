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
      console.log({ accessToken });
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
    <form onSubmit={handleSubmit}>
      <Select required name="loanType">
        <SelectTrigger className="w-[180px] rounded-3xl focus-within:ring-transparent focus-visible:ring-transparent">
          <SelectValue placeholder="Select loan type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Loan types</SelectLabel>
            {LoanType.map((loan, id) => (
              <SelectItem key={id} value={loan}>
                {loan}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="grid gap-2 mt-20">
        <Textarea
          className="bg-[#f1ebe6]"
          rows={10}
          placeholder="Type your message here."
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
  );
}
