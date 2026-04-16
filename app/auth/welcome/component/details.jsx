/** @format */
"use client";
import React from "react";
import Back from "../../../component/Back";
import Logo from "../../../component/Logo";
import "./details.css";
import { usePathname, useSearchParams } from "next/navigation";

export default function Details() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isChooseImage = searchParams.get("ChooseImage") === "true";

  return (
    <div className='welcome_details'>
      <Back />
      <Logo />
      <div className='welcome_title'>
        {pathname.includes("/auth/welcome") && isChooseImage ? (
          <h1>Choose your profile picture</h1>
        ) : (
          <h1>We'd like to get to know you better</h1>
        )}
        <p>please provide a few more details to create your account.</p>
      </div>
    </div>
  );
}
