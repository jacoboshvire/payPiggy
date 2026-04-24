/** @format */

"use client";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Back from "../../component/Back";
import AccountLink from "./component/AccountLink";
import AcountDetail from "./component/acountDetail";
import "./style.css";

export default function Page() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <>
      {pathname.includes("/dashboard") &&
        searchParams.get("account") === "true" && (
          <div className='bashboard_account'>
            <Back />
            <AccountLink />
            <AcountDetail />
          </div>
        )}
    </>
  );
}
