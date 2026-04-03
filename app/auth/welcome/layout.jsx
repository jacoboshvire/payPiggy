/** @format */
"use client";
import { useEffect } from "react";
import Details from "./component/details";
import "./style.css";
import { usePathname, useRouter } from "next/navigation";

export default function layout({ Account, ChooseImage }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/auth/welcome") {
      router.push("/auth/welcome?Account=true");
    }
  }, [pathname, router]);

  return (
    <div className='welcome'>
      <Details />
      {Account && Account}
      {ChooseImage && ChooseImage}
    </div>
  );
}
