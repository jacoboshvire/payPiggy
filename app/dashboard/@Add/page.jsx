/** @format */
"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { api } from "@/lib/api";
import Cookies from "js-cookie";
import { saveToken } from "@/lib/auth";
import "../style.css";

export default function Add() {
  return <div>page</div>;
}
