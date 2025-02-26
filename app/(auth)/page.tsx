import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "This is the login page for COCOBOD Warefare application",
};

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen text-3xl">
      Login
    </div>
  );
}
