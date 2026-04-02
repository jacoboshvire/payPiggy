/** @format */

import React from "react";
import Details from "./component/details";
import "./style.css";

export default function layout({ Account, ChooseImage, PhoneNumber }) {
  return (
    <div className='welcome'>
      <Details />
      {Account && Account}
      {ChooseImage && ChooseImage}
      {PhoneNumber && PhoneNumber}
    </div>
  );
}
