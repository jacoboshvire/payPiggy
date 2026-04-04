/** @format */
"use client";
import { useState, useEffect } from "react";
import React from "react";
import Image from "next/image";

export default function AccountLink() {
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const data = await api.get(`/api/users/${id}`);
        setAvatar(data.avatar);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAvatar();
  }, []);
  return (
    <div className='Account_Link'>
      <div className='Account_Link_image'>
        <Image
          src='https://res.cloudinary.com/dr0yyqvj6/image/upload/v1767871145/nxn2zpymtgyxybpjhqqg.jpg'
          alt='profile'
          height={300}
          width={300}
        />
      </div>
      <h1>Govind Rashna</h1>
    </div>
  );
}
