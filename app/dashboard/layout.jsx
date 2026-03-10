"use client";
import React from "react";
import Nav from "./component/Nav";
import "./style.css";

export default function layout({ Account, Home, Payment, Wallet }) {
  return (
    <div className="bashboard">
      <Nav />
      {Home && Home}
      {Payment && Payment}
      {Wallet && Wallet}
      {Account && Account}
    </div>
  );
}
