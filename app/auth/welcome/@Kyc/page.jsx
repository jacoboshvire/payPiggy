/** @format */

"use client";
import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { api } from "@/lib/api";
import "./account.css";

export default function UpdateProfile() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const Kyc = searchParams.get("Kyc");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("United Kingdom");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!dateOfBirth || !addressLine1 || !city || !postcode) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    const accountId = localStorage.getItem("accountId");

    if (!accountId) {
      setError("Account not found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
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
        router.push("/auth/welcome?ChooseImage=true");
      } else {
        setError(data.message || "Failed to update. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {pathname === "/auth/welcome" && Kyc && (
        <div className='updateName'>
          <form onSubmit={handleSubmit}>
            <div className='inputField'>
              <label htmlFor='dateOfBirth'>Date of Birth</label>
              <input
                type='date'
                id='dateOfBirth'
                name='dateOfBirth'
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>

            <div className='inputField'>
              <label htmlFor='addressLine1'>Address Line 1</label>
              <input
                type='text'
                id='addressLine1'
                placeholder='123 Main Street'
                value={addressLine1}
                name='addressLine1'
                onChange={(e) => setAddressLine1(e.target.value)}
              />
            </div>

            <div className='inputField'>
              <label htmlFor='addressLine2'>Address Line 2 (Optional)</label>
              <input
                type='text'
                id='addressLine2'
                placeholder='Apartment, suite, etc.'
                value={addressLine2}
                name='addressLine2'
                onChange={(e) => setAddressLine2(e.target.value)}
              />
            </div>

            <div className='inputField'>
              <label htmlFor='city'>City</label>
              <input
                type='text'
                id='city'
                placeholder='London'
                value={city}
                name='city'
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className='inputField'>
              <label htmlFor='postcode'>Postcode</label>
              <input
                type='text'
                id='postcode'
                placeholder='SW1A 1AA'
                value={postcode}
                name='postcode'
                onChange={(e) => setPostcode(e.target.value)}
              />
            </div>

            <div className='inputField'>
              <label htmlFor='country'>Country</label>
              <input
                type='text'
                id='country'
                placeholder='United Kingdom'
                value={country}
                name='country'
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            {error && <p className='error'>{error}</p>}
            {success && <p className='success'>Profile updated successfully</p>}

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
        </div>
      )}
    </>
  );
}
