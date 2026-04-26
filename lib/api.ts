/** @format */

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8080"; /* Fallback to localhost if env variable is not set */

    if (res.status === 403 && data.reason === "This service is only available in the United Kingdom") {
    if (typeof window !== "undefined") {
      window.location.href = "/blocked";
    }
    return data;
  }
  
  return data;
};

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const api = {
  get: async (endpoint: string) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.json();
  },

  post: async (endpoint: string, body: Record<string, unknown>) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(body),
    });
    return res.json();
  },

  put: async (endpoint: string, body: Record<string, unknown>) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(body),
    });
    return res.json();
  },
};
