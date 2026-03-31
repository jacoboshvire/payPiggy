/** @format */

"use client";
import OtpOptions from "./component/otpoptions";
import Back from "../../component/Back";

export default function page() {
  return (
    <div className='otpOptionsPage'>
      <Back />
      <OtpOptions />
    </div>
  );
}
