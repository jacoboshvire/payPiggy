/** @format */

"use client";
import { useSearchParams, usePathname } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  return <div>page</div>;
}
