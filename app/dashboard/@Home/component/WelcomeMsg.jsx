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

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const accountId = localStorage.getItem("accountId");
        const data = await api.get(`/api/account/${accountId}`);
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
            "https://res.cloudinary.com/dr0yyqvj6/image/upload/v1767871145/nxn2zpymtgyxybpjhqqg.jpg"
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
