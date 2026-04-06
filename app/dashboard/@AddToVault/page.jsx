/** @format */

"use client";
import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function TransferToVault({ vaultId, onSuccess }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleTransfer = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!amount || amount <= 0) {
      setError("Please enter a valid amount");
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
      {pathname.includes("wallet") && searchParams.get("vault") === "true" && (
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
              />
            </div>

            {error && <p className='error'>{error}</p>}
            {success && <p className='success'>Transfer successful</p>}

            <button type='submit' disabled={loading}>
              {loading ? "Transferring..." : "Transfer to Vault"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
