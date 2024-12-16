import axios from "axios";

export const axiosCrypto = axios.create({
  baseURL: "https://markvista-backend.vercel.app/api/crypto",
  // baseURL: "http://localhost:3003/api/crypto",
  withCredentials: true,
  withXSRFToken: true,
});

export const axiosAuth = axios.create({
  baseURL: "https://markvista-backend.vercel.app/api/auth",
  // baseURL: "http://localhost:3002/api/auth",
  withCredentials: true,
  withXSRFToken: true,
});

export const axiosProtected = axios.create({
  baseURL: "https://markvista-backend.vercel.app/api/users",
  withCredentials: true,
  withXSRFToken: true,
});

export const axiosOrder = axios.create({
  baseURL: "http://localhost:4000/api",
});

export const axiosCommunity = axios.create({
  baseURL: "https://markvista-backend.vercel.app/api/community",
  withCredentials: true,
  withXSRFToken: true,
});
