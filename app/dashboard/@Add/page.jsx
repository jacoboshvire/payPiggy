/** @format */
"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { api } from "@/lib/api";
import Cookies from "js-cookie";
import { saveToken } from "@/lib/auth";
import "../style.css";

export default function Add() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [add, setAdd] = useState(null);
  const [loading, setLoading] = useState(true);
  return (
    <>
      <div className='Home_add'>
        <div className='title'>
          <h1>Add Money</h1>
        </div>
        <div className='form'>
          <from>
            <label htmlFor='amount'>Amount</label>
            <input
              type='number'
              id='amount'
              name='amount'
              placeholder='$0.00'
            />
            <button className='add_btn'>Add</button>
          </from>
        </div>
      </div>
    </>
  );
}
