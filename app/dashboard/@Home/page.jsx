"use client";
import React from "react";

export default function page() {
  return (
    <>
      {pathname === "/dashboard" && searchParams.toString() === "" && (
        <div>page</div>
      )}
    </>
  );
}
