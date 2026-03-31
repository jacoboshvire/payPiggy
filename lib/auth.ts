/** @format */

import Cookies from "js-cookie";

export const saveToken = (token: string) => {
  // Save in both cookie (for middleware) and localStorage (for API calls)
  Cookies.set("token", token, { expires: 1 }); // 1 day
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  Cookies.remove("token");
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const isLoggedIn = () => {
  return !!Cookies.get("token");
};
