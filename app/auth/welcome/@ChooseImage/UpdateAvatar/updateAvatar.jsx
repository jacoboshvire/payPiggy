/** @format */

"use client";
import { useState } from "react";
import Image from "next/image";

const DEFAULT_AVATARS = [
  "https://res.cloudinary.com/dhyjebn3i/image/upload/q_auto/f_auto/v1/paypiggy/avatars/avatar1",
  "https://res.cloudinary.com/dhyjebn3i/image/upload/q_auto/f_auto/v1/paypiggy/avatars/avatar2",
  "https://res.cloudinary.com/dhyjebn3i/image/upload/q_auto/f_auto/v1/paypiggy/avatars/avatar3",
  "https://res.cloudinary.com/dhyjebn3i/image/upload/q_auto/f_auto/v1/paypiggy/avatars/avatar4",
  "https://res.cloudinary.com/dhyjebn3i/image/upload/q_auto/f_auto/v1/paypiggy/avatars/avatar5",
  "https://res.cloudinary.com/dhyjebn3i/image/upload/q_auto/f_auto/v1/paypiggy/avatars/avatar6",
];

export default function UpdateAvatar({ userId, currentAvatar, onSuccess }) {
  const [selected, setSelected] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [tab, setTab] = useState("choose"); // "choose" | "upload"
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

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
        // Upload custom image via multer
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
        } else {
          setError(data.message || "Update failed");
        }
      } else {
        // Use selected default avatar URL
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
        <button
          type='button'
          className={tab === "choose" ? "active" : ""}
          onClick={() => setTab("choose")}
        >
          Choose Avatar
        </button>
        <button
          type='button'
          className={tab === "upload" ? "active" : ""}
          onClick={() => setTab("upload")}
        >
          Upload Photo
        </button>
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
            {preview && (
              <div className='avatar_preview'>
                <Image src={preview} alt='Preview' width={100} height={100} />
              </div>
            )}
            <div className='inputField'>
              <label htmlFor='avatar'>Choose an image</label>
              <input
                type='file'
                id='avatar'
                name='avatar'
                accept='image/jpg, image/jpeg, image/png, image/webp'
                onChange={handleFileChange}
              />
            </div>
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
