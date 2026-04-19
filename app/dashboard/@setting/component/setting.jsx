/** @format */

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import CancelBtu from "../../../component/cancel_btu";

export default function Settings() {
  const router = useRouter();

  // OTP state
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [channel, setChannel] = useState("email");

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Names state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Profile state
  const [phone, setPhone] = useState("");

  // UI state
  const [activeSection, setActiveSection] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetState = () => {
    setOtpSent(false);
    setOtp("");
    setOtpVerified(false);
    setError("");
    setSuccess("");
  };

  const handleRequestOtp = async () => {
    setOtpLoading(true);
    setError("");

    try {
      const data = await api.post("/api/settings/request-otp", { channel });
      if (data.message.includes("sent")) {
        setOtpSent(true);
      } else {
        setError(data.message || "Failed to send OTP");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setOtpLoading(true);
    setError("");

    try {
      const data = await api.post("/api/settings/verify-otp", { otp });
      if (data.verified) {
        setOtpVerified(true);
      } else {
        setError(data.message || "Invalid OTP");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const data = await api.put("/api/settings/password", {
        otp,
        currentPassword,
        newPassword,
      });

      if (data.message === "Password updated successfully") {
        setSuccess("Password updated successfully");
        resetState();
        setActiveSection(null);
      } else {
        setError(data.message || "Update failed");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateNames = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const data = await api.put("/api/settings/names", {
        otp,
        first_name: firstName,
        last_name: lastName,
      });

      if (data.message === "Account names updated successfully") {
        setSuccess("Names updated successfully");
        resetState();
        setActiveSection(null);
      } else {
        setError(data.message || "Update failed");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const data = await api.put("/api/settings/profile", { phone });

      if (data.message === "Profile updated successfully") {
        setSuccess("Profile updated successfully");
        setActiveSection(null);
      } else {
        setError(data.message || "Update failed");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // OTP Component — reused for password and names
  const OtpStep = () => (
    <div className='settings_otp'>
      {!otpSent ? (
        <>
          <p>An OTP will be sent to verify this change</p>
          <select value={channel} onChange={(e) => setChannel(e.target.value)}>
            <option value='email'>Email</option>
            <option value='sms'>SMS</option>
            <option value='push'>Push Notification</option>
          </select>
          <button onClick={handleRequestOtp} disabled={otpLoading}>
            {otpLoading ? "Sending..." : "Send OTP"}
          </button>
        </>
      ) : !otpVerified ? (
        <>
          <p>Enter the OTP sent to your {channel}</p>
          <input
            type='text'
            placeholder='Enter OTP'
            maxLength={5}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyOtp} disabled={otpLoading}>
            {otpLoading ? "Verifying..." : "Verify OTP"}
          </button>
          <button onClick={() => setOtpSent(false)}>Resend OTP</button>
        </>
      ) : null}
    </div>
  );

  return (
    <div className='settings'>
      <div className='title'>
        <h1>Settings</h1>
      </div>
      <h1>Settings</h1>

      {error && <p className='error'>{error}</p>}
      {success && <p className='success'>{success}</p>}

      {/* Change Password */}
      <div className='settings_section'>
        <div
          className='settings_section_header'
          onClick={() => {
            resetState();
            setActiveSection(activeSection === "password" ? null : "password");
          }}
        >
          <h2>Change Password</h2>
          <p>{activeSection === "password" ? "▲" : "▼"}</p>
        </div>

        {activeSection === "password" && (
          <div className='settings_section_body'>
            <OtpStep />
            {otpVerified && (
              <form onSubmit={handleUpdatePassword}>
                <div className='inputField'>
                  <label>Current Password</label>
                  <input
                    type='password'
                    placeholder='*******'
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                <div className='inputField'>
                  <label>New Password</label>
                  <input
                    type='password'
                    placeholder='*******'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className='inputField'>
                  <label>Confirm New Password</label>
                  <input
                    type='password'
                    placeholder='*******'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button type='submit' disabled={loading}>
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Change Account Names */}
      <div className='settings_section'>
        <div
          className='settings_section_header'
          onClick={() => {
            resetState();
            setActiveSection(activeSection === "names" ? null : "names");
          }}
        >
          <h2>Change Account Names</h2>
          <p>{activeSection === "names" ? "▲" : "▼"}</p>
        </div>

        {activeSection === "names" && (
          <div className='settings_section_body'>
            <OtpStep />
            {otpVerified && (
              <form onSubmit={handleUpdateNames}>
                <div className='inputField'>
                  <label>First Name</label>
                  <input
                    type='text'
                    placeholder='Jacob'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className='inputField'>
                  <label>Last Name</label>
                  <input
                    type='text'
                    placeholder='Oshevire'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <button type='submit' disabled={loading}>
                  {loading ? "Updating..." : "Update Names"}
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Update Profile — no OTP required */}
      <div className='settings_section'>
        <div
          className='settings_section_header'
          onClick={() => {
            resetState();
            setActiveSection(activeSection === "profile" ? null : "profile");
          }}
        >
          <h2>Update Profile</h2>
          <p>{activeSection === "profile" ? "▲" : "▼"}</p>
        </div>

        {activeSection === "profile" && (
          <div className='settings_section_body'>
            <form onSubmit={handleUpdateProfile}>
              <div className='inputField'>
                <label>Phone Number</label>
                <input
                  type='tel'
                  placeholder='+447911123456'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <button type='submit' disabled={loading}>
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
