/** @format */
"use client";
import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { api } from "@/lib/api";
import "./add.css";

export default function Add() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const typeHandle = (e) => {
    const value = e.target.value;

    // Allow numbers and a single decimal point with up to 2 decimal places
    if (!/^\d*\.?\d{0,2}$/.test(value)) {
      e.target.value = amount;
      return;
    }

    setAmount(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!amount || amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setLoading(true);

    try {
      const accountId = localStorage.getItem("accountId");
      const data = await api.put(`/api/account/${accountId}`, {
        balance: Number(amount),
      });

      if (data.message === "Account updated") {
        setSuccess(true);
        router.push("/dashboard");
      } else {
        setError(data.message || "Failed to add money");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {pathname === "/dashboard" && searchParams.get("add") === "true" ? (
        <div className='Home_add_bg'>
          <div className='Home_add'>
            <div className='title'>
              <h1>Add Money</h1>
            </div>
            <div className='form'>
              <form onSubmit={handleSubmit}>
                <label htmlFor='amount'>Amount</label>
                <input
                  type='text'
                  id='amount'
                  name='amount'
                  placeholder='£0.00'
                  value={amount}
                  onInput={typeHandle}
                />
                {error && <p className='error'>{error}</p>}
                {success && <p className='success'>Money added successfully</p>}
                <button className='add_btn' type='submit' disabled={loading}>
                  {loading ? "Adding..." : "Add"}
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
