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
        {/*pathname.includes("/dashboard") && searchParams.get("home") === "true" && ()*/}
        <Suspense fallback={<div>Loading...</div>}>
          <Nav />
        </Suspense>
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
        <Suspense fallback={<div>Loading...</div>}>
          {AddToVault && AddToVault}
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>{Home && Home}</Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          {Account && Account}
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          {Payment && Payment}
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>{Wallet && Wallet}</Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          {AccountDetails && AccountDetails}
        </Suspense>
      </div>
    </div>
  );
}
