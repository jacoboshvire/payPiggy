/** @format */
"use client";
import React from "react";
import { useSearchParams, usePathname } from "next/navigation";

export default function page() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  return (
    <>
      {pathname.includes("/auth/welcome") && searchParams.get("ChooseImage") === "true" && (
        <div>choose image</div>
      )}
    </>
  );
}
