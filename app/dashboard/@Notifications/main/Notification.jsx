/** @format */

"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import "../notification.css";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();

    const interval = setInterval(() => {
      fetchUnreadCount();
      fetchNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await api.get("/api/notifications");
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const data = await api.get("/api/notifications/unread");
      setUnreadCount(data.count || 0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await api.put("/api/notifications/read-all", {});
      setUnreadCount(0);
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, read_status: true })),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkRead = async (id, read_status) => {
    if (read_status) return;
    try {
      await api.put(`/api/notifications/${id}/read`, {});
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read_status: true } : n)),
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await api.delete(`/api/notifications/${id}`);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "transaction":
        return (
          <div className='notification_icon transaction'>
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M20.5 11.9998C20.5 8.80181 15.023 5.68781 13.925 5.09581C13.438 4.83281 12.832 5.01481 12.57 5.50181C12.309 5.98681 12.489 6.59381 12.976 6.85581C14.807 7.84481 17.23 9.58181 18.135 11.0008H4.5C3.947 11.0008 3.5 11.4478 3.5 12.0008C3.5 12.5528 3.947 13.0008 4.5 13.0008H18.133C17.227 14.4198 14.806 16.1568 12.976 17.1448C12.489 17.4078 12.309 18.0138 12.57 18.4998C12.751 18.8348 13.096 19.0248 13.451 19.0248C13.611 19.0248 13.774 18.9868 13.925 18.9048C15.022 18.3128 20.495 15.2008 20.5 12.0028Z'
                fill='white'
              />
            </svg>
          </div>
        );
      case "security":
        return (
          <div className='notification_icon security'>
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M12 2L4 5V11C4 15.55 7.41 19.74 12 21C16.59 19.74 20 15.55 20 11V5L12 2ZM12 7C13.1 7 14 7.9 14 9C14 10.1 13.1 11 12 11C10.9 11 10 10.1 10 9C10 7.9 10.9 7 12 7ZM12 17C10.33 17 8.86 16.15 8 14.85C8.02 13.52 10.67 12.8 12 12.8C13.32 12.8 15.98 13.52 16 14.85C15.14 16.15 13.67 17 12 17Z'
                fill='white'
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className='notification_icon general'>
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
                d='M19.6274 13.9624C18.7804 12.0994 18.8024 11.3984 18.8414 10.1244C18.8514 9.82336 18.8614 9.49636 18.8614 9.12136C18.8614 6.14435 16.7324 1.95135 12.0004 1.95135C7.26836 1.95135 5.13936 6.14435 5.13936 9.12136C5.13936 9.49536 5.14936 9.82336 5.15936 10.1244C5.19836 11.3984 5.21936 12.0994 4.36336 13.9874C3.99736 14.9314 4.04136 15.7464 4.49636 16.4104C5.58836 18.0084 8.74836 18.2284 12.0004 18.2284C15.2524 18.2284 18.4124 18.0084 19.5044 16.4104C19.9604 15.7464 20.0044 14.9314 19.6274 13.9624Z'
                fill='black'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M14.6977 19.2406C13.0667 19.4216 11.2987 19.4206 9.28865 19.2386C8.98765 19.2146 8.68965 19.3736 8.55165 19.6486C8.41265 19.9246 8.45666 20.2556 8.66165 20.4856C9.56166 21.4926 10.7457 22.0486 11.9957 22.0486H11.9977C13.2507 22.0486 14.4377 21.4936 15.3397 20.4856C15.5467 20.2546 15.5897 19.9186 15.4477 19.6416C15.3047 19.3666 15.0107 19.2126 14.6977 19.2406Z'
                fill='black'
              />
            </svg>
          </div>
        );
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  if (loading)
    return (
      <div className='notifications_page'>
        <p className='notifications_loading_text'>Loading...</p>
      </div>
    );

  return (
    <div className='notifications_page'>
      <div className='notifications_page_header'>
        <h1>Notifications</h1>
        {unreadCount > 0 && (
          <button className='notifications_markAll' onClick={handleMarkAllRead}>
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className='notifications_empty'>
          <svg
            width='64'
            height='64'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 17C11.45 17 11 16.55 11 16V12C11 11.45 11.45 11 12 11C12.55 11 13 11.45 13 12V16C13 16.55 12.55 17 12 17ZM12 9C11.45 9 11 8.55 11 8C11 7.45 11.45 7 12 7C12.55 7 13 7.45 13 8C13 8.55 12.55 9 12 9Z'
              fill='#ccc'
            />
          </svg>
          <p>No notifications yet</p>
        </div>
      ) : (
        <div className='notifications_list'>
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notifications_item ${!notification.read_status ? "unread" : ""}`}
              onClick={() =>
                handleMarkRead(notification.id, notification.read_status)
              }
            >
              {getTypeIcon(notification.type)}
              <div className='notifications_item_content'>
                <div className='notifications_item_top'>
                  <p className='notifications_item_title'>
                    {notification.title}
                  </p>
                  <span className='notifications_item_time'>
                    {formatTime(notification.created_at)}
                  </span>
                </div>
                <p className='notifications_item_message'>
                  {notification.message}
                </p>
              </div>
              {!notification.read_status && (
                <div className='notifications_item_dot' />
              )}
              <button
                className='notifications_item_delete'
                onClick={(e) => handleDelete(e, notification.id)}
              >
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <line
                    x1='18.364'
                    y1='5.636'
                    x2='5.636'
                    y2='18.364'
                    strokeWidth='2'
                    strokeLinecap='round'
                    stroke='currentColor'
                  />
                  <line
                    x1='5.636'
                    y1='5.636'
                    x2='18.364'
                    y2='18.364'
                    strokeWidth='2'
                    strokeLinecap='round'
                    stroke='currentColor'
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
