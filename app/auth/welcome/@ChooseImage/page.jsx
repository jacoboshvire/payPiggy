/** @format */
"use client";
import React from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import UpdateAvatar from "./UpdateAvatar/updateAvatar";

export default function Page() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  return (
    <>
      {pathname.includes("/auth/welcome") &&
        searchParams.get("ChooseImage") === "true" && (
          <div>
            <Link href='/dashboard?home=true' className='skipLink'>
              skip for now
            </Link>
            <UpdateAvatar />
          </div>
        )}
    </>
  );
}
