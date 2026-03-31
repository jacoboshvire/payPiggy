/** @format */

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { api } from "@/lib/api";

export default function Input({ isRegister = false }) {
  const router = useRouter();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let data;

      if (isRegister) {
        // Register flow
        data = await api.post("/api/auth/register", {
          fullname,
          email,
          password,
        });
        if (!data.userId) {
          setError(data.message || "Registration failed");
          return;
        }
        // Mark as new user
        Cookies.set("isNewUser", "true", { expires: 1 });
      } else {
        // Login flow
        data = await api.post("/api/auth/login", { email, password });
        if (!data.userId) {
          setError(data.message || "Login failed");
          return;
        }
      }

      // Save userId and redirect to OTP options
      Cookies.set("userId", String(data.userId), { expires: 1 });
      router.push("/otp-options");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='form'>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <div className='inputField'>
            <label htmlFor='fullname'>Full Name</label>
            <div className='input'>
              <input
                type='text'
                id='fullname'
                placeholder='Jacob Oshevire'
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        <div className='inputField'>
          <label htmlFor='email'>Email</label>
          <div className='input'>
            <input
              type='email'
              id='email'
              placeholder='name@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className='inputField'>
          <label htmlFor='password'>Password</label>
          <div className='input'>
            <input
              type={seePassword ? "text" : "password"}
              id='password'
              placeholder='*******'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span onClick={() => setSeePassword((prev) => !prev)}>
              {seePassword ? "Hide" : "Show"}
            </span>
          </div>
        </div>

        {!isRegister && (
          <div className='forgottenPassword'>
            <a href='#'>Forgotten Password?</a>
          </div>
        )}

        {error && <p className='error'>{error}</p>}

        <button type='submit' disabled={loading}>
          {loading ? "Please wait..." : isRegister ? "Create Account" : "Login"}
        </button>

        <p className='switchAuth'>
          {isRegister ? (
            <>
              Already have an account? <a href='/login'>Login</a>
            </>
          ) : (
            <>
              Don't have an account? <a href='/register'>Sign Up</a>
            </>
          )}
        </p>
      </form>
    </div>
  );
}
