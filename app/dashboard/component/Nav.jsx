"use client";
import { useState, useEffect } from "react";
import {
  useRouter,
  useParams,
  usePathname,
  useSearchParams,
} from "next/navigation";
import "./style.css";

export default function Nav() {
  return (
    <div className="bashboard_navbar">
      <nav>
        <div className="bashboard_navbar_logo"></div>
      </nav>
    </div>
  );
}
