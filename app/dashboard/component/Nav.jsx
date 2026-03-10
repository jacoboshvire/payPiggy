"use client";
import { useState, useEffect } from "react";
import {
  useRouter,
  useParams,
  usePathname,
  useSearchParams,
} from "next/navigation";
import "./style.css";

export default function Nav() {
  return (
    <div className="bashboard_navbar">
      <nav>
        <div className="bashboard_navbar_logo">
          <svg
            width={24}
            height={20}
            viewBox="0 0 36 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.2998 0C31.1412 0.000216879 35.0654 3.92515 35.0654 8.7666C35.0654 13.608 31.1412 17.533 26.2998 17.5332H9.19727V24H0V0H26.2998ZM9.98828 5.46094C8.20245 5.46094 6.75488 6.94109 6.75488 8.7666C6.75495 10.5921 8.20249 12.0723 9.98828 12.0723C11.774 12.0722 13.2216 10.592 13.2217 8.7666C13.2217 6.94115 11.774 5.46104 9.98828 5.46094ZM24.9346 5.46094C23.1487 5.46094 21.7002 6.94109 21.7002 8.7666C21.7003 10.5921 23.1488 12.0723 24.9346 12.0723C26.7202 12.0721 28.1679 10.5919 28.168 8.7666C28.168 6.94121 26.7202 5.46114 24.9346 5.46094Z"
              fill="url(#paint0_linear_6_843)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_6_843"
                x1="0.615769"
                y1="3.29733e-07"
                x2="34.4499"
                y2="23.9996"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#241E77" />
                <stop offset="1" stopColor="#4337DD" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </nav>
    </div>
  );
}
