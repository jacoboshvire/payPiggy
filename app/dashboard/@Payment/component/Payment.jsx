/** @format */
"use client";
import { useEffect, useState } from "react";

export default function Payment() {
  return (
    <div className='payment_form'>
      <form>
        <div className='payment_form_input'>
          <label htmlFor=''>
            <p>Account number</p>
          </label>
          <input type='text' name='account name' />
        </div>
      </form>
    </div>
  );
}
