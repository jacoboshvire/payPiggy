/** @format */
"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import Image from "next/image";

export default function PaymentHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const accountId = localStorage.getItem("accountId");
        const data = await api.get(`/api/transaction/history/${accountId}`);

        // Fetch current user's avatar for all transactions
        const accountData = await api.get(`/api/account/${accountId}`);
        const userData = await api.get(`/api/users/${accountData.user_id}`);

        const enriched = data.results.map((txn) => ({
          ...txn,
          image:
            userData.avatar ||
            "https://res.cloudinary.com/dhyjebn3i/image/upload/q_auto/f_auto/v1774959207/Avatar_ql2szp.png",
          name: userData.name || "Unknown",
        }));

        setTransactions(enriched);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
    const interval = setInterval(fetchTransactions, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!transactions || transactions.length === 0)
    return <p>No transactions yet</p>;

  return (
    <div className='paymentHistory'>
      <div className='paymentHistory_title'>
        <h1>Payment History</h1>
      </div>
      <div className='paymentHistory_lists'>
        {transactions.map((data, index) => (
          <div className='paymentHistory_item' key={data.id || index}>
            <div className='paymentHistory_item_nameAndImage'>
              <div className='paymentHistory_item_image'>
                <Image
                  src={data.image}
                  alt={data.name}
                  height={50}
                  width={50}
                />
              </div>
              <div className='paymentHistory_item_name'>
                <p>{data.name}</p>
                <p>{new Date(data.created_at).toLocaleDateString()}</p>
              </div>
            </div>
            <div className='paymentHistory_item_status'>
              <p>{data.type}</p>
            </div>
            <div className='paymentHistory_item_amount'>
              <p className={data.type === "debit" ? "debit" : "credit"}>
                {data.type === "debit" ? "-" : "+"}£
                {Number(data.amount).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
