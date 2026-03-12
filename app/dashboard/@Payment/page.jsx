/** @format */

"use client";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Back from "../../component/Back";
import PaymentHistory from "../component/PaymentHistory";
import Title from "./component/Title";
import "./style.css";

export default function page() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <>
      {pathname === "/dashboard" && searchParams.get("payment") === "true" && (
        <div className='dashboard_payment'>
          <Back />
          <PaymentHistory />
        </div>
      )}
    </>
  );
}
