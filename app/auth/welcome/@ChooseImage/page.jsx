/** @format */
"use client";
import React from "react";
import { useSearchParams, usePathname } from "next/navigation";

export default function page() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  <>
    {
    pathname.includes("/auth/welcome") && searchParams.get("ChooseImage") === "true"&& (
      return <div>choose image</div>)
    }
  </>
}
