/** @format */

"use client";
import React from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Back from "../../component/Back";
import Main from "./component/Main";
import Title from "./component/Title";
import "./style.css";

export default function WalletPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <>
      {pathname === "/dashboard" && searchParams.get("wallet") === "true" && (
        <div className='bashboard_wallet'>
          <Back />
          <Title />
          <Main />
        </div>
      )}
    </>
  );
}
