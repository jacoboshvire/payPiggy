/** @format */
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function WelcomeMsg() {
  const router = useRouter();
  return (
    <div className='home_welcomeMsg'>
      <Image
        src={
          "https://res.cloudinary.com/dr0yyqvj6/image/upload/v1767871145/nxn2zpymtgyxybpjhqqg.jpg"
        }
        alt='profile'
        height={50}
        width={50}
      />
    </div>
  );
}
