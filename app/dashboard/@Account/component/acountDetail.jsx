/** @format */

import React from "react";
import LinkArray from "./LinkArray";
import Link from "next/link";

export default function AccountDetail() {
  return (
    <div className='Account_Detail'>
      {LinkArray.map((link, index) => {
        return (
          <Link href={link.link}>
            <div className='svg'>{link.linksvg}</div>
          </Link>
        );
      })}
    </div>
  );
}
