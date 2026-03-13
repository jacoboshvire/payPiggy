/** @format */
"use client";
import { useEffect, useState } from "react";

export default function Payment() {
  return (
    <div className='payment_form'>
      <form>
        {/* Payment input for account number and sort code */}
        <div className='payment_input_column'>
          <div className='payment_form_input'>
            <label htmlFor='account_no_input'>
              <p>Account number</p>
            </label>
            <input type='text' name='accountNumber' id='account_no_input' />
          </div>
          <div className='payment_form_input'>
            <label htmlFor='sort_code'>
              <p>Sort code</p>
            </label>
            <input type='text' name='sortCode' id='sort_code' />
          </div>
        </div>
        {/* Payment input for personal details */}
        <div className='payment_input_column'>
          <div className='payment_form_input'>
            <label htmlFor='account_no_input'>
              <p>Frist name</p>
            </label>
            <input
              type='text'
              name='accountNumber'
              id='first_name'
              placeholder='Jack'
            />
          </div>
          <div className='payment_form_input'>
            <label htmlFor='last_name'>
              <p>Last name</p>
            </label>
            <input type='text' name='LastName' id='last_name' />
          </div>
        </div>
      </form>
    </div>
  );
}
