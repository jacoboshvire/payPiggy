/** @format */

"use client";
import React from "react";
import Nav from "./component/Nav";
import "./style.css";

export default function layout({ Account, Home, Payment, Wallet }) {
  return (
    <div className='bashboard'>
      <div className='bashboard_container'>
        <Nav />
        {Home && Home}
        {Payment && Payment}
        {Wallet && Wallet}
        {Account && Account}
      </div>
    </div>
  );
}
