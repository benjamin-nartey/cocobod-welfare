"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function LoginComponet() {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    router.push("/dashboard");
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        type="email"
        name="email"
        id="email"
        placeholder="sheila23@gmail.com"
        className="px-2 py-4"
      />
      <Input
        type="password"
        name="password"
        id="password"
        placeholder="password12345"
        className="px-2 py-4"
      />
      <Link
        className="text-sm text-[#f7966f] hover:underline"
        href="/password-reset"
      >
        Forgot password?
      </Link>
      <Button type="submit" className="mt-4 bg-[#df5d29] hover:bg-[#df5d29]/75">
        Login
      </Button>
    </form>
  );
}
