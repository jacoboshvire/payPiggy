"use client";
import React from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Back from "../../component/Back";

export default function page() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <>
      {pathname === "/dashboard" && searchParams.get("payment") === "true" && (
        <div className="dashboard_payment">
          <Back />
        </div>
      )}
    </>
  );
}
