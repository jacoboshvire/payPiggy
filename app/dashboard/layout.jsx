/** @format */

"use client";
import Nav from "./component/Nav";
import { Suspense } from "react";
// import { usePathname, useRouter } from "next/navigation";
import "./style.css";

export default function Layout({
  Account,
  Home,
  Payment,
  Wallet,
  Add,
  AddToVault,
  WithdrawFromVault,
  AccountDetails,
  PersonalDetails,
  Setting,
}) {
  // const pathname = usePathname();
  // const router = useRouter();
  // useEffect(() => {
  //   if (pathname === "/dashboard") {
  //     router.push("/dashboard?home=true");
  //   }
  // }, [pathname, router]);
  return (
    <div className='bashboard'>
      <div className='bashboard_container'>
        <Nav />
        <Suspense fallback={<div>Loading...</div>}>
          {PersonalDetails && PersonalDetails}
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          {Setting && Setting}
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          {WithdrawFromVault && WithdrawFromVault}
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>{Add && Add}</Suspense>
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
