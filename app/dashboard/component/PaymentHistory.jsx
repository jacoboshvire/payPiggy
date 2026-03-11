/** @format */
"use client";
import { type } from "os";
import { useState, useEffect } from "react";
import Image from "next/image";

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
      amount: "900",
    },
  ];
  return (
    <div className='paymentHistory'>
      <div className='paymentHistory_title'>
        <h1>Payment History</h1>
      </div>
      <div className='paymentHistory_lists'>
        {paymentDate.map((data, index) => {
          return (
            <div className='paymentHistory_item' key={index}>
              <div className='paymentHistory_item_image'>
                <Image
                  src={data.profile}
                  alt={data.name}
                  height={100}
                  width={100}
                />
              </div>
              <div className='paymentHistory_item_name'>
                <p>{data.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
