/** @format */

"use client";
import OtpOptions from "./components/otpoptions";
import Back from "../../component/Back";

export default function page() {
  return (
    <div className='otpOptionsPage'>
      <Back />
      <OtpOptions />
    </div>
  );
}
