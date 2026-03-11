/** @format */

import React from "react";
import LinkArray from "./LinkArray";

export default function AcountDetail() {
  return (
    <div>
      {LinkArray.map((link, index) => {
        return <p>{link.name}</p>;
      })}
    </div>
  );
}
