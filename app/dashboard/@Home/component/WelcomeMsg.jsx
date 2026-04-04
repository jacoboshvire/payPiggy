/** @format */
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function WelcomeMsg() {
  const router = useRouter();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const accountId = localStorage.getItem("accountId");
        const data = await api.get(`/api/account/${accountId}`);
        console.log(data);
        console.log(data.user_id.avatar);
        if (data?.user_id) {
          const avatarData = await api.get(`/api/user/${data.user_id}`);
          setAvatar(avatarData.avatar);
        }
        setAccount(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!account) return <p>Account not found</p>;
  return (
    <div
      className='Home_welcomeMsg'
      onClick={() => router.push("/dashboard?account=true")}
    >
      <div className='Home_welcomeMsg_profile'>
        <Image
          src={
            avatar ||
            "https://res.cloudinary.com/dhyjebn3i/image/upload/q_auto/f_auto/v1774959019/cld-sample.jpg"
          }
          alt='profile'
          height={50}
          width={50}
        />
      </div>
      <p>Hi {account?.first_name || "there"}!</p>
    </div>
  );
}
