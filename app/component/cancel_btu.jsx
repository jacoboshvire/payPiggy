/** @format */

"use client";
import { useRouter } from "next/navigation";
import "./style.css";

export default function CancelBtu() {
  const router = useRouter();
  return (
    <div className='cancel_btu'>
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        onClick={() => router.back()}
      >
        <line
          x1='18.364'
          y1='5.63604'
          x2='5.63599'
          y2='18.364'
          strokeWidth='2'
          strokeLinecap='round'
        />
        <line
          x1='5.63599'
          y1='5.63604'
          x2='18.364'
          y2='18.364'
          strokeWidth='2'
          strokeLinecap='round'
        />
      </svg>
    </div>
  );
}
