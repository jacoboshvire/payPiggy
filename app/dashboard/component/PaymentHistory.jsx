/** @format */
"use client";
import { type } from "os";
import { useState, useEffect } from "react";

export default function PaymentHistory() {
  const paymentDate = [
    {
      name: "samuel Ateeq",
      profile:
        "https://res.cloudinary.com/dr0yyqvj6/image/upload/v1768045411/odljnvt8thtadwd27i5m.png",
      type: "sent",
      amount: "45",
    },
    {
      name: "Ross Getmoney",
      profile:
        "https://res.cloudinary.com/dr0yyqvj6/image/upload/v1765672997/i92u2nhuybbyr2rinfog.jpg",
      type: "sent",
    },
  ];
  return <div>PaymentHistory</div>;
}
