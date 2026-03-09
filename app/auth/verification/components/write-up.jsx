/** @format */

"use client";
import { useState, useEffect } from "react";
import Back from "../../../component/Back";
import Logo from "../../../component/Logo";
import "./../style.css";

export default function writeup() {
  return (
    <div className="writeUp">
      <Back />

      <div className="logoAndDetails">
        <Logo />
        <p>Check your email for your verification code.</p>
      </div>
    </div>
  );
}
