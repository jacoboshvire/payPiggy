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

      <button
        onClick={handleContinue}
        disabled={loading || !selected}
        className='continueButton'
      >
        <p>{loading ? "Sending..." : "next"}</p>
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
            d='M14.9872 6.9572C14.2112 6.6362 13.3452 6.3802 12.8132 6.9142C12.3692 7.3602 12.1162 9.0872 12.0512 10.9992H3.8252C3.2722 10.9992 2.8252 11.4462 2.8252 11.9992C2.8252 12.5522 3.2722 12.9992 3.8252 1２.999２H1２.05２２C1２.1１７２ 1４.９０７２ 1２.3７０２ １６．６２８２ １２．８１４２ １７．０７２２C１３．０４８２ １７．３０６２ １３．３４５２ １７．３９４２ １３．６６８２ １７．３９４２C１４．１２１２ １７．３９４２ １４．６２３２ １７．２２０２ １５．０６２２ １７．０３８２C１６．６３３２ １６．３８８₂  twenty-one point one seven four two thirteen point six four two two twenty-one point one seven four two eleven point nine nine two two twenty-one point one seven four two ten point two eight nine two sixteen point four two seven two seven point five five four two fourteen point nine eight seven two six point nine five seven two'
            fill='white'
          />
        </svg>
      </button>
    </div>
  );
}
