import axios from "axios";

export const AxiosConn = () => {
  const conn = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  });

  return conn;
};
