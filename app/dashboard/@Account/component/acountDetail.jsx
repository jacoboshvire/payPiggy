/** @format */

import React from "react";
import LinkArray from "./LinkArray";
import Link from "next/link";

export default function AccountDetail() {
  return (
    <div className='Account_Detail'>
      <div className='Account_Detail_title'></div>
      {LinkArray.map((link, index) => {
        return (
          <Link href={link.link} key={index}>
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
      <Link href='#'>
        <div className='Account_Detail_LinkDetails'>
          <div className='Account_Detail_svg'>
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
                d='M22.1702 11.5898L19.2422 8.67383C18.9482 8.38183 18.4742 8.38183 18.1822 8.67583C17.8902 8.96983 17.8912 9.44383 18.1842 9.73583L19.8242 11.3698H16.8892C16.8992 11.8698 16.8992 12.3698 16.8892 12.8698H19.8262L18.1842 14.5058C17.8912 14.7978 17.8902 15.2728 18.1822 15.5668C18.3282 15.7138 18.5212 15.7868 18.7132 15.7868C18.9042 15.7868 19.0962 15.7138 19.2422 15.5688L22.1702 12.6518C22.3122 12.5118 22.3912 12.3198 22.3912 12.1208C22.3912 11.9218 22.3122 11.7308 22.1702 11.5898Z'
                fill='#E60101'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M8.63889 12.12C8.63889 11.71 8.96889 11.37 9.38889 11.37L16.8892 11.3698C16.8792 10.1098 16.8089 8.85 16.7089 7.59V7.58C16.3389 3.55 14.5089 2.25 9.20889 2.25C1.60889 2.25 1.60889 5.1 1.60889 12C1.60889 18.9 1.60889 21.75 9.20889 21.75C14.5089 21.75 16.3389 20.45 16.7089 16.41C16.8089 15.24 16.8692 14.0598 16.8892 12.8698L9.38889 12.87C8.96889 12.87 8.63889 12.54 8.63889 12.12Z'
                fill='#E60101'
              />
            </svg>
          </div>
          <div className='Account_Detail_linkName'>Logout</div>
        </div>
      </Link>
      <Link href='#'>
        <div className='Account_Detail_LinkDetails'>
          <div className='Account_Detail_svg'>🥲</div>
          <div className='Account_Detail_linkName'>
            <p>Delete Account</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
