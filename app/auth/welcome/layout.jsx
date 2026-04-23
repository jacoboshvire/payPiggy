/** @format */
"use client";
import { useEffect, Suspense } from "react";
import Details from "./component/details";
import "./style.css";
// import { usePathname, useRouter } from "next/navigation";

export default function Layout({ Account, ChooseImage, Kyc }) {
  // const pathname = usePathname();
  // const router = useRouter();

  // useEffect(() => {
  //   if (pathname === "/auth/welcome") {
  //     router.push("/auth/welcome?Account=true");
  //   }
  // }, [pathname, router]);

  return (
    <div className='welcome'>
      <Suspense fallback={<div>Loading...</div>}>
        <Details />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>{Account && Account}</Suspense>
      <Suspense fallback={<div>Loading...</div>}>{Kyc && Kyc}</Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        {ChooseImage && ChooseImage}
      </Suspense>
    </div>
  );
}
