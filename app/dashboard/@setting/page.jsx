/** @format */
"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Settings from "./component/setting";
import "./setting.css";

export default function Page() {
  const searchParams = useSearchParams();
  const setting = searchParams.get("settings");
  const pathname = usePathname();
  const router = useRouter();
  return (
    <>
      {pathname.includes("/dashboard") && setting && (
        <div className='setting-page'>
          <Settings />
        </div>
      )}
    </>
  );
}
