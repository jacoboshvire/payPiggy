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
              {/* name and image container */}
              <div className='paymentHistory_item_nameAndImage'>
                <div className='paymentHistory_item_image'>
                  <Image
                    src={data.profile}
                    alt={data.name}
                    height={50}
                    width={50}
                  />
                </div>
                <div className='paymentHistory_item_name'>
                  <p>{data.name}</p>
                </div>
              </div>
              {/* transaction status */}
              <div className='paymentHistory_item_status'>
                <p>{data.status}</p>
              </div>
              {/*transaction amount*/}
              <div className='paymentHistory_item_amount'>
                <p>{data.amount}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
