/** @format */

"use client";
import React from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import "./style.css";
import Card from "./component/Card";

export default function page() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <>
      {pathname === "/dashboard" && searchParams.toString() === "" && (
        <div className='dashboard_home'></div>
      )}
    </>
  );
}
