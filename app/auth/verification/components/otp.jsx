/** @format */

"use client";
import { useEffect, useRef, useState } from "react";

export default function otp({ length = 5, onOtsubmit = () => {} }) {
  const [OneTimePassword, setOneTimePassword] = useState(
    new Array(length).fill(""),
  );
  const inputRef = useRef([]);

  console.log(OneTimePassword);
  console.log(inputRef);

  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOTP = [...OneTimePassword];

    //varlidatoin to allow only one input

    newOTP[index] = value.substring(value.length - 1);
    setOneTimePassword(newOTP);

    //submit trigger
    const comdineOTP = newOTP.join("");
    console.log(comdineOTP);
    if (comdineOTP.length === length) onOtsubmit(comdineOTP);

    //move input focus to the next input
    if (value && index < length - 1 && inputRef.current[index + 1]) {
      inputRef.current[index + 1].focus();
    }
  };
  const handleClick = (index) => {
    inputRef.current[index].select();
    // Edge case: move cursor to end if on a filled cell
    if (index > 0 && !OneTimePassword[index]) {
      inputRef.current[oneTimePassword.indexOf("")].focus();
    }
  };
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !OneTimePassword[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };
  return (
    <div className='OTP'>
      <div className='otpInput'>
        {OneTimePassword.map((value, index) => {
          return (
            <input
              type='text'
              key={index}
              value={value}
              ref={(input) => (inputRef.current[index] = input)}
              onChange={(e) => handleChange(index, e)}
              onClick={() => handleClick(index)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          );
        })}
      </div>
      <div className='OTP_Resend'>
        <p>Resend Code</p>
      </div>
    </div>
  );
}
