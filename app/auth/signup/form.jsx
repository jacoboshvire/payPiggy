/** @format */

"use client";
import { useState, useEffect } from "react";
import "./style.css";
import Input from "./input";
import AuthLink from "../../component/authLink";

export default function form() {
  return (
    <div className='loginInput'>
      <div className='titleAndDetails'>
        <div className='logo'>
          <svg
            width='32'
            height='23'
            viewBox='0 0 62 43'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M46.2168 0C54.725 0 61.6219 6.89714 61.6221 15.4053C61.6221 23.9136 54.7251 30.8115 46.2168 30.8115H16.1631V42.1758H0V0H46.2168ZM17.5527 9.59668C14.4146 9.59668 11.8704 12.1974 11.8701 15.4053C11.8701 18.6133 14.4144 21.2148 17.5527 21.2148C20.6909 21.2147 23.2344 18.6132 23.2344 15.4053C23.2341 12.1975 20.6908 9.59684 17.5527 9.59668ZM43.8174 9.59668C40.6794 9.59689 38.136 12.1976 38.1357 15.4053C38.1357 18.6132 40.6793 21.2146 43.8174 21.2148C46.9557 21.2148 49.5 18.6133 49.5 15.4053C49.4998 12.1974 46.9555 9.59668 43.8174 9.59668Z'
              fill='url(#paint0_linear_34_3709)'
            />
            <defs>
              <linearGradient
                id='paint0_linear_34_3709'
                x1='1.08212'
                y1='5.79448e-07'
                x2='60.5399'
                y2='42.1758'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#241E77' />
                <stop offset='1' stopColor='#4337DD' />
              </linearGradient>
            </defs>
          </svg>
          <h1>PayPiggy</h1>
        </div>
        <div className='Details'>
          <h2>Hey welcome</h2>
          <p>Smart Banking, Simplified</p>
        </div>
      </div>
      <Input />
      <AuthLink />
    </div>
  );
}
