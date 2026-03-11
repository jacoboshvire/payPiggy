/** @format */

import React from "react";
import LinkArray from "./LinkArray";

export default function AcountDetail() {
  return (
    <div>
      {LinkArray.map((link, index) => {
        return <p key={index}>{link.linkName}</p>;
      })}
    </div>
  );
}
