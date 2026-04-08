/** @format */

import { useEffect, useState } from "react";

export default function account() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const accountId = localStorage.getItem("accountId");
        const data = await api.get(`/api/account/${accountId}`);
        console.log(data);
        setAccount(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAccount();
  }, []);
  return <div>page</div>;
}
