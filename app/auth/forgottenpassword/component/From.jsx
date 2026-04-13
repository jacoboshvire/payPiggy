/** @format */

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { api } from "@/lib/api";
import "./style.css";

export default function Form() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [changeType, setChangeType] = useState(false);
  const [changeType1, setChangeType1] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("email"); // "email" | "reset"

  const changeTypeFun = () => setChangeType((prev) => !prev);
  const changeTypeFun2 = () => setChangeType1((prev) => !prev);

  // Step 1 - Send OTP
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await api.post("/api/auth/forgot-password", {
        email,
        channel: "email",
      });

      if (data.userId) {
        Cookies.set("userId", String(data.userId), { expires: 1 });
        Cookies.set("isReset", "true", { expires: 1 });
        Cookies.set("otpChannel", "email", { expires: 1 });
        router.push("/auth/otp-options");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2 - Reset password
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const resetToken = Cookies.get("resetToken");

      if (!resetToken) {
        router.push("/auth/forgot-password");
        return;
      }

      const data = await api.post("/api/auth/reset-password", {
        resetToken,
        password,
      });

      if (data.message === "Password reset successful") {
        Cookies.remove("resetToken");
        router.push("/auth/login");
      } else {
        setError(data.message || "Reset failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Show email form first
  if (step === "email") {
    return (
      <div className='form'>
        <form onSubmit={handleEmailSubmit}>
          <div className='inputField'>
            <label htmlFor='email'>Email</label>
            <br />
            <br />
            <div className='input'>
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
                  d='M18.1451 9.53C17.7931 9.952 14.6341 13.653 12.0111 13.653C9.39107 13.653 6.20007 9.955 5.84407 9.533C5.57807 9.216 5.61807 8.743 5.93507 8.476C6.25107 8.208 6.72407 8.25 6.99107 8.566C8.16207 9.953 10.5591 12.153 12.0111 12.153C13.4621 12.153 15.8371 9.955 16.9931 8.569C17.2581 8.252 17.7311 8.21 18.0491 8.473C18.3671 8.739 18.4101 9.212 18.1451 9.53ZM12.0001 2.383C4.59907 2.383 1.97607 4.899 1.97607 12C1.97607 19.1 4.59907 21.617 12.0001 21.617C19.4011 21.617 22.0241 19.1 22.0241 12C22.0241 4.899 19.4011 2.383 12.0001 2.383Z'
                />
              </svg>
              <input
                type='email'
                id='email'
                name='email'
                placeholder='name@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <br />
          </div>

          {error && <p className='error'>{error}</p>}

          <button type='submit' disabled={loading}>
            <p>{loading ? "Sending..." : "Send OTP"}</p>
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
    );
  }
}
