/** @format */
"use client";
import React from "react";
import Details from "./component/details";
import "./style.css";
import { usePathname, useRouter } from "next/navigation";

export default function layout({ Account, ChooseImage }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/auth/welcome") {
    router.push("/auth/welcome?Account=true");
  }

  return (
    <div className='welcome'>
      <Details />
      {Account && Account}
      {ChooseImage && ChooseImage}
    </div>
  );
}
