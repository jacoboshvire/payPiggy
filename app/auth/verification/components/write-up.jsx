"use client"
import React from 'react'
import {useRouter} from "next/navigation"
import "./../style.css"

export default function writeup() {
    const router = useRouter()
  return (
    <div className="writeUp">
        <div className='backLink' onClick={ () => router.back() }>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M20.175 11.0001H11.948C11.882 9.0921 11.629 7.3711 11.186 6.9271C10.623 6.3641 9.68995 6.6501 8.93795 6.9611C7.36695 7.6111 2.82495 10.3571 2.82495 12.0071C2.82495 13.7101 7.57195 16.4451 9.01295 17.0421C9.46395 17.2291 9.94595 17.3941 10.374 17.3941C10.683 17.3941 10.964 17.3091 11.187 17.0851C11.631 16.6391 11.884 14.9121 11.949 13.0001H20.175C20.728 13.0001 21.175 12.5531 21.175 12.0001C21.175 11.4471 20.728 11.0001 20.175 11.0001Z"/>
            </svg>
            <p>Back</p>
        </div>

        <div className="logoAndDetails">
            <div className="logo">
                <svg width="32" height="20" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26.2998 0C31.1412 0.000216879 35.0654 3.92515 35.0654 8.7666C35.0654 13.608 31.1412 17.533 26.2998 17.5332H9.19727V24H0V0H26.2998ZM9.98828 5.46094C8.20245 5.46094 6.75488 6.94109 6.75488 8.7666C6.75495 10.5921 8.20249 12.0723 9.98828 12.0723C11.774 12.0722 13.2216 10.592 13.2217 8.7666C13.2217 6.94115 11.774 5.46104 9.98828 5.46094ZM24.9346 5.46094C23.1487 5.46094 21.7002 6.94109 21.7002 8.7666C21.7003 10.5921 23.1488 12.0723 24.9346 12.0723C26.7202 12.0721 28.1679 10.5919 28.168 8.7666C28.168 6.94121 26.7202 5.46114 24.9346 5.46094Z" fill="url(#paint0_linear_6_843)"/>
                    <defs>
                    <linearGradient id="paint0_linear_6_843" x1="0.615769" y1="3.29733e-07" x2="34.4499" y2="23.9996" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#241E77"/>
                    <stop offset="1" stopColor="#4337DD"/>
                    </linearGradient>
                    </defs>
                </svg>
                <h1>
                    PayPiggy
                </h1>
            </div>
            <p>
                Check your email for your verification code.
            </p>
        </div>
    </div>
  )
}
