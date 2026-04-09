/** @format */
"use client";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import "./accountDetail.css";
import { api } from "../../../lib/api";
import Image from "next/image";

export default function Account() {
  const [account, setAccount] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const accountId = localStorage.getItem("accountId");
        const data = await api.get(`/api/account/${accountId}`);
        const userData = await api.get(`/api/users/${data.user_id}`);
        setAccount(data);
        setUser(userData);
      } catch (err) {
        console.error(err);
        setError("Failed to load account details");
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, []);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!account) return <p>Account not found</p>;

  return (
    <>
      {pathname.includes("/dashboard") &&
        searchParams.get("account_details") === "true" && (
          <div className='accountDetail_bg'>
            <div className='accountDetail'>
              <div className='accountDetail_info'>
                <div className='account_names'>
                  <div
                    className='accountDetail_item'
                    onClick={() => copyToClipboard(account.first_name)}
                  >
                    <p className='accountDetail_label'>Full Name</p>
                    <p className='accountDetail_value'>
                      {account.first_name} {account.last_name}
                    </p>
                  </div>
                </div>

                <div className='accountDetail_item'>
                  <p className='accountDetail_label'>Account Number</p>
                  <p className='accountDetail_value'>
                    {account.account_number}
                  </p>
                </div>

                <div className='accountDetail_item'>
                  <p className='accountDetail_label'>Sort Code</p>
                  <p className='accountDetail_value'>{account.sort_code}</p>
                </div>

                <div className='accountDetail_item'>
                  <p className='accountDetail_label'>Balance</p>
                  <p className='accountDetail_value'>
                    £{Number(account.balance).toFixed(2)}
                  </p>
                </div>

                <div className='accountDetail_item'>
                  <p className='accountDetail_label'>Account Type</p>
                  <p className='accountDetail_value'>{account.account_type}</p>
                </div>

                <div className='accountDetail_item'>
                  <p className='accountDetail_label'>Email</p>
                  <p className='accountDetail_value'>{user?.email}</p>
                </div>

                <div className='accountDetail_item'>
                  <p className='accountDetail_label'>Phone</p>
                  <p className='accountDetail_value'>{user?.phone}</p>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
}
