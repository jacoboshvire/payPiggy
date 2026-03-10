"use client";
import React from "react";
import { usePathname, useParams, useRouter } from "next/navigation";

export default function page() {
  return (
    <>
      {pathname === "/dashboard" && searchParams.toString() === "" && (
        <div>page</div>
      )}
    </>
  );
}
