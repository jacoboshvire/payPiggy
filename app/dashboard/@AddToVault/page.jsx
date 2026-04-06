/** @format */

"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import "./addToVault.css";

export default function TransferToVault({ onSuccess }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [vaultId, setVaultId] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const fetchVault = async () => {
      try {
        const data = await api.get("/api/vault");
        if (data && data.length > 0) {
          setVaultId(data[0].id);
        }
      } catch (err) {
        console.error("Failed to fetch vault:", err);
      }
    };

    fetchVault();
  }, []);

  const handleTransfer = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!amount || amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (!vaultId) {
      setError("Vault not found");
      return;
    }

    setLoading(true);

    try {
      const data = await api.post(`/api/vault/${vaultId}/deposit`, {
        amount: Number(amount),
      });

      if (data.message === "Deposit to vault successful") {
        setSuccess(true);
        setAmount("");
        if (onSuccess) onSuccess();
      } else {
        setError(data.message || "Transfer failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e) => {
    const value = e.target.value;
    if (!/^\d*\.?\d{0,2}$/.test(value)) return;
    setAmount(value);
  };
  return (
    <>
      {pathname.includes("dashboard") &&
        searchParams.get("vault") === "true" && (
          <div className='transferToVault'>
            <form onSubmit={handleTransfer}>
              <div className='inputField'>
                <label htmlFor='amount'>Amount £</label>
                <input
                  type='text'
                  id='amount'
                  placeholder='£0.00'
                  value={amount}
                  onChange={handleInput}
                  onInput={handleInput}
                />
              </div>

              <div className='icon'>
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
                    d='M18.4996 12.57C18.0126 12.306 17.4066 12.49 17.1456 12.975C16.1846 14.757 14.4186 17.217 12.9946 18.133V4.5C12.9946 3.947 12.5476 3.5 11.9946 3.5C11.4416 3.5 10.9946 3.947 10.9946 4.5V18.128C9.5746 17.218 7.8416 14.802 6.8546 12.975C6.5926 12.49 5.9876 12.308 5.5006 12.57C5.0146 12.832 4.8326 13.438 5.0956 13.924C5.6846 15.02 8.7856 20.472 11.9836 20.497C11.9876 20.497 11.9906 20.5 11.9946 20.5C11.9956 20.5 11.9976 20.499 11.9986 20.499C12.0006 20.499 12.0026 20.5 12.0056 20.5C15.2006 20.5 18.3136 15.022 18.9046 13.924C19.1676 13.438 18.9856 12.832 18.4996 12.57Z'
                  />
                </svg>
              </div>
              <div className='vaultDistination'>
                <p>{amount}</p>
              </div>

              {error && <p className='error'>{error}</p>}
              {success && <p className='success'>Transfer successful</p>}

              <button type='submit' disabled={loading || !vaultId}>
                {loading ? "Transferring..." : "Sendt"}
              </button>
            </form>
          </div>
        )}
    </>
  );
}
