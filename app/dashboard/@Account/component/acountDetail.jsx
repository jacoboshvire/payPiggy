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
            <div className='Account_Detail_svg'>{link.linksvg}</div>
            <div className='Account_Detail_linkName'>{link.linkName}</div>
          </Link>
        );
      })}
    </div>
  );
}
