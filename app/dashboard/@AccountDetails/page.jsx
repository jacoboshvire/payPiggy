/** @format */
"use client";
import { useEffect, useState } from "react";
import "./style.css";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import api from "../../../lib/api";

export default function account() {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const accountId = localStorage.getItem("accountId");
        const data = await api.get(`/api/account/${accountId}`);
        console.log(data);
        setAccount(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load account details");
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, []);
  return <div>page</div>;
}
