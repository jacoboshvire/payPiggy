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
        <div className='payment_form_container'>
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
                <p>First name</p>
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

          <div className='payment_form_input'>
            <div className='payment_optional'>
              <p>Optional</p>
            </div>
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
        </div>
        <div className='payment_form_btus'>
          <button>
            <p>Send</p>
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M12.4895 5.79779C11.8428 5.53029 11.1212 5.31696 10.6778 5.76196C10.3078 6.13362 10.097 7.57279 10.0428 9.16612H3.18783C2.72699 9.16612 2.35449 9.53862 2.35449 9.99946C2.35449 10.4603 2.72699 10.8328 3.18783 10.8328H10.0437C10.0978 12.4228 10.3087 13.857 10.6787 14.227C10.8737 14.422 11.1212 14.4953 11.3903 14.4953C11.7678 14.4953 12.1862 14.3503 12.552 14.1986C13.8612 13.657 17.6453 11.3686 17.6453 9.99363C17.6453 8.57446 13.6895 6.29529 12.4895 5.79779Z'
                fill='white'
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
