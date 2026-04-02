/** @format */

"use client";
import { useState } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import { api } from "@/lib/api";

export default function UpdateName({ accountId }) {
  const router = useRouter();
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

    try {
      const data = await api.put(`/api/account/${accountId}`, {
        first_name: firstName,
        last_name: lastName,
      });

      if (data.message === "Account updated") {
        setSuccess(true);
        router.push("/welcome?phonenumber=true");
      } else {
        setError(data.message || "Update failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {}
      <div className='updateName'>
        <form onSubmit={handleSubmit}>
          <div className='inputField'>
            <label htmlFor='firstName'>First Name</label>
            <input
              type='text'
              id='firstName'
              placeholder='Jacob'
              value={firstName}
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
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {error && <p className='error'>{error}</p>}
          {success && <p className='success'>Name updated successfully</p>}

          <button type='submit' disabled={loading}>
            {loading ? "Updating..." : "Update Name"}
          </button>
        </form>
      </div>
    </>
  );
}
