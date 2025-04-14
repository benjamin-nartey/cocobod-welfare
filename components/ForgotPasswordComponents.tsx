"use client";

import React, { FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { useRouter } from "next/navigation";

import { toast } from "sonner";
import Spinner from "./Spinner";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function ForgotPasswordComponents() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(false);

    try {
      const formData = new FormData(event.currentTarget);

      const payload = {
        email: formData.get("email") as string,
      };

      const response = await fetch(`${BASE_URL}/auth/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast("Password reset link has been sent to your email");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      <Input
        type="email"
        id="email"
        name="email"
        placeholder="Please enter your mail"
      />

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
