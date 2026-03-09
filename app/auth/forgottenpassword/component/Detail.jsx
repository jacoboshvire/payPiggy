/** @format */

"use client";
import { useState, useEffect } from "react";
import Logo from "../../../component/Logo";
import "./style.css";

export default function Detail() {
  return (
    <div className="details">
      <Logo />
      <div className="details_paragraph">
        <p>Reset Your Password</p>
      </div>
    </div>
  );
}
