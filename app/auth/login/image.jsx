"use client"
import React from 'react'
import "./style.css"
import Image from "next/image"
import piggy from "../../../public/login.svg"

export default function image() {
  return (
    <div className='secondContainer'>
        <div className="writeUp">
            <h1>
                Smart Banking Made Simple
            </h1>
            <p>
                Send, save, spend fast with PayPiggy secure, simple, powerful today.
            </p>
        </div>
        <div className="image">
            <Image src={piggy} alt="Login Image" width={500} height={500} />
        </div>
    </div>
  )
}
