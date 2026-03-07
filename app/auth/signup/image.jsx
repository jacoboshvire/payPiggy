"use client"
import React, { useState } from 'react'
import "./style.css"
import Image from "next/image"
import piggy from "../../../public/Group3.svg"

export default function image() {
    
  return (
    <div className='secondContainer'>
        <div className="writeUp">
            <h1>
               PayPiggy Smart Banking for Everyone
            </h1>
            <p>
                Send, save, and spend faster with secure, easy PayPiggy today.
            </p>
        </div>
        <div className="image">
           <Image
            src={piggy}
            alt="money"
            width={500}
            height={500}/>
        </div>
    </div>
  )
}
