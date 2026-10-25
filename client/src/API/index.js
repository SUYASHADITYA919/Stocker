import axios from "axios";
import io from "socket.io-client";

const API_URL = process.env.REACT_APP_API;

const token = JSON.parse(localStorage.getItem("profile"))?.token || null;

const API = axios.create({
  baseURL: API_URL,
});

export const socket = io(API_URL, {
  query: { token },
  autoConnect: false,
});

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem("profile");

  if (profile) {
    const parsedProfile = JSON.parse(profile);
    req.headers.Authorization = `Bearer ${parsedProfile.token}`;
  }

  return req;
});

export const fetchOrders = () => API.get("/order");
export const placeOrder = (newOrder) => API.post("/order", newOrder);
export const updateOrder = (id, updatedOrder) =>
  API.patch(`/order/${id}`, updatedOrder);
export const deleteOrder = (id) => API.delete(`/order/${id}`);

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const googleSignIn = (token) =>
  API.post("/users/googlesignin", token);
export const resetPassword = (formData) =>
  API.post("/users/resetpassword", formData);

export const contestRegistration = () =>
  API.post("/contest/registration");
export const getRegistration = () =>
  API.get("/contest/getregistration");