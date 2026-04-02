/** @format */

import React from "react";
import Details from "./component/details";

export default function layout({ Account, ChooseImage, PhoneNumber }) {
  return (
    <div>
        <Details
      {Account}
      {ChooseImage}
      {PhoneNumber}
    </div>
  );
}
