"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Spinner from "./Spinner";
import { LoginProps, TokensProps } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function LoginComponet() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setErrMsg("");

    try {
      const formData = new FormData(event.currentTarget);

      const login: LoginProps = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };

      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login),
      });

      if (!response.ok) {
        const data = await response.json();
        if (
          data?.statusCode === 403 &&
          data?.message === "Wrong email/password"
        ) {
          setErrMsg(data?.message);
        }
      }

      const data: TokensProps = await response.json();

      await fetch("/api/set-cookie/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessToken: data.tokens.accessToken,
          refreshToken: data.tokens.refreshToken,
        }),
      });

      const from =
        new URLSearchParams(window.location.search).get("from") || "/dashboard";

      router.push(from);
    } catch (error) {
      console.error(error);
      // setErrMsg(`${error?.message}`)
    } finally {
      setLoading(false);
    }
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

      <span className="text-sm text-red-500">{errMsg}</span>
      <Link
        className="text-sm text-[#f7966f] hover:underline"
        href="/password-reset"
      >
        Forgot password?
      </Link>
      <Button type="submit" className="mt-4 bg-[#df5d29] hover:bg-[#df5d29]/75">
        {loading && <Spinner variant="small" />}
        {loading ? "Loging..." : "Login"}
      </Button>
    </form>
  );
}
