/** @format */
"use client";
import { useState, useEffect } from "react";
import "../style.css";

export default function Transaction() {
  return (
    <div className='Home_transaction'>
      <div className='Home_transaction_btu'>
        <div className='Home_transaction_icon'>
          <svg
            width='30'
            height='30'
            viewBox='0 0 30 30'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M16 14H23.5V16H16V23.5H14V16H6.5V14H14V6.5H16V14Z'
              fill='black'
            />
          </svg>
        </div>
        <div className='Home_transacton_linkName'>Add</div>
      </div>
    </div>
  );
}
