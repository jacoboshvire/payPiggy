/** @format */

"use client";
import "./style.css";
import { useRouter } from "next/navigation";

export default function Back() {
  const router = useRouter();
  return (
    <div className='backLink' onClick={() => router.back()}>
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M20.175 11.0001H11.948C11.882 9.0921 11.629 7.3711 11.186 6.9271C10.623 6.3641 9.68995 6.6501 8.93795 6.9611C7.36695 7.6111 2.82495 10.3571 2.82495 12.0071C2.82495 13.7101 7.57195 16.4451 9.01295 17.0421C9.46395 17.2291 9.94595 17.3941 10.374 17.3941C10.683 17.3941 10.964 17.3091 11.187 17.0851C11.631 16.6391 11.884 14.9121 11.949 13.0001H20.175C20.728 13.0001 21.175 12.5531 21.175 12.0001C21.175 11.4471 20.728 11.0001 20.175 11.0001Z'
        />
      </svg>
      <p>Back</p>
    </div>
  );
}
