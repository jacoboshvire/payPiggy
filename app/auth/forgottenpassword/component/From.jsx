/** @format */

import { useState, useEffect } from "react";
import "./style.css";

export default function From() {
  const [changeType, setChangeType] = useState(false);
  const [changeType1, setChangeType1] = useState(false);

  return (
    <div className="from">
      <form></form>
    </div>
  );
}
