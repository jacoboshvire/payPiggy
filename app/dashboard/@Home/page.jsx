/** @format */

"use client";
import React from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function page() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <>
      {pathname === "/dashboard" && searchParams.toString() === "" && (
        <div className='dashboard_home'>page</div>
      )}
    </>
  );
}
