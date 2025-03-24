import type { Metadata } from "next";
import { cookies } from "next/headers";

import "../globals.css";

import NavLayout from "@/components/NavLayout";
import { fetchData } from "../lib/fetchData";

export const metadata: Metadata = {
  title: {
    template: "%s | Cocobod welfare application",
    default: "Cocobod welfare application",
  },
  description: "Cocobod welfare application",
  applicationName: "Cocobod welfare application",
};
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const url = `${BASE_URL}/user/me`;
  const user: UserProps | null = await fetchData(url, accessToken);

  return <NavLayout user={user}>{children}</NavLayout>;
}
