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
        const userData = await api.get(`/api/users/${data.results[0].user_id}`);
        data.results.forEach((transaction) => {
          transaction.image = userData.avatar;
        });
        setTransactions(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
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
        {transactions.map((data, index) => {
          return (
            <div className='paymentHistory_item' key={data.amount + index}>
              {/* name and image container */}
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
                </div>
              </div>
              {/* transaction status */}
              <div className='paymentHistory_item_status'>
                <p>{data.type}</p>
              </div>
              {/*transaction amount*/}
              <div className='paymentHistory_item_amount'>
                <p>￡{data.amount}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
