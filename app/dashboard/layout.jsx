/** @format */

"use client";
import { useEffect } from "react";
import Nav from "./component/Nav";
import { usePathname, useRouter } from "next/navigation";
import "./style.css";

export default function layout({ Account, Home, Payment, Wallet, Add }) {
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (pathname === "/dashboard") {
      router.push("/dashboard?home=true");
    }
  }, [pathname, router]);
  return (
    <div className='bashboard'>
      <div className='bashboard_container'>
        <Nav />
        {Add && Add}
        {Home && Home}
        {Payment && Payment}
        {Wallet && Wallet}
        {Account && Account}
      </div>
    </div>
  );
}
