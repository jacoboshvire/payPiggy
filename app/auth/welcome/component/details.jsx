/** @format */
"use client";
import React from "react";
import Back from "../../../component/Back";
import Logo from "../../../component/Logo";
import "./details.css";
import { usePathname } from "next/navigation";

export default function Details() {
  const pathname = usePathname();
  return (
    <div className='welcome_details'>
      <Back />
      <Logo />
      <div className='welcome_title'>
        {pathname === "/auth/welcome?ChooseImage=true" ? (
          <h1>Choose your profile picture</h1>
        ) : (
          <h1>We’d like to get to know you better</h1>
        )}
        <p>please provide a few more details to create your account.</p>
      </div>
    </div>
  );
}
