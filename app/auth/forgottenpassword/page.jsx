
"use client";

import { useState, useEffect } from "react";
import Back from "../../component/Back";
import Detail from "./component/Detail";
import From from "./component/From";
import "./component/style.css"

export default function page() {
  return (
    <div className='forgotPassword'>
      <div className="forgotPassword_container">
      <Back />
      <From />
      <Detail />
      </div>
    </div>
  );
}
