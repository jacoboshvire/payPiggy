/** @format */

"use client";
import { useState, useEffect } from "react";
import "../style.css";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function Defaults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  return <div>default</div>;
}
