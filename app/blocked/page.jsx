/** @format */
"use client";
import { useRouter } from "next/navigation";
import "./blocked.css";

export default function Blocked() {
  const router = useRouter();

  return (
    <div className='blocked'>
      <div className='blocked_content'>
        <svg
          width='80'
          height='80'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 13C11.45 13 11 12.55 11 12V8C11 7.45 11.45 7 12 7C12.55 7 13 7.45 13 8V12C13 12.55 12.55 13 12 13ZM12 17C11.45 17 11 16.55 11 16C11 15.45 11.45 15 12 15C12.55 15 13 15.45 13 16C13 16.55 12.55 17 12 17Z'
            fill='#E60101'
          />
        </svg>
        <h1>Access Denied</h1>
        <p>Sorry, PayPiggy is only available in the United Kingdom.</p>
        <p>Your location is outside our service area.</p>
        <button onClick={() => router.back()}>Go Back</button>
      </div>
    </div>
  );
}
