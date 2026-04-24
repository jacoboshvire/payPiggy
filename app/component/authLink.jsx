/** @format */

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import "./style.css";

export default function AuthLink() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className='authLink'>
      {pathname === "/auth/login" && (
        <p>
          Don't have an account?{" "}
          <span onClick={() => router.push("/auth/signup")}>Sign Up</span>
        </p>
      )}
      {pathname === "/auth/signup" && (
        <p>
          Already have an account?{" "}
          <span onClick={() => router.push("/auth/login")}>Log In</span>
        </p>
      )}
    </div>
  );
}
