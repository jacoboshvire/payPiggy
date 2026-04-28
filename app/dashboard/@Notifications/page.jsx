/** @format */

"use client";
import { useSearchParams, usePathname } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const notifications = searchParams.get("notifications");
  return (
    <>
      {pathname.includes("dashboard") && notifications === "true" && (
        <div className='notification-banner'>You have new notifications!</div>
      )}
    </>
  );
}
