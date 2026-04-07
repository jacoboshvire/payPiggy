/** @format */

"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { api } from "@/lib/api";
import "./withdrawFromVault.css";

export default function WithdrawFromVault({ onSuccess }) {
  const [vault, setVault] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState("confirm"); // confirm | otp
  const [channel, setChannel] = useState("email");
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const fetchVault = async () => {
      try {
        const data = await api.get("/api/vault");
        if (data && data.length > 0) {
          setVault(data[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchVault();
  }, []);

  const isLocked = vault ? new Date(vault.lock_until) > new Date() : false;

  // Withdraw directly if not locked
  const handleWithdraw = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await api.post(`/api/vault/${vault.id}/withdraw`);

      if (data.message === "Withdrawal successful") {
        setSuccess(true);
        if (onSuccess) onSuccess();
      } else {
        setError(data.message || "Withdrawal failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Request early withdrawal OTP if locked
  const handleRequestOtp = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await api.post(`/api/vault/${vault.id}/request-withdrawal`, {
        channel,
      });

      if (data.early) {
        setStep("otp");
      } else {
        setError(data.message || "Failed to send OTP");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP and withdraw
  const handleVerifyOtp = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await api.post(`/api/vault/${vault.id}/verify-withdrawal`, {
        otp,
      });

      if (data.message === "Early withdrawal successful") {
        setSuccess(true);
        if (onSuccess) onSuccess();
      } else {
        setError(data.message || "Invalid OTP");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {pathname.includes("dashboard") &&
        searchParams.get("withdraw-vault") === "true" && (
          <div className='withdraw_bg'>
            <div className='withdrawVault'>
              {success ? (
                <div>
                  <p className='success'>Withdrawal successful</p>
                  <button onClick={() => router.push("/dashboard")}>
                    Back to Dashboard
                  </button>
                </div>
              ) : (
                <>
                  <div className='title'>
                    <h1>Vault Withdrawal</h1>
                    <div className='cancel_btu'>
                      <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        onClick={() => router.push("/dashboard?home=true")}
                      >
                        <line
                          x1='18.364'
                          y1='5.63604'
                          x2='5.63599'
                          y2='18.364'
                          strokeWidth='2'
                          strokeLinecap='round'
                        />
                        <line
                          x1='5.63599'
                          y1='5.63604'
                          x2='18.364'
                          y2='18.364'
                          strokeWidth='2'
                          strokeLinecap='round'
                        />
                      </svg>
                    </div>
                  </div>
                  <div className='vault_info'>
                    <p>
                      <b>Balance:</b> £{Number(vault.balance).toFixed(2)}
                    </p>
                    <p>
                      <b>Locked until:</b>{" "}
                      {new Date(vault.lock_until).toLocaleDateString()}
                    </p>
                    <p>
                      {" "}
                      <b>Status:</b> {isLocked ? "Locked" : "Unlocked"}
                    </p>
                  </div>
                  {error && <p className='error'>{error}</p>}

                  {/* Step 1 - Confirm */}
                  {step === "confirm" && (
                    <>
                      {isLocked ? (
                        <>
                          <p className='warning'>
                            This vault is still locked. Early withdrawal
                            requires OTP verification.
                          </p>
                          <div className='channelSelect'>
                            <label>Send OTP via:</label>
                            <select
                              value={channel}
                              onChange={(e) => setChannel(e.target.value)}
                            >
                              <option value='email'>Email</option>
                              <option value='sms'>SMS</option>
                              <option value='push'>Push Notification</option>
                            </select>
                          </div>
                          <button onClick={handleRequestOtp} disabled={loading}>
                            {loading
                              ? "Sending OTP..."
                              : "Request Early Withdrawal"}
                          </button>
                        </>
                      ) : (
                        <button onClick={handleWithdraw} disabled={loading}>
                          {loading ? "Withdrawing..." : "Withdraw"}
                        </button>
                      )}
                    </>
                  )}

                  {/* Step 2 - OTP */}
                  {step === "otp" && (
                    <div className='enterOtp'>
                      <p>Enter the OTP sent to your {channel}</p>
                      <input
                        type='text'
                        placeholder='Enter OTP'
                        maxLength={5}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      <button onClick={handleVerifyOtp} disabled={loading}>
                        {loading ? "Verifying..." : "Confirm Withdrawal"}
                      </button>
                      <button onClick={() => setStep("confirm")}>Back</button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
    </>
  );
}
