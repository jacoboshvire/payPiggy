/** @format */
"use client";
import { useEffect, useState } from "react";

export default function Payment() {
  return (
    <div className='payment_form'>
      <form>
        <div className='payment_form_input'>
          <label htmlFor=''>
            <p>Account name</p>
          </label>
        </div>
      </form>
    </div>
  );
}
