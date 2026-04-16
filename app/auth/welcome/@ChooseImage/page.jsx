/** @format */
"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import UpdateAvatar from "./UpdateAvatar/updateAvatar";
import "./UpdateAvatar/updateAvatar.css";

export default function Page() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [userId, setUserId] = useState(null);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accountId = localStorage.getItem("accountId");
        const accountData = await api.get(`/api/account/${accountId}`);
        const userData = await api.get(`/api/users/${accountData.user_id}`);
        setUserId(accountData.user_id);
        setAvatar(userData.avatar);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      {pathname.includes("/auth/welcome") &&
        searchParams.get("ChooseImage") === "true" && (
          <div>
            <Link href='/dashboard?home=true' className='skipLink'>
              skip for now
            </Link>
            <UpdateAvatar
              userId={userId}
              currentAvatar={avatar}
              onSuccess={(newAvatar) => setAvatar(newAvatar)}
            />
          </div>
        )}
    </>
  );
}
