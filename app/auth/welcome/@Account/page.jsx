/** @format */

"use client";
import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { api } from "@/lib/api";
import "./account.css";
import { p } from "framer-motion/client";

export default function Account() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const Account = searchParams.get("Account");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (firstName === "" || lastName === "") {
      setError("First name and last name are required");
      setLoading(false);
      return;
    }

    // Get accountId directly from localStorage — don't use state
    const accountId = localStorage.getItem("accountId");
    console.log("Account ID:", accountId);

    if (!accountId) {
      setError("Account not found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const data = await api.put(`/api/account/${accountId}`, {
        first_name: firstName,
        last_name: lastName,
      });
      console.log("Response:", data);

      if (data.message === "Account updated") {
        setSuccess(true);
        router.push("/auth/welcome?step=chooseImage");
      } else {
        setError(data.message || "Failed to update account. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {pathname === "/auth/welcome" &&  Account && (
        <div className='updateName'>
          <form onSubmit={handleSubmit}>
            <div className='inputField'>
              <label htmlFor='firstName'>First Name</label>
              <input
                type='text'
                id='firstName'
                placeholder='Jacob'
                value={firstName}
                name='firstName'
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className='inputField'>
              <label htmlFor='lastName'>Last Name</label>
              <input
                type='text'
                id='lastName'
                placeholder='Oshevire'
                value={lastName}
                name='lastName'
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            {error && <p className='error'>{error}</p>}
            {success && <p className='success'>Name updated successfully</p>}

            <button type='submit' disabled={loading}>
              <p>{loading ? "loading..." : "next"}</p>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M14.9872 6.9572C14.2112 6.6362 13.3452 6.3802 12.8132 6.9142C12.3692 7.3602 12.1162 9.0872 12.0512 10.9992H3.8252C3.2722 10.9992 2.8252 11.4462 2.8252 11.9992C2.8252 12.5522 3.2722 12.9992 3.8252 12.9992H12.0522C12.1172 14.9072 12.3702 16.6282 12.8142 17.0722C13.0482 17.3062 13.3452 17.3942 13.6682 17.3942C14.1212 17.3942 14.6232 17.2202 15.0622 17.0382C16.6332 16.3882 21.1742 13.6422 21.1742 11.9922C21.1742 10.2892 16.4272 7.5542 14.9872 6.9572Z'
                  fill='white'
                />
              </svg>
            </button>
          </form>
        </div>)
      )}
    </>
  );
}
