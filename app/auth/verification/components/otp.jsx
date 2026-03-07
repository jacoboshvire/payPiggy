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
      inputRef.current[OneTimePassword.indexOf("")].focus();
    }
  };
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !OneTimePassword[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };
  return (
    <div className='OTP'>
      <form>
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
        <button>
          <p>next</p>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M14.9872 6.9572C14.2112 6.6362 13.3452 6.3802 12.8132 6.9142C12.3692 7.3602 12.1162 9.0872 12.0512 10.9992H3.8252C3.2722 10.9992 2.8252 11.4462 2.8252 11.9992C2.8252 12.5522 3.2722 12.9992 3.8252 12.9992H12.0522C12.1172 14.9072 12.3702 16.6282 12.8142 17.0722C13.0482 17.3062 13.3452 17.3942 13.6682 17.3942C14.1212 17.3942 14.6232 17.2202 15.0622 17.0382C16.6332 16.3882 21.1742 13.6422 21.1742 11.9922C21.1742 10.2892 16.4272 7.5542 14.9872 6.9572Z'
              fill='white'
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
