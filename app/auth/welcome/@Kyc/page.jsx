/** @format */

"use client";
import { useState } from "react";
import { api } from "@/lib/api";

export default function UpdateProfile() {
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("United Kingdom");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const accountId = localStorage.getItem("accountId");

      const data = await api.put(`/api/account/${accountId}`, {
        date_of_birth: dateOfBirth,
        address_line1: addressLine1,
        address_line2: addressLine2,
        city,
        postcode,
        country,
      });

      if (data.message === "Account updated") {
        setSuccess(true);
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
    <div className='updateProfile'>
      <form onSubmit={handleSubmit}>
        <div className='inputField'>
          <label>Date of Birth</label>
          <input
            type='date'
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </div>

        <div className='inputField'>
          <label>Address Line 1</label>
          <input
            type='text'
            placeholder='123 Main Street'
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            required
          />
        </div>

        <div className='inputField'>
          <label>Address Line 2 (Optional)</label>
          <input
            type='text'
            placeholder='Apartment, suite, etc.'
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
          />
        </div>

        <div className='inputField'>
          <label>City</label>
          <input
            type='text'
            placeholder='London'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        <div className='inputField'>
          <label>Postcode</label>
          <input
            type='text'
            placeholder='SW1A 1AA'
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            required
          />
        </div>

        <div className='inputField'>
          <label>Country</label>
          <input
            type='text'
            placeholder='United Kingdom'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        {error && <p className='error'>{error}</p>}
        {success && <p className='success'>Profile updated successfully</p>}

        <button type='submit' disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
