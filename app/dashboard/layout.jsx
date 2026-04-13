/** @format */

"use client";
import { useEffect } from "react";
import Nav from "./component/Nav";
import { usePathname, useRouter } from "next/navigation";
import "./style.css";

export default function layout({
  Account,
  Home,
  Payment,
  Wallet,
  Add,
  AddToVault,
  WithdrawFromVault,
  AccountDetails,
  PersonalDetails,
}) {
  const pathname = usePathname();
  const router = useRouter();
  // useEffect(() => {
  //   if (pathname === "/dashboard") {
  //     router.push("/dashboard?home=true");
  //   }
  // }, [pathname, router]);
  return (
    <div className='bashboard'>
      <div className='bashboard_container'>
        <Nav />
        {PersonalDetails && PersonalDetails}
        {WithdrawFromVault && WithdrawFromVault}
        {Add && Add}
        {AddToVault && AddToVault}
        {Home && Home}
        {AccountDetails && AccountDetails}
        {Payment && Payment}
        {Wallet && Wallet}
        {Account && Account}
      </div>
    </div>
  );
}
