/** @format */

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://paypiggy-backend.vercel.app"; /* Fallback to localhost if env variable is not set */

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const handleResponse = async (res: Response) => {
  const data = await res.json();

  if (
    res.status === 403 &&
    data.reason === "This service is only available in the United Kingdom"
  ) {
    if (typeof window !== "undefined") {
      window.location.href = "/blocked";
    }
    return data;
  }

  return data;
};

export const api = {
  get: async (endpoint: string) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return handleResponse(res);
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
    return handleResponse(res);
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
    return handleResponse(res);
  },
};
