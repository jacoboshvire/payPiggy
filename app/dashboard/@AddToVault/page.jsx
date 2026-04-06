/** @format */

"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { api } from "@/lib/api";

export default function Vaults() {
  const [vaults, setVaults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchVaults = async () => {
      try {
        const data = await api.get("/api/vault");
        setVaults(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVaults();
  }, []);

  const handleDeposit = async (vaultId, amount) => {
    try {
      const data = await api.post(`/api/vault/${vaultId}/deposit`, {
        amount: Number(amount),
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleWithdraw = async (vaultId) => {
    try {
      const data = await api.post(`/api/vault/${vaultId}/withdraw`);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRequestWithdrawal = async (vaultId, channel) => {
    try {
      const data = await api.post(`/api/vault/${vaultId}/request-withdrawal`, {
        channel,
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerifyWithdrawal = async (vaultId, otp) => {
    try {
      const data = await api.post(`/api/vault/${vaultId}/verify-withdrawal`, {
        otp,
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (vaults.length === 0) return <p>No vaults yet</p>;

  return (
    <>
      {pathname === "/dashboard" && searchParams.get("vault") === "true" && (
        <div className='vaults'>
          {vaults.map((vault) => {
            const isLocked = new Date(vault.lock_until) > new Date();
            return (
              <div key={vault.id} className='vault'>
                <h3>{vault.name}</h3>
                <p>Balance: £{vault.balance}</p>
                <p>
                  Locked until:{" "}
                  {new Date(vault.lock_until).toLocaleDateString()}
                </p>
                <p>Status: {isLocked ? "Locked" : "Unlocked"}</p>

                {isLocked ? (
                  <button
                    onClick={() => handleRequestWithdrawal(vault.id, "email")}
                  >
                    Request Early Withdrawal
                  </button>
                ) : (
                  <button onClick={() => handleWithdraw(vault.id)}>
                    Withdraw
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
