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
  const [tab, setTab] = useState("choose"); // "choose" | "upload"
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
          type='button'
          className={tab === "choose" ? "active" : ""}
          onClick={() => setTab("choose")}
        >
          Choose Avatar
        </div>
        <div
          type='button'
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
