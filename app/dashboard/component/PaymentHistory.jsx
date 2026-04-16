/** @format */
"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { api } from "@/lib/api";
import Image from "next/image";

export default function PaymentHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const bottomRef = useRef(null);
  const pageRef = useRef(1);
  const loadingMoreRef = useRef(false);
  const hasMoreRef = useRef(true);
  const LIMIT = 5;

  const fetchTransactions = useCallback(async (pageNum, replace = false) => {
    try {
      const accountId = localStorage.getItem("accountId");
      const data = await api.get(
        `/api/transaction/history/${accountId}?limit=${LIMIT}&page=${pageNum}`,
      );

      const enriched = (data.results || []).map((txn) => ({
        ...txn,
        image:
          txn.other_avatar ||
          "https://res.cloudinary.com/dhyjebn3i/image/upload/q_auto/f_auto/v1774959207/Avatar_ql2szp.png",
        name:
          txn.other_name ||
          (txn.other_first_name && txn.other_last_name
            ? `${txn.other_first_name} ${txn.other_last_name}`
            : "Unknown"),
      }));

      if (replace) {
        setTransactions(enriched);
      } else {
        setTransactions((prev) => [...prev, ...enriched]);
      }

      const more = data.results.length >= LIMIT;
      setHasMore(more);
      hasMoreRef.current = more;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      loadingMoreRef.current = false;
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchTransactions(1, true);
  }, [fetchTransactions]);

  // Refresh every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      pageRef.current = 1;
      fetchTransactions(1, true);
    }, 10000);
    return () => clearInterval(interval);
  }, [fetchTransactions]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMoreRef.current &&
          !loadingMoreRef.current
        ) {
          loadingMoreRef.current = true;
          setLoadingMore(true);
          pageRef.current += 1;
          fetchTransactions(pageRef.current);
        }
      },
      { threshold: 0.1 },
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => observer.disconnect();
  }, [fetchTransactions]);

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
        {transactions.map((data) => (
          <div className='paymentHistory_item' key={data.id}>
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

        <div ref={bottomRef} style={{ height: "20px" }} />

        {loadingMore && <p>Loading more...</p>}
        {!hasMore && transactions.length > 0 && (
          <p className='noMore'>No more transactions</p>
        )}
      </div>
    </div>
  );
}
