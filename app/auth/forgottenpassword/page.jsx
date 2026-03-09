/** @format */
"use client";

import { useState, useEffect } from "react";
import Back from "../../component/Back";
import Detail from "./component/Detail";
import From from "./component/From";

export default function page() {
  return (
    <div className='forgotPassword'>
      <Back />
      <From />
      <Detail />
    </div>
  );
}
