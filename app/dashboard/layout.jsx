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
  Notifications,
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
        <Suspense>
          <Nav />
        </Suspense>
        <Suspense>{PersonalDetails && PersonalDetails}</Suspense>
        <Suspense>{Notifications && Notifications}</Suspense>
        <Suspense>{Setting && Setting}</Suspense>
        <Suspense>{WithdrawFromVault && WithdrawFromVault}</Suspense>
        <Suspense>{Add && Add}</Suspense>
        <Suspense>{AddToVault && AddToVault}</Suspense>
        <Suspense>{Home && Home}</Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          {Account && Account}
        </Suspense>
        <Suspense>{Payment && Payment}</Suspense>
        <Suspense>{Wallet && Wallet}</Suspense>
        <Suspense>{AccountDetails && AccountDetails}</Suspense>
      </div>
    </div>
  );
}
