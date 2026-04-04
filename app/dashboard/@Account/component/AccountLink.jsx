/** @format */

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { api } from "@/lib/api";

export default function AccountLink() {
  const [avatar, setAvatar] = useState("");
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const data = await api.get(`/api/users/${id}`);
        const accountData = await api.get(`/api/account/${data.account_id}`);
        setAvatar(data.avatar);
        setAccount(accountData);
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
          src={
            avatar ||
            "https://res.cloudinary.com/dhyjebn3i/image/upload/q_auto/f_auto/v1774959019/cld-sample.jpg"
          }
          alt='profile'
          height={300}
          width={300}
        />
      </div>
      <h1>Govind Rashna</h1>
    </div>
  );
}
