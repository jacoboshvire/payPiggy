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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [userData, setUserData] = useState(null);
  const observerRef = useRef(null);
  const bottomRef = useRef(null);
  const LIMIT = 5;

  // Fetch user data once
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accountId = localStorage.getItem("accountId");
        const accountData = await api.get(`/api/account/${accountId}`);
        const user = await api.get(`/api/users/${accountData.user_id}`);
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, []);

  // Fetch transactions by page
  const fetchTransactions = useCallback(
    async (pageNum, replace = false) => {
      try {
        const accountId = localStorage.getItem("accountId");
        const data = await api.get(
          `/api/transaction/history/${accountId}?limit=${LIMIT}&page=${pageNum}`,
        );
        console.log("Transaction data:", data);
        const enriched = data.results.map((txn) => ({
          ...txn,
          image:
            userData?.avatar ||
            "https://res.cloudinary.com/dhyjebn3i/image/upload/q_auto/f_auto/v1774959207/Avatar_ql2szp.png",
          name: userData?.name || "Unknown",
        }));

        if (replace) {
          setTransactions(enriched);
        } else {
          setTransactions((prev) => [...prev, ...enriched]);
        }

        // If results less than limit, no more pages
        setHasMore(data.results.length === LIMIT);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [userData],
  );

  // Initial load
  useEffect(() => {
    if (userData) {
      fetchTransactions(1, true);
    }
  }, [userData, fetchTransactions]);

  // Refresh every 10 seconds
  useEffect(() => {
    if (!userData) return;
    const interval = setInterval(() => {
      fetchTransactions(1, true);
      setPage(1);
    }, 10000);
    return () => clearInterval(interval);
  }, [userData, fetchTransactions]);

  // Infinite scroll observer
  useEffect(() => {
    if (!hasMore || loadingMore) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setLoadingMore(true);
          setPage((prev) => {
            const nextPage = prev + 1;
            fetchTransactions(nextPage);
            return nextPage;
          });
        }
      },
      { threshold: 1.0 },
    );

    if (bottomRef.current) {
      observerRef.current.observe(bottomRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [hasMore, loadingMore, fetchTransactions]);

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

        {/* Infinite scroll trigger */}
        <div ref={bottomRef} />

        {loadingMore && <p>Loading more...</p>}
        {!hasMore && transactions.length > 0 && (
          <p className='noMore'>No more transactions</p>
        )}
      </div>
    </div>
  );
}
