/** @format */

"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./update-avatar.css";

const DEFAULT_AVATARS = [
  "https://res.cloudinary.com/dhyjebn3i/image/upload/q_auto/f_auto/v1774959207/Group_1060_hekrbq.png",
  "https://res.cloudinary.com/dhyjebn3i/image/upload/q_auto/f_auto/v1774959207/Avatar_ql2szp.png",
  "https://res.cloudinary.com/dhyjebn3i/image/upload/q_auto/f_auto/v1774959207/Avatar-4_iewqsl.png",
  "https://res.cloudinary.com/dhyjebn3i/image/upload/q_auto/f_auto/v1774959207/Avatar-2_vnsa3e.png",
  "https://res.cloudinary.com/dhyjebn3i/image/upload/q_auto/f_auto/v1774959206/Avatar-3_dw2a0i.png",
  "https://res.cloudinary.com/dhyjebn3i/image/upload/q_auto/f_auto/v1774959206/Avatar-1_lch5gb.png",
];

export default function UpdateAvatar({ userId, currentAvatar, onSuccess }) {
  const [selected, setSelected] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [tab, setTab] = useState("choose");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setSelected(null);
  };

  const handleSelectAvatar = (url) => {
    setSelected(url);
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!selected && !file) {
      setError("Please choose or upload an avatar");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (file) {
        const formData = new FormData();
        formData.append("avatar", file);

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
          setSuccess(true);
          if (onSuccess) onSuccess(data.avatar);
          router.push("/dashboard?home=true");
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
            body: JSON.stringify({ avatar: selected }),
          },
        );

        const data = await res.json();

        if (data.message === "User updated") {
          setSuccess(true);
          if (onSuccess) onSuccess(selected);
          router.push("/dashboard?home=true");
        } else {
          setError(data.message || "Update failed");
        }
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='updateAvatar'>
      {/* Tab switcher */}
      <div className='avatar_tabs'>
        <div
          className={tab === "choose" ? "active" : ""}
          onClick={() => setTab("choose")}
        >
          Choose Avatar
        </div>
        <div
          className={tab === "upload" ? "active" : ""}
          onClick={() => setTab("upload")}
        >
          Upload Photo
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Choose from defaults */}
        {tab === "choose" && (
          <div className='avatar_grid'>
            {DEFAULT_AVATARS.map((url, index) => (
              <div
                key={index}
                className={`avatar_option ${selected === url ? "selected" : ""}`}
                onClick={() => handleSelectAvatar(url)}
              >
                <Image
                  src={url}
                  alt={`Avatar ${index + 1}`}
                  width={80}
                  height={80}
                />
                {selected === url && (
                  <div className='avatar_check'>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M20.707 5.293a1 1 0 010 1.414l-11 11a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L9 15.586 19.293 5.293a1 1 0 011.414 0z'
                        fill='white'
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Upload custom image */}
        {tab === "upload" && (
          <div className='avatar_upload'>
            {(preview && (
              <div className='avatar_preview'>
                <Image src={preview} alt='Preview' width={100} height={100} />
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
            <label htmlFor='avatar' className='formLabel'>
              Choose an image
            </label>
            <input
              type='file'
              id='avatar'
              name='avatar'
              accept='image/jpg, image/jpeg, image/png, image/webp'
              onChange={handleFileChange}
            />
          </div>
        )}

        {error && <p className='error'>{error}</p>}
        {success && <p className='success'>Avatar updated successfully</p>}

        <button type='submit' disabled={loading || (!selected && !file)}>
          {loading ? "Saving..." : "Save Avatar"}
        </button>
      </form>
    </div>
  );
}
