"use client";
import { useState, useEffect } from "react";
import {
  useRouter,
  useParams,
  usePathname,
  useSearchParams,
} from "next/navigation";

import Link from "next/link";
import "./style.css";

export default function Nav() {
  return (
    <div className="bashboard_navbar">
      <nav>
        <div className="bashboard_navbar_logo">
          <svg
            width={32}
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
        <div className="bashboard_navbar_links">
          <Link href="#">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.8775 22.5133H12.1241C11.5721 22.5133 11.1241 22.0653 11.1241 21.5133C11.1241 20.9613 11.5721 20.5133 12.1241 20.5133H19.8775C20.4295 20.5133 20.8775 20.9613 20.8775 21.5133C20.8775 22.0653 20.4295 22.5133 19.8775 22.5133ZM25.6655 8.21067C25.1815 7.784 24.6308 7.30133 23.9748 6.69467C23.6775 6.45467 23.3521 6.18 23.0068 5.88933C21.0601 4.248 18.3935 2 15.9628 2C13.5601 2 11.0655 4.12267 9.06146 5.828C8.69079 6.14267 8.34412 6.43867 7.99079 6.72533C7.36946 7.30133 6.81879 7.78533 6.33346 8.21333C3.15079 11.0147 2.55212 11.7493 2.55212 18.284C2.55212 30 5.94012 30 16.0001 30C26.0588 30 29.4481 30 29.4481 18.284C29.4481 11.748 28.8495 11.0133 25.6655 8.21067Z"
                fill="black"
              />
            </svg>
            <p>Home</p>
          </Link>
          {/* accounts======= */}
          <Link href="#">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.0007 18.441C10.7834 18.441 6.20736 21.5103 6.20736 25.0076C6.20736 29.5076 13.5794 29.5076 16.0007 29.5076C18.422 29.5076 25.7927 29.5076 25.7927 24.9783C25.7927 21.4956 21.2167 18.441 16.0007 18.441Z"
                fill="black"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.9494 15.523H15.9907C19.5841 15.523 22.5067 12.6003 22.5067 9.00698C22.5067 5.41498 19.5841 2.49231 15.9907 2.49231C12.3974 2.49231 9.47473 5.41498 9.47473 9.00431C9.46273 12.5856 12.3654 15.5096 15.9494 15.523Z"
                fill="black"
              />
            </svg>

            <p>Home</p>
          </Link>
        </div>
      </nav>
    </div>
  );
}
