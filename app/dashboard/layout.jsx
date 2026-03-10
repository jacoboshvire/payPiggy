"use client";
import React from "react";
import Nav from "./component/Nav";

export default function layout({ Account, Home, Payment, Wallet }) {
  return (
    <div className="bashboard">
      <Nav />
    </div>
  );
}
