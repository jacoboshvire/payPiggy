/** @format */

"use client";
import { useState } from "react";

export default function Payment() {
  const [checkEmail, setCheckEmail] = useState(false);

  const handleEmail = (e) => {
    const value = e.target.value;
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setCheckEmail(!isEmail && value.length > 0);
  };

  return (
    <div className='payment_form'>
      <form>
        <div className='payment_input_column'>
          <div className='payment_form_input'>
            <label htmlFor='account_no_input'>
              <p>Account number</p>
            </label>
            <input
              type='text'
              name='accountNumber'
              id='account_no_input'
              placeholder='54##-####'
            />
          </div>
          <div className='payment_form_input'>
            <label htmlFor='sort_code'>
              <p>Sort code</p>
            </label>
            <input
              type='text'
              name='sortCode'
              id='sort_code'
              placeholder='##-##-##'
            />
          </div>
        </div>

        <div className='payment_input_column'>
          <div className='payment_form_input'>
            <label htmlFor='first_name'>
              <p>First name</p> {/* ✅ Fixed typo */}
            </label>
            <input
              type='text'
              name='firstName'
              id='first_name'
              placeholder='Jack'
            />
          </div>
          <div className='payment_form_input'>
            <label htmlFor='last_name'>
              <p>Last name</p>
            </label>
            <input
              type='text'
              name='lastName'
              id='last_name'
              placeholder='Stone'
            />
          </div>
        </div>

        <div className='payment_optional'>
          <p>Optional</p>
        </div>
        <div className='payment_form_input'>
          {checkEmail && (
            <div className='payment_errorMsg'>
              <p>Please enter a correct email</p>
            </div>
          )}
          <label htmlFor='email'>
            <p>Email</p>
          </label>
          <input
            type='text'
            name='email'
            id='email'
            placeholder='name@example.com'
            onInput={handleEmail}
            className={checkEmail ? "err" : ""}
          />
        </div>
        <div className='payment_form_btu'>
          <button>
            <p>Send</p>
          </button>
        </div>
      </form>
    </div>
  );
}
