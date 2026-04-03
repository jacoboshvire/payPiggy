/** @format */
"use client";
import React from "react";
import Details from "./component/details";
import "./style.css";
import { usePathname } from "next/navigation";

export default function layout({ Account, ChooseImage }) {
  const pathname = usePathname();

  return (
    <div className='welcome'>
      <Details />
      {Account && Account}
      {ChooseImage && ChooseImage}
    </div>
  );
}
