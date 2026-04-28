/** @format */

"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();

    // Poll every 30 seconds
    const interval = setInterval(() => {
      fetchUnreadCount();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await api.get("/api/notifications");
      setNotifications(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const data = await api.get("/api/notifications/unread");
      setUnreadCount(data.count);
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

  const handleMarkRead = async (id) => {
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

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/notifications/${id}`);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='notifications'>
      {/* Bell icon with unread count */}
      <div
        className='notifications_bell'
        onClick={() => {
          setOpen(!open);
          if (!open) fetchNotifications();
        }}
      >
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
            d='M20.8904 17.0882C19.1258 13.207 19.1716 11.7466 19.2529 9.09244C19.2737 8.46533 19.2946 7.78413 19.2946 7.00283C19.2946 0.800664 14.8591 -3.8147e-06 10.0008 -3.8147e-06C5.14254 -3.8147e-06 0.707107 0.800664 0.707107 7.00283C0.707107 7.78199 0.727913 8.46533 0.748718 9.09244C0.830033 11.7466 0.873744 13.207 -0.909926 17.1403C-1.67243 19.107 -1.58077 20.8049 -0.632848 22.1882C1.64215 25.5174 8.22548 25.9757 15.0005 25.9757C21.7755 25.9757 28.3588 25.5174 30.6338 22.1882C31.5838 20.8049 31.6755 19.107 30.8902 17.0882H20.8904Z'
            fill='currentColor'
          />
        </svg>
        {unreadCount > 0 && (
          <span className='notifications_badge'>{unreadCount}</span>
        )}
      </div>

      {/* Notifications dropdown */}
      {open && (
        <div className='notifications_dropdown'>
          <div className='notifications_header'>
            <h2>Notifications</h2>
            {unreadCount > 0 && (
              <button onClick={handleMarkAllRead}>Mark all as read</button>
            )}
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : notifications.length === 0 ? (
            <p className='notifications_empty'>No notifications yet</p>
          ) : (
            <div className='notifications_list'>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notifications_item ${!notification.read_status ? "unread" : ""}`}
                  onClick={() => handleMarkRead(notification.id)}
                >
                  <div className='notifications_item_content'>
                    <p className='notifications_item_title'>
                      {notification.title}
                    </p>
                    <p className='notifications_item_message'>
                      {notification.message}
                    </p>
                    <p className='notifications_item_time'>
                      {new Date(notification.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    className='notifications_item_delete'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(notification.id);
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
