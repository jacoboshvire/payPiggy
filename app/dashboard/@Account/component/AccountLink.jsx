/** @format */

import React from "react";
import Image from "next/image";

export default function AccountLink() {
  return (
    <div className='Account_Link'>
      <div className='Account_Link_image'>
        <Image
          src='https://res.cloudinary.com/dr0yyqvj6/image/upload/v1767871145/nxn2zpymtgyxybpjhqqg.jpg'
          alt='profile'
          height={100}
          width={100}
        />
      </div>
      <h1>Govind Rashna</h1>
    </div>
  );
}
