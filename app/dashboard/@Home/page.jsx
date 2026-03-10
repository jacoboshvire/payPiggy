"use client";
import React from "react";
import { usePathname, useParams, useRouter } from "next/navigation";

export default function page() {
  const pathname = usePathname();
  return (
    <>
      {pathname === "/dashboard" && searchParams.toString() === "" && (
        <div>page</div>
      )}
    </>
  );
}
