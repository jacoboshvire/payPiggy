/** @format */

"use client";
import React from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Back from "../../component/Back";
import AccountLink from "./component/AccountLink";
import AcountDetail from "./component/AcountDetail";
import "./style.css";

export default function page() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <>
      {pathname === "/dashboard" && searchParams.get("account") === "true" && (
        <div className='bashboard_account'>
          <Back />
        </div>
      )}
    </>
  );
}
