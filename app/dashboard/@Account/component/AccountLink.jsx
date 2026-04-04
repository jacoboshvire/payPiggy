/** @format */

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { api } from "@/lib/api";

export default function AccountLink() {
  const [avatar, setAvatar] = useState("");
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountId = localStorage.getItem("accountId");
        const accountData = await api.get(`/api/account/${accountId}`);
        setAccount(accountData);

        // Use user_id from account to fetch user
        const userData = await api.get(`/api/users/${accountData.user_id}`);
        setAvatar(userData.avatar);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
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
