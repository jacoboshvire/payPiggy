/** @format */
"use client";
import { useState, useEffect } from "react";
import Vault from "../../component/vault";
import Card from "../../component/Card";

export default function Main() {
  const [openCard, setOpenCard] = useState(false);
  return (
    <div className='wallet_main'>
      <Card />
      <Vault />
    </div>
  );
}
