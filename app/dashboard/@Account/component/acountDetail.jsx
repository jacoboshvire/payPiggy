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
            <div className='Account_Detail_LinkDetails'>
              <div className='Account_Detail_svg'>{link.linksvg}</div>
              <div className='Account_Detail_linkName'>{link.linkName}</div>
            </div>
            <div className='Account_Detail_arrow'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M20.5 11.9998C20.5 8.80181 15.023 5.68781 13.925 5.09581C13.438 4.83281 12.832 5.01481 12.57 5.50181C12.309 5.98681 12.489 6.59381 12.976 6.85581C14.807 7.84481 17.23 9.58181 18.135 11.0008H4.5C3.947 11.0008 3.5 11.4478 3.5 12.0008C3.5 12.5528 3.947 13.0008 4.5 13.0008H18.133C17.227 14.4198 14.806 16.1568 12.976 17.1448C12.489 17.4078 12.309 18.0138 12.57 18.4998C12.751 18.8348 13.096 19.0248 13.451 19.0248C13.611 19.0248 13.774 18.9868 13.925 18.9048C15.022 18.3128 20.495 15.2008 20.5 12.0028C20.5 12.0018 20.5 11.9998 20.5 11.9998Z'
                  fill='black'
                />
              </svg>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
