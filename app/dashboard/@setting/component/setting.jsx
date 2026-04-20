/** @format */

"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Image from "next/image";
import CancelBtu from "../../../component/cancel_btu";

const DEFAULT_AVATARS = [
  "https://res.cloudinary.com/dhyjebn3i/image/upload/q_auto/f_auto/v1774959207/Group_1060_hekrbq.png",
  "https://res.cloudinary.com/dhyjebn3i/image/upload/q_auto/f_auto/v1774959207/Avatar_ql2szp.png",
  "https://res.cloudinary.com/dhyjebn3i/image/upload/q_auto/f_auto/v1774959207/Avatar-4_iewqsl.png",
  "https://res.cloudinary.com/dhyjebn3i/image/upload/q_auto/f_auto/v1774959207/Avatar-2_vnsa3e.png",
  "https://res.cloudinary.com/dhyjebn3i/image/upload/q_auto/f_auto/v1774959206/Avatar-3_dw2a0i.png",
  "https://res.cloudinary.com/dhyjebn3i/image/upload/q_auto/f_auto/v1774959206/Avatar-1_lch5gb.png",
];

export default function Settings() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  // User data
  const [userId, setUserId] = useState(null);
  const [currentAvatar, setCurrentAvatar] = useState(null);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [avatarTab, setAvatarTab] = useState("choose");
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarLoading, setAvatarLoading] = useState(false);

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
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("United Kingdom");

  // UI state
  const [activeSection, setActiveSection] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accountId = localStorage.getItem("accountId");
        const accountData = await api.get(`/api/account/${accountId}`);
        const userData = await api.get(`/api/users/${accountData.user_id}`);
        setUserId(accountData.user_id);
        setCurrentAvatar(userData.avatar);
        setPhone(userData.phone || "");
        setDateOfBirth(
          accountData.date_of_birth
            ? accountData.date_of_birth.split("T")[0]
            : "",
        );
        setAddressLine1(accountData.address_line1 || "");
        setAddressLine2(accountData.address_line2 || "");
        setCity(accountData.city || "");
        setPostcode(accountData.postcode || "");
        setCountry(accountData.country || "United Kingdom");
        setFirstName(accountData.first_name || "");
        setLastName(accountData.last_name || "");
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const resetState = () => {
    setOtpSent(false);
    setOtp("");
    setOtpVerified(false);
    setError("");
    setSuccess("");
  };

  // Avatar handlers
  const handleAvatarClick = () => {
    setShowAvatarPicker(true);
    setSelectedAvatar(null);
    setPreviewFile(null);
    setAvatarFile(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarFile(file);
    setPreviewFile(URL.createObjectURL(file));
    setSelectedAvatar(null);
  };

  const handleSaveAvatar = async () => {
    if (!selectedAvatar && !avatarFile) {
      setError("Please choose or upload an avatar");
      return;
    }

    setAvatarLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      if (avatarFile) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`,
          {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
          },
        );

        const data = await res.json();
        if (data.message === "User updated") {
          setCurrentAvatar(data.avatar);
          setShowAvatarPicker(false);
          setSuccess("Avatar updated successfully");
        } else {
          setError(data.message || "Update failed");
        }
      } else {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ avatar: selectedAvatar }),
          },
        );

        const data = await res.json();
        if (data.message === "User updated") {
          setCurrentAvatar(selectedAvatar);
          setShowAvatarPicker(false);
          setSuccess("Avatar updated successfully");
        } else {
          setError(data.message || "Update failed");
        }
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setAvatarLoading(false);
    }
  };

  // OTP handlers
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
      const accountId = localStorage.getItem("accountId");

      if (phone) {
        await api.put("/api/settings/profile", { phone });
      }

      const data = await api.put(`/api/account/${accountId}`, {
        date_of_birth: dateOfBirth || undefined,
        address_line1: addressLine1 || undefined,
        address_line2: addressLine2 || undefined,
        city: city || undefined,
        postcode: postcode || undefined,
        country: country || undefined,
      });

      if (data.message === "Account updated") {
        setSuccess("Profile updated successfully");
        setTimeout(() => {
          setSuccess("");
        }, 2000);
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
        <CancelBtu />
      </div>

      {error && <p className='error'>{error}</p>}
      {success && <p className='success'>{success}</p>}

      {/* Avatar Section */}
      <div className='settings_avatar_section'>
        <div className='settings_avatar_wrapper' onClick={handleAvatarClick}>
          <div className='avatar_container'>
            <Image
              src={
                currentAvatar ||
                "https://res.cloudinary.com/dhyjebn3i/image/upload/q_auto/f_auto/v1774959207/Avatar_ql2szp.png"
              }
              alt='avatar'
              width={80}
              height={80}
              className='settings_avatar'
            />
          </div>
          <div className='settings_avatar_overlay'>
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
                d='M19.6085 18.7478H13.2315C12.8175 18.7478 12.4815 19.0838 12.4815 19.4978C12.4815 19.9118 12.8175 20.2478 13.2315 20.2478H19.6085C20.0225 20.2478 20.3585 19.9118 20.3585 19.4978C20.3585 19.0838 20.0225 18.7478 19.6085 18.7478Z'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M9.36667 7.73936C9.46611 7.6071 9.65387 7.58033 9.78631 7.67955L14.9663 11.5599C15.099 11.6594 15.1259 11.8476 15.0263 11.9802L10.2066 18.4C9.04664 19.95 7.29664 20.26 6.08664 20.26C5.33664 20.26 4.79664 20.14 4.73664 20.13C4.60664 20.1 4.48664 20.01 4.41664 19.89C4.34664 19.76 2.62664 16.7 4.54664 14.15L9.36667 7.73936Z'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M16.9566 9.40999L16.2866 10.3007C16.1872 10.4329 15.9994 10.4597 15.867 10.3605L10.6862 6.47945C10.5538 6.38027 10.5267 6.19264 10.6256 6.06002L11.2966 5.15999C11.9866 4.22999 13.0566 3.73999 14.1366 3.73999C14.8766 3.73999 15.6166 3.96999 16.2566 4.44999C17.0066 5.01999 17.4966 5.84999 17.6366 6.77999C17.7666 7.71999 17.5266 8.64999 16.9566 9.40999Z'
              />
            </svg>
            <p>Change</p>
          </div>
        </div>
      </div>

      {/* Avatar Picker Modal */}
      {showAvatarPicker && (
        <div className='avatar_modal_bg'>
          <div className='avatar_modal'>
            <div className='avatar_modal_title'>
              <div className='avatar_title'>
                <h2>Change Avatar</h2>
              </div>
              <div
                onClick={() => setShowAvatarPicker(false)}
                className='avatar_close_icon'
              >
                <CancelBtu />
              </div>
            </div>

            <div className='avatar_tabs'>
              <div
                className={avatarTab === "choose" ? "active" : ""}
                onClick={() => setAvatarTab("choose")}
              >
                Choose Avatar
              </div>
              <div
                className={avatarTab === "upload" ? "active" : ""}
                onClick={() => setAvatarTab("upload")}
              >
                Upload Photo
              </div>
            </div>

            {avatarTab === "choose" && (
              <div className='avatar_grid'>
                {DEFAULT_AVATARS.map((url, index) => (
                  <div
                    key={index}
                    className={`avatar_option ${selectedAvatar === url ? "selected" : ""}`}
                    onClick={() => {
                      setSelectedAvatar(url);
                      setAvatarFile(null);
                      setPreviewFile(null);
                    }}
                  >
                    <Image
                      src={url}
                      alt={`Avatar ${index + 1}`}
                      width={100}
                      height={100}
                    />
                  </div>
                ))}
              </div>
            )}

            {avatarTab === "upload" && (
              <div className='avatar_upload'>
                {(previewFile && (
                  <div className='avatar_preview'>
                    <Image
                      src={previewFile}
                      alt='Preview'
                      width={100}
                      height={100}
                    />
                  </div>
                )) || (
                  <div className='avatar_placeholder'>
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
                        d='M12.6301 2.82001C12.6301 2.41001 12.2901 2.07001 11.8801 2.07001C11.4701 2.07001 11.1301 2.41001 11.1301 2.82001V6.71001C11.6301 6.69001 12.1301 6.69001 12.6301 6.70001V2.82001Z'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M16.42 6.83001H16.4C15.15 6.75001 13.9001 6.71001 12.6301 6.70001L12.63 13.05L14.27 11.4C14.56 11.11 15.04 11.11 15.33 11.4C15.62 11.7 15.62 12.17 15.33 12.46L12.41 15.39C12.34 15.46 12.26 15.51 12.17 15.55C12.08 15.59 11.98 15.61 11.88 15.61C11.78 15.61 11.68 15.59 11.59 15.55C11.5 15.51 11.42 15.46 11.35 15.39L8.43 12.46C8.14 12.17 8.14 11.7 8.43 11.4C8.72 11.11 9.2 11.11 9.49 11.4L11.13 13.05L11.1301 6.71001C9.94013 6.71001 8.76 6.76001 7.58 6.83001C3.55 7.20001 2.25 9.03001 2.25 14.33C2.25 21.93 5.1 21.93 12 21.93C18.9 21.93 21.75 21.93 21.75 14.33C21.75 9.03001 20.45 7.20001 16.42 6.83001Z'
                      />
                    </svg>
                  </div>
                )}
                <input
                  type='file'
                  ref={fileInputRef}
                  accept='image/jpg, image/jpeg, image/png, image/webp'
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <div type='button' onClick={() => fileInputRef.current.click()}>
                  Choose Image
                </div>
              </div>
            )}

            <button
              onClick={handleSaveAvatar}
              disabled={avatarLoading || (!selectedAvatar && !avatarFile)}
            >
              {avatarLoading ? "Saving..." : "Save Avatar"}
            </button>
          </div>
        </div>
      )}

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
          <div
            className={
              activeSection === "password"
                ? "setting_icon active"
                : "setting_icon"
            }
          >
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
                d='M11.9999 16.5001C8.7339 16.5001 4.8789 10.2601 4.1399 9.00906C3.8579 8.53406 4.0159 7.92106 4.4909 7.64006C4.9669 7.35706 5.5799 7.51706 5.8599 7.99106C7.4149 10.6161 10.4399 14.5001 11.9999 14.5001C13.5619 14.5001 16.5869 10.6161 18.1399 7.99106C18.4209 7.51706 19.0359 7.35706 19.5089 7.64006C19.9839 7.92006 20.1419 8.53306 19.8599 9.00906C19.1209 10.2601 15.2659 16.5001 11.9999 16.5001Z'
              />
            </svg>
          </div>
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
          <div
            className={
              activeSection === "names" ? "setting_icon active" : "setting_icon"
            }
          >
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
                d='M11.9999 16.5001C8.7339 16.5001 4.8789 10.2601 4.1399 9.00906C3.8579 8.53406 4.0159 7.92106 4.4909 7.64006C4.9669 7.35706 5.5799 7.51706 5.8599 7.99106C7.4149 10.6161 10.4399 14.5001 11.9999 14.5001C13.5619 14.5001 16.5869 10.6161 18.1399 7.99106C18.4209 7.51706 19.0359 7.35706 19.5089 7.64006C19.9839 7.92006 20.1419 8.53306 19.8599 9.00906C19.1209 10.2601 15.2659 16.5001 11.9999 16.5001Z'
              />
            </svg>
          </div>
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

      {/* Update Profile */}
      <div className='settings_section'>
        <div
          className='settings_section_header'
          onClick={() => {
            resetState();
            setActiveSection(activeSection === "profile" ? null : "profile");
          }}
        >
          <h2>Update Profile</h2>
          <div
            className={
              activeSection === "profile"
                ? "setting_icon active"
                : "setting_icon"
            }
          >
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
                d='M11.9999 16.5001C8.7339 16.5001 4.8789 10.2601 4.1399 9.00906C3.8579 8.53406 4.0159 7.92106 4.4909 7.64006C4.9669 7.35706 5.5799 7.51706 5.8599 7.99106C7.4149 10.6161 10.4399 14.5001 11.9999 14.5001C13.5619 14.5001 16.5869 10.6161 18.1399 7.99106C18.4209 7.51706 19.0359 7.35706 19.5089 7.64006C19.9839 7.92006 20.1419 8.53306 19.8599 9.00906C19.1209 10.2601 15.2659 16.5001 11.9999 16.5001Z'
              />
            </svg>
          </div>
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

              <div className='inputField'>
                <label>Date of Birth</label>
                <input
                  type='date'
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>

              <div className='inputField'>
                <label>Address Line 1</label>
                <input
                  type='text'
                  placeholder='123 Main Street'
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
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
                />
              </div>

              <div className='inputField'>
                <label>Postcode</label>
                <input
                  type='text'
                  placeholder='SW1A 1AA'
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
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
