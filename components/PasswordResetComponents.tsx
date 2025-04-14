"use client";
import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";

interface Token {
  token: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function PasswordResetComponents({ token }: Token) {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const router = useRouter();
  console.log({ token });
  const params = new URLSearchParams();
  params.append("token", token);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrMsg("");
    setLoading(true);
    try {
      const formData = new FormData(event.currentTarget);

      const payload = {
        password: formData.get("password") as string,
        confirmPassword: formData.get("confirmPassword") as string,
      };

      if (payload.password !== payload.confirmPassword)
        throw new Error("Passwords do not match");

      const response = await fetch(
        `${BASE_URL}/auth/reset-password?${params}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const data = await response.json();

        if (data?.statusCode === 500) throw new Error("Internal server error");
      }

      toast.success("Password reset successful", {
        description: "Your password has been reset successfuly",
        className: "green-400",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
      setErrMsg(`${error}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      <Input
        type="password"
        id="password"
        name="password"
        placeholder="New password"
      />
      <Input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Confirm password"
      />

      <span className="text-red-500 text-sm">{errMsg}</span>

      <Button
        className="bg-orangeAccent hover:bg-orangeAccent/75 w-full mt-2"
        type="submit"
      >
        {loading && <Spinner variant="small" />}
        {loading ? "Submiting..." : "Submit"}
      </Button>
    </form>
  );
}
