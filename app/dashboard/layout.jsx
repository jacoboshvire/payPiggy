"use client";
import React from "react";

export default function layout({ Account, Home, Payment, Wallet }) {
  return (
    <div>
      {Home}
      {Account}
    </div>
  );
}
