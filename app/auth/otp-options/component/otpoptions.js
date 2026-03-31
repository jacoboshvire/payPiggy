/** @format */

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { api } from "@/lib/api";
import Details from "./details";
import channels from "./icon";
import "../style.css";

export default function OtpOptions() {
  const router = useRouter();
  const [selected, setSelected] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!selected) {
      setError("Please select a channel");
      return;
    }

    if (selected === "sms" && !phone) {
      setError("Please enter your phone number");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const userId = Cookies.get("userId");

      if (!userId) {
        router.push("/login");
        return;
      }

      await api.post("/api/auth/send-otp", {
        userId: Number(userId),
        channel: selected,
        phone: selected === "sms" ? phone : undefined,
      });

      // Save selected channel for resend
      Cookies.set("otpChannel", selected, { expires: 1 });
      if (selected === "sms") Cookies.set("otpPhone", phone, { expires: 1 });

      router.push("/auth/verification");
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='otpOptions'>
      <Details />

      <div className='channels'>
        {channels.map((channel) => (
          <div
            key={channel.id}
            className={`channel ${selected === channel.id ? "selected" : ""}`}
            onClick={() => {
              setSelected(channel.id);
              setError("");
            }}
          >
            <div className='channelIcon'>{channel.icon}</div>
            <div className='channelInfo'>
              <p className='channelLabel'>{channel.label}</p>
              <p className='channelDescription'>{channel.description}</p>
            </div>
            <div className='channelRadio'>
              <div
                className={`radio ${selected === channel.id ? "active" : ""}`}
              />
            </div>
          </div>
        ))}
      </div>

      {error && <p className='error'>{error}</p>}

      <button onClick={handleContinue} disabled={loading || !selected}>
        {loading ? "Sending..." : "Continue"}
      </button>
    </div>
  );
}
